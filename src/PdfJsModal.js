// // 
// import React, { useEffect, useRef, useState, useMemo } from 'react';
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// // Worker from CDN (bundle hassles లేకుండా)
// pdfjsLib.GlobalWorkerOptions.workerSrc =
//   'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// /* API base: Netlify env > Render fallback */
// const API_BASE =
//   process.env.REACT_APP_API_BASE ||
//   'https://bible-mining-backend-jxj5.onrender.com';

// export default function PdfJsModal({ open, url, title = 'PDF Preview', onClose }) {
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);

//   const [pdf, setPdf] = useState(null);
//   const [pageNum, setPageNum] = useState(1);
//   const [numPages, setNumPages] = useState(0);
//   const [scale, setScale] = useState(1.2);
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState('');

//   const proxiedUrl = useMemo(
//     () => (url ? `${API_BASE}/proxy/pdf?url=${encodeURIComponent(url)}` : ''),
//     [url]
//   );

//   // Body scroll lock + ESC
//   useEffect(() => {
//     if (!open) return;
//     const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
//     window.addEventListener('keydown', onKey);
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = 'hidden';
//     return () => {
//       window.removeEventListener('keydown', onKey);
//       document.body.style.overflow = prev;
//     };
//   }, [open, onClose]);

//   // ===== Core: fetch -> ArrayBuffer -> PDF.js (direct → proxy fallback) =====
//   useEffect(() => {
//     let cancelled = false;

//     async function fetchAsArrayBuffer(src) {
//       const r = await fetch(src, {
//         method: 'GET',
//         mode: 'cors',
//         credentials: 'omit',
//         redirect: 'follow',
//         // Cloudinaryకి సాధారణంగా CORS headers ఉంటాయి; లేనిపక్షంలో proxy ప్రయత్నం
//         headers: { Accept: 'application/pdf' },
//       });
//       if (!r.ok) throw new Error(`HTTP ${r.status}`);
//       return await r.arrayBuffer();
//     }

//     async function loadPdfFrom(ab) {
//       const loadingTask = pdfjsLib.getDocument({
//         data: ab,
//         disableRange: true,
//         disableStream: true,
//         disableAutoFetch: true,
//         nativeImageDecoderSupport: 'none',
//       });
//       const _pdf = await loadingTask.promise;
//       if (cancelled) return null;
//       setPdf(_pdf);
//       setNumPages(_pdf.numPages);
//       setPageNum(1);
//       return _pdf;
//     }

//     async function run() {
//       if (!open || !url) return;
//       setLoading(true); setErr('');
//       setPdf(null); setNumPages(0); setPageNum(1);

//       // Step 1: Direct Cloudinary URL → ArrayBuffer
//       try {
//         const ab1 = await fetchAsArrayBuffer(url);
//         const ok1 = await loadPdfFrom(ab1);
//         if (ok1) return;
//       } catch (_e1) {
//         // console.debug('Direct fetch failed', _e1);
//       }

//       // Step 2: Proxy fallback (if available)
//       try {
//         if (!proxiedUrl) throw new Error('No proxy url');
//         const ab2 = await fetchAsArrayBuffer(proxiedUrl);
//         const ok2 = await loadPdfFrom(ab2);
//         if (ok2) return;
//       } catch (_e2) {
//         // console.debug('Proxy fetch failed', _e2);
//       }

//       if (!cancelled) setErr('PDF load error');
//     }

//     run().finally(() => { if (!cancelled) setLoading(false); });
//     return () => { cancelled = true; };
//   }, [open, url, proxiedUrl]);

//   // Render current page
//   useEffect(() => {
//     if (!pdf || !open) return;
//     let cancelled = false;
//     (async () => {
//       try {
//         const page = await pdf.getPage(pageNum);
//         if (cancelled) return;

//         const containerWidth = containerRef.current?.clientWidth || 900;
//         const viewport = page.getViewport({ scale: 1 });
//         const fitScale = (containerWidth - 24) / viewport.width;
//         const finalScale = Math.max(0.5, scale || 1.2) * fitScale;

//         const v = page.getViewport({ scale: finalScale });
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d', { alpha: false });
//         canvas.width = Math.floor(v.width);
//         canvas.height = Math.floor(v.height);

