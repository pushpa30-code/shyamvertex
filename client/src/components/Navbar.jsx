import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../images/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Disable body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
            document.body.style.position = 'static';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
            document.body.style.position = 'static';
        };
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/#services' },
        { name: 'Products', path: '/product' },
        { name: 'Careers', path: '/career' },
        { name: 'Help', path: '/#faq' },
        { name: 'Contact Us', path: '/#contact' },
    ];

    const scrollToSection = (path) => {
        setIsOpen(false);

        // Handle direct routes (non-hash)
        if (!path.includes('#')) {
            navigate(path);
            window.scrollTo(0, 0);
            return;
        }

        // Handle hash routes
        const [basePath, hash] = path.split('#');
        const id = hash;

        if (location.pathname === basePath || (basePath === '/' && location.pathname === '/')) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to base then scroll
            navigate(basePath);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    return (
        <nav className="bg-dark/80 backdrop-blur-md text-white sticky top-0 z-[100] shadow-2xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group transition-transform active:scale-95">
                            <img src={logo} alt="Shyam Vertex Logo" className="h-14 md:h-16 w-auto object-contain drop-shadow-2xl" />
                            <span className="font-bold text-xl md:text-2xl tracking-tight text-white flex items-center gap-1 group-hover:text-primary transition-all">
                                Shyam<span className="text-primary">Vertex</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.path)}
                                    className="text-white/60 hover:text-primary px-1 py-2 text-sm font-medium transition-all cursor-pointer bg-transparent border-0 border-b-2 border-transparent hover:border-primary"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-white hover:bg-white/10 focus:outline-none transition-colors duration-300"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:hidden fixed inset-0 flex flex-col h-[100dvh] w-screen bg-black z-[100]"
                    >
                        {/* Mobile Header */}
                        <div className="flex items-center justify-between h-20 px-6 border-b border-white/10 shrink-0">
                            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                                <img src={logo} alt="Shyam Vertex Logo" className="h-10 w-auto" />
                                <span className="font-black text-2xl tracking-tighter text-white uppercase flex items-center gap-1">
                                    SHYAM<span className="text-primary">VERTEX</span>
                                </span>
                            </Link>
                            <button onClick={() => setIsOpen(false)} className="p-2 text-primary">
                                <X className="h-8 w-8" />
                            </button>
                        </div>

                        {/* Mobile Links */}
                        <div className="flex-grow overflow-y-auto px-8 py-10 space-y-1 bg-black">
                            {navLinks.map((link, index) => (
                                <motion.button
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => scrollToSection(link.path)}
                                    className="w-full text-left py-5 flex justify-between items-center group border-b border-white/5"
                                >
                                    <span className="text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors tracking-tight">
                                        {link.name}
                                    </span>
                                    <ChevronRight className="h-6 w-6 text-primary/20 group-hover:text-primary transition-all group-hover:translate-x-2" />
                                </motion.button>
                            ))}
                        </div>

                        {/* Mobile Footer */}
                        <div className="p-8 bg-black border-t border-white/5 text-center shrink-0">
                            <p className="text-zinc-700 text-[10px] font-black tracking-[0.4em] uppercase">
                                Shyam Vertex © 2026
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
