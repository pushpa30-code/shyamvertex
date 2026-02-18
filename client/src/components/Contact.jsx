import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Thank you for your message. We will get back to you soon!');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                alert(result.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Network error. Please try again later.');
        }
    };

    return (
        <section id="contact" className="py-20 bg-accent">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Contact Us</h2>
                    <div className="w-20 h-1 bg-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Ready to start your next project? Get in touch with us today.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-2xl font-bold text-primary mb-6">Get In Touch</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Whether you have a question about our services, pricing, or just want to say hello, we'd love to hear from you.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-secondary/10 p-3 rounded-lg mr-4">
                                    <Mail className="h-6 w-6 text-secondary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-primary">Email Us</h4>
                                    <p className="text-gray-600">shyamvertexpvt@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-secondary/10 p-3 rounded-lg mr-4">
                                    <Phone className="h-6 w-6 text-secondary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-primary">Call Us</h4>
                                    <p className="text-gray-600">+91 8799303431/9136462029</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-secondary/10 p-3 rounded-lg mr-4">
                                    <MapPin className="h-6 w-6 text-secondary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-primary">Visit Us</h4>
                                    <p className="text-gray-600">Vadodara,Gujarat-390019</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-secondary/20">
                        <h3 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                    placeholder="Project Inquiry"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-secondary text-primary font-bold py-3 rounded-lg hover:bg-primary hover:text-white transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-md"
                            >
                                Send Message <Send className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
