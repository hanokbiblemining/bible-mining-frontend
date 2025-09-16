// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Sidebar from './Sidebar';
// // import './SongsPage.css';

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
// //         const response = await axios.get('https://bible-mining-backend-jxj5.onrender.com/api/songs');
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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from './Sidebar';
// import './SongsPage.css';

// /* ===================== [PATCH] API base + helper ===================== */
// // Netlify/Local రెండింటిలోనూ పనిచేయడానికి BASE ఒకే చోట్టు నుంచి తీసుకుందాం.
// const API_BASE =
//   process.env.REACT_APP_API_BASE || "https://bible-mining-backend-jxj5.onrender.com";

// // relative "/uploads/..." వస్తే BASE జతచేస్తుంది.
// // backend నుంచి వచ్చిన audio_full_url ఉంటే దాన్నే ముందుగా వాడుతాం.
// const toFull = (p) => (!p ? "" : p.startsWith("http") ? p : `${API_BASE}${p}`);
// /* ==================================================================== */

// function SongsPage() {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedSinger, setSelectedSinger] = useState('All');
//   const [selectedAlphabet, setSelectedAlphabet] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [expandedSongId, setExpandedSongId] = useState(null);
//   const [songs, setSongs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [singers, setSingers] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchSongs = async () => {
//       try {
//         /* -------------------- [PATCH] use API_BASE -------------------- */
//         const response = await axios.get(`${API_BASE}/api/songs`);
//         /* -------------------------------------------------------------- */

//         setSongs(response.data.songs);
//         setSingers(['All', ...new Set(response.data.songs.map(song => song.singer))]);
//         setCategories(['All', ...new Set(response.data.songs.map(song => song.category))]);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching songs:", err);
//         setError("పాటలను లోడ్ చేయడంలో లోపం సంభవించింది.");
//         setLoading(false);
//       }
//     };
//     fetchSongs();
//   }, []);

//   const filteredSongs = songs.filter(song =>
//     (selectedCategory === 'All' || song.category === selectedCategory) &&
//     (selectedSinger === 'All' || song.singer === selectedSinger) &&
//     (selectedAlphabet === '' || song.title.toLowerCase().startsWith(selectedAlphabet.toLowerCase())) &&
//     song.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleLyricsToggle = (id) => {
//     setExpandedSongId(expandedSongId === id ? null : id);
//   };
  
//   const handleResetFilters = () => {
//     setSelectedCategory('All');
//     setSelectedSinger('All');
//     setSelectedAlphabet('');
//     setSearchTerm('');
//   };

//   if (loading) {
//     return <div className="songs-container">లోడ్ అవుతోంది...</div>;
//   }

//   if (error) {
//     return <div className="songs-container error-message">{error}</div>;
//   }

//   return (
//     <div className="main-layout">
//       <Sidebar 
//         onSelectCategory={setSelectedCategory}
//         selectedCategory={selectedCategory}
//         onSelectSinger={setSelectedSinger}
//         selectedSinger={selectedSinger}
//         onSelectAlphabet={setSelectedAlphabet}
//         selectedAlphabet={selectedAlphabet}
//         categories={categories}
//         singers={singers}
//       />
      
//       <div className="songs-content">
//         <h2>పాటలు</h2>
//         <p className="page-description">
//           ఇక్కడ మీరు ఆడియో పాటలు మరియు వాటి లిరిక్స్ చూడవచ్చు.
//         </p>
        
//         <div className="controls-container">
//           <input
//             type="text"
//             placeholder="పాట కోసం వెతకండి..."
//             className="search-input"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button className="reset-btn" onClick={handleResetFilters}>
//             ఫిల్టర్‌లను రీసెట్ చేయండి
//           </button>
//         </div>
        
