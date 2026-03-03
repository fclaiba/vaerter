import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "../../lib/utils";

interface ScrollTextRevealProps {
    text: string;
}

export function ScrollTextReveal({ text }: ScrollTextRevealProps) {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 80%", "end 20%"]
    });

    const words = text.split(" ");

    return (
        <section ref={container} className="min-h-screen bg-transparent flex items-center justify-center p-6 md:p-12 relative z-10">
            <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-4 md:gap-y-4">
                {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + (1 / words.length);
                    return (
                        <Word key={i} range={[start, end]} progress={scrollYProgress}>
                            {word}
                        </Word>
                    )
                })}
            </div>
        </section>
    );
}

const Word = ({ children, progress, range }: any) => {
    const opacity = useTransform(progress, range, [0.15, 1]);
    return (
        <motion.span
            style={{ opacity }}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-[110px] font-black tracking-tighter leading-[1.1] text-white m-0"
        >
            {children}
        </motion.span>
    );
};
