import React, { useState } from 'react';
import axios from 'axios';
import './AddBlogPage.css';

function AddBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content };

    try {
      await axios.post('https://bible-mining-backend-jxj5.onrender.com/api/blog', newPost);
      setMessage('పోస్ట్ విజయవంతంగా జోడించబడింది!');
      setTitle('');
      setContent('');
    } catch (error) {
      setMessage('పోస్ట్‌ను జోడించడంలో లోపం సంభవించింది.');
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="add-blog-container">
      <h2>కొత్త పోస్ట్‌ను జోడించండి</h2>
      <p className="add-blog-description">
        మీ బ్లాగ్ పోస్ట్‌లు మరియు ఈవెంట్ ఆహ్వానాలను ఇక్కడ జోడించండి.
      </p>

      <form className="add-blog-form" onSubmit={handleSubmit}>
        <label htmlFor="title">టైటిల్</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <label htmlFor="content">విషయం</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          required
        />
        
        <button type="submit">పోస్ట్ చేయండి</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default AddBlogPage;

// import React, { useState } from 'react';
// import axios from 'axios';
// import './AddBlogPage.css';
// import { API_BASE } from './api';

// function AddBlogPage() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newPost = { title, content };

//     try {
//       await axios.post(`${API_BASE}/api/blog`, newPost);
//       setMessage('పోస్ట్ విజయవంతంగా జోడించబడింది!');
//       setTitle('');
//       setContent('');
//     } catch (error) {
//       setMessage('పోస్ట్‌ను జోడించడంలో లోపం సంభవించింది.');
//       console.error('Error adding post:', error);
//     }
//   };

//   return (
//     <div className="add-blog-container">
//       <h2>కొత్త పోస్ట్‌ను జోడించండి</h2>
//       <p className="add-blog-description">
//         మీ బ్లాగ్ పోస్ట్‌లు మరియు ఈవెంట్ ఆహ్వానాలను ఇక్కడ జోడించండి.
//       </p>

//       <form className="add-blog-form" onSubmit={handleSubmit}>
//         <label htmlFor="title">టైటిల్</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
        
//         <label htmlFor="content">విషయం</label>
//         <textarea
//           id="content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           rows="10"
//           required
//         />
        
//         <button type="submit">పోస్ట్ చేయండి</button>
//       </form>
//       {message && <p className="status-message">{message}</p>}
//     </div>
//   );
// }

// export default AddBlogPage;