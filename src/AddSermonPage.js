// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AddSermonPage.css';

// function AddSermonPage() {
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [newAuthor, setNewAuthor] = useState('');
//   const [category, setCategory] = useState('');
//   const [newCategory, setNewCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [pdfFile, setPdfFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [authors, setAuthors] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://bible-mining-backend-jxj5.onrender.com/api/sermons');
//         const uniqueAuthors = ['All', ...new Set(response.data.sermons.map(sermon => sermon.author))];
//         const uniqueCategories = ['All', ...new Set(response.data.sermons.map(sermon => sermon.category))];
//         setAuthors(uniqueAuthors);
//         setCategories(uniqueCategories);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const authorToUse = author === 'new' ? newAuthor : author;
//     const categoryToUse = category === 'new' ? newCategory : category;

//     if (!authorToUse || !categoryToUse) {
//       setMessage('దయచేసి రచయిత పేరు మరియు వర్గాన్ని ఎంచుకోండి లేదా జోడించండి.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('author', authorToUse);
//     formData.append('category', categoryToUse);
//     formData.append('description', description);
//     formData.append('pdf', pdfFile);

//     try {
//       await axios.post('https://bible-mining-backend-jxj5.onrender.com/api/sermons', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage('ప్రసంగం విజయవంతంగా జోడించబడింది!');
//       setTitle('');
//       setAuthor('');
//       setNewAuthor('');
//       setCategory('');
//       setNewCategory('');
//       setDescription('');
//       setPdfFile(null);
//       document.getElementById('pdf-input').value = '';
//       const response = await axios.get('https://bible-mining-backend-jxj5.onrender.com/api/sermons');
//       const uniqueAuthors = ['All', ...new Set(response.data.sermons.map(sermon => sermon.author))];
//       const uniqueCategories = ['All', ...new Set(response.data.sermons.map(sermon => sermon.category))];
//       setAuthors(uniqueAuthors);
//       setCategories(uniqueCategories);
//     } catch (error) {
//       setMessage('ప్రసంగాన్ని జోడించడంలో లోపం సంభవించింది.');
//       console.error('Error adding sermon:', error);
//     }
//   };

//   return (
//     <div className="add-sermon-container">
//       <h2>కొత్త ప్రసంగాన్ని జోడించండి</h2>
//       <p className="add-sermon-description">
//         మీ కంప్యూటర్ నుండి ప్రసంగాన్ని అప్‌లోడ్ చేయండి.
//       </p>

//       <form className="add-sermon-form" onSubmit={handleSubmit}>
//         <label htmlFor="title">ప్రసంగం పేరు</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
        
//         <label htmlFor="author-select">రచయిత పేరు</label>
//         <select 
//           id="author-select" 
//           value={author} 
//           onChange={(e) => setAuthor(e.target.value)} 
//           required
//         >
//           <option value="">రచయితను ఎంచుకోండి</option>
//           {authors.map((a, index) => (
//             <option key={index} value={a}>{a}</option>
//           ))}
//           <option value="new">కొత్త రచయితను జోడించండి</option>
//         </select>
        
//         {author === 'new' && (
//           <input
//             type="text"
//             placeholder="కొత్త రచయిత పేరును టైప్ చేయండి"
//             value={newAuthor}
//             onChange={(e) => setNewAuthor(e.target.value)}
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
        
//         <label htmlFor="description">వివరణ</label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           rows="5"
//           required
//         />

//         <label htmlFor="pdf-input">PDF ఫైల్‌ను ఎంచుకోండి</label>
//         <input
//           type="file"
//           id="pdf-input"
//           accept="application/pdf"
//           onChange={(e) => setPdfFile(e.target.files[0])}
//           required
//         />
        
//         <button type="submit">ప్రసంగాన్ని జోడించండి</button>
//       </form>
//       {message && <p className="status-message">{message}</p>}
//     </div>
//   );
// }

// export default AddSermonPage;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './AddSermonPage.css';
// // import { API_BASE } from './api';

