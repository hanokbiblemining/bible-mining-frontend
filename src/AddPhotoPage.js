// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AddPhotoPage.css';

// function AddPhotoPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [photoFile, setPhotoFile] = useState(null);
//   const [category, setCategory] = useState('');
//   const [newCategory, setNewCategory] = useState('');
//   const [message, setMessage] = useState('');
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://bible-mining-backend-jxj5.onrender.com/api/gallery');
//         setCategories(['All', ...new Set(response.data.categories)]);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const categoryToUse = category === 'new' ? newCategory : category;

//     if (!categoryToUse) {
//       setMessage('దయచేసి వర్గాన్ని ఎంచుకోండి లేదా జోడించండి.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('category', categoryToUse);
//     formData.append('photo', photoFile);

//     try {
//       await axios.post('https://bible-mining-backend-jxj5.onrender.com/api/gallery', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage('ఫోటో విజయవంతంగా జోడించబడింది!');
//       setTitle('');
//       setDescription('');
//       setPhotoFile(null);
//       setCategory('');
//       setNewCategory('');
//       document.getElementById('photo-input').value = '';
//       const response = await axios.get('https://bible-mining-backend-jxj5.onrender.com/api/gallery');
//       setCategories(['All', ...new Set(response.data.categories)]);
//     } catch (error) {
//       setMessage('ఫోటోను జోడించడంలో లోపం సంభవించింది.');
//       console.error('Error adding photo:', error);
//     }
//   };

//   return (
//     <div className="add-photo-container">
//       <h2>కొత్త ఫోటోను జోడించండి</h2>
//       <p className="add-photo-description">
//         మీ కంప్యూటర్ నుండి ఒక ఫోటోను అప్‌లోడ్ చేయండి.
//       </p>

//       <form className="add-photo-form" onSubmit={handleSubmit}>
//         <label htmlFor="title">టైటిల్</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
        
//         <label htmlFor="category-select">వర్గం</label>
//         <select 
//           id="category-select" 
//           value={category} 
//           onChange={(e) => setCategory(e.target.value)} 
//           required
//         >
//           <option value="">వర్గాన్ని ఎంచుకోండి</option>
//           {categories.map((c, index) => (
//             <option key={index} value={c}>{c}</option>
//           ))}
//           <option value="new">కొత్త వర్గాన్ని జోడించండి</option>
//         </select>
        
//         {category === 'new' && (
//           <input
//             type="text"
//             placeholder="కొత్త వర్గం పేరును టైప్ చేయండి"
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//             required
//           />
//         )}
        
//         <label htmlFor="description">వివరణ</label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           rows="5"
//           required
//         />

//         <label htmlFor="photo-input">ఫోటో ఫైల్‌ను ఎంచుకోండి</label>
//         <input
//           type="file"
//           id="photo-input"
//           accept="image/*"
//           onChange={(e) => setPhotoFile(e.target.files[0])}
//           required
//         />
        
//         <button type="submit">ఫోటోను జోడించండి</button>
//       </form>
//       {message && <p className="status-message">{message}</p>}
//     </div>
//   );
// }

// export default AddPhotoPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AddPhotoPage.css';
// import { API_BASE, withBase } from './api';

// function AddPhotoPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [photoFile, setPhotoFile] = useState(null);
//   const [category, setCategory] = useState('');
//   const [newCategory, setNewCategory] = useState('');
//   const [message, setMessage] = useState('');
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`\${API_BASE}/api/gallery`);
//         setCategories(['All', ...new Set(response.data.categories)]);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const categoryToUse = category === 'new' ? newCategory : category;

//     if (!categoryToUse) {
//       setMessage('దయచేసి వర్గాన్ని ఎంచుకోండి లేదా జోడించండి.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('category', categoryToUse);
//     formData.append('photo', photoFile);

//     try {
//       await axios.post(`\${API_BASE}/api/gallery`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage('ఫోటో విజయవంతంగా జోడించబడింది!');
//       setTitle('');
//       setDescription('');
//       setPhotoFile(null);
//       setCategory('');
//       setNewCategory('');
//       document.getElementById('photo-input').value = '';
//       const response = await axios.get(`\${API_BASE}/api/gallery`);
//       setCategories(['All', ...new Set(response.data.categories)]);
//     } catch (error) {
//       setMessage('ఫోటోను జోడించడంలో లోపం సంభవించింది.');
//       console.error('Error adding photo:', error);
//     }
//   };

//   return (
//     <div className="add-photo-container">
//       <h2>కొత్త ఫోటోను జోడించండి</h2>
//       <p className="add-photo-description">
//         మీ కంప్యూటర్ నుండి ఒక ఫోటోను అప్‌లోడ్ చేయండి.
//       </p>

//       <form className="add-photo-form" onSubmit={handleSubmit}>
//         <label htmlFor="title">టైటిల్</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
        
//         <label htmlFor="category-select">వర్గం</label>
//         <select 
//           id="category-select" 
//           value={category} 
//           onChange={(e) => setCategory(e.target.value)} 
//           required
//         >
//           <option value="">వర్గాన్ని ఎంచుకోండి</option>
//           {categories.map((c, index) => (
//             <option key={index} value={c}>{c}</option>
//           ))}
//           <option value="new">కొత్త వర్గాన్ని జోడించండి</option>
//         </select>
        
//         {category === 'new' && (
//           <input
//             type="text"
//             placeholder="కొత్త వర్గం పేరును టైప్ చేయండి"
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//             required
//           />
//         )}
        
//         <label htmlFor="description">వివరణ</label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           rows="5"
//           required
//         />

