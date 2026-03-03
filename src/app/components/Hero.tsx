import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { TrustTicker } from "./TrustTicker";

interface HeroProps {
  onOpenQuote: () => void;
  onOpenWholesale: () => void;
}

export function Hero({ onOpenQuote, onOpenWholesale }: HeroProps) {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-black text-white px-6">
      {/* Background with Image */}
      <div className="absolute inset-0 z-0 bg-black">
        <motion.div
          className="w-full h-full"
        >
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: [1, 1.05, 1], opacity: [0, 0.45, 0.45] }}
            transition={{
              opacity: { duration: 1.5, ease: "easeOut" },
              scale: { duration: 30, repeat: Infinity, ease: "linear" }
            }}
            src="https://images.unsplash.com/photo-1611078736342-63234d75f28c?q=80&w=2560&auto=format&fit=crop"
            alt="Renderizado 3D de alta precisión oscuro"
            className="w-full h-full object-cover mix-blend-luminosity filter contrast-150 saturate-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-6 mt-20 px-4">

        {/* Apple Style Announcement Badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2 flex items-center gap-2 text-sm font-medium text-white/80"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Nueva resina de ultra-detalle disponible
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-7xl md:text-9xl lg:text-[11rem] leading-[0.9] font-bold tracking-[-0.04em] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 pb-2"
        >
          Impresión 3D Premium.
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-3xl text-gray-400 max-w-3xl font-light leading-relaxed tracking-tight"
        >
          Soluciones en todos los filamentos y acabados para llevar tus proyectos al siguiente nivel.
          <span className="block mt-2 text-white/80">Atención minorista y mayorista desde La Plata.</span>
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 mt-10 w-full sm:w-auto items-center justify-center"
        >
          <button
            onClick={onOpenQuote}
            className="group relative w-full sm:w-auto px-8 py-5 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_80px_rgba(255,255,255,0.6)]"
          >
            <span className="relative z-10 flex items-center gap-2 block">
              Cotizar mi proyecto
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-full animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,255,255,0)_0%,rgba(0,0,0,0.1)_50%,rgba(255,255,255,0)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>

          <button
            onClick={onOpenWholesale}
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all active:scale-95"
          >
            Ver catálogo mayorista
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 md:bottom-28 z-10 text-white/30"
      >
        <ChevronDown className="w-8 h-8 mx-auto" strokeWidth={1.5} />
      </motion.div>

      {/* Integrated Trust Ticker */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <TrustTicker />
      </div>
    </section>
  );
}
