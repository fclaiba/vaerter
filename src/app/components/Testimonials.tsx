import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "La precisión dimensional de las carcasas es indistinguible de la inyección. Redujimos el time-to-market en un 60%.",
        author: "Ing. Martín Ocampo",
        role: "Director de Hardware",
        company: "AeroTech Drones",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
        quote: "El PETG estructural que usan soportó las pruebas de estrés térmico continuo que otros competidores fallaron.",
        author: "Dra. Sofía Reyes",
        role: "Investigadora Principal",
        company: "Laboratorios BIO-X",
        avatar: "https://images.unsplash.com/photo-1594824436951-7f1262d45173?q=80&w=200&auto=format&fit=crop"
    },
    {
        quote: "El nivel de atención y la capacidad de entender geometrías complejas hizo que nuestro ensamble encajara a la primera iteración.",
        author: "Arq. Leandro Gimeno",
        role: "Socio Fundador",
        company: "Estudio LG Diseño",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    }
];

export function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

    return (
        <section ref={containerRef} className="py-48 relative overflow-hidden bg-transparent">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

                {/* Apple Style Section Header */}
                <motion.div
                    style={{ opacity: titleOpacity, y: titleY }}
                    className="text-center mb-32 max-w-4xl mx-auto"
                >
                    <h2 className="text-sm font-bold tracking-[0.25em] text-[#86868b] uppercase mb-4">Confianza Validada</h2>
                    <h3 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-[#6e6e73] pb-4">
                        Resultados tangibles.
                    </h3>
                </motion.div>

                {/* Horizontal Scroll / Grid of Testimonials */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((item, idx) => {
                        // Apply slight staggered parallax to cards
                        const cardY = useTransform(
                            scrollYProgress,
                            [0, 1],
                            [100 + (idx * 50), -100 - (idx * 50)]
                        );

                        return (
                            <motion.div
                                key={idx}
                                style={{ y: cardY }}
                                className="relative bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 md:p-14 flex flex-col justify-between group overflow-hidden shadow-2xl"
                            >
                                {/* Subtle spotlight hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <Quote className="w-12 h-12 text-white/20 mb-10" />

                                <p className="text-2xl md:text-3xl font-medium tracking-tight leading-snug text-white mb-16">
                                    "{item.quote}"
                                </p>

                                <div className="flex items-center gap-5 mt-auto">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border border-white/20">
                                        <img
                                            src={item.avatar}
                                            alt={item.author}
                                            className="w-full h-full object-cover grayscale opacity-80"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white tracking-tight">{item.author}</div>
                                        <div className="text-sm text-[#86868b] font-medium tracking-wide">
                                            {item.role}, <span className="text-white/60">{item.company}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
