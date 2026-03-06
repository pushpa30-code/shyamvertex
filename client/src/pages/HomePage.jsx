import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import Services from '../components/Services';
import About from '../components/About';
import Careers from '../components/Careers';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

// Reusable animation wrapper for sections
const FadeInSection = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }} // Requires 20% of section to be visible before animating
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

const HomePage = () => {
    return (
        <div className="w-full relative bg-accent z-10">
            {/* Placeholder for sections until they are created */}
            <Hero />
            <FadeInSection><Partners /></FadeInSection>
            <FadeInSection><About /></FadeInSection>
            <FadeInSection><Services /></FadeInSection>
            <FadeInSection><Careers /></FadeInSection>
            <FadeInSection><Testimonials /></FadeInSection>
            <FadeInSection><Blog /></FadeInSection>
            <FadeInSection><FAQ /></FadeInSection>
            <FadeInSection><Contact /></FadeInSection>
        </div>
    );
};

export default HomePage;
