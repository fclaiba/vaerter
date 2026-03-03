import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { UploadCloud, Zap, PackageSearch, Box } from "lucide-react";

const features = [
    {
        title: "Enviá tu idea.",
        description: "Subí tu archivo 3D o contanos tu idea conceptual. Analizamos la viabilidad y optimizamos el modelo para una impresión perfecta.",
        icon: UploadCloud,
        image: "https://images.unsplash.com/photo-1633420063242-b7b055231cde?q=80&w=1080&auto=format&fit=crop"
    },
    {
        title: "Análisis & Cotización.",
        description: "Seleccionamos los polímeros óptimos, calculamos la densidad estructural y te enviamos un presupuesto transparente sin costos ocultos.",
        icon: Zap,
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1080&auto=format&fit=crop"
    },
    {
        title: "Manufactura Aditiva.",
        description: "Nuestras granjas de impresión industriales entran en acción asegurando tolerancias estrictas y acabados superficiales de nivel premium.",
        icon: Box,
        image: "https://images.unsplash.com/photo-1589375769589-dd309bab3556?q=80&w=1080&auto=format&fit=crop"
    },
    {
        title: "Entrega Inmediata.",
        description: "Retirá tus piezas en nuestro laboratorio o coordinamos el envío seguro y perfectamente empaquetado a cualquier punto del país.",
        icon: PackageSearch,
        image: "https://images.unsplash.com/photo-1605908070830-4e7cb80dc1cb?q=80&w=1080&auto=format&fit=crop"
    }
];

export function StickyFeatures() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    return (
        <section id="process" ref={containerRef} className="relative bg-transparent text-white" style={{ height: `${features.length * 100}vh` }}>
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden bg-transparent">

                {/* Visuals on the right */}
                <div className="absolute inset-0 md:left-1/2 md:w-1/2 h-full z-0 p-4 md:p-8">
                    <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-zinc-900 border border-white/5">
                        {features.map((feature, index) => {
                            const start = index / features.length;
                            const end = (index + 1) / features.length;

                            const opacity = useTransform(
                                scrollYProgress,
                                [Math.max(0, start - 0.05), start, end - 0.05, Math.min(1, end + 0.05)],
                                [0, 1, 1, 0]
                            );

                            const scale = useTransform(
                                scrollYProgress,
                                [Math.max(0, start - 0.05), end],
                                [1.1, 1]
                            );

                            return (
                                <motion.div
                                    key={index}
                                    style={{ opacity }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <motion.img
                                        style={{ scale }}
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover opacity-60 md:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Text content container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex items-center pointer-events-none">
                    <div className="w-full md:w-1/2 relative h-[50vh] md:h-full">
                        {features.map((feature, index) => {
                            const start = index / features.length;
                            const end = (index + 1) / features.length;

                            const y = useTransform(
                                scrollYProgress,
                                [Math.max(0, start - 0.1), start + 0.05, end - 0.1, Math.min(1, end)],
                                [50, 0, 0, -50]
                            );

                            const opacity = useTransform(
                                scrollYProgress,
                                [Math.max(0, start - 0.1), start + 0.05, end - 0.1, Math.min(1, end)],
                                [0, 1, 1, 0]
                            );

                            return (
                                <motion.div
                                    key={index}
                                    style={{ y, opacity }}
                                    className="absolute top-1/2 -translate-y-1/2 w-full pr-8 md:pr-16"
                                >
                                    {/* Active feature text glow effect */}
                                    <div className="absolute inset-0 bg-white/5 blur-[100px] -z-10 rounded-full scale-150" />

                                    <div className="flex items-center gap-4 mb-4 md:mb-8">
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                            <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-white relative z-10" />
                                        </div>
                                    </div>
                                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-[#86868b] leading-[1.1]">
                                        {feature.title}
                                    </h2>
                                    <p className="text-xl md:text-2xl lg:text-3xl text-zinc-400 font-medium leading-relaxed tracking-tight max-w-2xl">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
