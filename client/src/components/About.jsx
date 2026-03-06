import React from 'react';
import { Target, Award, Users } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-32 bg-charcoal relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-sm">About <span className="text-primary">Us</span></h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                    <p className="mt-8 text-accent max-w-2xl mx-auto text-xl font-light leading-relaxed">
                        Innovating for tomorrow, delivering today.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-16 px-4 md:px-8">
                    <div>
                        <h3 className="text-3xl font-bold mb-8 text-primary">Our Story</h3>
                        <p className="text-accent text-lg leading-relaxed mb-8 font-light">
                            Founded with a vision to redefine the IT landscape, ShyamVertex has grown from a small consultancy to a full-service technology partner.
                            We believe in the power of technology to transform businesses and improve lives. Our journey is defined by a relentless pursuit of excellence and a commitment to our clients' success.
                        </p>
                        <p className="text-gray-600 leading-relaxed font-light border-l-4 border-primary pl-4 italic bg-primary/5 p-4 rounded-r-lg">
                            "Go Vertex, Go Beyond" isn't just a slogan; it's our ethos. We strive to reach the pinnacle of innovation and then push even further.
                        </p>
                    </div>
                    <div className="bg-dark/50 backdrop-blur-xl p-10 md:p-12 rounded-[2rem] shadow-2xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-all duration-500"></div>
                        <h3 className="text-2xl font-bold mb-10 text-white flex items-center gap-3">
                            <span className="w-12 h-1 bg-primary rounded-full"></span>
                            Why Choose <span className="text-primary italic">Us?</span>
                        </h3>
                        <ul className="space-y-8 relative z-10">
                            <li className="flex items-start group">
                                <div className="bg-charcoal border border-white/10 p-4 rounded-2xl mr-6 group-hover:border-primary/50 transition-all duration-300">
                                    <Users className="h-7 w-7 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2">Client-Centric Approach</h4>
                                    <p className="text-accent font-light leading-relaxed">Your goals are our goals. We work as an extension of your team.</p>
                                </div>
                            </li>
                            <li className="flex items-start group">
                                <div className="bg-charcoal border border-white/10 p-4 rounded-2xl mr-6 group-hover:border-primary/50 transition-all duration-300">
                                    <Award className="h-7 w-7 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2">Excellence in Quality</h4>
                                    <p className="text-accent font-light leading-relaxed">We don't settle for good. We deliver exceptional.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="bg-dark/40 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white/5 hover:border-primary/30 hover:shadow-primary/5 transition-all duration-500 text-center group">
                        <div className="inline-flex p-5 rounded-3xl bg-primary/10 mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                            <Target className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
                        <p className="text-accent font-light leading-relaxed text-lg">
                            To empower businesses with innovative technology solutions that drive growth and sustainable success.
                        </p>
                    </div>
                    <div className="bg-dark/40 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white/5 hover:border-primary/30 hover:shadow-primary/5 transition-all duration-500 text-center group">
                        <div className="inline-flex p-5 rounded-3xl bg-secondary/10 mb-8 group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-300">
                            <Users className="h-10 w-10 text-secondary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
                        <p className="text-accent font-light leading-relaxed text-lg">
                            To be a global leader in IT consultancy and development, known for our integrity, innovation, and impact.
                        </p>
                    </div>
                    <div className="bg-dark/40 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white/5 hover:border-primary/30 hover:shadow-primary/5 transition-all duration-500 text-center group">
                        <div className="inline-flex p-5 rounded-3xl bg-primary/10 mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                            <Award className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Our Values</h3>
                        <p className="text-accent font-light leading-relaxed text-lg">
                            Innovation, Integrity, Collaboration, and Customer Success are the pillars of our organization.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
