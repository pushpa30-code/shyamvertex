import React, { useState } from 'react';
import { Shield, LogIn, Briefcase, Layers, FileText, Phone, Menu, X, LogOut, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import AdminJobs from '../components/admin/AdminJobs';
import AdminServices from '../components/admin/AdminServices';
import AdminBlogs from '../components/admin/AdminBlogs';
import API_URL from '../config';
import AdminContact from '../components/admin/AdminContact';

const apiDiscoveryList = [
    'https://amusing-vitality-production.up.railway.app',
    'https://shyamvertex-production.up.railway.app',
    'https://server-production.up.railway.app',
    'https://shyamvertex-server-production.up.railway.app'
];

const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [discoveryResults, setDiscoveryResults] = useState({});

    // Auto-discover backend on mount
    React.useEffect(() => {
        if (isAuthenticated) {
            apiDiscoveryList.forEach(url => {
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        if (data.message && data.message.includes('SHYAM VERTEX')) {
                            setDiscoveryResults(prev => ({ ...prev, [url]: 'ONLINE (MATCH)' }));
                        } else {
                            setDiscoveryResults(prev => ({ ...prev, [url]: 'ONLINE (WRONG APP)' }));
                        }
                    })
                    .catch(() => {
                        setDiscoveryResults(prev => ({ ...prev, [url]: 'OFFLINE' }));
                    });
            });
        }
    }, [isAuthenticated]);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('jobs');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const ADMIN_PASSWORD = "admin";

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect Password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 relative overflow-hidden">
                {/* Visual Decorative Elements */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-indigo-100/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-lg relative z-10"
                >
                    <div className="bg-white border border-slate-200 p-12 md:p-16 rounded-[3.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] relative">
                        <div className="flex flex-col items-center mb-12">
                            <motion.div
                                initial={{ rotate: -10, y: 20, opacity: 0 }}
                                animate={{ rotate: 0, y: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
                                className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-8"
                            >
                                <Shield className="w-12 h-12 text-white" />
                            </motion.div>
                            <h2 className="text-4xl font-extrabold text-slate-900 text-center tracking-tight mb-2">
                                System <span className="text-blue-600">Access</span>
                            </h2>
                            <p className="text-slate-400 font-medium text-sm uppercase tracking-[0.3em]">Administrator Authentication</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-8">
                            <div className="group space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Secure Key</label>
                                <div className="relative">
                                    <LogIn className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-16 pr-8 py-6 bg-slate-50 border border-slate-200 rounded-[1.8rem] text-slate-900 placeholder-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-center tracking-[0.5em]"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: '#1d4ed8' }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-blue-600 text-white py-6 rounded-[1.8rem] font-bold text-lg uppercase tracking-widest shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center gap-3"
                            >
                                Authorize Protocol
                            </motion.button>
                        </form>

                        <div className="mt-12 text-center text-slate-300">
                            <p className="text-[10px] font-bold tracking-[0.2em] uppercase">Secured by Shyam Vertex Infrastructure</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    const navItems = [
        { id: 'jobs', label: 'Hiring Console', icon: Briefcase },
        { id: 'services', label: 'Service Hub', icon: Layers },
        { id: 'blogs', label: 'Editorial', icon: FileText },
        { id: 'contact', label: 'Relations', icon: Phone },
    ];

    return (
        <div className="h-screen bg-slate-50 flex overflow-hidden font-sans">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? '280px' : '84px' }}
                className="bg-slate-900 relative z-50 hidden md:flex flex-col shadow-2xl"
            >
                <div className="p-6 h-20 flex items-center justify-between overflow-hidden border-b border-white/5">
                    <AnimatePresence mode="wait">
                        {isSidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex items-center gap-3 shrink-0"
                            >
                                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Shield size={20} className="text-white" />
                                </div>
                                <h1 className="text-xl font-bold text-white tracking-tight">Admin <span className="text-blue-400 font-black">PRO</span></h1>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white/40 hover:text-white transition-colors">
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 relative group ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'group-hover:text-blue-400'} />
                            {isSidebarOpen && <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>}
                            {activeTab === item.id && <motion.div layoutId="active" className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full" />}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-red-500/10 hover:text-red-500 transition-all font-bold text-xs uppercase tracking-widest"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span>Exit Console</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-20 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-lg font-black text-slate-900 uppercase tracking-tight">Admin <span className="text-blue-600">PRO</span></h1>
                </div>
                <button onClick={() => setIsMobileMenuOpen(true)} className="text-blue-600 p-2">
                    <Menu size={24} />
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-screen pt-20 md:pt-0 bg-slate-50">
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 hidden md:flex sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">Control Center</span>
                        <div className="px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">System Online</span>
                        </div>
                        <div className="flex gap-2">
                            {apiDiscoveryList.map(url => (
                                <div key={url} className={`px-2 py-0.5 rounded text-[8px] font-mono border ${discoveryResults[url] === 'ONLINE (MATCH)' ? 'bg-green-50 border-green-200 text-green-600' : 'bg-slate-50 border-slate-200 text-slate-400 opacity-50'}`}>
                                    {url.split('://')[1].substring(0, 15)}... : {discoveryResults[url] || 'TESTING'}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        Directory <span className="text-slate-200">/</span> <span className="text-blue-600">{activeTab.toUpperCase()}</span>
                    </div>
                </header>

                <div className="p-6 md:p-12 max-w-6xl mx-auto">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'jobs' && <AdminJobs />}
                        {activeTab === 'services' && <AdminServices />}
                        {activeTab === 'blogs' && <AdminBlogs />}
                        {activeTab === 'contact' && <AdminContact />}
                    </motion.div>
                </div>
            </main>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] md:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            className="fixed right-0 top-0 h-full w-4/5 bg-white z-[70] md:hidden shadow-2xl p-8"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Admin <span className="text-blue-600">PRO</span></h2>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400">
                                    <X size={24} />
                                </button>
                            </div>
                            <nav className="space-y-4">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                                        className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 bg-slate-50'}`}
                                    >
                                        <item.icon size={20} />
                                        <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                            <div className="absolute bottom-8 left-8 right-8">
                                <button
                                    onClick={() => setIsAuthenticated(false)}
                                    className="w-full flex items-center justify-center gap-4 px-6 py-5 rounded-2xl bg-red-50 text-red-600 font-black text-xs uppercase tracking-widest border border-red-100"
                                >
                                    <LogOut size={20} />
                                    <span>Exit Console</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPage;
