// // purpose: Centralized API Client(cookie-based auth)

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// // **
// //  * Core API fetch wrapper
// //  * - Always sends cookies (credentials: 'include')
// //  * - Handles JSON parsing safely
// //  * - Handles 401 globally
// //  * - Standardizes error throwing
// //  */

// async function apiFetch(endpoints, options = {}){
//     const config = {
//         credentials: 'include', // critical for httponly cookie auth
//         headers:{
//             'Content-Type' : 'application/json',
//             ...options.headers,
//         },
//         ...options,
//     };
//     const response = await fetch(`${API_URL}${endpoint}`, config);

//     // Try to parse JSON safely
//     let data = null;
//     try{
//         data = await response.json();
//     }catch{
//             // Ignore JSON parse error (empty responses etc.)

//     }
//     //global 401 hanlding(session expired)
//     if(response.status === 401){
//         if(typeof window !== 'undefined'){
//             window.location.href = '/admin/login';
//         }
//         throw new Error('Session expired. Please login again');
//     }
//     if (!response.ok){
//         throw new Error(
//             data?.message ||
//             data?.error ||
//             'Something went wrong'
//         );
//     }
//     return data;
// };


// /* ==========================================================
//    Property API
// ========================================================== */
// export const propertyAPI = {
//     getALL: (params = {}) => {
//         const queryString = new URLSearchParams(
//             Object.fromEntries(
//                 Object.entries(params).filter(
//                     ([, v]) => v !== '' && v !== null && v !== undefined
//                 )
//             )
            
//         ).toString();
//         return apiFetch(`/api/properties${queryString ? `?${queryString}` : ''}`);
        
//     },
//     getFeatured: (limit = 4) => 
//         apiFetch(`/api/properties/featured?limit=${limit}`),

//     getById: (id) =>
//         apiFetch(`/api/properties/${id}`),

//     getSimilar: (id) =>
//         apiFetch(`/api/properties/${id}/similar`),

//     create: (data) =>
//         apiFetch(`/api/properties`,{
//             method: 'POST',
//             body: JSON.stringify(data),

//         }),
//     update: (id,data) => 
//         apiFetch(`/api/properties/${id}`,{
//             method: 'PUT',
//             body: JSON.stringify(data),
//         }),
//     delete: (id) =>
//         apiFetch(`/api/properties/${id}`,{
//             method:'DELETE',
//         }),
//     uploadImages: async(files) =>{
//         const formData = new FormData();
//         files.forEach((file) => formData.append('images', file));

//         const response = await fetch(
//             `${API_URL}/api/properties/upload/images`,
//             {
//                 method: 'POST',
//                 credentials: 'include', // send cookies
//                 body: formData, 
//             }
//         );

//         if(!response.ok){
//             throw new Error('Image upload failed');
//         }
//         return response.json();
//     },
//     deleteImage: (publicId) =>
//         apiFetch(`/api/properties/images/${encodedURIComponent(publicId)}`,
//         {method: 'DELETE'}
//     ),
// };
// /* ==========================================================
//    Inquiry API
// ========================================================== */

// export const inquiryAPI = {
//     submit: (data) =>
//         apiFetch(`/api/inquiries`,{
//             method: 'POST',
//             body: JSON.stringify(data),
//         }),
// };

// /* ==========================================================
//    Admin API
// ========================================================== */
// export const adminAPI = {
//     login: (credentials) =>
//         apiFetch(`/api/admin/login`,{
//             method:'POST',
//             body:JSON.stringify(credentials),
//         }),
//     logout: () =>
//         apiFetch(`/api/admin/logout`,{
//             method: 'POST',
//         }),
//     getMe: () =>
//         apiFetch(`/api/admin/me`),

//     getDashboard: () =>
//         apiFetch(`/api/admin/dashboard`),

//     getInquiries: (params = {}) =>{
//         const queryString = new URLSearchParams(params).toString();
//         return apiFetch(`/api/admin/inquiries?${queryString}`);
//         },
//     updateInquiryStatus: (id, status) =>
//         apiFetch(`/api/admin/inquiries/${id}/status`,{
//             method:'PUT',
//             body:JSON.stringify({status}),
//         }),
//     getAnalytics: (days=30) =>
//         apiFetch(`/api/admin/analytics?days=${days}`),
// };
// /* ==========================================================
//    Analytics (Non-blocking)
// ========================================================== */
// export const analyticsAPI = {
//     startsSession: (data) =>
//         fetch(`${API_URL}/api/analytics/session/start`,{
//             method:'POST',
//             headers: {'Content-Type' : 'application/json'},
//             body: JSON.stringify(data), 
//         }).catch(()=> {}),
//     endSession: (data) =>
//         fetch(`${API_URL}/api/analytics/sesison/end`,{
//             method:'POST',
//             headers: {'Content-Type': 'application/json'},
//             body:JSON.stringify(data),

