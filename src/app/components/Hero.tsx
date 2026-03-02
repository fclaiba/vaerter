import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface HeroProps {
  onOpenQuote: () => void;
  onOpenWholesale: () => void;
}

export function Hero({ onOpenQuote, onOpenWholesale }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white px-6">
      {/* Background with Image */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1570717909903-2a032f8c0e1a?q=80&w=2070&auto=format&fit=crop" 
            alt="Background 3D printing nozzle"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8 mt-20">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
        >
          Impresión 3D Premium.
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed"
        >
          Soluciones en todos los filamentos y acabados para llevar tus proyectos al siguiente nivel. 
          <span className="block mt-2 text-white/80">Atención minorista y mayorista desde La Plata.</span>
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
        >
          <button 
            onClick={onOpenQuote}
            className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Cotizar mi proyecto</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 z-10 text-gray-500"
      >
        <span className="text-xs uppercase tracking-widest mb-2 block text-center">Descubrir más</span>
        <ChevronDown className="w-6 h-6 mx-auto" />
      </motion.div>
    </section>
  );
}
