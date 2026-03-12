import React from 'react';
import { motion } from 'framer-motion';

// Import images
import ambitiousLogo from '../images/ambitious corporation logo.jpeg';
import badaBuilderLogo from '../images/bada builder logo.jpeg';

const Partners = () => {
    const partners = [
        { name: 'Ambitious Corporation', logo: ambitiousLogo, url: 'https://ambitiouscorporation.in' },
        { name: 'Bada Builder', logo: badaBuilderLogo, url: 'https://badabuilder.com' },
        { name: 'Gramfs', logo: null, url: 'https://gramfs.com' },
        { name: 'VVA Infras', logo: null, url: 'https://vvainfras.com' },
    ];

    // Duplicate logic for seamless loop
    const marqueeItems = [...partners, ...partners, ...partners];

    return (
        <section className="py-16 bg-dark border-b border-white/5 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <p className="text-sm md:text-base font-bold text-accent uppercase tracking-widest">
                    Proudly Collaborating with Industry Leaders
                </p>
            </div>

            <div className="flex relative w-full mask-gradient">
                <motion.div
                    className="flex items-center gap-12 sm:gap-20 whitespace-nowrap"
                    initial={{ x: "-50%" }}
                    animate={{ x: "0%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {marqueeItems.map((partner, index) => (
                        <a
                            key={`${partner.name}-${index}`}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center min-w-[150px] opacity-80 hover:opacity-100 transition-opacity duration-300 group"
                        >
                            {partner.logo ? (
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-12 md:h-16 w-auto object-contain filter grayscale-[0.5] invert opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                                />
                            ) : (
                                <span className="text-xl md:text-2xl font-bold text-accent font-serif tracking-tight group-hover:text-primary transition-colors">
                                    {partner.name}
                                </span>
                            )}
                        </a>
                    ))}
                </motion.div>

                {/* Duplicate for smoother loop if needed, but managing x from -50% to 0% with double/triple content usually works for L->R or R->L depending on start/end */}
            </div>
        </section>
    );
};

export default Partners;
