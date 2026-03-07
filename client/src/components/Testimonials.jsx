import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Nakul Agrawal',
        role: 'CTO, TechFlow',
        content: 'ShyamVertex transformed our digital presence. Their team is professional, skilled, and incredibly easy to work with.',
    },
    {
        name: 'Akhay Pandey',
        role: 'Founder, StartUp Inc',
        content: 'The custom software solution they built for us streamlined our operations and saved us countless hours. Highly recommended!',
    },
    {
        name: 'Jitender Singh',
        role: 'Marketing Director, GrowthCo',
        content: 'Their UI/UX design work is world-class. Our new website has seen a 200% increase in engagement since the redesign.',
    },
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-28 bg-dark relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What Our <span className="text-primary">Clients</span> Say</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-[#09090b] p-10 rounded-[2rem] relative border border-white/5 shadow-2xl hover:border-primary/20 transition-all duration-300 overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/10 transition-all duration-300"></div>
                            <Quote className="h-12 w-12 text-primary/10 absolute top-6 right-6 group-hover:text-primary/20 transition-all duration-300" />
                            <p className="text-white/60 mb-8 text-lg leading-relaxed relative z-10">"{testimonial.content}"</p>
                            <div className="flex items-center relative z-10">
                                <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center font-bold text-primary mr-4 text-xl">
                                    {testimonial.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                                    <p className="text-sm text-accent font-light">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
