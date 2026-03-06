import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Code, Smartphone, Layout, Cloud, Database, Monitor, Server, Globe, Cpu } from 'lucide-react';
import API_URL from '../../config';

const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newService, setNewService] = useState({ title: '', description: '', icon: 'Code' });

    const ICONS = ['Code', 'Smartphone', 'Layout', 'Cloud', 'Database', 'Monitor', 'Server', 'Globe', 'Cpu'];

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch(`${API_URL}/api/services`);
            const data = await res.json();
            if (Array.isArray(data)) setServices(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;
        try {
            await fetch(`${API_URL}/api/services/${id}`, { method: 'DELETE' });
            fetchServices();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newService)
            });
            if (res.ok) {
                setNewService({ title: '', description: '', icon: 'Code' });
                setShowForm(false);
                fetchServices();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-charcoal p-8 rounded-[2rem] border border-white/5">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-white border-l-4 border-primary pl-4 uppercase tracking-tight">Manage Services</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-3 bg-primary text-dark px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-yellow-glow shadow-xl shadow-primary/20 transition-all"
                >
                    <Plus size={20} /> Add Service
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-12 p-8 bg-dark rounded-[2rem] border border-white/10 shadow-2xl relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px]"></div>
                    <div className="grid gap-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="Service Title"
                                className="w-full px-6 py-4 bg-charcoal border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-bold"
                                value={newService.title}
                                onChange={e => setNewService({ ...newService, title: e.target.value })}
                                required
                            />
                            <select
                                className="w-full px-6 py-4 bg-charcoal border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-bold appearance-none cursor-pointer"
                                value={newService.icon}
                                onChange={e => setNewService({ ...newService, icon: e.target.value })}
                            >
                                {ICONS.map(icon => <option key={icon} value={icon} className="bg-dark text-white">{icon}</option>)}
                            </select>
                        </div>
                        <textarea
                            placeholder="Service Description"
                            className="w-full px-6 py-4 bg-charcoal border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium h-32 resize-none"
                            value={newService.description}
                            onChange={e => setNewService({ ...newService, description: e.target.value })}
                            required
                        />
                        <div className="flex justify-end gap-4 pt-2">
                            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 text-accent hover:text-white font-bold uppercase tracking-widest text-xs transition-colors">Cancel</button>
                            <button type="submit" className="px-8 py-3 bg-primary text-dark rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-yellow-glow shadow-xl shadow-primary/20 transition-all">Save Service</button>
                        </div>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {services.map(service => (
                    <div key={service.id} className="flex justify-between items-center p-6 bg-dark border border-white/5 rounded-[2rem] hover:border-primary/30 transition-all duration-300 group shadow-2xl">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-dark transition-all duration-500 shadow-[inset_0_0_20px_rgba(255,208,0,0.05)]">
                                {service.icon === 'Code' && <Code size={28} />}
                                {service.icon === 'Smartphone' && <Smartphone size={28} />}
                                {service.icon === 'Layout' && <Layout size={28} />}
                                {service.icon === 'Cloud' && <Cloud size={28} />}
                                {service.icon === 'Database' && <Database size={28} />}
                                {service.icon === 'Monitor' && <Monitor size={28} />}
                                {service.icon === 'Server' && <Server size={28} />}
                                {service.icon === 'Globe' && <Globe size={28} />}
                                {service.icon === 'Cpu' && <Cpu size={28} />}
                            </div>
                            <div>
                                <h3 className="font-black text-xl text-white mb-1">{service.title}</h3>
                                <p className="text-accent text-sm font-light max-w-xl">{service.description}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(service.id)}
                            className="text-white/20 hover:text-red-500 p-4 bg-white/5 rounded-2xl transition-all hover:bg-red-500/10"
                        >
                            <Trash2 size={24} />
                        </button>
                    </div>
                ))}
                {services.length === 0 && !loading && <p className="text-center text-gray-500">No services found.</p>}
            </div>
        </div>
    );
};

export default AdminServices;
