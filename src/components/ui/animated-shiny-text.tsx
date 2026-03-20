import * as React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps extends HTMLMotionProps<"h1"> {
    text: string;
    gradientColors?: string;
    gradientAnimationDuration?: number;
    hoverEffect?: boolean;
    className?: string;
    textClassName?: string;
    manual?: boolean;
}

const AnimatedText = React.forwardRef<HTMLHeadingElement, AnimatedTextProps>(
    (
        {
            text,
            gradientColors = "linear-gradient(90deg, #000, #fff, #000)",
            gradientAnimationDuration = 1,
            hoverEffect = false,
            className,
            textClassName,
            style,
            manual = false,
            ...props
        },
        ref
    ) => {
        const [isHovered, setIsHovered] = React.useState(false);

        const textVariants: Variants = {
            initial: {
                backgroundPosition: "-200% 0",
            },
            animate: {
                backgroundPosition: "200% 0",
                transition: {
                    duration: gradientAnimationDuration,
                    repeat: Infinity,
                    repeatType: "loop" as const,
                    ease: "linear"
                },
            },
        };

        return (
            <div className={cn("flex justify-center items-center py-8", className)}>
                <motion.h1
                    ref={ref}
                    className={cn(
                        "text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-relaxed font-bold py-8",
                        textClassName
                    )}
                    style={{
                        background: gradientColors,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: isHovered ? "0 0 8px rgba(255,255,255,0.3)" : "none",
                        ...style,
                    }}
                    variants={!manual ? textVariants : undefined}
                    initial={!manual ? "initial" : undefined}
                    animate={!manual ? "animate" : undefined}
                    onHoverStart={() => hoverEffect && setIsHovered(true)}
                    onHoverEnd={() => hoverEffect && setIsHovered(false)}
                    {...props}
                >
                    {text}
                </motion.h1>
            </div>
        );
    }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
