import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './SongsPage.css';

function SongsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSinger, setSelectedSinger] = useState('All');
  const [selectedAlphabet, setSelectedAlphabet] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSongId, setExpandedSongId] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [singers, setSingers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('https://bible-mining-backend-jxj5.onrender.com/api/songs');
        setSongs(response.data.songs);
        setSingers(['All', ...new Set(response.data.songs.map(song => song.singer))]);
        setCategories(['All', ...new Set(response.data.songs.map(song => song.category))]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching songs:", err);
        setError("పాటలను లోడ్ చేయడంలో లోపం సంభవించింది.");
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const filteredSongs = songs.filter(song =>
    (selectedCategory === 'All' || song.category === selectedCategory) &&
    (selectedSinger === 'All' || song.singer === selectedSinger) &&
    (selectedAlphabet === '' || song.title.toLowerCase().startsWith(selectedAlphabet.toLowerCase())) &&
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLyricsToggle = (id) => {
    setExpandedSongId(expandedSongId === id ? null : id);
  };
  
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSinger('All');
    setSelectedAlphabet('');
    setSearchTerm('');
  };

  if (loading) {
    return <div className="songs-container">లోడ్ అవుతోంది...</div>;
  }

  if (error) {
    return <div className="songs-container error-message">{error}</div>;
  }

  return (
    <div className="main-layout">
      <Sidebar 
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        onSelectSinger={setSelectedSinger}
        selectedSinger={selectedSinger}
        onSelectAlphabet={setSelectedAlphabet}
        selectedAlphabet={selectedAlphabet}
        categories={categories}
        singers={singers}
      />
      
      <div className="songs-content">
        <h2>పాటలు</h2>
        <p className="page-description">
          ఇక్కడ మీరు ఆడియో పాటలు మరియు వాటి లిరిక్స్ చూడవచ్చు.
        </p>
        
        <div className="controls-container">
          <input
            type="text"
            placeholder="పాట కోసం వెతకండి..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="reset-btn" onClick={handleResetFilters}>
            ఫిల్టర్‌లను రీసెట్ చేయండి
          </button>
        </div>
        
        <div className="song-list">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, index) => (
              <div key={song._id} className="song-list-item">
                <div className="song-details-container">
                  <div className="song-info-main">
                    <h3 className="song-title">{index + 1}. {song.title}</h3>
                    <p className="song-author">రచయిత: {song.singer}</p>
                    <button 
                      className="lyrics-toggle-btn" 
                      onClick={() => handleLyricsToggle(song._id)}>
                      {expandedSongId === song._id ? 'లిరిక్స్ మూసివేయి' : 'లిరిక్స్ చూడండి'}
                    </button>
                  </div>
                  {song.audio_url && (
                    <audio controls className="audio-player">
                      <source src={song.audio_url} type="audio/mpeg" />
                      మీ బ్రౌజర్ ఆడియోను సపోర్ట్ చేయడం లేదు.
                    </audio>
                  )}
                </div>
                
                {expandedSongId === song._id && (
                  <div className="song-lyrics">
                    <p>{song.lyrics}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="no-songs-found">ఎటువంటి పాటలు దొరకలేదు.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SongsPage;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Sidebar from './Sidebar';
// // import './SongsPage.css';
// // import { API_BASE } from './api';

// // function SongsPage() {
// //   const [selectedCategory, setSelectedCategory] = useState('All');
// //   const [selectedSinger, setSelectedSinger] = useState('All');
// //   const [selectedAlphabet, setSelectedAlphabet] = useState('');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [expandedSongId, setExpandedSongId] = useState(null);
// //   const [songs, setSongs] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [singers, setSingers] = useState([]);
// //   const [categories, setCategories] = useState([]);

// //   useEffect(() => {
// //     const fetchSongs = async () => {
// //       try {
// //         const response = await axios.get(`${API_BASE}/api/songs`);
// //         setSongs(response.data.songs);
// //         setSingers(['All', ...new Set(response.data.songs.map(song => song.singer))]);
// //         setCategories(['All', ...new Set(response.data.songs.map(song => song.category))]);
// //         setLoading(false);
// //       } catch (err) {
// //         console.error("Error fetching songs:", err);
// //         setError("పాటలను లోడ్ చేయడంలో లోపం సంభవించింది.");
// //         setLoading(false);
// //       }
// //     };
// //     fetchSongs();
// //   }, []);

// //   const filteredSongs = songs.filter(song =>
// //     (selectedCategory === 'All' || song.category === selectedCategory) &&
// //     (selectedSinger === 'All' || song.singer === selectedSinger) &&
// //     (selectedAlphabet === '' || song.title.toLowerCase().startsWith(selectedAlphabet.toLowerCase())) &&
// //     song.title.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const handleLyricsToggle = (id) => {
// //     setExpandedSongId(expandedSongId === id ? null : id);
// //   };
  
// //   const handleResetFilters = () => {
// //     setSelectedCategory('All');
// //     setSelectedSinger('All');
// //     setSelectedAlphabet('');
// //     setSearchTerm('');
// //   };

// //   if (loading) {
// //     return <div className="songs-container">లోడ్ అవుతోంది...</div>;
// //   }

// //   if (error) {
// //     return <div className="songs-container error-message">{error}</div>;
// //   }

// //   return (
// //     <div className="main-layout">
// //       <Sidebar 
// //         onSelectCategory={setSelectedCategory}
// //         selectedCategory={selectedCategory}
// //         onSelectSinger={setSelectedSinger}
// //         selectedSinger={selectedSinger}
// //         onSelectAlphabet={setSelectedAlphabet}
// //         selectedAlphabet={selectedAlphabet}
// //         categories={categories}
// //         singers={singers}
// //       />
      
// //       <div className="songs-content">
// //         <h2>పాటలు</h2>
// //         <p className="page-description">
// //           ఇక్కడ మీరు ఆడియో పాటలు మరియు వాటి లిరిక్స్ చూడవచ్చు.
// //         </p>
        
// //         <div className="controls-container">
// //           <input
// //             type="text"
// //             placeholder="పాట కోసం వెతకండి..."
// //             className="search-input"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //           <button className="reset-btn" onClick={handleResetFilters}>
// //             ఫిల్టర్‌లను రీసెట్ చేయండి
// //           </button>
// //         </div>
        
// //         <div className="song-list">
// //           {filteredSongs.length > 0 ? (
// //             filteredSongs.map((song, index) => (
// //               <div key={song._id} className="song-list-item">
// //                 <div className="song-details-container">
// //                   <div className="song-info-main">
// //                     <h3 className="song-title">{index + 1}. {song.title}</h3>
// //                     <p className="song-author">రచయిత: {song.singer}</p>
// //                     <button 
// //                       className="lyrics-toggle-btn" 
// //                       onClick={() => handleLyricsToggle(song._id)}>
// //                       {expandedSongId === song._id ? 'లిరిక్స్ మూసివేయి' : 'లిరిక్స్ చూడండి'}
// //                     </button>
// //                   </div>
// //                   {song.audio_url && (
// //                     <audio controls className="audio-player">
// //                       <source src={song.audio_url} type="audio/mpeg" />
// //                       మీ బ్రౌజర్ ఆడియోను సపోర్ట్ చేయడం లేదు.
// //                     </audio>
// //                   )}
// //                 </div>
                
// //                 {expandedSongId === song._id && (
// //                   <div className="song-lyrics">
// //                     <p>{song.lyrics}</p>
// //                   </div>
// //                 )}
// //               </div>
// //             ))
// //           ) : (
// //             <p className="no-songs-found">ఎటువంటి పాటలు దొరకలేదు.</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default SongsPage;

// // === PATCH: Robust Songs page (empty-safe + debug logs) ===
// // import React, { useEffect, useState } from "react";
// // import { API_BASE, withBase, apiGet } from "./api";

// // export default function SongsPage() {
// //   const [songs, setSongs] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         console.log("DEBUG: API_BASE =", API_BASE);
// //         const data = await apiGet("/api/songs"); // expects { songs: [], singers: [] } or []
// //         console.log("DEBUG: /api/songs response =", data);
// //         // Accept both array and object shapes:
// //         const list = Array.isArray(data) ? data : (data?.songs ?? []);
// //         setSongs(Array.isArray(list) ? list : []);
// //       } catch (err) {
// //         console.error("Songs load error:", err);
// //         setError(err?.message || "Unknown error");
// //       } finally {
// //         setLoading(false);
// //       }
// //     })();
// //   }, []);

// //   if (loading) return <div>Loading songs…</div>;
// //   if (error) return (
// //     <div style={{ color: "crimson" }}>
// //       పాటలను లోడ్ చేయడంలో లోపం సంభవించింది: {String(error)}
// //     </div>
// //   );

// //   if (!songs.length) {
// //     return <div>ఇప్పటివరకు పాటలు లేవు.</div>;
// //   }

// //   return (
// //     <div style={{ padding: "16px" }}>
// //       <h2>Songs</h2>
// //       <ul style={{ listStyle: "none", padding: 0 }}>
// //         {songs.map((s) => (
// //           <li
// //             key={s._id || s.id || s.title}
// //             style={{
// //               marginBottom: "12px",
// //               display: "flex",
// //               gap: "12px",
// //               alignItems: "center",
// //             }}
// //           >
// //             {s.image_url ? (
// //               <img
// //                 src={withBase(s.image_url)}
// //                 alt={s.title || "song"}
// //                 style={{ width: "72px", height: "72px", objectFit: "cover", borderRadius: 8 }}
// //                 onError={(e) => {
// //                   e.currentTarget.style.display = "none";
// //                 }}
// //               />
// //             ) : null}
// //             <div>
// //               <div>
// //                 <strong>{s.title || s.name || "Untitled"}</strong>
// //               </div>
// //               <div style={{ fontSize: 12, opacity: 0.7 }}>
// //                 {s.artist || s.subtitle || ""}
// //               </div>
// //             </div>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // === Songs page: Sidebar + Search + Alphabet + Reset; flexible field mapping ===
// import React, { useEffect, useMemo, useState } from "react";
// import { API_BASE, withBase } from "./api";
// import Sidebar from "./Sidebar";
// import "./SongsPage.css";

// export default function SongsPage() {
//   const [songs, setSongs] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [authors, setAuthors] = useState([]);

//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedAuthor, setSelectedAuthor] = useState("All");
//   const [selectedAlphabet, setSelectedAlphabet] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${API_BASE}/api/songs`);
//         if (!res.ok) throw new Error(`GET /api/songs → ${res.status}`);
//         const data = await res.json(); // { songs: [], singers: [] } OR []
//         const list = Array.isArray(data) ? data : (data?.songs ?? []);
//         setSongs(Array.isArray(list) ? list : []);

//         // categories
//         const cats = Array.from(
//           new Set(list.map((s) => s.category || s.cat || "").filter(Boolean))
//         );
//         setCategories(cats);

//         // authors (singer/artist)
//         const singersFromApi = Array.isArray(data?.singers) ? data.singers : [];
//         const singersFromList = Array.from(
//           new Set(
//             list
//               .map((s) => s.singer || s.artist || s.author || "")
//               .filter(Boolean)
//           )
//         );
//         const merged = Array.from(new Set([...singersFromApi, ...singersFromList]));
//         setAuthors(merged);
//       } catch (e) {
//         setError(e.message || "Failed to load songs");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const filtered = useMemo(() => {
//     const term = (searchTerm || "").toLowerCase();
//     const alpha = (selectedAlphabet || "").toLowerCase();

//     return songs.filter((s) => {
//       const title = (s.title || s.name || "").toLowerCase();
//       const lyrics = (s.lyrics || s.content || "").toLowerCase();
//       const cat = s.category || s.cat || "";
//       const singer = s.singer || s.artist || s.author || "";

//       const byCat = selectedCategory === "All" || cat === selectedCategory;
//       const byAuthor = selectedAuthor === "All" || singer === selectedAuthor;
//       const byAlpha = !alpha || (title.startsWith(alpha));
//       const bySearch = !term || title.includes(term) || lyrics.includes(term);
//       return byCat && byAuthor && byAlpha && bySearch;
//     });
//   }, [songs, selectedCategory, selectedAuthor, selectedAlphabet, searchTerm]);

//   const resetFilters = () => {
//     setSelectedCategory("All");
//     setSelectedAuthor("All");
//     setSelectedAlphabet("");
//     setSearchTerm("");
//   };

//   if (loading) return <div className="songs-container">లోడ్ అవుతోంది…</div>;
//   if (error)
//     return (
//       <div className="songs-container error-message">
//         పాటలను లోడ్ చేయడంలో లోపం సంభవించింది: {error}
//       </div>
//     );

//   return (
//     <div className="songs-container">
//       <Sidebar
//         categories={categories}
//         authors={authors}
//         selectedCategory={selectedCategory}
//         onSelectCategory={setSelectedCategory}
//         selectedAuthor={selectedAuthor}
//         onSelectAuthor={setSelectedAuthor}
//         selectedAlphabet={selectedAlphabet}
//         onSelectAlphabet={setSelectedAlphabet}
//       />

//       <div className="songs-content">
//         <h2>ప్రసంగాలు</h2>
//         <p className="hint">ఇక్కడ మీరు పాస్టర్ల ప్రసంగాలను వీడియోస్ ఫైల్స్‌లో చూడవచ్చు.</p>

//         <div className="toolbar">
//           <input
//             className="search-input"
//             placeholder="ప్రసంగం కోసం వెతకండి…"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button className="reset-btn" onClick={resetFilters}>ఫిల్టర్లను రీసెట్ చేయండి</button>
//         </div>

//         {filtered.length === 0 ? (
//           <div className="empty">ఎటువంటి ప్రసంగాలు అందుబాటులో లేవు.</div>
//         ) : (
//           <ul className="song-list">
//             {filtered.map((s) => {
//               const img = s.image_url;
//               const title = s.title || s.name || "Untitled";
//               const singer = s.singer || s.artist || s.author || "";
//               const audio = s.audio_url;

//               return (
//                 <li key={s._id || title} className="song-item">
//                   {img ? (
//                     <img
//                       className="song-thumb"
//                       src={withBase(img)}
//                       alt={title}
//                       onError={(e) => (e.currentTarget.style.display = "none")}
//                     />
//                   ) : null}

//                   <div className="song-meta">
//                     <div className="song-title">{title}</div>
//                     {singer ? <div className="song-artist">గాయకుడు/బోధకుడు: {singer}</div> : null}
//                     {audio ? (
//                       <audio controls src={withBase(audio)} className="song-audio" />
//                     ) : null}
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
