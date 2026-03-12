import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { blogPosts as staticBlogPosts } from '../data/blogPosts';
import { Link } from 'react-router-dom';
import API_URL from '../config';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch(`${API_URL}/api/blogs`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setBlogs(data);
                } else {
                    setBlogs(staticBlogPosts);
                }
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setBlogs(staticBlogPosts);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <section id="blog" className="py-28 bg-dark relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Latest <span className="text-primary">Insights</span></h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                    <p className="mt-8 text-white/50 max-w-2xl mx-auto text-xl font-normal leading-relaxed">
                        Stay updated with the latest trends and news from the tech world.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {blogs.map((post) => (
                        <div key={post.id} className="bg-[#09090b] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 group">
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={post.image?.startsWith('http') ? post.image : `${API_URL}${post.image}`}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-primary text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">
                                    Insights
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center text-xs text-white/40 mb-4 space-x-6">
                                    <span className="flex items-center"><Calendar className="h-4 w-4 mr-2" /> {new Date(post.date).toLocaleDateString()}</span>
                                    <span className="flex items-center"><User className="h-4 w-4 mr-2" /> {post.author}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors tracking-tight">
                                    {post.title}
                                </h3>
                                <p className="text-white/40 mb-6 line-clamp-3 text-sm">
                                    {post.excerpt}
                                </p>
                                <Link to={`/blog/${post.id}`} className="inline-flex items-center text-primary font-bold text-xs hover:translate-x-1 transition-transform duration-300 gap-2">
                                    Read Full Story <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
