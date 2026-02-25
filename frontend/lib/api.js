// purpose: Centralized API Client(cookie-based auth)

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// **
//  * Core API fetch wrapper
//  * - Always sends cookies (credentials: 'include')
//  * - Handles JSON parsing safely
//  * - Handles 401 globally
//  * - Standardizes error throwing
//  */

async function apiFetch(endpoints, options = {}){
    const config = {
        credentials: 'include', // critical for httponly cookie auth
        headers:{
            'Content-Type' : 'application/json',
            ...options.headers,
        },
        ...options,
    };
    const response = await fetch(`${API_URL}${endpoint}`, config);

    // Try to parse JSON safely
    let data = null;
    try{
        data = await response.json();
    }catch{
            // Ignore JSON parse error (empty responses etc.)

    }
    //global 401 hanlding(session expired)
    if(response.status === 401){
        if(typeof window !== 'undefined'){
            window.location.href = '/admin/login';
        }
        throw new Error('Session expired. Please login again');
    }
    if (!response.ok){
        throw new Error(
            data?.message ||
            data?.error ||
            'Something went wrong'
        );
    }
    return data;
};


/* ==========================================================
   Property API
========================================================== */
export const propertyAPI = {
    getALL: (params = {}) => {
        const queryString = new URLSearchParams(
            Object.fromEntries(
                Object.entries(params).filter(
                    ([, v]) => v !== '' && v !== null && v !== undefined
                )
            )
            
        ).toString();
        return apiFetch(`/api/properties${queryString ? `?${queryString}` : ''}`);
        
    },
    getFeatured: (limit = 4) => 
        apiFetch(`/api/properties/featured?limit=${limit}`),

    getById: (id) =>
        apiFetch(`/api/properties/${id}`),

    getSimilar: (id) =>
        apiFetch(`/api/properties/${id}/similar`),

    create: (data) =>
        apiFetch(`/api/properties`,{
            method: 'POST',
            body: JSON.stringify(data),

        }),
    update: (id,data) => 
        apiFetch(`/api/properties/${id}`,{
            method: 'PUT',
            body: JSON.stringify(data),
        }),
    delete: (id) =>
        apiFetch(`/api/properties/${id}`,{
            method:'DELETE',
        }),
    uploadImages: async(files) =>{
        const formData = new FormData();
        files.forEach((file) => formData.append('images', file));

        const response = await fetch(
            `${API_URL}/api/properties/upload/images`,
            {
                method: 'POST',
                credentials: 'include', // send cookies
                body: formData, 
            }
        );

        if(!response.ok){
            throw new Error('Image upload failed');
        }
        return response.json();
    },
    deleteImage: (publicId) =>
        apiFetch(`/api/properties/images/${encodedURIComponent(publicId)}`,
        {method: 'DELETE'}
    ),
};
/* ==========================================================
   Inquiry API
========================================================== */

export const inquiryAPI = {
    submit: (data) =>
        apiFetch(`/api/inquiries`,{
            method: 'POST',
            body: JSON.stringify(data),
        }),
};

/* ==========================================================
   Admin API
========================================================== */
export const adminAPI = {
    login: (credentials) =>
        apiFetch(`/api/admin/login`,{
            method:'POST',
            body:JSON.stringify(credentials),
        }),
    logout: () =>
        apiFetch(`/api/admin/logout`,{
            method: 'POST',
        }),
    getMe: () =>
        apiFetch(`/api/admin/me`),

    getDashboard: () =>
        apiFetch(`/api/admin/dashboard`),

    getInquiries: (params = {}) =>{
        const queryString = new URLSearchParams(params).toString();
        return apiFetch(`/api/admin/inquiries?${queryString}`);
        },
    updateInquiryStatus: (id, status) =>
        apiFetch(`/api/admin/inquiries/${id}/status`,{
            method:'PUT',
            body:JSON.stringify({status}),
        }),
    getAnalytics: (days=30) =>
        apiFetch(`/api/admin/analytics?days=${days}`),
};
/* ==========================================================
   Analytics (Non-blocking)
========================================================== */
export const analyticsAPI = {
    startsSession: (data) =>
        fetch(`${API_URL}/api/analytics/session/start`,{
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(data), 
        }).catch(()=> {}),
    endSession: (data) =>
        fetch(`${API_URL}/api/analytics/sesison/end`,{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(data),

        }).catch(()=>{}),
    track: (data) =>
        fetch(`${API_URL}/api/analytics/track`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringfy(data),
        }).catch(() => {}),
};
