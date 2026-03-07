import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

import handshakeVideo from '../images/Antigravity_Hero_Handshake_Animation.mp4';

const Hero = () => {
    return (
        <section className="relative min-h-[100dvh] flex items-center justify-center bg-dark overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover opacity-50 transition-opacity duration-1000"
                    style={{
                        willChange: 'transform',
                        filter: 'brightness(0.5) contrast(1.1)'
                    }}
                >
                    <source src={handshakeVideo} type="video/mp4" />
                </video>
                {/* Dark Overlay Layers */}
                <div className="absolute inset-0 bg-dark/40"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-transparent to-dark"></div>
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-dark to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center relative pt-20">
                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2,
                                delayChildren: 0.3
                            }
                        }
                    }}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto space-y-6 md:space-y-10"
                >
                    <motion.div
                        variants={{
                            hidden: { scale: 0.8, opacity: 0 },
                            visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
                        }}
                        className="inline-block px-4 py-2 md:px-6 md:py-2.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs md:text-base font-medium backdrop-blur-md shadow-[0_0_20px_rgba(255,208,0,0.2)]"
                    >
                        <span className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2 md:h-3 md:w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-primary"></span>
                            </span>
                            Future-Ready Digital Infrastructure
                        </span>
                    </motion.div>

                    <div className="overflow-hidden">
                        <motion.h1
                            variants={{
                                hidden: { y: "100%", opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
                                }
                            }}
                            className="text-2xl sm:text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9] md:leading-[0.8] drop-shadow-2xl uppercase"
                        >
                            Architecting the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-gradient-x">
                                Digital Future
                            </span>
                        </motion.h1>
                    </div>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-base sm:text-lg md:text-2xl font-bold text-white max-w-3xl mx-auto leading-tight drop-shadow-xl tracking-tight"
                    >
                        Go Vertex, <span className="text-primary italic">Go Beyond</span>
                    </motion.p>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { duration: 1 } }
                        }}
                        className="text-sm sm:text-base md:text-xl font-medium text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
                    >
                        We engineer high-performance digital ecosystems, turning complex challenges into seamless digital experiences.
                    </motion.p>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                        }}
                        className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4 md:pt-8"
                    >
                        <motion.a
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,208,0,0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            href="#contact"
                            className="px-6 py-3 md:px-8 md:py-4 bg-primary text-dark font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-base md:text-lg group"
                        >
                            Get Started
                            <ArrowRight className="h-5 w-5 md:h-6 md:w-6 transform group-hover:translate-x-1 transition-transform" />
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 208, 0, 0.15)" }}
                            whileTap={{ scale: 0.95 }}
                            href="#services"
                            className="px-8 py-4 border-2 border-slate-400 hover:border-primary text-white font-semibold rounded-full transition-all duration-300 backdrop-blur-md text-lg flex items-center justify-center gap-2"
                        >
                            Explore Services
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
