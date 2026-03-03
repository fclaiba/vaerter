import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

interface SpecProps {
    number: string;
    unit: string;
    label: string;
    delay?: number;
}

function AnimatedSpec({ number, unit, label, delay = 0 }: SpecProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center text-center p-8 relative group"
        >
            <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white/20 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />

                <div className="flex items-baseline justify-center gap-1 mb-4 relative z-10">
                    <span className="text-7xl md:text-9xl lg:text-[140px] font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-[#6e6e73]">
                        {number}
                    </span>
                    <span className="text-3xl md:text-5xl font-bold tracking-tighter text-[#86868b]">
                        {unit}
                    </span>
                </div>
            </div>
            <p className="text-xl md:text-2xl font-medium text-[#86868b] tracking-tight">
                {label}
            </p>
        </motion.div>
    );
}

export function PerformanceSpecs() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="py-48 bg-transparent relative overflow-hidden">
            <motion.div
                style={{ scale, opacity }}
                className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10"
            >
                <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[40px] overflow-hidden">

                    <div className="p-16 md:p-24 text-center border-b border-white/5">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6"
                        >
                            Rendimiento Cuantificable.
                        </motion.h3>
                        <p className="text-xl md:text-2xl text-[#86868b] max-w-2xl mx-auto font-medium">
                            Hardware industrial diseñado para operar a tolerancias estrictas 24/7.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
                        <AnimatedSpec
                            number="0.1"
                            unit="mm"
                            label="Precisión Dimensional"
                            delay={0.1}
                        />
                        <AnimatedSpec
                            number="24"
                            unit="hs"
                            label="Ciclo de Operación Contínua"
                            delay={0.3}
                        />
                        <AnimatedSpec
                            number="90"
                            unit="%"
                            label="Costo reducido vs Inyección"
                            delay={0.5}
                        />
                    </div>

                </div>
            </motion.div>
        </section>
    );
}