//         const renderTask = page.render({ canvasContext: ctx, viewport: v });
//         await renderTask.promise;
//       } catch {
//         /* ignore page render error */
//       }
//     })();

//     return () => { cancelled = true; };
//   }, [pdf, pageNum, scale, open]);

//   if (!open) return null;

//   const stop = (e) => e.stopPropagation();
//   const Btn = ({ children, ...props }) => (
//     <button
//       {...props}
//       style={{
//         border: '1px solid #e5e7eb',
//         background: '#f9fafb',
//         color: '#111827',
//         padding: '6px 10px',
//         borderRadius: 8,
//         cursor: 'pointer',
//         fontSize: 14,
//         ...(props.style || {}),
//       }}
//     >
//       {children}
//     </button>
//   );

//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
//         display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
//       }}
//       aria-modal="true" role="dialog"
//     >
//       <div
//         onClick={stop}
//         ref={containerRef}
//         style={{
//           width: '92vw', maxWidth: 1200, height: '90vh', background: '#fff',
//           borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column',
//           boxShadow: '0 10px 30px rgba(0,0,0,.3)'
//         }}
//       >
//         {/* Header */}
//         <div style={{
//           padding: '10px 14px', borderBottom: '1px solid #eee',
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10
//         }}>
//           <strong style={{
//             fontSize: 16, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
//           }}>
//             {title}
//           </strong>

//           <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
//             <Btn onClick={() => setScale(s => Math.max(0.5, s - 0.1))}>−</Btn>
//             <Btn onClick={() => setScale(s => Math.min(3, s + 0.1))}>+</Btn>
//             <Btn onClick={() => setPageNum(p => Math.max(1, p - 1))} disabled={pageNum <= 1}>Prev</Btn>
//             <span style={{ fontSize: 13, color: '#6b7280' }}>
//               Page {pageNum} / {numPages || '…'}
//             </span>
//             <Btn onClick={() => setPageNum(p => Math.min(numPages || p, p + 1))} disabled={pageNum >= (numPages || 1)}>Next</Btn>
//             <Btn style={{ borderColor: '#2563eb', color: '#2563eb' }}
//                  onClick={() => window.open(url, '_blank', 'noopener')}>
//               Open New Tab
//             </Btn>
//             <a href={url} download
//                style={{ textDecoration: 'none', padding: '6px 10px', border: '1px solid #16a34a', borderRadius: 8, color: '#16a34a', fontSize: 14 }}>
//               Download
//             </a>
//             <Btn style={{ background: '#ef4444', color: '#fff', borderColor: '#ef4444' }} onClick={onClose}>Close ✕</Btn>
//           </div>
//         </div>

//         {/* Body */}
//         <div style={{ flex: 1, background: '#f7f7f7', overflow: 'auto' }}>
//           {loading && <div style={{ padding: 16, color: '#6b7280' }}>Loading…</div>}
//           {err && (
//             <div style={{ padding: 16, color: '#b91c1c' }}>
//               PDF load error — Try “Open New Tab” or “Download”.
//             </div>
//           )}
//           <div style={{ display: 'flex', justifyContent: 'center', padding: 12 }}>
//             <canvas ref={canvasRef} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// frontend/src/PdfJsModal.js
import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// Worker from CDN
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const API_BASE =
  process.env.REACT_APP_API_BASE || 'https://bible-mining-backend-jxj5.onrender.com';

