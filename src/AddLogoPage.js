// import React, { useState } from 'react';
// import axios from 'axios';
// import './AddLogoPage.css';

// function AddLogoPage() {
//   const [logoImage, setLogoImage] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('logo_image', logoImage);

//     try {
//       await axios.post('https://bible-mining-backend-jxj5.onrender.com/api/logo', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage('లోగో విజయవంతంగా అప్‌డేట్ చేయబడింది!');
//       setLogoImage(null);
//       document.getElementById('logo-input').value = '';
//     } catch (error) {
//       setMessage('లోగోను అప్‌డేట్ చేయడంలో లోపం సంభవించింది.');
//       console.error('Error updating logo:', error);
//     }
//   };

//   return (
//     <div className="add-logo-container">
//       <h2>లోగోను అప్‌డేట్ చేయండి</h2>
//       <p className="add-logo-description">
//         మీ కంప్యూటర్ నుండి ఒక లోగో ఫైల్‌ను ఎంచుకొని, అప్‌లోడ్ చేయండి.
//       </p>

//       <form className="add-logo-form" onSubmit={handleSubmit}>
//         <label htmlFor="logo-input">లోగో ఫైల్‌ను ఎంచుకోండి</label>
//         <input
//           type="file"
//           id="logo-input"
//           accept="image/*"
//           onChange={(e) => setLogoImage(e.target.files[0])}
//           required
//         />
//         <button type="submit">లోగోను అప్‌డేట్ చేయండి</button>
//       </form>
//       {message && <p className="status-message">{message}</p>}
//     </div>
//   );
// }

// export default AddLogoPage;

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './AddLogoPage.css';

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  'https://bible-mining-backend-jxj5.onrender.com';

function AddLogoPage() {
  const [type, setType] = useState('header'); // header | footer
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState('');

  const fileRef = useRef(null);

  useEffect(() => {
    if (!file) { setPreview(''); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onFileChange = (e) => {
    setErr('');
    const f = e.target.files?.[0];
    if (!f) { setFile(null); return; }
    const okMime = f.type.startsWith('image/');
    if (!okMime) { setFile(null); return setErr('దయచేసి ఒక ఇమేజ్ ఫైల్ (PNG/JPG/WEBP) ఎంచుకోండి.'); }
    if (f.size > 5 * 1024 * 1024) { setFile(null); return setErr('ఫైల్ పరిమాణం 5MB కన్నా తక్కువగా ఉండాలి.'); }
    setFile(f);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); setErr('');

    if (!type) return setErr('దయచేసి టైప్ ఎంచుకోండి (header/footer).');
    if (!file) return setErr('Logo ఫైల్ ఎంచుకోండి.');

    const fd = new FormData();
    fd.append('type', type);
    if (title) fd.append('title', title);
    fd.append('image', file);

    try {
      setUploading(true); setProgress(0);
      await axios.post(`${API_BASE}/api/logo`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (pe) => {
          if (!pe.total) return;
          setProgress(Math.round((pe.loaded * 100) / pe.total));
        }
      });
      setMsg('లోగో విజయవంతంగా జోడించబడింది!');
      setTitle(''); setFile(null);
      if (fileRef.current) fileRef.current.value = '';
      setTimeout(() => setProgress(0), 700);
    } catch (e2) {
      console.error('Logo upload error:', e2);
      setErr(e2?.response?.data?.message || 'లోగో అప్లోడ్‌లో లోపం జరిగింది.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="add-logo-container">
      <h2>లోగోను జోడించండి</h2>
      <form className="add-logo-form" onSubmit={onSubmit}>
        <label>Type</label>
        <select value={type} onChange={(e)=>setType(e.target.value)} required>
          <option value="header">Header</option>
          <option value="footer">Footer</option>
        </select>

        <label>Title (ఐచ్చికం)</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Logo title (optional)" />

        <label>Logo ఫైల్</label>
        <input type="file" accept="image/*" onChange={onFileChange} ref={fileRef} required />

        {preview && (
          <div style={{margin:'8px 0'}}>
            <img src={preview} alt="preview" style={{maxWidth: 220, borderRadius: 8}} />
          </div>
        )}

        {uploading && (
          <div style={{ margin: '8px 0' }}>
            <div style={{ height: 8, background: '#eee', borderRadius: 6 }}>
              <div
                style={{
                  width: `${progress}%`,
                  height: 8,
                  background: '#22c55e',
                  borderRadius: 6,
                  transition: 'width .2s',
                }}
              />
            </div>
            <small>{progress}%</small>
          </div>
        )}

        <button type="submit" disabled={uploading}>
          {uploading ? 'అప్‌లోడ్ అవుతోంది…' : 'లోగోను జోడించండి'}
        </button>
      </form>

      {msg && <p style={{color:'green'}}>{msg}</p>}
      {err && <p style={{color:'crimson'}}>{err}</p>}
    </div>
  );
}

export default AddLogoPage;
