import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Zap, Users, BarChart, ArrowRight } from 'lucide-react';

import robotHandshakeVideo from '../images/Robot_and_Person_Hero_Animation.mp4';

import RequestInviteForm from '../components/RequestInviteForm';

const ProductPage = () => {
    const [isInviteOpen, setIsInviteOpen] = React.useState(false);
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1, y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    const features = [
        {
            icon: <Users className="h-6 w-6 text-primary" />,
            title: "Advanced HR Management",
            description: "Streamline onboarding, payroll, employee tracking, and performance reviews in one unified dashboard."
        },
        {
            icon: <BarChart className="h-6 w-6 text-primary" />,
            title: "Intelligent CRM",
            description: "Track leads, manage client pipelines, and automate follow-ups to close deals faster and smarter."
        },
        {
            icon: <ShieldCheck className="h-6 w-6 text-primary" />,
            title: "Bank-Grade Security",
            description: "Your business data is protected with end-to-end encryption, role-based access, and regular automated backups."
        },
        {
            icon: <Zap className="h-6 w-6 text-primary" />,
            title: "Lightning Fast Analytics",
            description: "Generate real-time reports and predictive insights using our AI-driven analytics engine."
        }
    ];

    return (
        <div className="min-h-screen bg-black pt-20 overflow-hidden font-sans selection:bg-primary/30">
            <RequestInviteForm isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />

            {/* Hero Section of Product */}
            <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black">
                {/* Background Video */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover opacity-60"
                        style={{
                            filter: 'brightness(0.35) contrast(1.1)',
                            objectPosition: 'center center'
                        }}
                    >
                        <source src={robotHandshakeVideo} type="video/mp4" />
                    </video>
                    {/* Dark Overlay Layers for SaaS aesthetic */}
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-bold text-[10px] mb-8 uppercase tracking-[0.3em] backdrop-blur-sm">
                            Flagship Enterprise Suite
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter text-white leading-[0.9] uppercase"
                    >
                        Mastering <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">Crewmitra</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-base sm:text-xl md:text-2xl font-medium text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed tracking-tight"
                    >
                        The intelligent <span className="text-white">CRM & HRM</span> production platform for modern contractors, sites, and enterprise execution.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <button
                            onClick={() => setIsInviteOpen(true)}
                            className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black rounded-full hover:bg-zinc-200 transition-all duration-300 transform hover:scale-105 text-sm uppercase tracking-widest shadow-2xl shadow-white/5"
                        >
                            Demo Request
                        </button>
                        <a
                            href="https://crewmitra.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all duration-300 text-sm uppercase tracking-widest backdrop-blur-md text-center"
                        >
                            Explore Platform
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            < section id="features" className="py-32 relative z-10 bg-black border-t border-white/5" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter uppercase">Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 italic">Operations</span></h2>
                        <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">Everything you need to manage your contractor workforce, integrated into one clean, responsive platform.</p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="bg-[#09090b] border border-white/[0.03] p-12 rounded-[3.5rem] shadow-2xl hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden"
                            >
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500" />
                                <div className="mb-8 inline-block p-5 bg-white/5 rounded-2xl group-hover:bg-blue-500/10 transition-all duration-300 text-white group-hover:text-blue-400">
                                    {feature.icon}
                                </div>
                                <h3 className="text-3xl font-black mb-4 text-white tracking-tight">{feature.title}</h3>
                                <p className="text-zinc-500 leading-relaxed text-lg font-medium tracking-tight group-hover:text-zinc-400 transition-colors">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="py-40 relative overflow-hidden bg-black border-t border-white/5" >
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#09090b] p-20 rounded-[4rem] shadow-2xl relative overflow-hidden border border-white/[0.05]"
                    >
                        <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"></div>
                        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-8 text-white tracking-tighter uppercase leading-[0.9]">Ready for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 italic font-black">Clarity?</span></h2>
                        <p className="text-zinc-500 mb-14 text-lg sm:text-xl md:text-2xl font-medium max-w-2xl mx-auto tracking-tight">Join modern contractors who manage their workforce with precision.</p>

                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <button
                                onClick={() => setIsInviteOpen(true)}
                                className="px-12 py-6 bg-white text-black font-black rounded-full hover:bg-zinc-200 transition-all uppercase tracking-widest text-sm shadow-xl flex items-center justify-center gap-3 active:scale-95 transform"
                            >
                                Demo Request <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section >
        </div >
    );
};

export default ProductPage;
