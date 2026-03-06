import React, { useState } from 'react';
import { Shield, LogIn, Briefcase, Layers, FileText, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

import AdminJobs from '../components/admin/AdminJobs';
import AdminServices from '../components/admin/AdminServices';
import AdminBlogs from '../components/admin/AdminBlogs';
import AdminContact from '../components/admin/AdminContact';

const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('jobs');

    // Simple client-side auth for demonstration
    const ADMIN_PASSWORD = "admin";

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect Password');
        }
    };

    // Login UI - Premium Light Theme
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-dark relative overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            rotate: -360,
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-[100px]"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="bg-charcoal/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative">
                        {/* Brand Logo/Icon */}
                        <div className="flex justify-center mb-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.6, bounce: 0.5 }}
                                className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20 transform rotate-3"
                            >
                                <Shield className="w-10 h-10 text-dark" />
                            </motion.div>
                        </div>

                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-black text-white tracking-tight uppercase">Dashboard</h2>
                            <p className="text-accent mt-3 text-sm font-bold uppercase tracking-widest opacity-60">Authentication Required</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] ml-1">Access Key</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Shield className="h-5 w-5 text-white/20 group-focus-within:text-primary transition-colors duration-300" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-6 py-5 bg-dark border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 outline-none transition-all duration-300 font-bold tracking-[0.3em] hover:bg-dark/80"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(255,208,0,0.3)" }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-primary text-dark py-5 rounded-2xl font-black text-lg shadow-2xl shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group uppercase tracking-widest"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <LogIn className="w-6 h-6 relative z-10" />
                                <span className="relative z-10">Authorize</span>
                            </motion.button>
                        </form>

                        <div className="mt-10 pt-8 border-t border-white/5 text-center">
                            <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">
                                Secured by <span className="text-primary">Vertex Protocol</span>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'jobs': return <AdminJobs />;
            case 'services': return <AdminServices />;
            case 'blogs': return <AdminBlogs />;
            case 'contact': return <AdminContact />;
            default: return <AdminJobs />;
        }
    };

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-3 px-8 py-5 font-bold transition-all border-b-2 uppercase tracking-widest text-xs ${activeTab === id
                ? 'border-primary text-primary bg-primary/10'
                : 'border-transparent text-accent hover:text-white hover:bg-white/5'
                }`}
        >
            <Icon size={18} />
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-dark">
            <div className="bg-charcoal border-b border-white/5 shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center">
                            <Shield className="w-10 h-10 text-primary mr-4" />
                            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Admin <span className="text-primary italic">Panel</span></h1>
                        </div>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="ml-4 flex items-center text-accent hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs"
                        >
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Tabs */}
                <div className="bg-charcoal rounded-t-[2rem] shadow-2xl border border-white/10 flex overflow-x-auto">
                    <TabButton id="jobs" label="Hiring" icon={Briefcase} />
                    <TabButton id="services" label="Services" icon={Layers} />
                    <TabButton id="blogs" label="Blogs" icon={FileText} />
                    <TabButton id="contact" label="Contact Info" icon={Phone} />
                </div>

                {/* Content Area */}
                <div className="bg-charcoal rounded-b-[2rem] shadow-2xl p-10 min-h-[600px] border-x border-b border-white/10">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
