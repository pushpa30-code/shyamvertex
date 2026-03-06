import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import API_URL from '../../config';

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newBlog, setNewBlog] = useState({ title: '', excerpt: '', content: '', author: '', date: new Date().toISOString().split('T')[0] });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch(`${API_URL}/api/blogs`);
            const data = await res.json();
            if (Array.isArray(data)) setBlogs(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;
        try {
            await fetch(`${API_URL}/api/blogs/${id}`, { method: 'DELETE' });
            fetchBlogs();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newBlog.title);
        formData.append('excerpt', newBlog.excerpt);
        formData.append('content', newBlog.content);
        formData.append('author', newBlog.author);
        formData.append('date', newBlog.date);
        if (imageFile) formData.append('image', imageFile);

        try {
            const res = await fetch(`${API_URL}/api/blogs`, {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                setNewBlog({ title: '', excerpt: '', content: '', author: '', date: new Date().toISOString().split('T')[0] });
                setImageFile(null);
                setShowForm(false);
                fetchBlogs();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-charcoal p-8 rounded-[2rem] border border-white/5">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-white border-l-4 border-primary pl-4 uppercase tracking-tight">Blog Management</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-3 bg-primary text-dark px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-yellow-glow shadow-xl shadow-primary/20 transition-all"
                >
                    <Plus size={20} /> New Post
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-12 p-8 bg-dark rounded-[2rem] border border-white/10 shadow-2xl relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px]"></div>
                    <div className="grid gap-6 relative z-10">
                        <input
                            type="text"
                            placeholder="Creative Title"
                            className="w-full px-6 py-4 bg-charcoal border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-bold"
                            value={newBlog.title}
                            onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Hook/Excerpt (First impression counts)"
                            className="w-full px-6 py-4 bg-charcoal border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium h-24 resize-none"
                            value={newBlog.excerpt}
                            onChange={e => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Full Article Content (HTML Supported)"
                            className="w-full px-6 py-4 bg-charcoal border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium h-48 resize-none"
                            value={newBlog.content}
                            onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                            required
                        />
                        <div className="grid grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="Author Name"
                                className="w-full px-6 py-4 bg-charcoal border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-bold"
                                value={newBlog.author}
                                onChange={e => setNewBlog({ ...newBlog, author: e.target.value })}
                            />
                            <input
                                type="date"
                                className="w-full px-6 py-4 bg-charcoal border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-bold"
                                value={newBlog.date}
                                onChange={e => setNewBlog({ ...newBlog, date: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-3 cursor-pointer bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hover:bg-white/10 transition-all font-bold uppercase tracking-widest text-xs text-white">
                                <Upload size={18} className="text-primary" /> Upload Banner
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={e => setImageFile(e.target.files[0])}
                                />
                            </label>
                            {imageFile && <span className="text-xs text-primary font-bold uppercase tracking-widest">{imageFile.name}</span>}
                        </div>
                        <div className="flex justify-end gap-4 pt-4">
                            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 text-accent hover:text-white font-bold uppercase tracking-widest text-xs transition-colors">Cancel</button>
                            <button type="submit" className="px-10 py-3 bg-primary text-dark rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-yellow-glow shadow-xl shadow-primary/20 transition-all">Publish Live</button>
                        </div>
                    </div>
                </form>
            )}

            <div className="grid gap-4">
                {blogs.map(blog => (
                    <div key={blog.id} className="flex gap-6 p-6 bg-dark border border-white/5 rounded-[2.5rem] hover:border-primary/30 transition-all duration-300 group shadow-2xl">
                        <div className="w-32 h-32 flex-shrink-0 bg-charcoal rounded-3xl overflow-hidden border border-white/10 shadow-inner">
                            {blog.image ? (
                                <img src={`${API_URL}${blog.image}`} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/10">
                                    <ImageIcon size={32} />
                                </div>
                            )}
                        </div>
                        <div className="flex-grow py-2">
                            <h3 className="font-black text-xl text-white mb-2 group-hover:text-primary transition-colors">{blog.title}</h3>
                            <p className="text-accent text-sm font-light line-clamp-2 mb-4">{blog.excerpt}</p>
                            <div className="flex gap-6 items-center">
                                <span className="text-[10px] uppercase font-black tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/20">
                                    {blog.author}
                                </span>
                                <span className="text-[10px] uppercase font-black tracking-widest text-white/30">
                                    {new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(blog.id)}
                            className="text-white/20 hover:text-red-500 p-4 bg-white/5 rounded-2xl transition-all hover:bg-red-500/10 self-center"
                        >
                            <Trash2 size={24} />
                        </button>
                    </div>
                ))}
                {blogs.length === 0 && !loading && <p className="text-center text-gray-500">No blog posts found.</p>}
            </div>
        </div>
    );
};

export default AdminBlogs;
