// // purpose: property inquiry contact form (glassmorphism premium)

// 'use client'

// import { useState } from 'react';
// import toast from 'react-hot-toast';
// import { inquiryAPI } from '@/lib/api';

// export default function ContactForm({ propertyId, propertyTitle }) {
//   const defaultMessage = `Hi, I'm interested in "${
//     propertyTitle || 'this property'
//   }" & would like more information.`;

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: defaultMessage,
//   });

//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [focused, setFocused] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === 'email' ? value.trim().toLowerCase() : value,
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.name.trim()) return 'Name is required';
//     if (!formData.email.trim()) return 'Email is required';
//     if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email';
//     if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone))
//       return 'Enter valid 10-digit Indian mobile number';
//     if (!formData.message.trim() || formData.message.length < 10)
//       return 'Message must be at least 10 characters';
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     const error = validateForm();
//     if (error) {
//       toast.error(error);
//       return;
//     }

//     setLoading(true);
//     try {
//       await inquiryAPI.submit({ ...formData, propertyId });
//       setSubmitted(true);
//       toast.success('Inquiry sent successfully.');
//     } catch (error) {
//       toast.error(error.message || 'Failed to send. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (submitted) {
//     return (
//       <div
//         className="relative rounded-2xl p-12 text-center overflow-hidden"
//         style={{
//           background: 'rgba(255,255,255,0.55)',
//           backdropFilter: 'blur(20px)',
//           WebkitBackdropFilter: 'blur(20px)',
//           border: '1px solid rgba(255,255,255,0.7)',
//           boxShadow: '0 8px 32px rgba(99,102,153,0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
//         }}
//       >
//         <div
//           className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
//           style={{
//             background: 'rgba(255,255,255,0.7)',
//             border: '1px solid rgba(139,109,56,0.3)',
//             boxShadow: '0 4px 16px rgba(139,109,56,0.15)',
//           }}
//         >
//           <span style={{ color: '#8B6D38', fontSize: '1.5rem' }}>✓</span>
//         </div>
//         <h3 className="text-2xl font-bold mb-3" style={{ color: '#1a1a2e', fontFamily: 'Georgia, serif' }}>
//           Message Received
//         </h3>
//         <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'sans-serif' }}>
//           Our team will be in touch within 24 hours.<br />
//           We look forward to finding your perfect home.
//         </p>
//         <div className="w-8 h-px mx-auto mt-8" style={{ background: 'linear-gradient(90deg, transparent, #8B6D38, transparent)' }} />
//       </div>
//     );
//   }

//   const getLabelColor = (field) =>
//     focused === field ? '#8B6D38' : 'rgba(30,30,60,0.45)';

//   const getInputBorder = (field) =>
//     focused === field ? '#8B6D38' : 'rgba(30,30,60,0.18)';

//   const inputStyle = (field) => ({
//     width: '100%',
//     background: 'transparent',
//     border: 'none',
//     borderBottom: `1px solid ${getInputBorder(field)}`,
//     padding: '10px 0',
//     fontSize: '0.875rem',
//     color: '#1a1a2e',
//     outline: 'none',
//     fontFamily: 'sans-serif',
//     transition: 'border-color 0.3s',
//   });

//   return (
//     <div
//       className="relative rounded-2xl p-px"
//       style={{
//         background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(200,185,230,0.3) 50%, rgba(139,109,56,0.2))',
//       }}
//     >
//       {/* Outer glow */}
//       <div
//         className="absolute inset-0 rounded-2xl pointer-events-none"
//         style={{ boxShadow: '0 20px 60px rgba(99,82,153,0.15), 0 4px 20px rgba(0,0,0,0.08)' }}
//       />

//       {/* Glass card */}
//       <div
//         className="relative rounded-2xl overflow-hidden"
//         style={{
//           background: 'rgba(255,255,255,0.55)',
//           backdropFilter: 'blur(24px)',
//           WebkitBackdropFilter: 'blur(24px)',
//           border: '1px solid rgba(255,255,255,0.75)',
//         }}
//       >
//         {/* Top shimmer */}
//         <div
//           className="h-px w-full"
//           style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9) 40%, rgba(139,109,56,0.4) 60%, transparent)' }}
//         />

//         {/* Decorative blobs */}
//         <div
//           className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-full pointer-events-none"
//           style={{ background: 'radial-gradient(circle, rgba(192,170,230,0.25), transparent 70%)' }}
//         />
//         <div
//           className="absolute bottom-[-30px] left-[-30px] w-40 h-40 rounded-full pointer-events-none"
//           style={{ background: 'radial-gradient(circle, rgba(139,109,56,0.12), transparent 70%)' }}
//         />