// // function AddSermonPage() {
// //   const [title, setTitle] = useState('');
// //   const [author, setAuthor] = useState('');
// //   const [newAuthor, setNewAuthor] = useState('');
// //   const [category, setCategory] = useState('');
// //   const [newCategory, setNewCategory] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [pdfFile, setPdfFile] = useState(null);
// //   const [message, setMessage] = useState('');
// //   const [authors, setAuthors] = useState([]);
// //   const [categories, setCategories] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await axios.get(`${API_BASE}/api/sermons`);
// //         const uniqueAuthors = ['All', ...new Set(response.data.sermons.map(sermon => sermon.author))];
// //         const uniqueCategories = ['All', ...new Set(response.data.sermons.map(sermon => sermon.category))];
// //         setAuthors(uniqueAuthors);
// //         setCategories(uniqueCategories);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const authorToUse = author === 'new' ? newAuthor : author;
// //     const categoryToUse = category === 'new' ? newCategory : category;

// //     if (!authorToUse || !categoryToUse) {
// //       setMessage('దయచేసి రచయిత పేరు మరియు వర్గాన్ని ఎంచుకోండి లేదా జోడించండి.');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('title', title);
// //     formData.append('author', authorToUse);
// //     formData.append('category', categoryToUse);
// //     formData.append('description', description);
// //     formData.append('pdf', pdfFile);

// //     try {
// //       await axios.post(`${API_BASE}/api/sermons`, formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });
// //       setMessage('ప్రసంగం విజయవంతంగా జోడించబడింది!');
// //       setTitle('');
// //       setAuthor('');
// //       setNewAuthor('');
// //       setCategory('');
// //       setNewCategory('');
// //       setDescription('');
// //       setPdfFile(null);
// //       document.getElementById('pdf-input').value = '';
// //       const response = await axios.get(`${API_BASE}/api/sermons`);
// //       const uniqueAuthors = ['All', ...new Set(response.data.sermons.map(sermon => sermon.author))];
// //       const uniqueCategories = ['All', ...new Set(response.data.sermons.map(sermon => sermon.category))];
// //       setAuthors(uniqueAuthors);
// //       setCategories(uniqueCategories);
// //     } catch (error) {
// //       setMessage('ప్రసంగాన్ని జోడించడంలో లోపం సంభవించింది.');
// //       console.error('Error adding sermon:', error);
// //     }
// //   };

// //   return (
// //     <div className="add-sermon-container">
// //       <h2>కొత్త ప్రసంగాన్ని జోడించండి</h2>
// //       <p className="add-sermon-description">
// //         మీ కంప్యూటర్ నుండి ప్రసంగాన్ని అప్‌లోడ్ చేయండి.
// //       </p>

// //       <form className="add-sermon-form" onSubmit={handleSubmit}>
// //         <label htmlFor="title">ప్రసంగం పేరు</label>
// //         <input
// //           type="text"
// //           id="title"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //           required
// //         />
        
// //         <label htmlFor="author-select">రచయిత పేరు</label>
// //         <select 
// //           id="author-select" 
// //           value={author} 
// //           onChange={(e) => setAuthor(e.target.value)} 
// //           required
// //         >
// //           <option value="">రచయితను ఎంచుకోండి</option>
// //           {authors.map((a, index) => (
// //             <option key={index} value={a}>{a}</option>
// //           ))}
// //           <option value="new">కొత్త రచయితను జోడించండి</option>
// //         </select>
        
// //         {author === 'new' && (
// //           <input
// //             type="text"
// //             placeholder="కొత్త రచయిత పేరును టైప్ చేయండి"
// //             value={newAuthor}
// //             onChange={(e) => setNewAuthor(e.target.value)}
// //             required
// //           />
// //         )}

// //         <label htmlFor="category-select">వర్గం</label>
// //         <select 
// //           id="category-select" 
// //           value={category} 
// //           onChange={(e) => setCategory(e.target.value)} 
// //           required
// //         >
// //           <option value="">వర్గాన్ని ఎంచుకోండి</option>
// //           {categories.map((c, index) => (
// //             <option key={index} value={c}>{c}</option>
// //           ))}
// //           <option value="new">కొత్త వర్గాన్ని జోడించండి</option>
// //         </select>
        
// //         {category === 'new' && (
// //           <input
// //             type="text"
// //             placeholder="కొత్త వర్గం పేరును టైప్ చేయండి"
// //             value={newCategory}
// //             onChange={(e) => setNewCategory(e.target.value)}
// //             required
// //           />
// //         )}
        
