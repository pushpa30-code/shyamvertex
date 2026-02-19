
import React, { useState, useEffect } from 'react';
import { Briefcase, Clock, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ApplicationForm from '../components/ApplicationForm';

import API_URL from '../config';

const CareerPage = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [jobStatuses, setJobStatuses] = useState({});

    useEffect(() => {
        fetch(`${API_URL}/api/jobs`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const statusMap = {};
                    data.forEach(job => {
                        statusMap[job.role_id] = job.is_hiring;
                    });
                    setJobStatuses(statusMap);
                } else {
                    console.error('API Error:', data);
                }
            })
            .catch(err => console.error('Error fetching job statuses:', err));
    }, []);

    const openForm = (role) => {
        setSelectedRole(role);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setSelectedRole(null);
    };

    const careers = [
        {
            id: 'fulltime',
            title: 'Full-time',
            icon: <Briefcase className="w-12 h-12 text-secondary" />,
            description: 'Join our core team and build the future of tech with us. Competitive salary and benefits.',
        },
        {
            id: 'internship',
            title: 'Internship',
            icon: <Clock className="w-12 h-12 text-secondary" />,
            description: 'Start your career with hands-on experience on real-world projects. Mentorship included.',
        },
        {
            id: 'freelance',
            title: 'Freelance',
            icon: <Globe className="w-12 h-12 text-secondary" />,
            description: 'Work flexibly on exciting projects from anywhere in the world.',
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="bg-background min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-primary mb-4"
                    >
                        Join Our Team
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Explore opportunities to grow with ShyamVertex. We are looking for passionate individuals to join our journey.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {careers.map((career) => {
                        const isHiring = jobStatuses[career.id] !== 0 && jobStatuses[career.id] !== false;

                        return (
                            <motion.div
                                key={career.id}
                                variants={itemVariants}
                                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center border-t-4 border-accent"
                            >
                                <AnimatePresence>
                                    {isHiring && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0, x: 20 }}
                                            animate={{ scale: 1, opacity: 1, x: 0 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            whileHover={{ scale: 1.05 }}
                                            className="absolute top-0 right-0 mt-4 mr-4"
                                        >
                                            <div className="relative flex items-center justify-center">
                                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-30 animate-ping"></span>
                                                <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-green-400/30 flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                                    WE'RE HIRING
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="mb-6 p-4 bg-indigo-50 rounded-full">
                                    {career.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-primary mb-4">{career.title}</h2>
                                <p className="text-gray-600 mb-8">{career.description}</p>
                                {(() => {
                                    const buttonClass = isHiring
                                        ? "mt-auto font-semibold py-2 px-6 rounded-full transition-colors duration-300 bg-primary hover:bg-secondary text-white cursor-pointer shadow-lg hover:shadow-xl"
                                        : "mt-auto font-semibold py-2 px-6 rounded-full transition-colors duration-300 bg-gray-300 text-gray-500 cursor-not-allowed";

                                    return (
                                        <motion.button
                                            onClick={() => isHiring && openForm(career.title)}
                                            disabled={!isHiring}
                                            whileHover={isHiring ? { scale: 1.05 } : {}}
                                            whileTap={isHiring ? { scale: 0.95 } : {}}
                                            className={buttonClass}
                                        >
                                            {isHiring ? 'Apply Now' : 'Currently Closed'}
                                        </motion.button>
                                    );
                                })()}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            <ApplicationForm
                isOpen={isFormOpen}
                onClose={closeForm}
                distinctRole={selectedRole}
            />
        </div>
    );
};

export default CareerPage;
