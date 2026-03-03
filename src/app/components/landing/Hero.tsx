import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Box } from "lucide-react";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scale the background down to create a framed effect similar to Apple
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "40px"]);
  // Fade out the text earlier in the scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yOffset = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black">
      {/* Sticky container that holds the view while scrolling */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">

        {/* Cinematic scaled frame */}
        <motion.div
          style={{ scale, borderRadius }}
          className="relative w-full h-full overflow-hidden bg-[#030303] flex items-center justify-center origin-center"
        >
          {/* Background Image with Deep Gradient Overlays */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#030303]/70 to-[#030303] z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent z-10 opacity-70" />
            <img
              src="https://images.unsplash.com/photo-1589375769589-dd309bab3556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50aW5nJTIwY2xvc2UlMjB1cCUyMGxheWVycyUyMGhpZ2glMjBxdWFsaXR5fGVufDF8fHx8MTc3MjQyNDE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="3D Printing Environment"
              className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
              loading="eager"
            />
            {/* Synthetic grid overlay for tech feel */}
            <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-30" />
          </div>

          <motion.div
            style={{ opacity, y: yOffset }}
            className="container mx-auto px-4 sm:px-6 relative z-20 text-center flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl mx-auto flex flex-col items-center"
            >
              {/* Status Pill */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-8 shadow-2xl"
              >
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  Disponible en La Plata
                </span>
              </motion.div>

              {/* Main Typography */}
              <div className="relative mb-8 text-center max-w-[800px]">
                {/* Soft background glow behind text */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 blur-[100px] rounded-full pointer-events-none -z-10" />

                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.9] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 pb-2">
                  Impresión 3D
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
                    Premium.
                  </span>
                </h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-lg md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
              >
                Soluciones en todos los filamentos y acabados para llevar tus
                proyectos al siguiente nivel. <strong className="text-white/80 font-medium">Atención minorista y mayorista.</strong>
              </motion.p>

              {/* CTA Group */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto"
              >
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="group relative w-full sm:w-auto px-8 py-4.5 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-full flex items-center justify-center gap-3 transition-all overflow-hidden"
                >
                  {/* Outer Glow */}
                  <div className="absolute inset-0 rounded-full bg-white opacity-40 blur-xl transition-opacity group-hover:opacity-80" />
                  <span className="relative z-10 flex items-center gap-2">
                    Cotizar proyecto
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  href="#value-prop"
                  className="group w-full sm:w-auto px-8 py-4.5 bg-transparent border border-white/20 text-white text-sm font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-3 hover:border-white/50 transition-all backdrop-blur-md"
                >
                  <Box size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
                  Catálogo mayorista
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Atmospheric gradient at bottom masking the transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-10 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
