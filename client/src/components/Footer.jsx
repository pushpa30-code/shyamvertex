import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    // Animation variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Delay between each child animating
                delayChildren: 0.3    // Initial delay before children start animating
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <footer className="relative bg-dark text-white pt-16 pb-8 overflow-hidden border-t border-white/5">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.05, 0.15, 0.05],
                        rotate: [0, 90, 0]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-[50%] -left-[10%] w-[500px] h-[500px] rounded-full bg-white blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.05, 0.15, 0.05],
                        rotate: [0, -90, 0]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-[50%] -right-[10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]"
                />
                {/* Subtle Grid overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtNGgtMnY0aC00djJoNHY0aDJ2LTRoNHYtMmgtNHptMC0zMFYwaC0ydjRoLTR2Mmg0djRoMnYtNGg0VjRoLTR6bS0zMCAwVjBoLTJ2NGgtNHYyaDR2NGgydi00aDRWNGgtNHptMCAzMHYtNGgtMnY0aC00djJoNHY0aDJ2LTRoNHYtMmgtNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-8"
                >
                    {/* Company Info */}
                    <motion.div variants={itemVariants} className="col-span-1 md:col-span-1">
                        <h3 className="text-3xl font-bold text-primary mb-4 drop-shadow-md">ShyamVertex</h3>
                        <p className="text-white/80 mb-6 font-light leading-relaxed">
                            Go Vertex, <span className="text-primary font-medium">Go Beyond</span>. Delivering cutting-edge IT solutions for a digital world.
                        </p>
                        <div className="flex space-x-5">
                            <motion.a
                                whileHover={{ scale: 1.2, color: "#FFD000" }}
                                href="https://www.linkedin.com/in/shyam-vertex-750b473b0" target="_blank" rel="noopener noreferrer" className="text-white/60 transition-colors"
                            >
                                <Linkedin className="h-6 w-6" />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.2, color: "#FFD000" }}
                                href="https://www.instagram.com/shyamvertex_" target="_blank" rel="noopener noreferrer" className="text-white/60 transition-colors"
                            >
                                <Instagram className="h-6 w-6" />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-xl font-semibold mb-6 text-white border-b border-white/20 pb-2 inline-block">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'About Us', 'Services', 'Careers', 'Help', 'Contact Us'].map((link) => (
                                <li key={link}>
                                    <a href={link === 'Home' ? '/' : link === 'Careers' ? '/career' : `#${link.toLowerCase().replace(' ', '')}`} className="text-white/80 hover:text-primary transition-colors flex items-center gap-2 group">
                                        <span className="h-1 w-0 bg-primary transition-all duration-300 group-hover:w-3"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-xl font-semibold mb-6 text-white border-b border-white/20 pb-2 inline-block">Services</h4>
                        <ul className="space-y-3">
                            {['UI/UX Design', 'Web Development', 'App Development', 'Cloud Services', 'IT Consultancy'].map((service) => (
                                <li key={service} className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group cursor-default">
                                    <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-primary transition-colors"></span>
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-xl font-semibold mb-6 text-white border-b border-white/20 pb-2 inline-block">Contact Us</h4>
                        <ul className="space-y-5">
                            <li className="flex items-start group">
                                <Mail className="h-5 w-5 text-primary mr-3 mt-1 group-hover:scale-110 transition-transform" />
                                <a href="mailto:shyamvertexpvt@gmail.com" className="text-white/80 hover:text-white transition-colors">
                                    shyamvertexpvt@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start group">
                                <Phone className="h-5 w-5 text-primary mr-3 mt-1 group-hover:scale-110 transition-transform" />
                                <span className="text-white/80 flex flex-col gap-1">
                                    <a href="tel:+918799303431" className="hover:text-white transition-colors">+91 87993-03431</a>
                                    <a href="tel:+919136462029" className="hover:text-white transition-colors">+91 91364-62029</a>
                                </span>
                            </li>
                            <li className="flex items-start group">
                                <MapPin className="h-5 w-5 text-primary mr-3 mt-1 group-hover:scale-110 transition-transform" />
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Vadodara+Gujarat+390019"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 hover:text-white transition-colors leading-tight"
                                >
                                    Vadodara, Gujarat-390019
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1 }}
                    className="border-t border-white/10 mt-16 pt-8 text-center flex flex-col items-center justify-center gap-2"
                >
                    <div className="flex items-center justify-center gap-2 text-sm text-white/60">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <p>Systems Online & Operational</p>
                    </div>
                    <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} Shyam Vertex Pvt Ltd. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
