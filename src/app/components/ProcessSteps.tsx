import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { UploadCloud, Zap, PackageSearch, Box } from "lucide-react";
import { cn } from "../../lib/utils";

const steps = [
  {
    icon: UploadCloud,
    title: "Enviá tu idea",
    desc: "Subí tu archivo 3D (.stl, .obj) o contanos tu idea conceptual. Nuestro equipo de ingeniería analizará la viabilidad y optimizará el modelo para producción.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    glow: "shadow-[0_0_30px_rgba(96,165,250,0.3)]"
  },
  {
    icon: Zap,
    title: "Análisis & Cotización",
    desc: "Seleccionamos los polímeros óptimos, calculamos la densidad de relleno estructural y te enviamos un presupuesto transparente sin costos ocultos.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.3)]"
  },
  {
    icon: Box,
    title: "Manufactura Aditiva",
    desc: "Nuestras granjas de impresión industriales entran en acción asegurando tolerancias estrictas, acabados superficiales premium y control de calidad.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    glow: "shadow-[0_0_30px_rgba(52,211,153,0.3)]"
  },
  {
    icon: PackageSearch,
    title: "Entrega o Envío",
    desc: "Retirá tus piezas terminadas en nuestro laboratorio en La Plata o coordinamos el envío seguro y empaquetado a cualquier punto del país.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    glow: "shadow-[0_0_30px_rgba(251,146,60,0.3)]"
  }
];

export function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-32 bg-[#030303] text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-transparent to-transparent opacity-50 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10" ref={containerRef}>

        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Workflow</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6"
          >
            Lógica de trabajo.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto"
          >
            Desde el boceto inicial hasta la pieza funcional en tus manos, nuestro proceso está optimizado para la máxima eficiencia y transparencia.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Glowing Line Container */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-white/[0.03] -translate-x-1/2 hidden md:block rounded-full overflow-hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 origin-top shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
          </div>

          <div className="space-y-12 md:space-y-32 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={cn(
                  "flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 relative group",
                  idx % 2 !== 0 ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Desktop Icon Centered */}
                <div className={cn(
                  "hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-[#060606] border border-white/10 items-center justify-center z-10 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/5",
                  `group-hover:${step.glow}`
                )}>
                  <step.icon className={cn("w-8 h-8 transition-colors duration-500", step.color)} strokeWidth={1.5} />
                </div>

                {/* Content Card */}
                <div className={cn(
                  "w-full md:w-1/2 flex",
                  idx % 2 === 0 ? "md:justify-end" : "md:justify-start"
                )}>
                  <div className="relative p-8 rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 w-full md:max-w-md group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">

                    {/* Mobile Icon */}
                    <div className={cn(
                      "md:hidden w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center mb-6",
                      step.bg
                    )}>
                      <step.icon className={cn("w-6 h-6", step.color)} />
                    </div>

                    <div className="flex items-end gap-4 mb-4">
                      <span className="text-5xl font-extrabold text-white/5 group-hover:text-white/10 transition-colors pointer-events-none select-none -translate-x-4">
                        0{idx + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-white tracking-tight -ml-4">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-zinc-400 text-base leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
