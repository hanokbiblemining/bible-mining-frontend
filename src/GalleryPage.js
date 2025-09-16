// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from './Sidebar';
// import ImageModal from './ImageModal';
// import './GalleryPage.css';

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
//         const response = await axios.get('https://bible-mining-backend-jxj5.onrender.com/api/gallery');
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
//                 <img src={item.image_url} alt={item.title} className="gallery-image" />
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import ImageModal from './ImageModal';
import './GalleryPage.css';

/* ================= [PATCH] API base ================= */
const API_BASE =
  process.env.REACT_APP_API_BASE ||
  'https://bible-mining-backend-jxj5.onrender.com';
/* ==================================================== */

function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAlphabet, setSelectedAlphabet] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState(['All']); // [PATCH] default "All"

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setError(null);
        setLoading(true);

        /* ============== [PATCH] shape-agnostic parsing ============== */
        const response = await axios.get(`${API_BASE}/api/gallery`);
        const raw = response.data;

        // backend నుంచి రావొచ్చు: [] లేదా { items: [...] } లేదా { gallery: [...] } లేదా { galleryItems: [...] }
        const list = Array.isArray(raw)
          ? raw
          : (raw?.items || raw?.gallery || raw?.galleryItems || []);

        // null-safe, field పేర్లు normalize
        const normalized = list
          .map((it, idx) => ({
            _id: it?._id || it?.id || `item-${idx}`,
            title: it?.title || '',
            description: it?.description || it?.caption || '',
            category: it?.category || 'General',
            image_url: it?.image_url || it?.url || it?.src || '', // ముఖ్యంగా Cloudinary URL
            order: Number(it?.order ?? 0),
          }))
          .filter(it => !!it.image_url); // URL లేని వాటిని తొలగించు

        // చిన్నగా సార్టింగ్: order → title
        normalized.sort((a, b) => (a.order - b.order) || a.title.localeCompare(b.title));
        setGalleryItems(normalized);

        // categories: backend ఇచ్చినా/ ఇవ్వకపోయినా handle చెయ్యి
        const providedCats = Array.isArray(raw?.categories) ? raw.categories : [];
        const autoCats = Array.from(new Set(normalized.map(i => i.category))).filter(Boolean);
        const finalCats = ['All', ...new Set([...providedCats, ...autoCats])];
        setCategories(finalCats);
        /* ============================================================ */

      } catch (err) {
        console.error('Error fetching gallery items:', err);
        setError('గ్యాలరీ ఫోటోలను లోడ్ చేయడంలో లోపం సంభవించింది.');
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryItems();
  }, []);

  /* ============== ఫిల్టర్ logic (null-safe) ============== */
  const filteredGalleryItems = galleryItems.filter(item => {
    const okCat = selectedCategory === 'All' || item.category === selectedCategory;
    const okAlpha = selectedAlphabet === '' || (item.title || '').toLowerCase().startsWith(selectedAlphabet.toLowerCase());
    const okSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    return okCat && okAlpha && okSearch;
  });

  const handleImageClick = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedAlphabet('');
    setSearchTerm('');
  };

  if (loading) return <div className="gallery-container">లోడ్ అవుతోంది...</div>;
  if (error)   return <div className="gallery-container error-message">{error}</div>;

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
              <div
                key={item._id}
                className="gallery-card"
                onClick={() => handleImageClick(item)}
              >
                <img
                  src={item.image_url}
                  alt={item.title || 'photo'}
                  className="gallery-image"
                  loading="lazy" /* [PATCH] perf */
                />
                <div className="image-info">
                  <h3>{item.title || 'Untitled'}</h3>
                  {item.description && <p>{item.description}</p>}
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