//         <div className="relative p-8 md:p-10">

//           {/* Header */}
//           <div className="mb-10">
//             <p
//               className="text-xs tracking-[0.3em] uppercase mb-3"
//               style={{ color: '#8B6D38', fontFamily: 'sans-serif' }}
//             >
//               Get In Touch
//             </p>
//             <h3
//               className="text-2xl md:text-3xl font-bold leading-tight"
//               style={{ color: '#1a1a2e', fontFamily: 'Georgia, serif' }}
//             >
//               Let's Start a<br />Conversation.
//             </h3>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-8" noValidate>

//             {/* Name + Phone */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div>
//                 <label
//                   className="block text-xs tracking-widest uppercase mb-1 transition-colors duration-300"
//                   style={{ color: getLabelColor('name'), fontFamily: 'sans-serif' }}
//                 >
//                   Full Name <span style={{ color: '#8B6D38' }}>*</span>
//                 </label>
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   onFocus={() => setFocused('name')}
//                   onBlur={() => setFocused('')}
//                   placeholder="Arjun Mehta"
//                   style={inputStyle('name')}
//                   required
//                 />
//               </div>

//               <div>
//                 <label
//                   className="block text-xs tracking-widest uppercase mb-1 transition-colors duration-300"
//                   style={{ color: getLabelColor('phone'), fontFamily: 'sans-serif' }}
//                 >
//                   Phone
//                 </label>
//                 <input
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   onFocus={() => setFocused('phone')}
//                   onBlur={() => setFocused('')}
//                   placeholder="9876543210"
//                   maxLength={10}
//                   style={inputStyle('phone')}
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 className="block text-xs tracking-widest uppercase mb-1 transition-colors duration-300"
//                 style={{ color: getLabelColor('email'), fontFamily: 'sans-serif' }}
//               >
//                 Email Address <span style={{ color: '#8B6D38' }}>*</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 onFocus={() => setFocused('email')}
//                 onBlur={() => setFocused('')}
//                 placeholder="you@example.com"
//                 style={inputStyle('email')}
//                 required
//               />
//             </div>

//             {/* Message */}
//             <div>
//               <label
//                 className="block text-xs tracking-widest uppercase mb-1 transition-colors duration-300"
//                 style={{ color: getLabelColor('message'), fontFamily: 'sans-serif' }}
//               >
//                 Message <span style={{ color: '#8B6D38' }}>*</span>
//               </label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 onFocus={() => setFocused('message')}
//                 onBlur={() => setFocused('')}
//                 rows={4}
//                 style={{ ...inputStyle('message'), resize: 'none' }}
//                 required
//               />
//             </div>

//             {/* Divider */}
//             <div className="h-px" style={{ background: 'rgba(30,30,60,0.08)' }} />

//             {/* Footer row */}
//             <div className="flex items-center justify-between gap-6">
//               <p
//                 className="text-xs leading-relaxed"
//                 style={{ color: 'rgba(30,30,60,0.35)', fontFamily: 'sans-serif' }}
//               >
//                 Your information is secure<br />and will never be shared.
//               </p>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="relative group flex-shrink-0 overflow-hidden rounded-xl px-8 py-3.5
//                            text-sm font-semibold tracking-widest uppercase transition-all duration-300
//                            disabled:opacity-50 disabled:cursor-not-allowed"
//                 style={{
//                   background: 'linear-gradient(135deg, #8B6D38, #C9A96E)',
//                   color: '#fff',
//                   fontFamily: 'sans-serif',
//                   boxShadow: '0 4px 20px rgba(139,109,56,0.35)',
//                 }}
//               >
//                 <span
//                   className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 pointer-events-none"
//                   style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
//                 />
//                 <span className="relative flex items-center gap-2">
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                       </svg>
//                       Sending
//                     </>
//                   ) : 'Send Inquiry'}
//                 </span>
//               </button>
//             </div>

//           </form>
//         </div>

//         {/* Bottom shimmer */}
//         <div
//           className="h-px w-full"
//           style={{ background: 'linear-gradient(90deg, transparent, rgba(139,109,56,0.25), transparent)' }}
//         />
//       </div>
//     </div>
//   );
// }

// FILE: frontend/app/components/property/ContactForm.js
// PURPOSE: Property inquiry contact form — blue glassmorphism theme

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { inquiryAPI } from '@/lib/api';

