import React, { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';

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
            const response = await fetch('http://localhost:5000/api/apply', {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-10">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 relative my-auto">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-lg">
                    <h3 className="text-xl font-semibold text-primary">Apply for {distinctRole}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {status === 'success' ? (
                        <div className="text-center py-8">
                            <div className="text-green-500 text-5xl mb-4">✓</div>
                            <h4 className="text-2xl font-bold text-gray-800">Application Sent!</h4>
                            <p className="text-gray-600 mt-2">Thank you for applying. We will reach out to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {status === 'error' && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Error: </strong>
                                    <span className="block sm:inline">{errorMessage}</span>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        required
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Key Skills *</label>
                                <input
                                    type="text"
                                    name="skills"
                                    required
                                    value={formData.skills}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white"
                                    placeholder="React, Node.js, Python, Design..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                                <input
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white"
                                    placeholder="e.g. 2 years"
                                />
                            </div>

                            {/* Conditional Fields */}
                            {isFreelance ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Link *</label>
                                    <input
                                        type="url"
                                        name="portfolio"
                                        required
                                        value={formData.portfolio}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white"
                                        placeholder="https://yourportfolio.com"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Resume / CV *</label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                                <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
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
                                    {resumeFile && (
                                        <p className="text-sm text-green-600 mt-2 font-medium">Selected: {resumeFile.name}</p>
                                    )}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {isFreelance ? 'Proposed Rate / Services' : 'Projects / Cover Letter'}
                                </label>
                                <textarea
                                    name="projects"
                                    rows="3"
                                    value={formData.projects}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white"
                                    placeholder={isFreelance ? "Describe your services and expected rate..." : "Tell us about your recent projects..."}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className={`w-full py-3 px-4 rounded-md text-white font-medium ${status === 'submitting' ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
                                    } transition-colors duration-200`}
                            >
                                {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationForm;
