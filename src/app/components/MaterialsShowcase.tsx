import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "../../lib/utils";
import { MaterialType } from "./modals/MaterialDetailModal";

interface MaterialsShowcaseProps {
  onSelectMaterial: (material: MaterialType) => void;
}

const materials = [
  {
    name: "PLA",
    desc: "El estándar. Ideal para validación rápida de geometría.",
    bgImage: "https://images.unsplash.com/photo-1739169169463-450148af26ce?q=80&w=1080&auto=format&fit=crop",
    id: "PLA" as MaterialType,
    parallaxFactor: ["-8%", "8%"]
  },
  {
    name: "PETG",
    desc: "Resistencia térmica superior. Funcionalidad.",
    bgImage: "https://images.unsplash.com/photo-1758677821691-1a63fdc9a183?q=80&w=1080&auto=format&fit=crop",
    id: "PETG" as MaterialType,
    parallaxFactor: ["-12%", "12%"]
  },
  {
    name: "ABS",
    desc: "El polímero de inyección por excelencia. Alta tenacidad.",
    bgImage: "https://images.unsplash.com/photo-1761646238073-2854cebdc344?q=80&w=1080&auto=format&fit=crop",
    id: "ABS" as MaterialType,
    parallaxFactor: ["-10%", "10%"]
  },
  {
    name: "TPU",
    desc: "Elasticidad extrema sin perder integridad estructural.",
    bgImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1080&auto=format&fit=crop",
    id: "TPU" as MaterialType,
    parallaxFactor: ["-15%", "15%"]
  },
];

export function MaterialsShowcase({ onSelectMaterial }: MaterialsShowcaseProps) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} id="materials" className="py-48 bg-transparent text-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

        {/* Apple Style Header: Massive, centered text, high contrast */}
        <div className="text-center mb-32 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-[100px] font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-[#6e6e73]"
          >
            Materia Prima.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl font-medium text-[#86868b] leading-tight tracking-tight max-w-3xl mx-auto"
          >
            Polímeros termoplásticos de grado industrial. Seleccionados y testeados para un rendimiento excepcional.
          </motion.p>
        </div>

        {/* Apple Style Bento Grid: Edge to edge imagery, stark contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {materials.map((mat, idx) => {
            // Setup dynamic parallax per element
            const yOffset = useTransform(scrollYProgress, [0, 1], mat.parallaxFactor);

            return (
              <motion.div
                key={mat.name}
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => onSelectMaterial(mat.id)}
                className="relative group cursor-pointer overflow-hidden rounded-[32px] md:rounded-[40px] aspect-[4/3] md:aspect-square lg:aspect-[4/3] bg-white/[0.02] backdrop-blur-xl border border-white/5"
              >
                {/* Massive background image with Apple Photographic treatment */}
                <motion.div style={{ y: yOffset, height: "130%", top: "-15%" }} className="absolute inset-x-0 z-0 bg-transparent">
                  <img
                    src={mat.bgImage}
                    alt={mat.name}
                    className="w-full h-full object-cover grayscale opacity-50 mix-blend-luminosity filter contrast-125 transition-transform duration-[2s] ease-out group-hover:scale-105"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
                {/* Radial glow on hover */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Content positioned like Apple features */}
                <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 md:p-12">
                  <div className="flex items-end justify-between w-full">
                    <div className="max-w-[80%]">
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3">{mat.name}</h3>
                      <p className="text-lg md:text-xl font-medium text-[#86868b] leading-snug tracking-tight">{mat.desc}</p>
                    </div>

                    {/* Subtle interaction affordance */}
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white text-white group-hover:text-black mt-auto">
                      <Plus className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Highlight Apple Cinematic Panels */}
        <div className="mt-4 md:mt-6 w-full rounded-[32px] md:rounded-[40px] overflow-hidden bg-white/[0.02] backdrop-blur-xl relative aspect-[3/4] md:aspect-[21/9] flex flex-col justify-center items-center text-center p-8 border border-white/5">
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]), height: "120%", top: "-10%" }}
            className="absolute inset-x-0 z-0 bg-transparent"
          >
            <img
              src="https://images.unsplash.com/photo-1739169169463-450148af26ce?q=80&w=2560&auto=format&fit=crop"
              alt="Post Processing"
              className="w-full h-full object-cover grayscale opacity-30 mix-blend-luminosity filter contrast-125"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-3xl px-4"
          >
            <h3 className="text-sm font-bold tracking-[0.25em] text-[#86868b] uppercase mb-4">Post-Procesado Avanzado</h3>
            <p className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-white">
              Acabados que rivalizan<br /> con la inyección.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
