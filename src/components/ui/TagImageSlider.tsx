import React from 'react';
import { motion } from 'framer-motion';

export const TagImageSlider: React.FC = () => {
    const images = [
        '/Tags/1.png',
        '/Tags/2.png',
        '/Tags/3.png',
        '/Tags/4.png',
        '/Tags/5.png',
        '/Tags/6.png',
        '/Tags/7.png',
    ];

    // Duplicate images for seamless infinite scroll
    const duplicatedImages = [...images, ...images, ...images];

    return (
        <div className="w-full overflow-hidden py-12">
            <div
                className="relative"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                }}
            >
                <motion.div
                    className="flex gap-6"
                    animate={{
                        x: [0, -(100 / 3) + '%'],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedImages.map((src, index) => (
                        <div
                            key={index}
                            className="group flex-shrink-0 w-[240px] md:w-[300px] aspect-[4/5] rounded-2xl overflow-hidden border border-border shadow-xl transition-all duration-500 bg-secondary/50"
                        >
                            <img
                                src={src}
                                alt={`Tag branding ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
