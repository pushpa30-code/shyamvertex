import React, { useState, useEffect } from 'react';
import { Save, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import API_URL from '../../config';

const AdminContact = () => {
    const [settings, setSettings] = useState({
        email: '',
        phone_1: '',
        phone_2: '',
        address: '',
        instagram: '',
        linkedin: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch(`${API_URL}/api/contact-info`);
            const data = await res.json();
            if (data) setSettings(prev => ({ ...prev, ...data }));
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        try {
            const res = await fetch(`${API_URL}/api/contact-info`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                setMessage('Contact information updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (err) {
            console.error(err);
            setMessage('Error updating settings.');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <div>Loading settings...</div>;

    return (
        <div className="bg-charcoal p-8 rounded-[2rem] border border-white/5">
            <h2 className="text-2xl font-black text-white mb-10 border-l-4 border-primary pl-4 uppercase tracking-tight">Contact Settings</h2>

            <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { label: 'Primary Support Email', name: 'email', type: 'email', value: settings.email },
                        { label: 'Physical Headquarters', name: 'address', type: 'text', value: settings.address },
                        { label: 'Primary Contact Line', name: 'phone_1', type: 'text', value: settings.phone_1 },
                        { label: 'Secondary Contact Line', name: 'phone_2', type: 'text', value: settings.phone_2 },
                        { label: 'Instagram Profile URL', name: 'instagram', type: 'url', value: settings.instagram },
                        { label: 'LinkedIn Business Page', name: 'linkedin', type: 'url', value: settings.linkedin },
                    ].map((field, idx) => (
                        <div key={idx} className="space-y-3">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] ml-1">{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                value={field.value}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-dark border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-bold"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-3 bg-primary text-dark px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-yellow-glow shadow-2xl shadow-primary/20 transition-all disabled:opacity-50"
                    >
                        {saving ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
                        Save Changes
                    </button>
                    {message && (
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`text-xs font-bold uppercase tracking-widest ${message.includes('Error') ? 'text-red-400' : 'text-primary'}`}
                        >
                            {message}
                        </motion.span>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AdminContact;
