// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AddSongPage.css';

// function AddSongPage() {
//   const [title, setTitle] = useState('');
//   const [lyrics, setLyrics] = useState('');
//   const [audioFile, setAudioFile] = useState(null);
//   const [singer, setSinger] = useState('');
//   const [newSinger, setNewSinger] = useState('');
//   const [category, setCategory] = useState('');
//   const [newCategory, setNewCategory] = useState('');
//   const [order, setOrder] = useState('');
//   const [singers, setSingers] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://bible-mining-backend-jxj5.onrender.com/api/songs');
//         const uniqueSingers = ['All', ...new Set(response.data.songs.map(song => song.singer))];
//         const uniqueCategories = ['All', ...new Set(response.data.songs.map(song => song.category))];
//         setSingers(uniqueSingers);
//         setCategories(uniqueCategories);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const singerToUse = singer === 'new' ? newSinger : singer;
//     const categoryToUse = category === 'new' ? newCategory : category;

//     if (!singerToUse || !categoryToUse) {
//       setMessage('దయచేసి రచయిత పేరు మరియు వర్గాన్ని ఎంచుకోండి లేదా జోడించండి.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('lyrics', lyrics);
//     formData.append('singer', singerToUse);
//     formData.append('category', categoryToUse);
//     formData.append('order', order);
//     formData.append('audio', audioFile);

//     try {
//       await axios.post('https://bible-mining-backend-jxj5.onrender.com/api/songs', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage('పాట విజయవంతంగా జోడించబడింది!');
//       setTitle('');
//       setLyrics('');
//       setAudioFile(null);
//       setSinger('');
//       setNewSinger('');
//       setCategory('');
//       setNewCategory('');
//       setOrder('');
//       document.getElementById('audio-input').value = '';
//       const response = await axios.get('https://bible-mining-backend-jxj5.onrender.com/api/songs');
//       const uniqueSingers = ['All', ...new Set(response.data.songs.map(song => song.singer))];
//       const uniqueCategories = ['All', ...new Set(response.data.songs.map(song => song.category))];
//       setSingers(uniqueSingers);
//       setCategories(uniqueCategories);
//     } catch (error) {
//       setMessage('పాటను జోడించడంలో లోపం సంభవించింది.');
//       console.error('Error adding song:', error);
//     }
//   };

//   return (
//     <div className="add-song-container">
//       <h2>కొత్త పాటను జోడించండి</h2>
//       <p className="add-song-description">
//         మీ కంప్యూటర్ నుండి పాటను అప్‌లోడ్ చేయండి.
//       </p>

//       <form className="add-song-form" onSubmit={handleSubmit}>
//         <label htmlFor="title">పాట పేరు</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
        
//         <label htmlFor="order">క్రమ సంఖ్య (Order Number)</label>
//         <input
//           type="number"
//           id="order"
//           value={order}
//           onChange={(e) => setOrder(e.target.value)}
//           required
//         />

//         <label htmlFor="singer-select">రచయిత పేరు</label>
//         <select 
//           id="singer-select" 
//           value={singer} 
//           onChange={(e) => setSinger(e.target.value)} 
//           required
//         >
//           <option value="">రచయితను ఎంచుకోండి</option>
//           {singers.map((s, index) => (
//             <option key={index} value={s}>{s}</option>
//           ))}
//           <option value="new">కొత్త రచయితను జోడించండి</option>
//         </select>
        
//         {singer === 'new' && (
//           <input
//             type="text"
//             placeholder="కొత్త రచయిత పేరును టైప్ చేయండి"
//             value={newSinger}
//             onChange={(e) => setNewSinger(e.target.value)}
//             required
//           />
//         )}

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

//         <label htmlFor="audio-input">ఆడియో ఫైల్‌ను ఎంచుకోండి</label>
//         <input
//           type="file"
//           id="audio-input"
//           accept="audio/*"
//           onChange={(e) => setAudioFile(e.target.files[0])}
//           required
//         />

//         <label htmlFor="lyrics">పాట లిరిక్స్</label>
//         <textarea
//           id="lyrics"
//           value={lyrics}
//           onChange={(e) => setLyrics(e.target.value)}
//           rows="10"
//           required
//         />
        
//         <button type="submit">పాటను జోడించండి</button>
//       </form>
//       {message && <p className="status-message">{message}</p>}
//     </div>
//   );
// }

// export default AddSongPage;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AddSongPage.css';

/* ===================== [PATCH] API base ===================== */
/* Netlify env (REACT_APP_API_BASE) ఉంటే దాన్నే వాడుతుంది; లేదంటే Render URL. */
const API_BASE =
  process.env.REACT_APP_API_BASE ||
  'https://bible-mining-backend-jxj5.onrender.com';
/* ============================================================ */

