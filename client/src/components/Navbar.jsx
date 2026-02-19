import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import logo from '../images/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/#about' },
        { name: 'Services', path: '/#services' },
        { name: 'Careers', path: '/career' },
        { name: 'Help', path: '/#faq' },
        { name: 'Contact Us', path: '/#contact' },
    ];

    const scrollToSection = (path) => {
        setIsOpen(false);

        // Handle direct routes (non-hash)
        if (!path.startsWith('/#')) {
            navigate(path);
            window.scrollTo(0, 0);
            return;
        }

        // Handle hash routes
        const id = path.replace('/#', '');
        if (location.pathname === '/') {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to home then scroll
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    return (
        <nav className="bg-primary text-white sticky top-0 z-50 shadow-xl border-b border-secondary/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img src={logo} alt="Shyam Vertex Logo" className="h-14 md:h-24 w-auto object-contain" />
                            <span className="font-bold text-lg md:text-2xl tracking-tight text-white group-hover:text-secondary transition-colors duration-300">ShyamVertex</span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.path)}
                                    className="text-gray-300 hover:text-secondary hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 border-b-2 border-transparent hover:border-secondary cursor-pointer bg-transparent border-0"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-white hover:bg-white/10 focus:outline-none transition-colors duration-300"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden animate-fade-in-down">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary border-t border-secondary/20">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.path)}
                                className="w-full text-left text-gray-300 hover:bg-white/5 hover:text-secondary block px-3 py-2 rounded-md text-base font-medium flex justify-between items-center transition-colors duration-300"
                            >
                                {link.name}
                                <ChevronRight className="h-4 w-4 text-secondary" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
