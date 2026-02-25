// PURPOSE: Utility helper functions (Optimized & Safe)

//    Price Formatting

export const formatPrice = (price, currency = 'INR') => {
    if(typeof price !== 'number') return '';

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,

    }).format(price);
};

//   Date Formatting

export const formatDate = (dateString) => {
    if(!dateString) return '';

    const date = new Date(dateString);
    if(isNaN(date.getTime())) return '';

    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

//    Time Ago (Improved Logic)
export const timeAgo = (dateString) => {
    if(!dateString) return '';

    const now = Date.now();
    const date = new Date(dateString).getTime();

    if(isNaN(date)) return '';

    const seconds = Math.floor((now - date) / 1000);

    if(seconds < 60 ) return 'Just Now';

    const minutes = Math.floor(seconds/60);
    if(minutes<60)
        return `${minutes} minutes${minutes > 1 ? 's' : ''}ago`;

    const hours = Math.floor(minutes/60);
    if(hours<24)
        return `${hours} hour${hour > 1 ? 's' : ''}ago`;

    const days = Math.floor(hour/24);
    if(days<30)
        return `${days} days${days > 1 ? 's' : ''} ago`;

    const months = Math.floor(days/30);
    if(months<12)
        return `${months} months${months > 1 ? 's' : ''}ago`;

    const years = Math.floor(months/12);
    return `${year} year${years > 1 ? 's' : ''}ago`;

    
};

//    Secure Session ID (Better than Math.random)

export const generatedSessionId = () => {
    if(typeof crypto !== 'undefined' && crypto.randomUUID){
        return crypto.randomUUID();
    }

    // Fallback(rarely used)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) =>{
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

//    Get or Create Session ID (Browser Only)

export const getSessionId = () => {
    if(typeof window === 'undefined') return null;

    let id = sessionStorage.getItem('session_id');

    if(!id) {
        id = generateSessionId();
        sessionStorage.setItem('session_id',id);

    }
    return id;
}

// Text Truncation (Safer)

export const truncate = (text, maxLength = 150) =>{
    if(!text || typeof text !== 'string') return '';

    if(text.length <= maxLength) return text;

    return text.slice(0, maxLength).trimEnd() + '…';
}

//  format Area

export const formatArea = (sqft) => {
    if (!sqft || isNaN(sqft)) return 'N/A';

    return `${Number(sqft).toLocaleString('en-IN')} sq ft`;


};

//    Property Type Label

const PROPERTY_TYPES_LABELS = {
    apartment: 'Apartment',
    house: 'Independent House',
    villa: 'Villa',
    land: 'Plot',
    commercial: 'Commercial Property',
};
export const getPropertyTypeLabel = (type) => {
    return PROPERTY_TYPES_LABELS[type] || 'Unknown';
};

//    Debounce (Production Safe)

export const debounce = (func, wait = 300) => {
    let timeout;

    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(()=> func(...args), wait);
    };
};

