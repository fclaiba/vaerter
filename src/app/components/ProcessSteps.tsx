import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Upload, FileText, Printer } from "lucide-react";
import { cn } from "../../lib/utils";

const steps = [
  {
    icon: Upload,
    title: "1. Enviá tu idea",
    desc: "Nos compartís el archivo STL o nos contás tu idea. Recibimos bocetos, planos o referencias.",
  },
  {
    icon: FileText,
    title: "2. Cotización",
    desc: "Elegimos el mejor material y acabado para tu necesidad y te pasamos el presupuesto detallado.",
  },
  {
    icon: Printer,
    title: "3. Impresión y Entrega",
    desc: "Producimos con calidad premium y lo retirás en La Plata (o te lo enviamos a todo el país).",
  },
];

export function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-32 bg-black text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative" ref={containerRef}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-24 tracking-tighter"
        >
          Cómo funciona.
        </motion.h2>

        {/* Vertical Line Container */}
        <div className="absolute left-6 md:left-1/2 top-[200px] bottom-0 w-0.5 bg-neutral-800 -translate-x-1/2 hidden md:block">
          <motion.div 
            style={{ height: lineHeight }} 
            className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 origin-top" 
          />
        </div>

        <div className="space-y-12 md:space-y-32 relative z-10">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className={cn(
                "flex flex-col md:flex-row items-start md:items-center gap-8 relative",
                idx % 2 !== 0 ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Desktop Icon Centered */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black border border-neutral-800 items-center justify-center z-10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <step.icon className="w-6 h-6 text-white" />
              </div>

              {/* Mobile Icon */}
              <div className="md:hidden w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4">
                 <step.icon className="w-5 h-5 text-white" />
              </div>

              {/* Text Content */}
              <div className={cn(
                "w-full md:w-1/2",
                idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
              )}>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 inline-block">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Spacer for alignment */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
