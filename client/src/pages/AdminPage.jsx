import React, { useState, useEffect } from 'react';
import { Shield, Check, X, LogIn } from 'lucide-react';

import API_URL from '../config';

const AdminPage = () => {
    const [jobStatuses, setJobStatuses] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    // Simple client-side auth for demonstration
    const ADMIN_PASSWORD = "admin";

    const DEFAULT_JOBS = [
        { role_id: 'fulltime', is_hiring: true, label: 'Full-time' },
        { role_id: 'internship', is_hiring: true, label: 'Internship' },
        { role_id: 'freelance', is_hiring: true, label: 'Freelance' }
    ];

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = () => {
        fetch(`${API_URL}/api/jobs`)
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

        fetch(`${API_URL}/api/jobs/update`, {
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
                                {jobStatuses.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                        <p className="text-gray-500">No job roles found. Please check your database connection.</p>
                                    </div>
                                ) : (
                                    jobStatuses.map((job) => (
                                        <div key={job.role_id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow gap-4">
                                            <div className="text-center sm:text-left">
                                                <h3 className="text-lg font-bold text-gray-800">{job.label}</h3>
                                                <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.is_hiring ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {job.is_hiring ? 'Active · Hiring Open' : 'Inactive · Hiring Closed'}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <label className="flex items-center cursor-pointer relative">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only"
                                                        checked={job.is_hiring}
                                                        onChange={() => toggleStatus(job.role_id, job.is_hiring)}
                                                    />
                                                    <div className={`w-14 h-7 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary transition-colors ${job.is_hiring ? 'bg-green-500' : ''}`}></div>
                                                    <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${job.is_hiring ? 'translate-x-7' : ''}`}></div>
                                                    <span className="ml-3 text-sm font-medium text-gray-700 sm:hidden">
                                                        {job.is_hiring ? 'Turn Off' : 'Turn On'}
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    ))
                                )}
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
