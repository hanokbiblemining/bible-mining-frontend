import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import ImageModal from './ImageModal';
import './GalleryPage.css';

function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAlphabet, setSelectedAlphabet] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get('https://bible-mining-backend-jxj5.onrender.com/api/gallery');
        setGalleryItems(response.data.galleryItems);
        setCategories(['All', ...new Set(response.data.categories)]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching gallery items:", err);
        setError("గ్యాలరీ ఫోటోలను లోడ్ చేయడంలో లోపం సంభవించింది.");
        setLoading(false);
      }
    };
    fetchGalleryItems();
  }, []);
  
  const filteredGalleryItems = galleryItems.filter(item =>
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    (selectedAlphabet === '' || item.title.toLowerCase().startsWith(selectedAlphabet.toLowerCase())) &&
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  const closeModal = () => {
    setSelectedImage(null);
  };
  
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedAlphabet('');
    setSearchTerm('');
  };

  if (loading) {
    return <div className="gallery-container">లోడ్ అవుతోంది...</div>;
  }

  if (error) {
    return <div className="gallery-container error-message">{error}</div>;
  }

  return (
    <div className="main-layout">
      <Sidebar 
        onSelectCategory={setSelectedCategory}
        onSelectAlphabet={setSelectedAlphabet}
        categories={categories}
        selectedCategory={selectedCategory}
        selectedAlphabet={selectedAlphabet}
      />
      
      <div className="songs-content">
        <h2>గ్యాలరీ</h2>
        <p className="page-description">
          ఇక్కడ మీరు ఆకర్షణీయమైన ఫోటోలను చూడవచ్చు.
        </p>
        
        <div className="controls-container">
          <input
            type="text"
            placeholder="ఫోటో కోసం వెతకండి..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="reset-btn" onClick={handleResetFilters}>
            ఫిల్టర్‌లను రీసెట్ చేయండి
          </button>
        </div>
        
        <div className="gallery-grid">
          {filteredGalleryItems.length > 0 ? (
            filteredGalleryItems.map((item) => (
              <div key={item._id} className="gallery-card" onClick={() => handleImageClick(item)}>
                <img src={item.image_url} alt={item.title} className="gallery-image" />
                <div className="image-info">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-items-found">ఎటువంటి ఫోటోలు దొరకలేదు.</p>
          )}
        </div>
      </div>
      
      {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
    </div>
  );
}

export default GalleryPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from './Sidebar';
// import ImageModal from './ImageModal';
// import './GalleryPage.css';
// import { API_BASE, withBase } from './api';

// function GalleryPage() {
//   const [galleryItems, setGalleryItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedAlphabet, setSelectedAlphabet] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchGalleryItems = async () => {
//       try {
//         const response = await axios.get(`\${API_BASE}/api/gallery`);
//         setGalleryItems(response.data.galleryItems);
//         setCategories(['All', ...new Set(response.data.categories)]);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching gallery items:", err);
//         setError("గ్యాలరీ ఫోటోలను లోడ్ చేయడంలో లోపం సంభవించింది.");
//         setLoading(false);
//       }
//     };
//     fetchGalleryItems();
//   }, []);
  
//   const filteredGalleryItems = galleryItems.filter(item =>
//     (selectedCategory === 'All' || item.category === selectedCategory) &&
//     (selectedAlphabet === '' || item.title.toLowerCase().startsWith(selectedAlphabet.toLowerCase())) &&
//     item.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };
  
//   const closeModal = () => {
//     setSelectedImage(null);
//   };
  
//   const handleResetFilters = () => {
//     setSelectedCategory('All');
//     setSelectedAlphabet('');
//     setSearchTerm('');
//   };

//   if (loading) {
//     return <div className="gallery-container">లోడ్ అవుతోంది...</div>;
//   }

//   if (error) {
//     return <div className="gallery-container error-message">{error}</div>;
//   }

//   return (
//     <div className="main-layout">
//       <Sidebar 
//         onSelectCategory={setSelectedCategory}
//         onSelectAlphabet={setSelectedAlphabet}
//         categories={categories}
//         selectedCategory={selectedCategory}
//         selectedAlphabet={selectedAlphabet}
//       />
      
//       <div className="songs-content">
//         <h2>గ్యాలరీ</h2>
//         <p className="page-description">
//           ఇక్కడ మీరు ఆకర్షణీయమైన ఫోటోలను చూడవచ్చు.
//         </p>
        
//         <div className="controls-container">
//           <input
//             type="text"
//             placeholder="ఫోటో కోసం వెతకండి..."
//             className="search-input"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button className="reset-btn" onClick={handleResetFilters}>
//             ఫిల్టర్‌లను రీసెట్ చేయండి
//           </button>
//         </div>
        
//         <div className="gallery-grid">
//           {filteredGalleryItems.length > 0 ? (
//             filteredGalleryItems.map((item) => (
//               <div key={item._id} className="gallery-card" onClick={() => handleImageClick(item)}>
//                 <img src={withBase(item.image_url)} alt={item.title} className="gallery-image" />
//                 <div className="image-info">
//                   <h3>{item.title}</h3>
//                   <p>{item.description}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="no-items-found">ఎటువంటి ఫోటోలు దొరకలేదు.</p>
//           )}
//         </div>
//       </div>
      
//       {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
//     </div>
//   );
// }

// export default GalleryPage;

// === PATCH: Gallery page wired to Render API, empty-safe, withBase for images ===
// import React, { useState, useEffect } from "react";
// import { API_BASE, withBase } from "./api";
// import Sidebar from "./Sidebar";
// import ImageModal from "./ImageModal";
// import "./GalleryPage.css";

// export default function GalleryPage() {
//   const [galleryItems, setGalleryItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedAlphabet, setSelectedAlphabet] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${API_BASE}/api/gallery`);
//         if (!res.ok) throw new Error(`GET /api/gallery → ${res.status}`);
//         const data = await res.json(); // expect array
//         const list = Array.isArray(data) ? data : [];
//         setGalleryItems(list);
//         setCategories(
//           Array.from(new Set(list.map((i) => i.category).filter(Boolean)))
//         );
//       } catch (e) {
//         setError(e.message || "Failed to load gallery");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const filtered = galleryItems.filter((item) => {
//     const byCat = selectedCategory === "All" || item.category === selectedCategory;
//     const byAlpha =
//       !selectedAlphabet ||
//       (item.title || "").toLowerCase().startsWith(selectedAlphabet.toLowerCase());
//     const bySearch = (item.title || "").toLowerCase().includes(searchTerm.toLowerCase());
//     return byCat && byAlpha && bySearch;
//   });

//   if (loading) return <div className="gallery-container">లోడ్ అవుతోంది…</div>;
//   if (error)
//     return (
//       <div className="gallery-container error-message">
//         గ్యాలరీ ఫోటోలను లోడ్ చేయడంలో లోపం సంభవించింది: {error}
//       </div>
//     );

//   return (
//     <div className="gallery-container">
//       <Sidebar />
//       <div className="gallery-content">
//         <h2>గ్యాలరీ</h2>

//         <div className="filter-bar">
//           <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//             <option value="All">అన్ని కేటగిరీలు</option>
//             {categories.map((c) => (
//               <option key={c} value={c}>{c}</option>
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
//               setSelectedAlphabet("");
//               setSearchTerm("");
//             }}
//           >
//             Reset
//           </button>
//         </div>

//         <div className="gallery-grid">
//           {filtered.length ? (
//             filtered.map((item) => (
//               <div key={item._id || item.title} className="gallery-card" onClick={() => setSelectedImage(item.image_url)}>
//                 {item.image_url ? (
//                   <img
//                     src={withBase(item.image_url)}
//                     alt={item.title}
//                     className="gallery-image"
//                     onError={(e) => (e.currentTarget.style.display = "none")}
//                   />
//                 ) : null}
//                 <div className="gallery-info">
//                   <h3>{item.title}</h3>
//                   <p>{item.description}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div>ఇప్పటివరకు ఫోటోలు లేవు.</div>
//           )}
//         </div>

//         {selectedImage && (
//           <ImageModal image={withBase(selectedImage)} onClose={() => setSelectedImage(null)} />
//         )}
//       </div>
//     </div>
//   );
// }
