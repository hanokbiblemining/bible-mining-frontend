import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactPage.css';

function ContactPage() {
  const [contactInfo, setContactInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get('https://bible-mining-backend-jxj5.onrender.com/api/contact');
        setContactInfo(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching contact info:", err);
        setError("సంప్రదింపు వివరాలను లోడ్ చేయడంలో లోపం సంభవించింది.");
        setLoading(false);
      }
    };
    fetchContactInfo();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, mobile, message };
    try {
      await axios.post('https://bible-mining-backend-jxj5.onrender.com/api/contact/send-email', formData);
      setFormMessage('మీ సందేశం విజయవంతంగా పంపబడింది!');
      setName('');
      setEmail('');
      setMobile('');
      setMessage('');
    } catch (error) {
      setFormMessage('సందేశం పంపడంలో లోపం సంభవించింది.');
      console.error('Error sending email:', error);
    }
  };

  if (loading) {
    return <div className="contact-container">లోడ్ అవుతోంది...</div>;
  }

  if (error) {
    return <div className="contact-container error-message">{error}</div>;
  }

  return (
    <div className="contact-container">
      <h2>మమ్మల్ని సంప్రదించండి</h2>
      <p className="contact-description">
        మీ ప్రార్థన అభ్యర్థనలు, ప్రశ్నలు లేదా సూచనలను ఇక్కడ పంపవచ్చు. మేము వీలైనంత త్వరగా మీకు సమాధానం ఇస్తాము.
      </p>

      <div className="contact-info">
        <div className="contact-card">
          <h3>సంప్రదింపు వివరాలు</h3>
          <p><strong>చిరునామా:</strong> {contactInfo.address}</p>
          <p><strong>ఫోన్ నంబర్:</strong> {contactInfo.phone_number}</p>
          <p><strong>ఈమెయిల్:</strong> {contactInfo.email}</p>
        </div>

        <div className="social-media">
          <h3>సోషల్ మీడియా</h3>
          <p>
            మీరు మమ్మల్ని సోషల్ మీడియాలో కూడా అనుసరించవచ్చు.
          </p>
          <div className="social-links">
            <a href={contactInfo.youtube_link} target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href={contactInfo.facebook_link} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={contactInfo.instagram_link} target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      
      <div className="contact-form-section">
        <h3>ప్రార్థన అవసరతల కొరకు</h3>
        <form className="contact-form" onSubmit={handleFormSubmit}>
          <label htmlFor="name">మీ పేరు</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

          <label htmlFor="email">మీ ఈమెయిల్</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <label htmlFor="mobile">మీ మొబైల్ నంబర్</label>
          <input type="tel" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />

          <label htmlFor="message">మీ సందేశం</label>
          <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="5" required></textarea>

          <button type="submit">పంపండి</button>
        </form>
        {formMessage && <p className="status-message">{formMessage}</p>}
      </div>
    </div>
  );
}

export default ContactPage;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './ContactPage.css';
// // import { API_BASE, withBase } from './api';

// // function ContactPage() {
// //   const [contactInfo, setContactInfo] = useState({});
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [mobile, setMobile] = useState('');
// //   const [message, setMessage] = useState('');
// //   const [formMessage, setFormMessage] = useState('');

// //   useEffect(() => {
// //     const fetchContactInfo = async () => {
// //       try {
// //         const response = await axios.get(`\${API_BASE}/api/contact`);
// //         setContactInfo(response.data);
// //         setLoading(false);
// //       } catch (err) {
// //         console.error("Error fetching contact info:", err);
// //         setError("సంప్రదింపు వివరాలను లోడ్ చేయడంలో లోపం సంభవించింది.");
// //         setLoading(false);
// //       }
// //     };
// //     fetchContactInfo();
// //   }, []);

// //   const handleFormSubmit = async (e) => {
// //     e.preventDefault();
// //     const formData = { name, email, mobile, message };
// //     try {
// //       await axios.post(`\${API_BASE}/api/contact/send-email`, formData);
// //       setFormMessage('మీ సందేశం విజయవంతంగా పంపబడింది!');
// //       setName('');
// //       setEmail('');
// //       setMobile('');
// //       setMessage('');
// //     } catch (error) {
// //       setFormMessage('సందేశం పంపడంలో లోపం సంభవించింది.');
// //       console.error('Error sending email:', error);
// //     }
// //   };

// //   if (loading) {
// //     return <div className="contact-container">లోడ్ అవుతోంది...</div>;
// //   }

// //   if (error) {
// //     return <div className="contact-container error-message">{error}</div>;
// //   }

// //   return (
// //     <div className="contact-container">
// //       <h2>మమ్మల్ని సంప్రదించండి</h2>
// //       <p className="contact-description">
// //         మీ ప్రార్థన అభ్యర్థనలు, ప్రశ్నలు లేదా సూచనలను ఇక్కడ పంపవచ్చు. మేము వీలైనంత త్వరగా మీకు సమాధానం ఇస్తాము.
// //       </p>

