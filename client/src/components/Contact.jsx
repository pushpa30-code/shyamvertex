import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

import API_URL from '../config';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [contact, setContact] = useState({
        email: 'shyamvertexpvt@gmail.com',
        phone_1: '+91 87993-03431',
        address: 'Vadodara, Gujarat'
    });

    React.useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await fetch(`${API_URL}/api/contact-info`);
                const data = await res.json();
                if (data && data.email) setContact(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchContact();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone) {
            alert('Please fill in all mandatory fields: Name, Email, and Phone Number.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Thank you for your message. We will get back to you soon!');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                alert(result.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Network error. Please try again later.');
        }
    };

    return (
        <section id="contact" className="py-20 md:py-28 bg-dark relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Get In <span className="text-primary">Touch</span></h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                    <p className="mt-8 text-white/50 max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed">
                        Ready to start your next project? Get in touch with us today.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="order-2 lg:order-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8">Let's Connect</h3>
                        <p className="text-white/40 text-base md:text-lg mb-12 leading-relaxed font-normal">
                            Whether you have a question about our services, pricing, or just want to say hello, we'd love to hear from you.
                        </p>

                        <div className="space-y-8 md:space-y-10">
                            {[
                                { icon: <Mail className="h-6 w-6 text-primary" />, title: 'Email Us', info: contact.email, href: `mailto:${contact.email}`, sub: 'Always online' },
                                { icon: <Phone className="h-6 w-6 text-primary" />, title: 'Call Us', info: contact.phone_1, href: `tel:${(contact.phone_1 || '').replace(/[^0-9+]/g, '')}`, sub: 'Mon-Sat 9am-8pm' },
                                { icon: <MapPin className="h-6 w-6 text-primary" />, title: 'Visit Us', info: contact.address, href: '#', sub: 'India - 390019' }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center group transition-all duration-500">
                                    <div className="bg-charcoal p-4 md:p-5 rounded-2xl mr-4 md:mr-6 border border-white/5 group-hover:border-primary/50 group-hover:bg-dark transition-all duration-300 shadow-xl group-hover:scale-110">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg md:text-xl font-bold text-white mb-1">{item.title}</h4>
                                        <a href={item.href} className="text-accent hover:text-primary transition-colors text-base md:text-lg flex flex-col">
                                            <span>{item.info}</span>
                                            <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/30 font-bold mt-1">{item.sub}</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="order-1 lg:order-2 bg-charcoal p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-8 md:mb-10 relative z-10 flex items-center gap-3">
                            <span className="w-10 h-1 bg-primary rounded-full"></span>
                            Send Us a <span className="text-primary">Message</span>
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-6 py-4 bg-dark border border-white/10 text-white rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-white/20"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-6 py-4 bg-dark border border-white/10 text-white rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-white/20"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-4 bg-dark border border-white/10 text-white rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-white/20"
                                    placeholder="+91 XXXXX-XXXXX"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">More Details</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-6 py-4 bg-dark border border-white/10 text-white rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-white/20 resize-none"
                                    placeholder="Tell us about your project goals..."
                                ></textarea>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(255,208,0,0.3)" }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-primary text-dark font-black py-4 md:py-5 rounded-2xl hover:bg-yellow-glow transition-all flex items-center justify-center gap-3 text-base md:text-lg uppercase tracking-widest shadow-2xl"
                            >
                                Send Message <Send className="h-6 w-6" />
                            </motion.button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