//         <div className="song-list">
//           {filteredSongs.length > 0 ? (
//             filteredSongs.map((song, index) => (
//               <div key={song._id} className="song-list-item">
//                 <div className="song-details-container">
//                   <div className="song-info-main">
//                     <h3 className="song-title">{index + 1}. {song.title}</h3>
//                     <p className="song-author">రచయిత: {song.singer}</p>
//                     <button 
//                       className="lyrics-toggle-btn" 
//                       onClick={() => handleLyricsToggle(song._id)}>
//                       {expandedSongId === song._id ? 'లిరిక్స్ మూసివేయి' : 'లిరిక్స్ చూడండి'}
//                     </button>
//                   </div>

//                   {/* ---------------- [PATCH] audio src → full URL ---------------- */}
//                   { (song.audio_url || song.audio_full_url) && (
//                     <audio controls preload="metadata" className="audio-player"
//                            src={toFull(song.audio_full_url || song.audio_url)}>
//                       మీ బ్రౌజర్ ఆడియోను సపోర్ట్ చేయడం లేదు.
//                     </audio>
//                   )}
//                   {/* ---------------------------------------------------------------- */}
//                 </div>
                
//                 {expandedSongId === song._id && (
//                   <div className="song-lyrics">
//                     <p>{song.lyrics}</p>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="no-songs-found">ఎటువంటి పాటలు దొరకలేదు.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SongsPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './SongsPage.css';

/* === SIMPLE & SAFE: fixed API base (env అవసరం లేదు) === */
const BASE = "https://bible-mining-backend-jxj5.onrender.com";
const full = (p) => (!p ? "" : p.startsWith("http") ? p : `${BASE}${p}`);

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
        const res = await axios.get(`${BASE}/api/songs`);
        setSongs(res.data.songs || []);
        setSingers(['All', ...new Set((res.data.songs || []).map(s => s.singer))]);
        setCategories(['All', ...new Set((res.data.songs || []).map(s => s.category))]);
        setLoading(false);
      } catch (e) {
        console.error('Error fetching songs:', e);
        setError('పాటలను లోడ్ చేయడంలో లోపం సంభవించింది.');
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const filteredSongs = songs.filter(song =>
    (selectedCategory === 'All' || song.category === selectedCategory) &&
    (selectedSinger === 'All' || song.singer === selectedSinger) &&
    (selectedAlphabet === '' || song.title?.toLowerCase().startsWith(selectedAlphabet.toLowerCase())) &&
    (song.title || '').toLowerCase().includes((searchTerm || '').toLowerCase())
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

  if (loading) return <div className="songs-container">లోడ్ అవుతోంది...</div>;
  if (error)   return <div className="songs-container error-message">{error}</div>;

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
        <p className="page-description">ఇక్కడ మీరు ఆడియో పాటలు మరియు వాటి లిరిక్స్ చూడవచ్చు.</p>

        <div className="controls-container">
          <input
            type="text"
            placeholder="పాట కోసం వెతకండి..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="reset-btn" onClick={handleResetFilters}>ఫిల్టర్‌లను రీసెట్ చేయండి</button>
        </div>

        <div className="song-list">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, index) => (
              <div key={song._id} className="song-list-item">
                <div className="song-details-container">
                  <div className="song-info-main">
                    <h3 className="song-title">{index + 1}. {song.title}</h3>
                    <p className="song-author">రచయిత: {song.singer}</p>
                    <button className="lyrics-toggle-btn" onClick={() => handleLyricsToggle(song._id)}>
                      {expandedSongId === song._id ? 'లిరిక్స్ మూసివేయి' : 'లిరిక్స్ చూడండి'}
                    </button>
                  </div>

                  {/* AUDIO: relative "/uploads/..." అయితే BASE‌తో కట్టడం */}
                  {(song.audio_url || song.audio_full_url) && (
                    <audio
                      controls
                      preload="metadata"
                      className="audio-player"
                      src={full(song.audio_full_url || song.audio_url)}
                    >
                      మీ బ్రౌజర్ ఆడియోను సపోర్ట్ చేయడం లేదు.
                    </audio>
                  )}
                </div>

                {expandedSongId === song._id && (
                  <div className="song-lyrics"><p>{song.lyrics}</p></div>
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