// //         <label htmlFor="description">వివరణ</label>
// //         <textarea
// //           id="description"
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //           rows="5"
// //           required
// //         />

// //         <label htmlFor="pdf-input">PDF ఫైల్‌ను ఎంచుకోండి</label>
// //         <input
// //           type="file"
// //           id="pdf-input"
// //           accept="application/pdf"
// //           onChange={(e) => setPdfFile(e.target.files[0])}
// //           required
// //         />
        
// //         <button type="submit">ప్రసంగాన్ని జోడించండి</button>
// //       </form>
// //       {message && <p className="status-message">{message}</p>}
// //     </div>
// //   );
// // }

// // export default AddSermonPage;

// frontend/src/AddSermonPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddSermonPage.css';

const API_BASE =
  process.env.REACT_APP_API_BASE || 'https://bible-mining-backend-jxj5.onrender.com';

function AddSermonPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [message, setMessage] = useState('');
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/sermons`);
        const uniqueAuthors = ['All', ...new Set((data?.sermons || []).map((s) => s.author))];
        const uniqueCategories = ['All', ...new Set((data?.sermons || []).map((s) => s.category))];
        setAuthors(uniqueAuthors);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const authorToUse = author === 'new' ? newAuthor : author;
    const categoryToUse = category === 'new' ? newCategory : category;

    if (!authorToUse || !categoryToUse) {
      setMessage('దయచేసి రచయిత పేరు మరియు వర్గాన్ని ఎంచుకోండి లేదా జోడించండి.');
      return;
    }
    if (!pdfFile) {
      setMessage('దయచేసి PDF ఫైల్ ఎంచుకోండి.');
      return;
    }
    if (pdfFile.size > 50 * 1024 * 1024) {
      setMessage('PDF 50MB కంటే చిన్నదిగా ఉండాలి.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', authorToUse);
    formData.append('category', categoryToUse);
    formData.append('description', description);
    formData.append('pdf', pdfFile);

    try {
      await axios.post(`${API_BASE}/api/sermons`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('ప్రసంగం విజయవంతంగా జోడించబడింది!');
      setTitle('');
      setAuthor('');
      setNewAuthor('');
      setCategory('');
      setNewCategory('');
      setDescription('');
      setPdfFile(null);
      const input = document.getElementById('pdf-input');
      if (input) input.value = '';

      const { data } = await axios.get(`${API_BASE}/api/sermons`);
      const uniqueAuthors = ['All', ...new Set((data?.sermons || []).map((s) => s.author))];
      const uniqueCategories = ['All', ...new Set((data?.sermons || []).map((s) => s.category))];
      setAuthors(uniqueAuthors);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error adding sermon:', error);
      setMessage('ప్రసంగాన్ని జోడించడంలో లోపం సంభవించింది.');
    }
  };

  return (
    <div className="add-sermon-container">
      <h2>కొత్త ప్రసంగాన్ని జోడించండి</h2>
      <p className="add-sermon-description">మీ కంప్యూటర్ నుండి ప్రసంగాన్ని అప్‌లోడ్ చేయండి.</p>

      <form className="add-sermon-form" onSubmit={handleSubmit}>
        <label htmlFor="title">ప్రసంగం పేరు</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label htmlFor="author-select">రచయిత పేరు</label>
        <select
          id="author-select"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        >
          <option value="">రచయితను ఎంచుకోండి</option>
          {authors.map((a, idx) => (
            <option key={idx} value={a}>{a}</option>
          ))}
          <option value="new">కొత్త రచయితను జోడించండి</option>
        </select>

        {author === 'new' && (
          <input
            type="text"
            placeholder="కొత్త రచయిత పేరును టైప్ చేయండి"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
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
          {categories.map((c, idx) => (
            <option key={idx} value={c}>{c}</option>
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

        <label htmlFor="pdf-input">PDF ఫైల్‌ను ఎంచుకోండి</label>
        <input
          type="file"
          id="pdf-input"
          accept=".pdf,application/pdf"
          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          required
        />

        <button type="submit">ప్రసంగాన్ని జోడించండి</button>
      </form>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default AddSermonPage;
