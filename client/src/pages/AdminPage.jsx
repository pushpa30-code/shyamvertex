import React, { useState, useEffect } from 'react';
import { Shield, Check, X, LogIn } from 'lucide-react';

const AdminPage = () => {
    const [jobStatuses, setJobStatuses] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    // Simple client-side auth for demonstration
    const ADMIN_PASSWORD = "admin";

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = () => {
        fetch('http://localhost:5000/api/jobs')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setJobStatuses(data);
                } else {
                    console.error('API Error:', data);
                    setJobStatuses([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching jobs:', err);
                setLoading(false);
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect Password');
        }
    };

    const toggleStatus = (role_id, currentStatus) => {
        const newStatus = !currentStatus;

        // Optimistic update
        setJobStatuses(prev => prev.map(job =>
            job.role_id === role_id ? { ...job, is_hiring: newStatus } : job
        ));

        fetch('http://localhost:5000/api/jobs/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role_id, is_hiring: newStatus })
        })
            .then(res => res.json())
            .then(data => {
                // success
            })
            .catch(err => {
                console.error('Error updating status:', err);
                // Revert on error
                fetchJobs();
            });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <div className="text-center mb-6">
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Admin Access</h2>
                        <p className="text-gray-500">Please enter password to manage hiring.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                        >
                            <LogIn className="w-4 h-4" /> Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-primary px-6 py-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Shield className="w-6 h-6" />
                            Hiring Control Panel
                        </h1>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="text-white/80 hover:text-white text-sm font-medium"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="p-6">
                        {loading ? (
                            <div className="text-center py-8">Loading...</div>
                        ) : (
                            <div className="space-y-4">
                                {jobStatuses.map((job) => (
                                    <div key={job.role_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{job.label}</h3>
                                            <p className={`text-sm ${job.is_hiring ? 'text-green-600' : 'text-red-500'}`}>
                                                Status: {job.is_hiring ? 'Hiring Open' : 'Hiring Closed'}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => toggleStatus(job.role_id, job.is_hiring)}
                                            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${job.is_hiring ? 'bg-green-500' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${job.is_hiring ? 'translate-x-7' : 'translate-x-1'
                                                    }`}
                                            >
                                                {job.is_hiring ? (
                                                    <Check className="h-4 w-4 text-green-500 mx-auto mt-1" />
                                                ) : (
                                                    <X className="h-4 w-4 text-gray-400 mx-auto mt-1" />
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
                            <strong>Note:</strong> Changes are applied immediately. Check the Career page to see the updates.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