export default function ContactForm({ propertyId, propertyTitle }) {
  const defaultMessage = `Hi, I'm interested in "${
    propertyTitle || 'this property'
  }" & would like more information.`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: defaultMessage,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'email' ? value.trim().toLowerCase() : value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email';
    if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone))
      return 'Enter valid 10-digit Indian mobile number';
    if (!formData.message.trim() || formData.message.length < 10)
      return 'Message must be at least 10 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const error = validateForm();
    if (error) { toast.error(error); return; }
    setLoading(true);
    try {
      await inquiryAPI.submit({ ...formData, propertyId });
      setSubmitted(true);
      toast.success('Inquiry sent successfully.');
    } catch (err) {
      toast.error(err.message || 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-12 text-center"
        style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
      >
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-2xl text-blue-300"
          style={{
            background: 'rgba(96,165,250,0.15)',
            border: '1px solid rgba(96,165,250,0.3)',
            boxShadow: '0 4px 20px rgba(59,130,246,0.2)',
          }}
        >
          ✓
        </div>
        <h3 className="mb-3 text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
          Message Received
        </h3>
        <p className="text-sm leading-relaxed text-blue-200/60">
          Our team will be in touch within 24 hours.<br />
          We look forward to finding your perfect home.
        </p>
        <div
          className="mx-auto mt-8 h-px w-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)' }}
        />
      </div>
    );
  }

  const labelColor  = (f) => focused === f ? 'rgba(147,197,253,0.9)' : 'rgba(255,255,255,0.35)';
  const borderColor = (f) => focused === f ? 'rgba(96,165,250,0.6)'  : 'rgba(255,255,255,0.12)';

  const inputStyle = (field) => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${borderColor(field)}`,
    padding: '10px 0',
    fontSize: '0.875rem',
    color: '#ffffff',
    outline: 'none',
    fontFamily: 'sans-serif',
    transition: 'border-color 0.3s',
    caretColor: '#93c5fd',
  });

  return (
    <>
      <style>{`
        .contact-input::placeholder  { color: rgba(255,255,255,0.2); }
        .contact-textarea::placeholder { color: rgba(255,255,255,0.2); }
        @keyframes shimmer-slide {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }
        .blue-btn:hover .btn-shine {
          animation: shimmer-slide 0.55s ease forwards;
        }
      `}</style>

      {/* Gradient border wrapper */}
      <div
        className="rounded-2xl p-px"
        style={{
          background: 'linear-gradient(135deg, rgba(96,165,250,0.45), rgba(255,255,255,0.08) 50%, rgba(59,130,246,0.35))',
        }}
      >
        {/* Glass card */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          {/* Top shimmer */}
          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(147,197,253,0.55) 50%, transparent)' }}
          />

          {/* Blobs */}
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.13), transparent 70%)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.09), transparent 70%)' }}
          />

          <div className="relative p-7 sm:p-9">

            {/* Header */}
            <div className="mb-9">
              <p className="mb-2 text-[10px] tracking-[0.35em] uppercase text-blue-300/60">
                Get In Touch
              </p>
              <h3
                className="text-2xl font-bold leading-tight text-white sm:text-3xl"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Send Us a<br />Message.
              </h3>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-7">

              {/* Name + Phone */}
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-2 block text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
                    style={{ color: labelColor('name') }}
                  >
                    Full Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    placeholder="Arjun Mehta"
                    style={inputStyle('name')}
                    className="contact-input"
                    required
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
                    style={{ color: labelColor('phone') }}
                  >
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused('')}
                    placeholder="9876543210"
                    maxLength={10}
                    style={inputStyle('phone')}
                    className="contact-input"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  className="mb-2 block text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
                  style={{ color: labelColor('email') }}
                >
                  Email Address <span className="text-blue-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  placeholder="you@example.com"
                  style={inputStyle('email')}
                  className="contact-input"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="mb-2 block text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
                  style={{ color: labelColor('message') }}
                >
                  Message <span className="text-blue-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  rows={4}
                  style={{ ...inputStyle('message'), resize: 'none' }}
                  className="contact-textarea"
                  required
                />
              </div>

              {/* Divider */}
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

              {/* Submit row */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-relaxed text-white/25">
                  Your info is secure &<br className="hidden sm:block" /> never shared.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="blue-btn relative w-full overflow-hidden rounded-xl px-8 py-3.5
                             text-[12px] cursor-pointer font-semibold tracking-[0.15em] uppercase text-white
                             transition-all duration-300 hover:-translate-y-0.5
                             disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  style={{
                    background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                    boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
                  }}
                >
                  <span
                    className="btn-shine pointer-events-none absolute inset-0 -translate-x-full"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Sending
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </div>

            </form>
          </div>

          {/* Bottom shimmer */}
          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.25), transparent)' }}
          />
        </div>
      </div>
    </>
  );
}