import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Zap, Globe2, Users, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Badge {
    icon: React.ReactNode;
    labelKey: string;
}

export const PremiumBadgeSlider: React.FC = () => {
    const { t } = useLanguage();
    const [duration, setDuration] = useState(45);

    useEffect(() => {
        const checkMobile = () => {
            setDuration(window.innerWidth < 768 ? 12 : 45);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const badges: Badge[] = [
        {
            icon: <Shield className="w-4 h-4 md:w-5 h-5" />,
            labelKey: 'badges.qualityTested'
        },
        {
            icon: <Award className="w-4 h-4 md:w-5 h-5" />,
            labelKey: 'badges.certified'
        },
        {
            icon: <Zap className="w-4 h-4 md:w-5 h-5" />,
            labelKey: 'badges.devices'
        },
        {
            icon: <Globe2 className="w-4 h-4 md:w-5 h-5" />,
            labelKey: 'badges.global'
        },
        {
            icon: <Users className="w-4 h-4 md:w-5 h-5" />,
            labelKey: 'badges.technicians'
        },
        {
            icon: <CheckCircle2 className="w-4 h-4 md:w-5 h-5" />,
            labelKey: 'badges.warranty'
        },
        {
            icon: <Clock className="w-4 h-4 md:w-5 h-5" />,
            labelKey: 'badges.experience'
        },
        {
            icon: <TrendingUp className="w-4 h-4 md:w-5 h-5" />,
            labelKey: 'badges.trusted'
        }
    ];

    // Duplicate badges for seamless infinite scroll
    const duplicatedBadges = [...badges, ...badges];

    return (
        <div className="w-full overflow-hidden pt-0 pb-0 md:py-10">
            {/* Single slide background for entire strip - Full Width with Mask Fade */}
            <div
                className="relative bg-white/5 backdrop-blur-2xl border-y border-white/10 shadow-2xl shadow-black/20"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                }}
            >
                {/* Scrolling container */}
                <motion.div
                    className="flex gap-8 md:gap-12 py-6 md:py-10 px-4 md:px-8"
                    animate={{
                        x: [0, -50 + '%'],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: duration,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedBadges.map((badge, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 flex flex-col items-center gap-1.5 md:gap-3 min-w-[100px] md:min-w-[140px] hover:scale-110 transition-transform duration-300"
                        >
                            <div className="text-white/90">
                                {badge.icon}
                            </div>
                            <span className="text-[10px] md:text-sm font-medium text-white/90 whitespace-nowrap text-center">
                                {t(badge.labelKey)}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