function AddSongPage() {
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [singer, setSinger] = useState('');
  const [newSinger, setNewSinger] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [order, setOrder] = useState('');

  const [singers, setSingers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');                  // [PATCH] better error
  const [uploading, setUploading] = useState(false);      // [PATCH] progress state
  const [progress, setProgress] = useState(0);            // [PATCH] %

  const fileInputRef = useRef(null);                      // [PATCH] reset file input

  useEffect(() => {
    const fetchData = async () => {
      try {
        /* ---------------- [PATCH] use API_BASE ---------------- */
        const response = await axios.get(`${API_BASE}/api/songs`);
        /* "All" ని dropdowns లో చూపించదాం అనుకోకపోతే filter చెయ్యాలి */
        const uniqueSingers = ['All', ...new Set(response.data.songs.map(song => song.singer))]
          .filter(Boolean);
        const uniqueCategories = ['All', ...new Set(response.data.songs.map(song => song.category))]
          .filter(Boolean);
        setSingers(uniqueSingers);
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('డేటా లోడ్‌లో లోపం జరిగింది.');
      }
    };
    fetchData();
  }, []);

  /* ===================== [PATCH] file validation ===================== */
  const handleFileChange = (e) => {
    setError('');
    const f = e.target.files?.[0];
    if (!f) { setAudioFile(null); return; }
    const name = f.name.toLowerCase();
    const okType = name.endsWith('.mp3') || name.endsWith('.wav') || f.type.startsWith('audio/');
    if (!okType) {
      setAudioFile(null);
      return setError('దయచేసి MP3/WAV ఆడియో ఫైల్ ఎంచుకోండి.');
    }
    if (f.size > 20 * 1024 * 1024) {
      setAudioFile(null);
      return setError('ఫైల్ పరిమాణం 20MB కన్నా తక్కువగా ఉండాలి.');
    }
    setAudioFile(f);
  };
  /* =================================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const singerToUse = singer === 'new' ? newSinger.trim() : singer.trim();
    const categoryToUse = category === 'new' ? newCategory.trim() : category.trim();

    if (!singerToUse || !categoryToUse) {
      setMessage('దయచేసి రచయిత పేరు మరియు వర్గాన్ని ఎంచుకోండి లేదా జోడించండి.');
      return;
    }
    if (!title.trim() || !lyrics.trim() || !order) {
      setError('పాట పేరు, లిరిక్స్, ఆర్డర్ తప్పనిసరి.');
      return;
    }
    if (!audioFile) {
      setError('ఆడియో ఫైల్‌ను ఎంచుకోండి (MP3/WAV).');
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('lyrics', lyrics);
    formData.append('singer', singerToUse);
    formData.append('category', categoryToUse);
    formData.append('order', order);
    formData.append('audio', audioFile); // [PATCH] backend expects 'audio'

    try {
      setUploading(true);
      setProgress(0);

      /* ============ [PATCH] show upload progress in UI ============ */
      await axios.post(`${API_BASE}/api/songs`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (pe) => {
          if (!pe.total) return;
          const pct = Math.round((pe.loaded * 100) / pe.total);
          setProgress(pct);
        },
      });
      /* ============================================================ */

      setMessage('పాట విజయవంతంగా జోడించబడింది!');
      setTitle('');
      setLyrics('');
      setAudioFile(null);
      setSinger('');
      setNewSinger('');
      setCategory('');
      setNewCategory('');
      setOrder('');
      if (fileInputRef.current) fileInputRef.current.value = '';

      // refresh dropdowns (optional)
      const response = await axios.get(`${API_BASE}/api/songs`);
      const uniqueSingers = ['All', ...new Set(response.data.songs.map(song => song.singer))].filter(Boolean);
      const uniqueCategories = ['All', ...new Set(response.data.songs.map(song => song.category))].filter(Boolean);
      setSingers(uniqueSingers);
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error adding song:', err);
      setMessage('');
      setError(err?.response?.data?.message || 'పాటను జోడించడంలో లోపం సంభవించింది.');
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 700);
    }
  };

  return (
    <div className="add-song-container">
      <h2>కొత్త పాటను జోడించండి</h2>
      <p className="add-song-description">
        మీ కంప్యూటర్ నుండి పాటను అప్‌లోడ్ చేయండి.
      </p>

      <form className="add-song-form" onSubmit={handleSubmit}>
        <label htmlFor="title">పాట పేరు</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <label htmlFor="order">క్రమ సంఖ్య (Order Number)</label>
        <input
          type="number"
          id="order"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          required
        />

        <label htmlFor="singer-select">రచయిత పేరు</label>
        <select 
          id="singer-select" 
          value={singer} 
          onChange={(e) => setSinger(e.target.value)} 
          required
        >
          <option value="">రచయితను ఎంచుకోండి</option>
          {singers.map((s, index) => (
            <option key={index} value={s}>{s}</option>
          ))}
          <option value="new">కొత్త రచయితను జోడించండి</option>
        </select>
        
        {singer === 'new' && (
          <input
            type="text"
            placeholder="కొత్త రచయిత పేరును టైప్ చేయండి"
            value={newSinger}
            onChange={(e) => setNewSinger(e.target.value)}
            required
          />
        )}

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

        <label htmlFor="audio-input">ఆడియో ఫైల్‌ను ఎంచుకోండి</label>
        <input
          type="file"
          id="audio-input"
          accept=".mp3,.wav,audio/*"     /* [PATCH] explicit types */
          onChange={handleFileChange}    /* [PATCH] validation */
          ref={fileInputRef}             /* [PATCH] reset via ref */
          required
        />

        <label htmlFor="lyrics">పాట లిరిక్స్</label>
        <textarea
          id="lyrics"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          rows="10"
          required
        />

        {/* ============== [PATCH] progress bar UI ============== */}
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
        {/* ===================================================== */}

        <button type="submit" disabled={uploading}>
          {uploading ? 'అప్‌లోడ్ అవుతోంది…' : 'పాటను జోడించండి'}
        </button>
      </form>

      {message && <p className="status-message" style={{ color: 'green' }}>{message}</p>}
      {error &&   <p className="status-message" style={{ color: 'crimson' }}>{error}</p>}
    </div>
  );
}

export default AddSongPage;
