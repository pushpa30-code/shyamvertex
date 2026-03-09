const getApiUrl = () => {
    // 1. Manual User Override (Saved in browser)
    const savedUrl = typeof window !== 'undefined' ? localStorage.getItem('SHYAM_API_OVERRIDE') : null;
    if (savedUrl) return savedUrl;

    // 2. Explicit environment variable
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

    // 3. Auto-detection/Fallbacks
    if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
        // We'll keep a list of common ones but prioritize savedUrl
        return 'https://shyamvertex-production.up.railway.app';
    }

    return 'http://localhost:5000';
};

const API_URL = getApiUrl();

export default API_URL;
