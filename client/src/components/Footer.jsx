import React from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import API_URL from '../config';

const Footer = () => {
    const canvasRef = React.useRef(null);
    const [contact, setContact] = React.useState({
        email: 'support@shyamvertex.com',
        phone_1: '+91 87993-03431',
        phone_2: '+91 91364-62029',
        address: 'Vadodara, Gujarat-390019',
        instagram: 'https://www.instagram.com/shyamvertex_',
        linkedin: 'https://www.linkedin.com/in/shyam-vertex-750b473b0'
    });

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerWidth < 768 ? 600 : 500;
        };

        const draw = (time) => {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // 1. Grid Scanning Effect
            ctx.strokeStyle = 'rgba(0, 100, 255, 0.05)';
            ctx.lineWidth = 1;

            // Horizontal lines
            for (let i = 0; i < canvas.height; i += 40) {
                const offset = (time / 50 + i) % canvas.height;
                ctx.beginPath();
                ctx.moveTo(0, offset);
                ctx.lineTo(canvas.width, offset);
                ctx.stroke();
            }

            // Vertical lines
            for (let i = 0; i < canvas.width; i += 80) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }

            // 2. Data Flow/Circuit Pulses
            const pulseCount = 8;
            for (let i = 0; i < pulseCount; i++) {
                const angle = (time / 2000 + (i * Math.PI * 2) / pulseCount) % (Math.PI * 2);
                const radius = 150 + Math.sin(time / 500) * 20;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                const grad = ctx.createRadialGradient(x, y, 0, x, y, 40);
                grad.addColorStop(0, 'rgba(0, 150, 255, 0.15)');
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, y, 40, 0, Math.PI * 2);
                ctx.fill();

                // Small core point
                ctx.fillStyle = 'rgba(0, 200, 255, 0.3)';
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // 3. Central "Neural Core" Pulse
            const coreRadius = 80 + Math.sin(time / 300) * 10;
            const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius * 2);
            coreGrad.addColorStop(0, 'rgba(0, 80, 255, 0.1)');
            coreGrad.addColorStop(0.5, 'rgba(0, 40, 255, 0.05)');
            coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, coreRadius * 2, 0, Math.PI * 2);
            ctx.fill();

            // Circular "Scanning" Rings
            ctx.lineWidth = 1;
            for (let i = 1; i <= 3; i++) {
                const ringRadius = (coreRadius * i * 0.8 + time / 10) % 300;
                const ringOpacity = 1 - (ringRadius / 300);
                ctx.strokeStyle = `rgba(0, 150, 255, ${ringOpacity * 0.15})`;
                ctx.beginPath();
                ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
                ctx.stroke();
            }

            // 4. Premium Orange/Yellow Ray Wave Effect
            const rayCount = 8;
            for (let i = 0; i < rayCount; i++) {
                const direction = i % 2 === 0 ? 1 : -1;
                const speed = (0.04 + (i * 0.015)) * direction;
                const angle = (time / 5000 + i * Math.PI / 3) % (Math.PI * 2);
                const wave = Math.sin(time / 800 + i) * 60;

                // Position rays to flow diagonally/horizontally in both directions
                let x = (time * speed + i * (canvas.width / 4)) % (canvas.width + 1200);
                if (x < 0) x += (canvas.width + 1200);
                x -= 600;

                const y = (centerY - 150) + (i * 40) + wave;

                const rayLength = 350 + Math.sin(time / 1500 + i) * 120;
                const rayWidth = 2;

                const rayGrad = ctx.createLinearGradient(x, y, x + rayLength * direction, y + (Math.sin(angle) * 30));
                const rayColor = i % 2 === 0 ? '255, 140, 0' : '255, 215, 0'; // Orange and Yellow

                rayGrad.addColorStop(0, `rgba(${rayColor}, 0)`);
                rayGrad.addColorStop(0.5, `rgba(${rayColor}, 0.35)`);
                rayGrad.addColorStop(1, `rgba(${rayColor}, 0)`);

                ctx.strokeStyle = rayGrad;
                ctx.lineWidth = rayWidth;
                ctx.lineCap = 'round';
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(${rayColor}, 0.5)`;

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + rayLength * direction, y + (Math.sin(angle) * 30));
                ctx.stroke();

                // Reset shadow for next draws
                ctx.shadowBlur = 0;
            }

            // 5. Alternating Side Robot Unit (Orange/Yellow)
            const cycleTime = 12000; // 12 seconds per full cycle (Left -> Hidden -> Right -> Hidden)
            const phase = time % cycleTime;

            let robotX = -200; // Default off-screen
            let side = 'left';
            let isVisible = false;
            let slideProgress = 0; // 0 to 1

            if (phase < 5000) { // Left Side Phase (5s)
                isVisible = true;
                side = 'left';
                if (phase < 1000) slideProgress = phase / 1000; // Slide in (1s)
                else if (phase > 4000) slideProgress = (5000 - phase) / 1000; // Slide out (1s)
                else slideProgress = 1; // Stay
                robotX = -100 + (slideProgress * (canvas.width < 768 ? 180 : 250)); 
            } else if (phase >= 6000 && phase < 11000) { // Right Side Phase (5s)
                isVisible = true;
                side = 'right';
                const rightPhase = phase - 6000;
                if (rightPhase < 1000) slideProgress = rightPhase / 1000;
                else if (rightPhase > 4000) slideProgress = (5000 - rightPhase) / 1000;
                else slideProgress = 1;
                robotX = canvas.width + 100 - (slideProgress * (canvas.width < 768 ? 180 : 250));
            }

            if (isVisible) {
                const robotScale = canvas.width < 768 ? 0.6 : 1;
                const robotBaseY = canvas.height - (canvas.width < 768 ? 40 : 100);
                const floatY = Math.sin(time / 400) * 8;

                ctx.save();
                ctx.translate(robotX, robotBaseY + floatY);
                ctx.scale(robotScale * (side === 'right' ? -1 : 1), robotScale);

                // Colors: Orange & Yellow
                const bodyColor = '255, 140, 0'; // Orange
                const accentColor = '255, 215, 0'; // Yellow

                // Shading Gradients
                const bodyGrad = ctx.createLinearGradient(-30, -40, 30, 10);
                bodyGrad.addColorStop(0, `rgba(${bodyColor}, 0.3)`);
                bodyGrad.addColorStop(0.5, `rgba(${bodyColor}, 0.2)`);
                bodyGrad.addColorStop(1, `rgba(${bodyColor}, 0.1)`);

                const headGrad = ctx.createRadialGradient(0, -60, 0, 0, -60, 40);
                headGrad.addColorStop(0, `rgba(${accentColor}, 0.3)`);
                headGrad.addColorStop(1, `rgba(${accentColor}, 0.1)`);

                ctx.strokeStyle = `rgba(${accentColor}, 0.8)`;
                ctx.lineWidth = 1.5;
                ctx.shadowBlur = 12;
                ctx.shadowColor = `rgba(${accentColor}, 0.5)`;

                // Robot Body
                ctx.fillStyle = bodyGrad;
                ctx.beginPath();
                ctx.roundRect(-30, -40, 60, 50, [12, 12, 8, 8]);
                ctx.fill();
                ctx.stroke();

                // Shoulder Joints
                ctx.fillStyle = `rgba(${accentColor}, 0.4)`;
                ctx.beginPath();
                ctx.arc(-30, -30, 6, 0, Math.PI * 2);
                ctx.arc(30, -30, 6, 0, Math.PI * 2);
                ctx.fill();

                // Head
                ctx.fillStyle = headGrad;
                ctx.beginPath();
                ctx.roundRect(-28, -78, 56, 34, 10);
                ctx.fill();
                ctx.stroke();

                // Antenna
                ctx.strokeStyle = `rgba(${accentColor}, 0.6)`;
                ctx.beginPath();
                ctx.moveTo(0, -78);
                ctx.lineTo(0, -95);
                ctx.stroke();

                const antennaPulse = (Math.sin(time / 200) + 1) / 2;
                ctx.fillStyle = `rgba(${accentColor}, ${0.5 + antennaPulse * 0.5})`;
                ctx.shadowBlur = 15;
                ctx.shadowColor = `rgba(${accentColor}, 1)`;
                ctx.beginPath();
                ctx.arc(0, -95, 4.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Digital Eyes
                const isBlinking = (Math.floor(time / 200) % 25) === 0;
                if (!isBlinking) {
                    ctx.fillStyle = '#fff9e6'; // Bright yellowish white
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = `rgba(${accentColor}, 1)`;
                    ctx.beginPath();
                    ctx.arc(-12, -65, 3.5, 0, Math.PI * 2);
                    ctx.arc(12, -65, 3.5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }

                // Digital Smile
                const wavePhase = Math.sin(time / 300);
                const isSmiling = slideProgress === 1 && wavePhase > 0;
                ctx.strokeStyle = `rgba(${accentColor}, 1)`;
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.beginPath();
                if (isSmiling) {
                    ctx.arc(0, -55, 8, 0.2 * Math.PI, 0.8 * Math.PI, false);
                } else {
                    ctx.moveTo(-6, -50);
                    ctx.lineTo(6, -50);
                }
                ctx.stroke();

                // Waving Arm
                const waveAngle = (slideProgress === 1) ? (wavePhase * 0.7 - 0.5) : -0.2;
                ctx.save();
                ctx.translate(30, -30);
                ctx.rotate(waveAngle);

                ctx.fillStyle = bodyGrad;
                ctx.beginPath();
                ctx.roundRect(0, -6, 25, 12, 6);
                ctx.fill();
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(25, 0, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                ctx.save();
                ctx.translate(25, 0);
                ctx.rotate(0.2);
                ctx.beginPath();
                ctx.roundRect(0, -5, 20, 10, 5);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = `rgba(${accentColor}, 0.3)`;
                ctx.beginPath();
                ctx.arc(25, 0, 9, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.restore();
                ctx.restore();

                // Left Arm
                ctx.beginPath();
                ctx.roundRect(-45, -30, 15, 40, 7);
                ctx.fill();
                ctx.stroke();

                ctx.restore();
                ctx.shadowBlur = 0;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw(0);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    React.useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await fetch(`${API_URL}/api/contact-info`);
                const data = await res.json();
                if (data && data.email) {
                    setContact(prev => ({ ...prev, ...data }));
                }
            } catch (err) {
                console.error('Error fetching contact:', err);
            }
        };
        fetchContact();
    }, []);

    // Animation variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <footer className="relative bg-black text-white pt-16 md:pt-24 pb-12 overflow-hidden border-t border-white/5 min-h-[400px] md:min-h-[500px]">
            {/* Robot/Tech Animation Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none opacity-60"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
                >
                    {/* Company Info */}
                    <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1">
                        <h3 className="text-2xl font-bold text-white tracking-tight mb-4">
                            Shyam<span className="text-primary">Vertex</span>
                        </h3>
                        <p className="text-white/60 mb-6 font-normal leading-relaxed text-sm">
                            Go Vertex, <span className="text-primary font-medium">Go Beyond</span>. Delivering cutting-edge IT solutions for a digital world.
                        </p>
                        <div className="flex space-x-5">
                            <motion.a
                                whileHover={{ scale: 1.1, color: "#FFD000" }}
                                href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1, color: "#FFD000" }}
                                href={contact.instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'About Us', 'Services', 'Careers', 'Help', 'Contact Us'].map((link) => (
                                <li key={link}>
                                    <a href={link === 'Home' ? '/' : link === 'Careers' ? '/career' : `#${link.toLowerCase().replace(' ', '')}`} className="text-white/50 hover:text-primary transition-colors text-sm">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">Services</h4>
                        <ul className="space-y-3 text-sm text-white/50">
                            {['UI/UX Design', 'Web Development', 'App Development', 'Cloud Services', 'IT Consultancy'].map((service) => (
                                <li key={service} className="hover:text-white transition-colors cursor-default">
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">Contact Us</h4>
                        <ul className="space-y-5 text-sm">
                            <li className="flex items-start">
                                <Mail className="h-4 w-4 text-primary mr-3 mt-1" />
                                <a href={`mailto:${contact.email}`} className="text-white/50 hover:text-white transition-colors">
                                    {contact.email}
                                </a>
                            </li>
                            <li className="flex items-start">
                                <Phone className="h-4 w-4 text-primary mr-3 mt-1" />
                                <span className="text-white/50 flex flex-col gap-1">
                                    <a href={`tel:${contact.phone_1}`} className="hover:text-white transition-colors">{contact.phone_1}</a>
                                    {contact.phone_2 && <a href={`tel:${contact.phone_2}`} className="hover:text-white transition-colors">{contact.phone_2}</a>}
                                </span>
                            </li>
                            <li className="flex items-start">
                                <MapPin className="h-4 w-4 text-primary mr-3 mt-1" />
                                <span className="text-white/50 leading-tight">
                                    {contact.address}
                                </span>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1 }}
                    className="border-t border-white/10 mt-16 pt-8 text-center flex flex-col items-center justify-center gap-2"
                >
                    <div className="flex items-center justify-center gap-2 text-sm text-white/60">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <p>Systems Online & Operational</p>
                    </div>
                    <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} Shyam Vertex Pvt Ltd. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
