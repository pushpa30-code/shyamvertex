import React from 'react';
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary text-white pt-12 pb-8 border-t border-secondary/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold text-secondary mb-4">ShyamVertex</h3>
                        <p className="text-gray-300 mb-4">
                            Go Vertex, Go Beyond. Delivering cutting-edge IT solutions for a digital world.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/in/shyam-vertex-750b473b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors">
                                <Linkedin className="h-6 w-6" />
                            </a>
                            <a href="https://www.instagram.com/shyamvertex_?igsh=eGhwYzJiZWtpbWtt" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors">
                                <Instagram className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-secondary">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-300 hover:text-secondary transition-colors">Home</a></li>
                            <li><a href="#about" className="text-gray-300 hover:text-secondary transition-colors">About Us</a></li>
                            <li><a href="#services" className="text-gray-300 hover:text-secondary transition-colors">Services</a></li>
                            <li><a href="/career" className="text-gray-300 hover:text-secondary transition-colors">Careers</a></li>
                            <li><a href="#help" className="text-gray-300 hover:text-secondary transition-colors">Help</a></li>
                            <li><a href="#contact" className="text-gray-300 hover:text-secondary transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-secondary">Services</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-300">UI/UX Design</li>
                            <li className="text-gray-300">Web Development</li>
                            <li className="text-gray-300">App Development</li>
                            <li className="text-gray-300">Cloud Services</li>
                            <li className="text-gray-300">IT Consultancy</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-secondary">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Mail className="h-5 w-5 text-secondary mr-3 mt-1" />
                                <a href="mailto:shyamvertexpvt@gmail.com" className="text-gray-300 hover:text-secondary transition-colors">
                                    shyamvertexpvt@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start">
                                <Phone className="h-5 w-5 text-secondary mr-3 mt-1" />
                                <span className="text-gray-300">
                                    <a href="tel:+918799303431" className="hover:text-secondary transition-colors">+91 87993-03431</a>
                                    {' / '}
                                    <a href="tel:+919136462029" className="hover:text-secondary transition-colors">91364-62029</a>
                                </span>
                            </li>
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 text-secondary mr-3 mt-1" />
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Vadodara+Gujarat+390019"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-secondary transition-colors"
                                >
                                    Vadodara, Gujarat-390019
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Shyam Vertex Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
