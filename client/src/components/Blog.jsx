import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { Link } from 'react-router-dom';

const Blog = () => {
    return (
        <section id="blog" className="py-28 bg-dark relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Latest <span className="text-primary italic">Insights</span></h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                    <p className="mt-8 text-accent max-w-2xl mx-auto text-xl font-light leading-relaxed">
                        Stay updated with the latest trends and news from the tech world.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="bg-charcoal rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 hover:border-primary/50 transition-all duration-500 group hover:-translate-y-2">
                            <div className="relative h-60 overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-6 left-6 bg-primary text-dark px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                                    Insights
                                </div>
                            </div>
                            <div className="p-10">
                                <div className="flex items-center text-sm text-accent mb-6 space-x-6">
                                    <span className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-primary" /> {post.date}</span>
                                    <span className="flex items-center"><User className="h-4 w-4 mr-2 text-primary" /> {post.author}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-accent mb-8 line-clamp-3 font-light text-lg">
                                    {post.excerpt}
                                </p>
                                <Link to={`/blog/${post.id}`} className="inline-flex items-center text-primary font-bold hover:translate-x-2 transition-transform duration-300 gap-2">
                                    Read Full Story <ArrowRight className="h-5 w-5" />
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