// //       <div className="contact-info">
// //         <div className="contact-card">
// //           <h3>సంప్రదింపు వివరాలు</h3>
// //           <p><strong>చిరునామా:</strong> {contactInfo.address}</p>
// //           <p><strong>ఫోన్ నంబర్:</strong> {contactInfo.phone_number}</p>
// //           <p><strong>ఈమెయిల్:</strong> {contactInfo.email}</p>
// //         </div>

// //         <div className="social-media">
// //           <h3>సోషల్ మీడియా</h3>
// //           <p>
// //             మీరు మమ్మల్ని సోషల్ మీడియాలో కూడా అనుసరించవచ్చు.
// //           </p>
// //           <div className="social-links">
// //             <a href={contactInfo.youtube_link} target="_blank" rel="noopener noreferrer">YouTube</a>
// //             <a href={contactInfo.facebook_link} target="_blank" rel="noopener noreferrer">Facebook</a>
// //             <a href={contactInfo.instagram_link} target="_blank" rel="noopener noreferrer">Instagram</a>
// //           </div>
// //         </div>
// //       </div>
      
// //       <div className="contact-form-section">
// //         <h3>ప్రార్థన అవసరతల కొరకు</h3>
// //         <form className="contact-form" onSubmit={handleFormSubmit}>
// //           <label htmlFor="name">మీ పేరు</label>
// //           <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

// //           <label htmlFor="email">మీ ఈమెయిల్</label>
// //           <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
// //           <label htmlFor="mobile">మీ మొబైల్ నంబర్</label>
// //           <input type="tel" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />

// //           <label htmlFor="message">మీ సందేశం</label>
// //           <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="5" required></textarea>

// //           <button type="submit">పంపండి</button>
// //         </form>
// //         {formMessage && <p className="status-message">{formMessage}</p>}
// //       </div>
// //     </div>
// //   );
// // }

// // export default ContactPage;

// // === PATCH: Contact page wired to Render API, graceful if backend not configured ===
// import React, { useState, useEffect } from "react";
// import { API_BASE } from "./api";
// import "./ContactPage.css";

// export default function ContactPage() {
//   const [contactInfo, setContactInfo] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [message, setMessage] = useState("");
//   const [formMessage, setFormMessage] = useState("");

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${API_BASE}/api/contact`);
//         if (res.status === 404) {
//           // Backend route not present yet — show nice message
//           setContactInfo({});
//           setLoading(false);
//           return;
//         }
//         if (!res.ok) throw new Error(`GET /api/contact → ${res.status}`);
//         const data = await res.json();
//         setContactInfo(data || {});
//       } catch (e) {
//         setError(e.message || "Failed to load contact info");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormMessage("");
//     try {
//       const formData = { name, email, mobile, message };
//       const res = await fetch(`${API_BASE}/api/contact/send-email`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (!res.ok) {
//         const txt = await res.text();
//         throw new Error(`POST /send-email → ${res.status} ${txt.slice(0, 120)}…`);
//       }
//       const data = await res.json();
//       setFormMessage(data?.message || "సందేశం విజయవంతంగా పంపబడింది!");
//       setName(""); setEmail(""); setMobile(""); setMessage("");
//     } catch (err) {
//       setFormMessage(`పంపడంలో లోపం: ${err.message}`);
//     }
//   };

//   if (loading) return <div className="contact-container">లోడ్ అవుతోంది...</div>;
//   if (error) return <div className="contact-container error-message">సంప్రదింపు వివరాలను లోడ్ చేయడంలో లోపం సంభవించింది: {error}</div>;

//   return (
//     <div className="contact-container">
//       <h2>మమ్మల్ని సంప్రదించండి</h2>

//       {contactInfo?.address || contactInfo?.email || contactInfo?.phone_number ? (
//         <div className="contact-info">
//           {contactInfo.address && <div><b>చిరునామా:</b> {contactInfo.address}</div>}
//           {contactInfo.phone_number && <div><b>ఫోన్:</b> {contactInfo.phone_number}</div>}
//           {contactInfo.email && <div><b>ఈమెయిల్:</b> {contactInfo.email}</div>}
//         </div>
//       ) : (
//         <div className="contact-info">సంప్రదింపు వివరాలు ఇంకా జోడించలేదు.</div>
//       )}

//       <form className="contact-form" onSubmit={handleSubmit}>
//         <input value={name} onChange={(e) => setName(e.target.value)} placeholder="పేరు" required />
//         <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ఈమెయిల్" type="email" required />
//         <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="మొబైల్" />
//         <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="సందేశం" rows={4} required />
//         <button type="submit">పంపు</button>
//       </form>

//       {formMessage && <div className="form-message">{formMessage}</div>}
//     </div>
//   );
// }
