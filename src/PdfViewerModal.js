// import React, { useEffect } from 'react';

// export default function PdfViewerModal({ open, url, title = 'PDF Preview', onClose }) {
//   // ESC తో close
//   useEffect(() => {
//     if (!open) return;
//     const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
//     window.addEventListener('keydown', onKey);
//     // body scroll lock
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = 'hidden';
//     return () => {
//       window.removeEventListener('keydown', onKey);
//       document.body.style.overflow = prev;
//     };
//   }, [open, onClose]);

//   if (!open) return null;

//   const stop = (e) => e.stopPropagation();
//   const gview = `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(url)}`;

//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         zIndex: 9999,
//       }}
//       aria-modal="true"
//       role="dialog"
//     >
//       <div
//         onClick={stop}
//         style={{
//           width: '92vw', maxWidth: 1200, height: '90vh', background: '#fff',
//           borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column',
//           boxShadow: '0 10px 30px rgba(0,0,0,.3)',
//         }}
//       >
//         {/* Header */}
//         <div style={{
//           padding: '10px 14px', borderBottom: '1px solid #eee',
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//           gap: 10
//         }}>
//           <strong style={{ fontSize: 16, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//             {title}
//           </strong>

//           <div style={{ display: 'flex', gap: 8 }}>
//             {/* fallback link - some browsersలో iframe load కానప్పుడే ఉపయోగపడుతుంది */}
//             <a
//               href={gview}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{
//                 textDecoration: 'none', padding: '6px 10px',
//                 border: '1px solid #4b5563', borderRadius: 8, color: '#4b5563', fontSize: 14
//               }}
//               title="Open via Google Viewer (fallback)"
//             >
//               Fallback Viewer
//             </a>

//             <a
//               href={url}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{
//                 textDecoration: 'none', padding: '6px 10px',
//                 border: '1px solid #2563eb', borderRadius: 8, color: '#2563eb', fontSize: 14
//               }}
//             >
//               Open New Tab
//             </a>

//             <a
//               href={url}
//               download
//               style={{
//                 textDecoration: 'none', padding: '6px 10px',
//                 border: '1px solid #16a34a', borderRadius: 8, color: '#16a34a', fontSize: 14
//               }}
//             >
//               Download
//             </a>

//             <button
//               onClick={onClose}
//               style={{
//                 border: 'none', background: '#ef4444', color: '#fff',
//                 padding: '6px 10px', borderRadius: 8, cursor: 'pointer', fontSize: 14
//               }}
//             >
//               Close ✕
//             </button>
//           </div>
//         </div>

//         {/* PDF viewer */}
//         <div style={{ flex: 1, background: '#f7f7f7' }}>
//           {/* సాధారణంగా Cloudinary PDFs iframeలో load అవుతాయి */}
//           <iframe
//             title="pdf"
//             src={url}
//             style={{ width: '100%', height: '100%', border: 'none' }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from 'react';

export default function PdfViewerModal({ open, url, title = 'PDF Preview', onClose }) {
  const [viewerSrc, setViewerSrc] = useState('');
  const [mode, setMode] = useState('auto'); // 'auto' | 'native' | 'gview'

  const gviewUrl = useMemo(
    () => `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(url || '')}`,
    [url]
  );

  // ESC + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // Auto select viewer: try HEAD on the Cloudinary URL; if not a PDF or HEAD fails -> gview
  useEffect(() => {
    let cancelled = false;
    async function pick() {
      if (!open || !url) return;
      // default assume gview (safer), and upgrade to native if HEAD proves PDF
      let chosen = gviewUrl;
      try {
        const r = await fetch(url, { method: 'HEAD' });
        const ct = (r.headers.get('content-type') || '').toLowerCase();
        if (r.ok && ct.includes('pdf')) {
          chosen = url; // native iframe ok
          if (!cancelled) setMode('native');
        } else {
          if (!cancelled) setMode('gview');
        }
      } catch {
        if (!cancelled) setMode('gview');
      }
      if (!cancelled) setViewerSrc(chosen);
    }
    pick();
    return () => { cancelled = true; };
  }, [open, url, gviewUrl]);

  if (!open) return null;

  const stop = (e) => e.stopPropagation();

  const headerBtn = (children, style = {}, props = {}) => (
    <button
      {...props}
      style={{
        border: '1px solid transparent',
        background: '#f3f4f6',
        color: '#111827',
        padding: '6px 10px',
        borderRadius: 8,
        cursor: 'pointer',
        fontSize: 14,
        ...style,
      }}
    >
      {children}
    </button>
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
      }}
      aria-modal="true" role="dialog"
    >
      <div
        onClick={stop}
        style={{
          width: '92vw', maxWidth: 1200, height: '90vh', background: '#fff',
          borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column',
          boxShadow: '0 10px 30px rgba(0,0,0,.3)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '10px 14px', borderBottom: '1px solid #eee',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10
        }}>
          <strong style={{
            fontSize: 16, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
          }}>
            {title}
          </strong>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {/* Mode toggle (optional) */}
            {headerBtn(
              mode === 'native' ? 'Using Native Viewer' : 'Using Google Viewer',
              { background: '#e5e7eb', cursor: 'default' }
            )}

            {headerBtn('Open New Tab', { borderColor: '#2563eb', color: '#2563eb' }, {
              onClick: () => window.open(url, '_blank', 'noopener'),
            })}
            <a
              href={url}
              download
              style={{
                textDecoration: 'none', padding: '6px 10px',
                border: '1px solid #16a34a', borderRadius: 8, color: '#16a34a', fontSize: 14
              }}
            >
              Download
            </a>
            {headerBtn('Close ✕', { background: '#ef4444', color: '#fff', borderColor: '#ef4444' }, {
              onClick: onClose
            })}
          </div>
        </div>

        {/* Viewer */}
        <div style={{ flex: 1, background: '#f7f7f7' }}>
          <iframe
            title="pdf"
            src={viewerSrc}
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>

        {/* Footer tiny hint */}
        <div style={{ padding: '6px 12px', fontSize: 12, color: '#6b7280', borderTop: '1px solid #eee' }}>
          If the preview ever fails, the modal auto-switches to Google Viewer. You can still use “Open New Tab” or “Download”.
        </div>
      </div>
    </div>
  );
}