//         }).catch(()=>{}),
//     track: (data) =>
//         fetch(`${API_URL}/api/analytics/track`,{
//             method:'POST',
//             headers:{'Content-Type': 'application/json'},
//             body:JSON.stringfy(data),
//         }).catch(() => {}),
// };

// export { API_URL };


// ============================================================
// FILE: frontend/src/lib/api.js
// PURPOSE: Centralized API calls with authentication
// ============================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const NEXT_URL = typeof window !== 'undefined' ? '' : (process.env.NEXTAUTH_URL || 'http://localhost:3000');

// Helper function for API calls
async function apiFetch(endpoint, options = {}) {
  const isProxied = ['/api/admin/login', '/api/admin/logout'].includes(endpoint);
  const baseUrl = isProxied ? NEXT_URL : API_URL;
  const config = {
    credentials: 'include',  // Send cookies with every request
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${baseUrl}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || error.error || 'API request failed');
  }

  return response.json();
}

// ============================================================
// PROPERTY APIs
// ============================================================

export const propertyAPI = {
  // Get all properties with filters
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiFetch(`/api/properties${queryString ? `?${queryString}` : ''}`);
  },

  // Get featured properties
  getFeatured: async (limit = 4) => {
    return apiFetch(`/api/properties/featured?limit=${limit}`);
  },

  // Get single property by ID
  getById: async (id) => {
    return apiFetch(`/api/properties/${id}`);
  },

  // Get similar properties
  getSimilar: async (id, limit = 4) => {
    return apiFetch(`/api/properties/${id}/similar?limit=${limit}`);
  },

  // Create new property (Admin only)
  create: async (data) => {
    return apiFetch('/api/properties', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update property (Admin only)
  update: async (id, data) => {
    return apiFetch(`/api/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete property (Admin only)
  delete: async (id) => {
    return apiFetch(`/api/properties/${id}`, {
      method: 'DELETE',
    });
  },

  // Upload images (Admin only)
  uploadImages: async (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    return fetch(`${API_URL}/api/properties/upload/images`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }).then(res => res.json());
  },
};

// ============================================================
// INQUIRY APIs
// ============================================================

export const inquiryAPI = {
  // Submit contact form (Public)
  submit: async (data) => {
    return apiFetch('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get all inquiries (Admin only)
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiFetch(`/api/admin/inquiries${queryString ? `?${queryString}` : ''}`);
  },

  // Get single inquiry (Admin only)
  getById: async (id) => {
    return apiFetch(`/api/admin/inquiries/${id}`);
  },

  // Update inquiry status (Admin only)
  updateStatus: async (id, status) => {
    return apiFetch(`/api/admin/inquiries/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Delete inquiry (Admin only)
  delete: async (id) => {
    return apiFetch(`/api/admin/inquiries/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============================================================
// ADMIN APIs
// ============================================================

export const adminAPI = {
  // Login
  login: async (credentials) => {
    return apiFetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Logout
  logout: async () => {
    return apiFetch('/api/admin/logout', {
      method: 'POST',
    });
  },

  // Get current admin info
  getMe: async () => {
    return apiFetch('/api/admin/me');
  },

  // Get dashboard stats
  getDashboard: async () => {
    return apiFetch('/api/admin/dashboard');
  },

  // Get inquiries (with filters)
  getInquiries: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiFetch(`/api/admin/inquiries${queryString ? `?${queryString}` : ''}`);
  },

  // Update inquiry status
  updateInquiryStatus: async (id, status) => {
    return apiFetch(`/api/admin/inquiries/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Get analytics
  getAnalytics: async (days = 30) => {
    return apiFetch(`/api/admin/analytics?days=${days}`);
  },

  // Get visitors over time
  getVisitors: async (days = 30) => {
    return apiFetch(`/api/admin/analytics/visitors?days=${days}`);
  },

  // Get property analytics
  getPropertyAnalytics: async (id, days = 30) => {
    return apiFetch(`/api/admin/analytics/properties/${id}?days=${days}`);
  },
};

// ============================================================
// ANALYTICS APIs (Public)
// ============================================================

export const analyticsAPI = {
  // Start session
  startSession: async (data) => {
    return apiFetch('/api/analytics/session/start', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // End session
  endSession: async (data) => {
    return apiFetch('/api/analytics/session/end', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Track event
  trackEvent: async (data) => {
    return apiFetch('/api/analytics/track', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ============================================================
// EXPORT ALL
// ============================================================

export default {
  propertyAPI,
  inquiryAPI,
  adminAPI,
  analyticsAPI,
};