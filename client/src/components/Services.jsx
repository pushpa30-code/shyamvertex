import React, { useState, useEffect } from 'react';
import { Code, Smartphone, Layout, Cloud, Database, Monitor, Server, Globe, Cpu, Brain, Sparkles, Bot, Shield, Terminal } from 'lucide-react';
import API_URL from '../config';

const staticServices = [
    {
        icon: 'Layout',
        title: 'UI/UX Design',
        description: 'Creating intuitive and visually stunning interfaces that provide seamless user experiences.',
    },
    {
        icon: 'Code',
        title: 'Website Development',
        description: 'Building responsive, fast, and SEO-friendly websites using the latest technologies.',
    },
    {
        icon: 'Smartphone',
        title: 'App Development',
        description: 'Developing high-performance mobile applications for iOS and Android platforms.',
    },
    {
        icon: 'Monitor',
        title: 'Custom Software',
        description: 'Tailored software solutions designed to meet the specific needs of your business.',
    },
    {
        icon: 'Cloud',
        title: 'Cloud Services',
        description: 'Secure and scalable cloud infrastructure setup, migration, and management.',
    },
    {
        icon: 'Database',
        title: 'IT Consultancy',
        description: 'Expert advice to bridge the gap between business requirements and technology solutions.',
    },
];

const renderIcon = (iconName, size = 48) => {
    const iconMap = {
        'Code': <Code size={size} />,
        'Smartphone': <Smartphone size={size} />,
        'Layout': <Layout size={size} />,
        'Cloud': <Cloud size={size} />,
        'Database': <Database size={size} />,
        'Monitor': <Monitor size={size} />,
        'Server': <Server size={size} />,
        'Globe': <Globe size={size} />,
        'Cpu': <Cpu size={size} />,
        'Brain': <Brain size={size} />,
        'Sparkles': <Sparkles size={size} />,
        'Bot': <Bot size={size} />,
        'Shield': <Shield size={size} />,
        'Terminal': <Terminal size={size} />
    };
    return iconMap[iconName] || <Layout size={size} />;
};

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch(`${API_URL}/api/services`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setServices(data);
                } else {
                    setServices(staticServices);
                }
            } catch (err) {
                console.error("Error fetching services:", err);
                setServices(staticServices);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <section id="services" className="py-28 bg-dark relative border-y border-white/5 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-sm">Our <span className="text-primary">Services</span></h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                    <p className="mt-8 text-white/60 max-w-2xl mx-auto text-xl font-normal leading-relaxed">
                        Comprehensive IT solutions designed to propel your business forward in the digital age.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-[#09090b] rounded-[2rem] p-10 shadow-xl transition-all duration-300 border border-white/5 hover:border-primary/30 group"
                        >
                            <div className="text-primary mb-8 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:bg-primary/10">
                                {renderIcon(service.icon, 32)}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{service.title}</h3>
                            <p className="text-white/50 leading-relaxed text-sm">
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
