import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Zap, Users, BarChart, ArrowRight } from 'lucide-react';

const ProductPage = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const features = [
        {
            icon: <Users className="h-8 w-8 text-primary" />,
            title: "Advanced HR Management",
            description: "Streamline onboarding, payroll, employee tracking, and performance reviews in one unified dashboard."
        },
        {
            icon: <BarChart className="h-8 w-8 text-primary" />,
            title: "Intelligent CRM",
            description: "Track leads, manage client pipelines, and automate follow-ups to close deals faster and smarter."
        },
        {
            icon: <ShieldCheck className="h-8 w-8 text-primary" />,
            title: "Bank-Grade Security",
            description: "Your business data is protected with end-to-end encryption, role-based access, and regular automated backups."
        },
        {
            icon: <Zap className="h-8 w-8 text-primary" />,
            title: "Lightning Fast Analytics",
            description: "Generate real-time reports and predictive insights using our AI-driven analytics engine."
        }
    ];

    return (
        <div className="min-h-screen bg-dark pt-20 overflow-hidden">
            {/* Hero Section of Product */}
            <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-dark border-b border-white/5">
                {/* Background Glow Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block px-6 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold text-xs mb-8 uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,208,0,0.1)]">
                            Flagship Product
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-white drop-shadow-2xl"
                    >
                        Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">Crewmitra</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-xl md:text-3xl font-light text-accent max-w-4xl mx-auto mb-12 leading-relaxed"
                    >
                        The all-in-one <span className="text-primary font-bold italic">CRM & HR Management System</span> designed to scale your enterprise seamlessly.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <a
                            href="#demo"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-dark font-black rounded-2xl hover:bg-yellow-glow shadow-[0_0_30px_rgba(255,208,0,0.3)] hover:shadow-[0_0_50px_rgba(255,208,0,0.5)] transition-all duration-300 transform hover:-translate-y-1 text-xl uppercase tracking-widest"
                        >
                            Request a Demo <ArrowRight className="h-6 w-6" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">Why Choose <span className="text-primary italic">Crewmitra?</span></h2>
                        <p className="text-accent text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">Replace fragmented tools with a single, powerful platform that connects your people with your customers.</p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="bg-charcoal border border-white/5 p-10 rounded-[2.5rem] shadow-2xl hover:shadow-[0_0_40px_rgba(255,208,0,0.1)] hover:border-primary/40 transition-all duration-500 group"
                            >
                                <div className="mb-8 inline-block p-6 bg-primary/5 rounded-3xl group-hover:bg-primary/10 transition-all duration-300 shadow-[inset_0_0_20px_rgba(255,208,0,0.05)] text-primary">
                                    {feature.icon}
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{feature.title}</h3>
                                <p className="text-accent leading-relaxed text-lg font-light">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden bg-dark border-t border-white/5">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-charcoal p-16 rounded-[3rem] shadow-2xl relative overflow-hidden border border-white/10"
                    >
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
                        <h2 className="text-4xl md:text-5xl font-black mb-8 text-white tracking-tighter">Ready to Supercharge <br /><span className="text-primary italic">Your Team?</span></h2>
                        <p className="text-accent mb-12 text-xl md:text-2xl font-light max-w-2xl mx-auto">Integrate Crewmitra into your workflow today and watch your productivity multiply.</p>

                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <a href="#contact" className="px-10 py-5 bg-primary text-dark font-black rounded-2xl hover:bg-yellow-glow shadow-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                                Contact Sales <ArrowRight className="h-5 w-5" />
                            </a>
                            <a href="#" className="px-10 py-5 border-2 border-primary/30 text-primary font-bold rounded-2xl hover:bg-primary/5 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                                Download Brochure
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ProductPage;
