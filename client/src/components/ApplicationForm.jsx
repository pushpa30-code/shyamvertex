import React, { useState, useRef } from 'react';
import { X, Upload, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

import API_URL from '../config';

const ApplicationForm = ({ isOpen, onClose, distinctRole }) => {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        experience: '',
        projects: '',
        skills: '',
        portfolio: ''
    });
    const [resumeFile, setResumeFile] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState('');

    if (!isOpen) return null;

    const isFreelance = distinctRole === 'Freelance';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (status === 'error') setStatus('idle'); // Clear error on change
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const data = new FormData();
        data.append('role', distinctRole);
        data.append('name', formData.name);
        data.append('mobile', formData.mobile);
        data.append('email', formData.email);
        data.append('experience', formData.experience);
        data.append('skills', formData.skills);
        data.append('projects', formData.projects);

        if (isFreelance) {
            data.append('portfolio', formData.portfolio);
        } else if (resumeFile) {
            data.append('resume', resumeFile);
        }

        try {
            const response = await fetch(`${API_URL}/api/apply`, {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setFormData({
                        name: '', mobile: '', email: '', experience: '', projects: '', skills: '', portfolio: ''
                    });
                    setResumeFile(null);
                }, 2000);
            } else {
                setStatus('error');
                setErrorMessage(result.message || 'Failed to submit application.');
                console.error('Server responded with error:', result);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setErrorMessage('Network error. Please try again later.');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/95 backdrop-blur-xl overflow-y-auto py-10">
            <div className="bg-charcoal border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-lg mx-4 relative my-auto overflow-hidden">
                <div className="flex justify-between items-center p-8 border-b border-white/5 sticky top-0 bg-charcoal/80 backdrop-blur-md z-10">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Apply / <span className="text-primary italic">{distinctRole}</span></h3>
                    <button onClick={onClose} className="text-accent hover:text-primary transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20"
                            >
                                <div className="text-primary text-4xl">✓</div>
                            </motion.div>
                            <h4 className="text-2xl font-black text-white uppercase tracking-tight">Application Sent!</h4>
                            <p className="text-accent mt-3 font-medium">Your credentials have been transmitted to our recruitment matrix.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {status === 'error' && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest" role="alert">
                                    <strong className="font-black">Error: </strong>
                                    <span>{errorMessage}</span>
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-dark border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-bold"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        required
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-dark border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-bold"
                                        placeholder="+91 00000 00000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-dark border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-bold"
                                        placeholder="john@vertex.sh"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Key Skills</label>
                                <input
                                    type="text"
                                    name="skills"
                                    required
                                    value={formData.skills}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-dark border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-bold"
                                    placeholder="React, Node.js, AI, etc."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Experience (Years)</label>
                                <input
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-dark border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-bold"
                                    placeholder="e.g. 5+ years"
                                />
                            </div>

                            {/* Conditional Fields */}
                            {isFreelance ? (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Portfolio Link</label>
                                    <input
                                        type="url"
                                        name="portfolio"
                                        required
                                        value={formData.portfolio}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-dark border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-bold"
                                        placeholder="https://portfolio.vertex.sh"
                                    />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Secure Transmission (CV)</label>
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/10 border-dashed rounded-[2rem] cursor-pointer bg-dark hover:bg-dark/80 hover:border-primary/50 transition-all duration-300 group">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-3 text-white/20 group-hover:text-primary transition-colors" />
                                                    <p className="mb-1 text-xs text-white/40 font-black uppercase tracking-widest"><span className="text-primary">Click</span> to upload</p>
                                                    <p className="text-[10px] text-white/20 font-bold uppercase">PDF, DOC (MAX. 5MB)</p>
                                                </div>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    className="hidden"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={handleFileChange}
                                                    required
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    {resumeFile && (
                                        <p className="text-[10px] text-primary mt-2 font-black uppercase tracking-widest flex items-center gap-2">
                                            <Shield size={12} />
                                            Selected: {resumeFile.name}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">
                                    {isFreelance ? 'Proposed Services' : 'Cover Letter Matrix'}
                                </label>
                                <textarea
                                    name="projects"
                                    rows="4"
                                    value={formData.projects}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-dark border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium resize-none"
                                    placeholder={isFreelance ? "Describe your capabilities..." : "Why do you belong at Vertex?"}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className={`w-full py-5 rounded-2xl text-dark font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-2xl ${status === 'submitting'
                                    ? 'bg-white/10 text-white/20 cursor-not-allowed border border-white/5'
                                    : 'bg-primary hover:bg-yellow-glow shadow-primary/20 transform hover:-translate-y-1'
                                    }`}
                            >
                                {status === 'submitting' ? 'Transmitting...' : 'Transmit Application'}
                            </button>
                        </form>
                    )
                    }
                </div >
            </div >
        </div >
    );
};

export default ApplicationForm;
