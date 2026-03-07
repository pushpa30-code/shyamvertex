import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: 'What services do you offer?',
        answer: 'We offer a wide range of IT services including UI/UX Design, Website Development, App Development, Custom Software Solutions, Cloud Services, and IT Consultancy.',
    },
    {
        question: 'How much does a custom website cost?',
        answer: 'The cost varies depending on the complexity, features, and design requirements. Contact us for a free quote tailored to your specific needs.',
    },
    {
        question: 'Do you provide maintenance and support?',
        answer: 'Yes, we offer ongoing maintenance and support packages to ensure your software remains up-to-date, secure, and performs optimally.',
    },
    {
        question: 'How long does it take to develop a mobile app?',
        answer: 'Development timelines vary based on the app\'s scope. A simple app might take 4-8 weeks, while a complex enterprise app could take 3-6 months or more.',
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-28 bg-charcoal relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Helpful <span className="text-primary">Answers</span></h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-white/5 rounded-2xl overflow-hidden bg-dark shadow-2xl group transition-all duration-300">
                            <button
                                className="w-full flex justify-between items-center p-4 md:p-6 bg-dark hover:bg-dark/80 transition-all duration-300 text-left focus:outline-none group"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className={`font-bold text-base md:text-lg tracking-wide transition-colors duration-300 ${openIndex === index ? 'text-primary' : 'text-white'}`}>{faq.question}</span>
                                {openIndex === index ? (
                                    <Minus className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                                ) : (
                                    <Plus className="h-5 w-5 md:h-6 md:w-6 text-primary group-hover:scale-110 transition-transform" />
                                )}
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-4 md:p-6 bg-dark text-accent border-t border-white/5 font-light leading-relaxed text-sm md:text-lg">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