export default function PdfJsModal({ open, url, title = 'PDF Preview', onClose }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [pdf, setPdf] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const proxiedUrl = useMemo(
    () => (url ? `${API_BASE}/proxy/pdf?url=${encodeURIComponent(url)}` : ''),
    [url]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // fetch -> ArrayBuffer -> PDF.js (direct → proxy)
  useEffect(() => {
    let cancelled = false;

    async function fetchAsArrayBuffer(src) {
      const r = await fetch(src, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        redirect: 'follow',
        headers: { Accept: 'application/pdf' },
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.arrayBuffer();
    }

    async function loadPdfFrom(ab) {
      const loadingTask = pdfjsLib.getDocument({
        data: ab,
        disableRange: true,
        disableStream: true,
        disableAutoFetch: true,
        nativeImageDecoderSupport: 'none',
      });
      const _pdf = await loadingTask.promise;
      if (cancelled) return null;
      setPdf(_pdf);
      setNumPages(_pdf.numPages);
      setPageNum(1);
      return _pdf;
    }

    async function run() {
      if (!open || !url) return;
      setLoading(true);
      setErr('');
      setPdf(null);
      setNumPages(0);
      setPageNum(1);

      try {
        const ab1 = await fetchAsArrayBuffer(url);
        const ok1 = await loadPdfFrom(ab1);
        if (ok1) return;
      } catch {}

      try {
        if (!proxiedUrl) throw new Error('No proxy url');
        const ab2 = await fetchAsArrayBuffer(proxiedUrl);
        const ok2 = await loadPdfFrom(ab2);
        if (ok2) return;
      } catch {}

      if (!cancelled) setErr('PDF load error');
    }

    run().finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [open, url, proxiedUrl]);

  // render current page
  useEffect(() => {
    if (!pdf || !open) return;
    let cancelled = false;
    (async () => {
      try {
        const page = await pdf.getPage(pageNum);
        if (cancelled) return;

        const containerWidth = containerRef.current?.clientWidth || 900;
        const viewport = page.getViewport({ scale: 1 });
        const fitScale = (containerWidth - 24) / viewport.width;
        const finalScale = Math.max(0.5, scale || 1.2) * fitScale;

        const v = page.getViewport({ scale: finalScale });
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false });
        canvas.width = Math.floor(v.width);
        canvas.height = Math.floor(v.height);

        const renderTask = page.render({ canvasContext: ctx, viewport: v });
        await renderTask.promise;
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, [pdf, pageNum, scale, open]);

  if (!open) return null;

  const stop = (e) => e.stopPropagation();
  const Btn = ({ children, ...props }) => (
    <button
      {...props}
      style={{
        border: '1px solid #e5e7eb',
        background: '#f9fafb',
        color: '#111827',
        padding: '6px 10px',
        borderRadius: 8,
        cursor: 'pointer',
        fontSize: 14,
        ...(props.style || {}),
      }}
    >
      {children}
    </button>
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      aria-modal="true"
      role="dialog"
    >
      <div
        onClick={stop}
        ref={containerRef}
        style={{
          width: '92vw',
          maxWidth: 1200,
          height: '90vh',
          background: '#fff',
          borderRadius: 12,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 30px rgba(0,0,0,.3)',
        }}
      >
        <div
          style={{
            padding: '10px 14px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <strong
            style={{
              fontSize: 16,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </strong>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Btn onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}>−</Btn>
            <Btn onClick={() => setScale((s) => Math.min(3, s + 0.1))}>+</Btn>
            <Btn onClick={() => setPageNum((p) => Math.max(1, p - 1))} disabled={pageNum <= 1}>
              Prev
            </Btn>
            <span style={{ fontSize: 13, color: '#6b7280' }}>
              Page {pageNum} / {numPages || '…'}
            </span>
            <Btn
              onClick={() => setPageNum((p) => Math.min(numPages || p, p + 1))}
              disabled={pageNum >= (numPages || 1)}
            >
              Next
            </Btn>
            <Btn
              style={{ borderColor: '#2563eb', color: '#2563eb' }}
              onClick={() => window.open(url, '_blank', 'noopener')}
            >
              Open New Tab
            </Btn>
            <a
              href={url}
              download
              style={{
                textDecoration: 'none',
                padding: '6px 10px',
                border: '1px solid #16a34a',
                borderRadius: 8,
                color: '#16a34a',
                fontSize: 14,
              }}
            >
              Download
            </a>
            <Btn
              style={{ background: '#ef4444', color: '#fff', borderColor: '#ef4444' }}
              onClick={onClose}
            >
              Close ✕
            </Btn>
          </div>
        </div>

        <div style={{ flex: 1, background: '#f7f7f7', overflow: 'auto' }}>
          {loading && <div style={{ padding: 16, color: '#6b7280' }}>Loading…</div>}
          {err && (
            <div style={{ padding: 16, color: '#b91c1c' }}>
              PDF load error — Try “Open New Tab” or “Download”.
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', padding: 12 }}>
            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
