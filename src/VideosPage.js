import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './VideosPage.css';

function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [selectedAlphabet, setSelectedAlphabet] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  // YouTube URL నుండి వీడియో ID ను సంగ్రహించే ఫంక్షన్
  const extractVideoId = (url) => {
    let videoId = '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^&\n?#]+)/);
    if (match && match[1]) {
      videoId = match[1];
    }
    return videoId;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://bible-mining-backend-jxj5.onrender.com/api/videos');
        setVideos(response.data.videos);
        setAuthors(['All', ...new Set(response.data.authors)]);
        setCategories(['All', ...new Set(response.data.categories)]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("వీడియోలను లోడ్ చేయడంలో లోపం సంభవించింది.");
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const filteredVideos = videos.filter(video =>
    (selectedCategory === 'All' || video.category === selectedCategory) &&
    (selectedAuthor === 'All' || video.author === selectedAuthor) &&
    (selectedAlphabet === '' || video.title.toLowerCase().startsWith(selectedAlphabet.toLowerCase())) &&
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedAuthor('All');
    setSelectedAlphabet('');
    setSearchTerm('');
  };

  if (loading) {
    return <div className="videos-container">లోడ్ అవుతోంది...</div>;
  }

  if (error) {
    return <div className="videos-container error-message">{error}</div>;
  }

  return (
    <div className="main-layout">
      <Sidebar 
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        onSelectAuthor={setSelectedAuthor}
        selectedAuthor={selectedAuthor}
        onSelectAlphabet={setSelectedAlphabet}
        selectedAlphabet={selectedAlphabet}
        categories={categories}
        authors={authors}
      />
      
      <div className="songs-content">
        <h2>నా YouTube వీడియోలు</h2>
        <p className="page-description">
          ఇక్కడ మీరు మా YouTube వీడియోలను చూడవచ్చు.
        </p>
        
        <div className="controls-container">
          <input
            type="text"
            placeholder="వీడియో కోసం వెతకండి..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="reset-btn" onClick={handleResetFilters}>
            ఫిల్టర్‌లను రీసెట్ చేయండి
          </button>
        </div>
        
        <div className="video-grid">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <div key={video._id} className="video-card">
                <a href={video.youtube_url} target="_blank" rel="noopener noreferrer">
                  <img src={`https://img.youtube.com/vi/${extractVideoId(video.youtube_url)}/hqdefault.jpg`} alt={video.title} className="video-thumbnail" />
                </a>
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p className="video-author">బోధకుడు: {video.author}</p>
                  <p>{video.description}</p>
                  <a href={video.youtube_url} target="_blank" rel="noopener noreferrer" className="watch-btn">
                    వీడియో చూడండి
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="no-videos-found">ఎటువంటి వీడియోలు దొరకలేదు.</p>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default VideosPage;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Sidebar from './Sidebar';
// // import './VideosPage.css';
// // import { API_BASE, withBase } from './api';

// // function VideosPage() {
// //   const [videos, setVideos] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedCategory, setSelectedCategory] = useState('All');
// //   const [selectedAuthor, setSelectedAuthor] = useState('All');
// //   const [selectedAlphabet, setSelectedAlphabet] = useState('');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [authors, setAuthors] = useState([]);
// //   const [categories, setCategories] = useState([]);

// //   // YouTube URL నుండి వీడియో ID ను సంగ్రహించే ఫంక్షన్
// //   const extractVideoId = (url) => {
// //     let videoId = '';
// //     const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^&\n?#]+)/);
// //     if (match && match[1]) {
// //       videoId = match[1];
// //     }
// //     return videoId;
// //   };

// //   useEffect(() => {
// //     const fetchVideos = async () => {
// //       try {
// //         const response = await axios.get(`\${API_BASE}/api/videos`);
// //         setVideos(response.data.videos);
// //         setAuthors(['All', ...new Set(response.data.authors)]);
// //         setCategories(['All', ...new Set(response.data.categories)]);
// //         setLoading(false);
// //       } catch (err) {
// //         console.error("Error fetching videos:", err);
// //         setError("వీడియోలను లోడ్ చేయడంలో లోపం సంభవించింది.");
// //         setLoading(false);
// //       }
// //     };
// //     fetchVideos();
// //   }, []);

// //   const filteredVideos = videos.filter(video =>
// //     (selectedCategory === 'All' || video.category === selectedCategory) &&
// //     (selectedAuthor === 'All' || video.author === selectedAuthor) &&
// //     (selectedAlphabet === '' || video.title.toLowerCase().startsWith(selectedAlphabet.toLowerCase())) &&
// //     video.title.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const handleResetFilters = () => {
// //     setSelectedCategory('All');
// //     setSelectedAuthor('All');
// //     setSelectedAlphabet('');
// //     setSearchTerm('');
// //   };

// //   if (loading) {
// //     return <div className="videos-container">లోడ్ అవుతోంది...</div>;
// //   }

// //   if (error) {
// //     return <div className="videos-container error-message">{error}</div>;
// //   }

// //   return (
// //     <div className="main-layout">
// //       <Sidebar 
// //         onSelectCategory={setSelectedCategory}
// //         selectedCategory={selectedCategory}
// //         onSelectAuthor={setSelectedAuthor}
// //         selectedAuthor={selectedAuthor}
// //         onSelectAlphabet={setSelectedAlphabet}
// //         selectedAlphabet={selectedAlphabet}
// //         categories={categories}
// //         authors={authors}
// //       />
      
// //       <div className="songs-content">
// //         <h2>నా YouTube వీడియోలు</h2>
// //         <p className="page-description">
// //           ఇక్కడ మీరు మా YouTube వీడియోలను చూడవచ్చు.
// //         </p>
        
// //         <div className="controls-container">
// //           <input
// //             type="text"
// //             placeholder="వీడియో కోసం వెతకండి..."
// //             className="search-input"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //           <button className="reset-btn" onClick={handleResetFilters}>
// //             ఫిల్టర్‌లను రీసెట్ చేయండి
// //           </button>
// //         </div>
        
// //         <div className="video-grid">
// //           {filteredVideos.length > 0 ? (
// //             filteredVideos.map((video) => (
// //               <div key={video._id} className="video-card">
// //                 <a href={video.youtube_url} target="_blank" rel="noopener noreferrer">
// //                   <img src={`https://img.youtube.com/vi/${extractVideoId(video.youtube_url)}/hqdefault.jpg`} alt={video.title} className="video-thumbnail" />
// //                 </a>
// //                 <div className="video-info">
// //                   <h3>{video.title}</h3>
// //                   <p className="video-author">బోధకుడు: {video.author}</p>
// //                   <p>{video.description}</p>
// //                   <a href={video.youtube_url} target="_blank" rel="noopener noreferrer" className="watch-btn">
// //                     వీడియో చూడండి
// //                   </a>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <p className="no-videos-found">ఎటువంటి వీడియోలు దొరకలేదు.</p>
// //           )}
// //         </div>
// //       </div>
      
// //     </div>
// //   );
// // }

// // export default VideosPage;

// // === PATCH: Videos page wired to Render API, empty-safe ===
// import React, { useState, useEffect } from "react";
// import { API_BASE } from "./api";
// import Sidebar from "./Sidebar";
// import "./VideosPage.css";

// function getYoutubeId(url = "") {
//   try {
//     const u = new URL(url);
//     if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
//     if (u.hostname.includes("youtube.com")) {
//       return u.searchParams.get("v") || "";
//     }
//   } catch {}
//   return "";
// }

// export default function VideosPage() {
//   const [videos, setVideos] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedAuthor, setSelectedAuthor] = useState("All");
//   const [selectedAlphabet, setSelectedAlphabet] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${API_BASE}/api/videos`);
//         if (!res.ok) throw new Error(`GET /api/videos → ${res.status}`);
//         const data = await res.json(); // { videos, authors, categories }
//         setVideos(Array.isArray(data?.videos) ? data.videos : []);
//         setAuthors(Array.isArray(data?.authors) ? data.authors : []);
//         setCategories(Array.isArray(data?.categories) ? data.categories : []);
//       } catch (e) {
//         setError(e.message || "Failed to load videos");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const filtered = videos.filter((v) => {
//     const byCat = selectedCategory === "All" || v.category === selectedCategory;
//     const byAuth = selectedAuthor === "All" || v.author === selectedAuthor;
//     const byAlpha =
//       !selectedAlphabet ||
//       (v.title || "").toLowerCase().startsWith(selectedAlphabet.toLowerCase());
//     const bySearch = (v.title || "").toLowerCase().includes(searchTerm.toLowerCase());
//     return byCat && byAuth && byAlpha && bySearch;
//   });

//   if (loading) return <div className="video-container">లోడ్ అవుతోంది…</div>;
//   if (error)
//     return (
//       <div className="video-container error-message">
//         వీడియోలను లోడ్ చేయడంలో లోపం సంభవించింది: {error}
//       </div>
//     );

//   return (
//     <div className="video-container">
//       <Sidebar />
//       <div className="video-content">
//         <h2>వీడియోలు</h2>

//         <div className="filter-bar">
//           <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//             <option value="All">అన్ని కేటగిరీలు</option>
//             {categories.map((c) => (
//               <option key={c} value={c}>{c}</option>
//             ))}
//           </select>

//           <select value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)}>
//             <option value="All">అన్ని బోధకులు</option>
//             {authors.map((a) => (
//               <option key={a} value={a}>{a}</option>
//             ))}
//           </select>

//           <input
//             placeholder="A-Z filter"
//             value={selectedAlphabet}
//             onChange={(e) => setSelectedAlphabet(e.target.value)}
//           />
//           <input
//             placeholder="Search title"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           <button
//             onClick={() => {
//               setSelectedCategory("All");
//               setSelectedAuthor("All");
//               setSelectedAlphabet("");
//               setSearchTerm("");
//             }}
//           >
//             Reset
//           </button>
//         </div>

//         <div className="video-grid">
//           {filtered.length ? (
//             filtered.map((video) => {
//               const vid = getYoutubeId(video.youtube_url);
//               const thumb = vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : "";
//               return (
//                 <div key={video._id || video.title} className="video-card">
//                   {thumb ? (
//                     <a href={video.youtube_url} target="_blank" rel="noopener noreferrer">
//                       <img src={thumb} alt={video.title} className="video-thumbnail" />
//                     </a>
//                   ) : null}
//                   <div className="video-info">
//                     <h3>{video.title}</h3>
//                     <p className="video-author">బోధకుడు: {video.author}</p>
//                     <p>{video.description}</p>
//                     {video.youtube_url ? (
//                       <a
//                         href={video.youtube_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="watch-btn"
//                       >
//                         Watch
//                       </a>
//                     ) : null}
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div>ఇప్పటివరకు వీడియోలు లేవు.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
