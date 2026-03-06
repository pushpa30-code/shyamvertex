import React from 'react';
import { Code, Smartphone, Layout, Cloud, Database, Monitor } from 'lucide-react';

const services = [
    {
        icon: <Layout className="h-12 w-12" />,
        title: 'UI/UX Design',
        description: 'Creating intuitive and visually stunning interfaces that provide seamless user experiences.',
    },
    {
        icon: <Code className="h-12 w-12" />,
        title: 'Website Development',
        description: 'Building responsive, fast, and SEO-friendly websites using the latest technologies.',
    },
    {
        icon: <Smartphone className="h-12 w-12" />,
        title: 'App Development',
        description: 'Developing high-performance mobile applications for iOS and Android platforms.',
    },
    {
        icon: <Monitor className="h-12 w-12" />,
        title: 'Custom Software',
        description: 'Tailored software solutions designed to meet the specific needs of your business.',
    },
    {
        icon: <Cloud className="h-12 w-12" />,
        title: 'Cloud Services',
        description: 'Secure and scalable cloud infrastructure setup, migration, and management.',
    },
    {
        icon: <Database className="h-12 w-12" />,
        title: 'IT Consultancy',
        description: 'Expert advice to bridge the gap between business requirements and technology solutions.',
    },
];

const Services = () => {
    return (
        <section id="services" className="py-28 bg-dark relative border-y border-white/5 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-sm">Our <span className="text-primary italic text-shadow-glow">Services</span></h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                    <p className="mt-8 text-accent max-w-2xl mx-auto text-xl font-light leading-relaxed">
                        Comprehensive IT solutions designed to propel your business forward in the digital age.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-charcoal rounded-[2rem] p-10 shadow-xl hover:shadow-[0_0_30px_rgba(255,208,0,0.1)] transition-all duration-500 transform hover:-translate-y-2 border border-white/5 group hover:border-primary/50"
                        >
                            <div className="text-primary mb-8 group-hover:scale-110 transition-all duration-300 bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                            <p className="text-accent leading-relaxed font-light text-lg">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
