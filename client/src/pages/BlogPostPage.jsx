import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const BlogPostPage = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === parseInt(id));

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-dark">
                <h2 className="text-3xl font-bold text-white mb-6">Post Not Found</h2>
                <Link to="/" className="text-primary hover:text-orange-glow flex items-center gap-2 font-bold uppercase tracking-widest text-sm transition-all">
                    <ArrowLeft className="h-5 w-5" /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-32 bg-dark min-h-screen">
            <article className="container mx-auto px-4 max-w-4xl relative">
                <Link to="/#blog" className="inline-flex items-center text-accent hover:text-primary mb-12 transition-all duration-300 group">
                    <ArrowLeft className="mr-3 w-6 h-6 group-hover:-translate-x-2 transition-transform" />
                    <span className="font-bold uppercase tracking-widest text-sm">Back to Insights</span>
                </Link>

                <h1 className="text-4xl md:text-6xl font-black text-white mb-10 leading-[1.1] tracking-tight">
                    <span className="text-primary">/</span> {post.title}
                </h1>

                <div className="flex flex-wrap items-center text-accent/60 mb-12 gap-8 border-b border-white/10 pb-10 text-sm font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-3"><Calendar className="h-5 w-5 text-primary" /> {post.date}</span>
                    <span className="flex items-center gap-3"><User className="h-5 w-5 text-primary" /> By {post.author}</span>
                </div>

                <div className="relative h-72 md:h-[500px] w-full rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl border border-white/5">
                    <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                </div>

                <div
                    className="prose prose-invert prose-lg max-w-none text-accent leading-relaxed space-y-8 font-light"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>
        </div>
    );
};

export default BlogPostPage;
