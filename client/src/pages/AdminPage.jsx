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
            <div className="min-h-screen flex items-center justify-center px-4 bg-[#f8fafc] relative overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[80px]"
                    />
                    <motion.div
                        animate={{
                            rotate: -360,
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-[80px]"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="bg-white/80 backdrop-blur-md border border-white/50 p-10 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative">
                        {/* Brand Logo/Icon */}
                        <div className="flex justify-center mb-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.6, bounce: 0.5 }}
                                className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 transform rotate-3"
                            >
                                <Shield className="w-8 h-8 text-white" />
                            </motion.div>
                        </div>

                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
                            <p className="text-gray-500 mt-2 text-sm font-medium">Please sign in to your dashboard</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Shield className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter secure key"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all duration-300 font-medium hover:bg-white hover:shadow-sm"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01, boxShadow: "0 10px 25px -5px rgba(2, 44, 34, 0.3)" }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <LogIn className="w-5 h-5 relative z-10" />
                                <span className="relative z-10">Sign In</span>
                            </motion.button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-xs text-gray-400 font-medium">
                                Secured by <span className="text-primary font-bold">ShyamVertex</span>
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
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${activeTab === id
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
        >
            <Icon size={18} />
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Shield className="w-8 h-8 text-primary mr-3" />
                            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="ml-4 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="bg-white rounded-t-xl shadow-sm border-b border-gray-200 flex overflow-x-auto">
                    <TabButton id="jobs" label="Hiring" icon={Briefcase} />
                    <TabButton id="services" label="Services" icon={Layers} />
                    <TabButton id="blogs" label="Blogs" icon={FileText} />
                    <TabButton id="contact" label="Contact Info" icon={Phone} />
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-b-xl shadow p-6 min-h-[500px]">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
