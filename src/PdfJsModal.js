// src/PdfJsModal.js
import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// Worker — CDN నుండి use చేస్తాం (bundling issues లేకుండా)
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

export default function PdfJsModal({ open, url, title = 'PDF Preview', onClose }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [pdf, setPdf] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

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

  // Load PDF when open/url changes
  useEffect(() => {
    let canceled = false;
    async function load() {
      if (!open || !url) return;
      setLoading(true); setErr('');
      try {
        const loadingTask = pdfjsLib.getDocument({
          url,
          withCredentials: false, // Cloudinaryకి CORS OK
        });
        const _pdf = await loadingTask.promise;
        if (canceled) return;
        setPdf(_pdf);
        setNumPages(_pdf.numPages);
        setPageNum(1);
      } catch (e) {
        if (!canceled) setErr('PDF load error');
        // console.error(e);
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    load();
    return () => { canceled = true; };
  }, [open, url]);

  // Render current page
  useEffect(() => {
    if (!pdf || !open) return;
    let canceled = false;

    async function render() {
      try {
        const page = await pdf.getPage(pageNum);
        if (canceled) return;

        // Fit-to-width baseline
        const containerWidth = containerRef.current?.clientWidth || 900;
        const viewport = page.getViewport({ scale: 1 });
        const fitScale = (containerWidth - 24) / viewport.width;
        const finalScale = Math.max(0.5, scale || 1.2) * fitScale;

        const v = page.getViewport({ scale: finalScale });
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = v.width;
        canvas.height = v.height;

        const renderTask = page.render({ canvasContext: ctx, viewport: v });
        await renderTask.promise;
      } catch (e) {
        // console.error(e);
      }
    }
    render();

    return () => { canceled = true; };
  }, [pdf, pageNum, scale, open]);

  if (!open) return null;

  const stop = (e) => e.stopPropagation();

  const headerBtn = (label, style = {}, props = {}) => (
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
        ...style,
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
      }}
      aria-modal="true" role="dialog"
    >
      <div
        onClick={stop}
        ref={containerRef}
        style={{
          width: '92vw', maxWidth: 1200, height: '90vh', background: '#fff',
          borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column',
          boxShadow: '0 10px 30px rgba(0,0,0,.3)'
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
            {headerBtn('−', {}, { onClick: () => setScale(s => Math.max(0.5, s - 0.1)) })}
            {headerBtn('+', {}, { onClick: () => setScale(s => Math.min(3, s + 0.1)) })}
            {headerBtn('Prev', {}, { onClick: () => setPageNum(p => Math.max(1, p - 1)), disabled: pageNum <= 1 })}
            <span style={{ fontSize: 13, color: '#6b7280' }}>
              Page {pageNum} / {numPages || '…'}
            </span>
            {headerBtn('Next', {}, { onClick: () => setPageNum(p => Math.min(numPages || p, p + 1)), disabled: pageNum >= (numPages || 1) })}
            {headerBtn('Open New Tab', { borderColor: '#2563eb', color: '#2563eb' }, {
              onClick: () => window.open(url, '_blank', 'noopener')
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

        {/* Body */}
        <div style={{ flex: 1, background: '#f7f7f7', overflow: 'auto' }}>
          {loading && (
            <div style={{ padding: 16, color: '#6b7280' }}>Loading…</div>
          )}
          {err && (
            <div style={{ padding: 16, color: '#b91c1c' }}>
              {err} — Try “Open New Tab” or “Download”.
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
