import React from 'react';
import { ArrowRight, Briefcase, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const Careers = () => {
    return (
        <section id="careers" className="py-20 bg-accent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-primary mb-4"
                    >
                        Join Our Team
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Be part of a dynamic team that's shaping the future of technology.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {[
                        {
                            icon: <Users className="w-10 h-10 text-secondary" />,
                            title: "Great Culture",
                            description: "Work with passionate people in a supportive and collaborative environment."
                        },
                        {
                            icon: <Zap className="w-10 h-10 text-secondary" />,
                            title: "Fast Growth",
                            description: "Accelerate your career with challenging projects and continuous learning."
                        },
                        {
                            icon: <Briefcase className="w-10 h-10 text-secondary" />,
                            title: "Impactful Work",
                            description: "Build solutions that matter and make a real difference in the world."
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-6 rounded-xl shadow-md border-t-4 border-primary text-center"
                        >
                            <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
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
                        className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
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
