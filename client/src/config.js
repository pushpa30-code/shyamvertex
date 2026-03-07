const getApiUrl = () => {
    // 1. Explicit variable (Best practice)
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

    // 2. Production detection
    if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
        // Try to match standard Railway production URL
        // If your service is 'shyamvertex', Railway defaults to shyamvertex-production.up.railway.app
        return 'https://shyamvertex-production.up.railway.app';
    }

    // 3. Dev fallback
    return 'http://localhost:5000';
};

const API_URL = getApiUrl();

export default API_URL;
