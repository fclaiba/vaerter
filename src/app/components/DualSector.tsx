import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface DualSectorProps {
  onOpenRetail: () => void;
  onOpenWholesale: () => void;
}

export function DualSector({ onOpenRetail, onOpenWholesale }: DualSectorProps) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Deep Parallax effect for the background images (sliding them slower than the scroll)
  const yParallax1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]); // Slightly different speed for variation

  return (
    <section ref={containerRef} id="sectors" className="relative min-h-[90svh] bg-transparent text-white flex flex-col md:flex-row overflow-hidden pb-10 px-4 sm:px-6 gap-4 md:gap-6 max-w-[1400px] mx-auto pt-32">

      {/* Retail Side */}
      <motion.div
        id="retail"
        onClick={onOpenRetail}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full md:w-1/2 min-h-[60vh] md:min-h-[85vh] group cursor-pointer overflow-hidden rounded-[32px] md:rounded-[40px] flex flex-col justify-between bg-white/[0.02] backdrop-blur-xl shadow-2xl"
      >
        {/* Apple Unification Layer & Parallax */}
        <motion.div
          style={{ y: yParallax1, height: "125%", top: "-12.5%" }}
          className="absolute inset-x-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1638478872316-32fb5d4c2b21?q=80&w=1080&auto=format&fit=crop"
            alt="Proyectos a medida"
            className="w-full h-full object-cover grayscale opacity-50 mix-blend-luminosity filter contrast-125 transition-transform duration-[2s] group-hover:scale-105"
          />
        </motion.div>

        {/* Soft blackout gradients to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
        <div className="absolute inset-0 border border-white/5 rounded-[32px] md:rounded-[40px] pointer-events-none" />

        {/* Top Content */}
        <div className="relative z-10 p-8 md:p-12 text-center w-full mt-12 md:mt-24 text-shadow-xl">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 text-white">
            Individuos.
          </h2>
          <p className="text-xl md:text-2xl font-medium text-[#86868b] max-w-sm mx-auto leading-snug tracking-tight">
            Prototipos, regalos y piezas únicas.
          </p>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10 p-8 md:p-12 flex justify-center w-full">
          <button className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold transition-transform duration-300 group-hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]">
            <span>Catálogo Minorista</span>
            <ArrowUpRight className="w-5 h-5 opacity-70" />
          </button>
        </div>
      </motion.div>

      {/* Wholesale Side */}
      <motion.div
        id="value-prop"
        onClick={onOpenWholesale}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full md:w-1/2 min-h-[60vh] md:min-h-[85vh] group cursor-pointer overflow-hidden rounded-[32px] md:rounded-[40px] flex flex-col justify-between bg-white/[0.02] backdrop-blur-xl shadow-2xl"
      >
        {/* Apple Unification Layer & Parallax */}
        <motion.div
          style={{ y: yParallax2, height: "125%", top: "-12.5%" }}
          className="absolute inset-x-0 z-0 bg-transparent"
        >
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1080&auto=format&fit=crop"
            alt="Producción en serie"
            className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity filter contrast-125 transition-transform duration-[2s] group-hover:scale-105"
          />
        </motion.div>

        {/* Soft blackout gradients to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
        <div className="absolute inset-0 border border-white/5 rounded-[32px] md:rounded-[40px] pointer-events-none" />

        {/* Top Content */}
        <div className="relative z-10 p-8 md:p-12 text-center w-full mt-12 md:mt-24 text-shadow-xl">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 text-white">
            Empresas.
          </h2>
          <p className="text-xl md:text-2xl font-medium text-[#86868b] max-w-sm mx-auto leading-snug tracking-tight">
            Producción B2B y lotes industriales.
          </p>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10 p-8 md:p-12 flex justify-center w-full">
          <button className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md rounded-full font-semibold transition-all duration-300 group-hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/10">
            <span>Soluciones Industriales</span>
            <ArrowUpRight className="w-5 h-5 opacity-70" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
