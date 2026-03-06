import React from 'react';
import { ArrowRight, Briefcase, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const Careers = () => {
    return (
        <section id="careers" className="py-24 bg-charcoal">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Join Our <span className="text-primary">Team</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xl text-accent max-w-2xl mx-auto font-light"
                    >
                        Be part of a dynamic team that's shaping the future of technology.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {[
                        {
                            icon: <Users className="w-10 h-10 text-primary" />,
                            title: "Great Culture",
                            description: "Work with passionate people in a supportive and collaborative environment."
                        },
                        {
                            icon: <Zap className="w-10 h-10 text-primary" />,
                            title: "Fast Growth",
                            description: "Accelerate your career with challenging projects and continuous learning."
                        },
                        {
                            icon: <Briefcase className="w-10 h-10 text-primary" />,
                            title: "Impactful Work",
                            description: "Build solutions that matter and make a real difference in the world."
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-dark p-8 rounded-3xl shadow-xl border-t-4 border-primary text-center group hover:scale-[1.02] transition-all duration-300"
                        >
                            <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all duration-300 shadow-[inset_0_0_20px_rgba(255,208,0,0.1)]">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-accent leading-relaxed font-light">{item.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center"
                >
                    <Link
                        to="/career"
                        className="inline-flex items-center gap-3 bg-primary hover:bg-orange-glow text-dark font-black py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,208,0,0.3)] hover:shadow-[0_0_30px_rgba(255,138,51,0.5)]"
                    >
                        Explore Career Opportunities
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Careers;
