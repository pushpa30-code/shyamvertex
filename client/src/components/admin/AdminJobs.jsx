import React, { useState, useEffect } from 'react';
import API_URL from '../../config';

const AdminJobs = () => {
    const [jobStatuses, setJobStatuses] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <div className="text-center py-8">Loading jobs...</div>;

    return (
        <div className="bg-charcoal p-8 rounded-[2rem] border border-white/5">
            <h2 className="text-2xl font-black text-white mb-8 border-l-4 border-primary pl-4 uppercase tracking-tight">Hiring Console</h2>
            <div className="space-y-4">
                {jobStatuses.length === 0 ? (
                    <div className="text-center py-20 bg-dark rounded-[2rem] border-2 border-dashed border-white/10">
                        <p className="text-accent font-bold uppercase tracking-widest text-sm opacity-50">No job roles found</p>
                    </div>
                ) : (
                    jobStatuses.map((job) => (
                        <div key={job.role_id} className="flex flex-col sm:flex-row items-center justify-between p-6 bg-dark rounded-[2rem] border border-white/5 shadow-2xl hover:border-primary/30 transition-all duration-300 gap-6">
                            <div className="text-center sm:text-left">
                                <h3 className="text-xl font-bold text-white mb-2">{job.label}</h3>
                                <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${job.is_hiring ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${job.is_hiring ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                                    {job.is_hiring ? 'Recruitment Active' : 'Recruitment Paused'}
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
                                    <div className={`w-16 h-8 bg-white/5 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary transition-all duration-300 ${job.is_hiring ? 'bg-primary' : ''}`}></div>
                                    <div className={`absolute left-1 top-1 w-6 h-6 rounded-half flex items-center justify-center bg-white shadow-xl transition-all duration-300 ${job.is_hiring ? 'translate-x-8 scale-90' : 'scale-75 opacity-50'}`}>
                                        <div className={`w-2 h-2 rounded-full ${job.is_hiring ? 'bg-dark' : 'bg-dark'}`}></div>
                                    </div>
                                    <span className="ml-4 text-xs font-black uppercase tracking-widest text-accent sm:hidden">
                                        {job.is_hiring ? 'Active' : 'Paused'}
                                    </span>
                                </label>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="mt-10 p-6 bg-primary/5 rounded-2xl text-xs text-primary border border-primary/20 font-bold uppercase tracking-widest flex items-center gap-3">
                <Shield className="w-5 h-5" />
                <span>Changes are pushed to live production immediately.</span>
            </div>
        </div>
    );
};

export default AdminJobs;