//         <label htmlFor="photo-input">ఫోటో ఫైల్‌ను ఎంచుకోండి</label>
//         <input
//           type="file"
//           id="photo-input"
//           accept="image/*"
//           onChange={(e) => setPhotoFile(e.target.files[0])}
//           required
//         />
        
//         <button type="submit">ఫోటోను జోడించండి</button>
//       </form>
//       {message && <p className="status-message">{message}</p>}
//     </div>
//   );
// }

// export default AddPhotoPage;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AddPhotoPage.css';

/* ================== [PATCH] API base ================== */
const API_BASE =
  process.env.REACT_APP_API_BASE ||
  'https://bible-mining-backend-jxj5.onrender.com';
/* ====================================================== */

function AddPhotoPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [message, setMessage] = useState('');

  const [categories, setCategories] = useState([]);

  /* [PATCH] better UX */
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  /* ================== [PATCH] load categories safely ================== */
  const loadCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/gallery`);
      // backend GET /api/gallery -> items array (not {categories: ...})
      const items = Array.isArray(res.data)
        ? res.data
        : (res.data?.items || []); // fallback if shape differs
      const cats = Array.from(new Set(items.map(i => i?.category))).filter(Boolean);
      setCategories(cats);
    } catch (err) {
      console.error('Error fetching gallery categories:', err);
      // silent fail; admin form will still allow "new" category
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);
  /* ==================================================================== */

  /* ================== [PATCH] validate image file ================== */
  const handleFileChange = (e) => {
    setError('');
    const f = e.target.files?.[0];
    if (!f) { setPhotoFile(null); return; }

    const okMime = f.type.startsWith('image/');
    const name = (f.name || '').toLowerCase();
    const okExt = name.endsWith('.jpg') || name.endsWith('.jpeg')
               || name.endsWith('.png') || name.endsWith('.webp')
               || name.endsWith('.gif');
    if (!okMime && !okExt) {
      setPhotoFile(null);
      return setError('దయచేసి JPG/PNG/WEBP/GIF ఫోటో ఫైల్ ఎంచుకోండి.');
    }
    if (f.size > 10 * 1024 * 1024) { // 10 MB
      setPhotoFile(null);
      return setError('ఫైల్ పరిమాణం 10MB కన్నా తక్కువగా ఉండాలి.');
    }
    setPhotoFile(f);
  };
  /* ================================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const categoryToUse = category === 'new' ? newCategory.trim() : category.trim();

    if (!title.trim() || !description.trim()) {
      return setError('టైటిల్ మరియు వివరణ తప్పనిసరి.');
    }
    if (!categoryToUse) {
      return setError('దయచేసి వర్గాన్ని ఎంచుకోండి లేదా జోడించండి.');
    }
    if (!photoFile) {
      return setError('ఫోటో ఫైల్‌ను ఎంచుకోండి.');
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('category', categoryToUse);
    formData.append('image', photoFile); // [PATCH] backend expects 'image' (we also accept photo/file, but keep it clean)

    try {
      setUploading(true);
      setProgress(0);

      await axios.post(`${API_BASE}/api/gallery`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        // [PATCH] progress %
        onUploadProgress: (pe) => {
          if (!pe.total) return;
          const pct = Math.round((pe.loaded * 100) / pe.total);
          setProgress(pct);
        },
      });

      setMessage('ఫోటో విజయవంతంగా జోడించబడింది!');
      // reset
      setTitle('');
      setDescription('');
      setPhotoFile(null);
      setCategory('');
      setNewCategory('');
      if (fileInputRef.current) fileInputRef.current.value = '';

      // refresh categories (if new category added)
      await loadCategories();
    } catch (err) {
      console.error('Error adding photo:', err);
      setMessage('');
      setError(err?.response?.data?.message || 'ఫోటోను జోడించడంలో లోపం సంభవించింది.');
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 700);
    }
  };

  return (
    <div className="add-photo-container">
      <h2>కొత్త ఫోటోను జోడించండి</h2>
      <p className="add-photo-description">
        మీ కంప్యూటర్ నుండి ఒక ఫోటోను అప్‌లోడ్ చేయండి.
      </p>

      <form className="add-photo-form" onSubmit={handleSubmit}>
        <label htmlFor="title">టైటిల్</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="category-select">వర్గం</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">వర్గాన్ని ఎంచుకోండి</option>
          {categories.map((c, index) => (
            <option key={index} value={c}>{c}</option>
          ))}
          <option value="new">కొత్త వర్గాన్ని జోడించండి</option>
        </select>

        {category === 'new' && (
          <input
            type="text"
            placeholder="కొత్త వర్గం పేరును టైప్ చేయండి"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />
        )}

        <label htmlFor="description">వివరణ</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
          required
        />

        <label htmlFor="photo-input">ఫోటో ఫైల్‌ను ఎంచుకోండి</label>
        <input
          type="file"
          id="photo-input"
          accept="image/*"
          onChange={handleFileChange}       /* [PATCH] validation */
          ref={fileInputRef}                /* [PATCH] reset via ref */
          required
        />

        {/* ============ [PATCH] progress bar UI ============ */}
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
        {/* ================================================ */}

        <button type="submit" disabled={uploading}>
          {uploading ? 'అప్‌లోడ్ అవుతోంది…' : 'ఫోటోను జోడించండి'}
        </button>
      </form>

      {message && <p className="status-message" style={{ color: 'green' }}>{message}</p>}
      {error &&   <p className="status-message" style={{ color: 'crimson' }}>{error}</p>}
    </div>
  );
}

export default AddPhotoPage;
