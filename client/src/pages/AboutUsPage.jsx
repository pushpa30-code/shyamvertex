import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Rocket, CheckCircle2 } from 'lucide-react';

const Counter = ({ value, duration = 2 }) => {
    const [count, setCount] = React.useState(0);
    const numericValue = parseInt(value);
    const suffix = value.replace(/[0-9]/g, '');

    React.useEffect(() => {
        let start = 0;
        const end = numericValue;
        if (start === end) return;

        let totalMiliseconds = duration * 1000;
        let incrementTime = (totalMiliseconds / end);

        let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [numericValue, duration]);

    return <span>{count}{suffix}</span>;
};

const AboutUsPage = () => {
    const stats = [
        { label: 'PROJECTS COMPLETED', value: '40+', icon: <CheckCircle2 className="w-8 h-8" /> },
        { label: 'STRATEGIC COLLABORATIONS', value: '5+', icon: <Users className="w-8 h-8" /> },
        { label: 'INNOVATIVE PRODUCTS', value: '2+', icon: <Rocket className="w-8 h-8" /> },
    ];

    const founders = [
        {
            name: "AMAN YADAV",
            role: "FOUNDER & CEO",
            bio: "A visionary technologist dedicated to architecting high-performance digital infrastructures and driving the next wave of IT innovation.",
        },
        {
            name: "PUSHPENDRA SHARMA",
            role: "FOUNDER & CEO",
            bio: "Strategic operations expert focused on global digital transformation and delivering unparalleled business value through technology.",
        }
    ];

    return (
        <div className="min-h-screen bg-black pt-20">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/10 via-transparent to-black" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 20, repeat: Infinity }}
                        className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-black text-[10px] mb-8 uppercase tracking-[0.4em]"
                    >
                        Our Journey
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white flex flex-wrap justify-center gap-4"
                    >
                        Shyam <span className="text-primary">Vertex</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg sm:text-xl md:text-3xl text-zinc-500 max-w-4xl mx-auto font-light leading-relaxed tracking-tight"
                    >
                        We don't just build solutions; we <span className="text-white font-bold italic underline decoration-primary/50 underline-offset-8">define the future</span> of digital infrastructure.
                    </motion.p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-[#09090b] border-y border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="text-primary mb-6 flex justify-center group-hover:scale-125 transition-all duration-500">
                                    {stat.icon}
                                </div>
                                <h3 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                                    <Counter value={stat.value} />
                                </h3>
                                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founders Section */}
            <section className="py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                            The <span className="text-primary">Visionaries</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                        {founders.map((founder, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-[#09090b] rounded-[3rem] p-10 border border-white/5 hover:border-primary/20 transition-all duration-500 group relative overflow-hidden"
                            >
                                <div className="flex flex-col items-center gap-10 relative z-10 w-full">
                                    <div className="text-center w-full">
                                        <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                                            <p className="text-primary font-black text-[10px] uppercase tracking-[0.4em]">{founder.role}</p>
                                        </div>
                                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight uppercase italic">{founder.name}</h3>
                                        <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto mb-8"></div>
                                        <p className="text-zinc-400 font-medium text-base sm:text-lg leading-relaxed max-w-md mx-auto">{founder.bio}</p>
                                    </div>
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-32 bg-black relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="col-span-1 md:col-span-2">
                            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-12">
                                Driven by <br />
                                <span className="text-primary italic">Innovation</span>.
                            </h2>
                            <p className="text-zinc-400 text-xl font-medium max-w-2xl leading-relaxed tracking-tight">
                                At Shyam Vertex, we combine deep technical expertise with a radical focus on client success. Our mission is to empower businesses with the tools of tomorrow, today.
                            </p>
                        </div>
                        <div className="flex items-end justify-end">
                            <div className="w-full h-[1px] bg-white/10 hidden md:block mb-8"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;
