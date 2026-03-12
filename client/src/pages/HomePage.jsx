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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

const HomePage = () => {
    return (
        <div className="w-full relative bg-dark z-10">
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
