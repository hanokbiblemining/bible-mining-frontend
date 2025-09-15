import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogPage.css';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://bible-mining-backend-jxj5.onrender.com/api/blog');
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("పోస్ట్‌లను లోడ్ చేయడంలో లోపం సంభవించింది.");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="blog-container">లోడ్ అవుతోంది...</div>;
  }

  if (error) {
    return <div className="blog-container error-message">{error}</div>;
  }

  return (
    <div className="blog-container">
      <h2>తాజా అప్‌డేట్‌లు & ఈవెంట్‌లు</h2>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post._id} className="blog-post-card">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-meta">పోస్ట్ చేసినవారు: {post.author} | తేదీ: {new Date(post.createdAt).toLocaleDateString()}</p>
            <p className="post-content">{post.content}</p>
          </div>
        ))
      ) : (
        <p className="no-posts-found">ఇప్పటివరకు ఎటువంటి పోస్ట్‌లు లేవు.</p>
      )}
    </div>
  );
}

export default BlogPage;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './BlogPage.css';
// // import { API_BASE, withBase } from './api';

// // function BlogPage() {
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         const response = await axios.get(`\${API_BASE}/api/blog`);
// //         setPosts(response.data);
// //         setLoading(false);
// //       } catch (err) {
// //         console.error("Error fetching posts:", err);
// //         setError("పోస్ట్‌లను లోడ్ చేయడంలో లోపం సంభవించింది.");
// //         setLoading(false);
// //       }
// //     };
// //     fetchPosts();
// //   }, []);

// //   if (loading) {
// //     return <div className="blog-container">లోడ్ అవుతోంది...</div>;
// //   }

// //   if (error) {
// //     return <div className="blog-container error-message">{error}</div>;
// //   }

// //   return (
// //     <div className="blog-container">
// //       <h2>తాజా అప్‌డేట్‌లు & ఈవెంట్‌లు</h2>
// //       {posts.length > 0 ? (
// //         posts.map(post => (
// //           <div key={post._id} className="blog-post-card">
// //             <h3 className="post-title">{post.title}</h3>
// //             <p className="post-meta">పోస్ట్ చేసినవారు: {post.author} | తేదీ: {new Date(post.createdAt).toLocaleDateString()}</p>
// //             <p className="post-content">{post.content}</p>
// //           </div>
// //         ))
// //       ) : (
// //         <p className="no-posts-found">ఇప్పటివరకు ఎటువంటి పోస్ట్‌లు లేవు.</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default BlogPage;

// // === PATCH: Blog page wired to Render API, empty-safe ===
// import React, { useState, useEffect } from "react";
// import { API_BASE } from "./api";
// import "./BlogPage.css";

// export default function BlogPage() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${API_BASE}/api/blog`);
//         if (!res.ok) throw new Error(`GET /api/blog → ${res.status}`);
//         const data = await res.json(); // expect array
//         setPosts(Array.isArray(data) ? data : []);
//       } catch (e) {
//         setError(e.message || "Failed to load posts");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   if (loading) return <div className="blog-container">లోడ్ అవుతోంది...</div>;
//   if (error) return <div className="blog-container error-message">పోస్ట్‌లను లోడ్ చేయడంలో లోపం సంభవించింది: {error}</div>;

//   return (
//     <div className="blog-container">
//       <h2>తాజా అప్‌డేట్‌లు & ఈవెంట్‌లు</h2>
//       {posts.length > 0 ? (
//         posts.map((post) => (
//           <div key={post._id || post.title} className="blog-post">
//             <h3>{post.title}</h3>
//             <p className="blog-author">రచయిత: {post.author}</p>
//             <p>{post.content}</p>
//           </div>
//         ))
//       ) : (
//         <div>ఇప్పటివరకు పోస్టులు లేవు.</div>
//       )}
//     </div>
//   );
// }
