import { motion } from "motion/react";
import { ArrowRight, Box } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        <img
          src="https://images.unsplash.com/photo-1589375769589-dd309bab3556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50aW5nJTIwY2xvc2UlMjB1cCUyMGxheWVycyUyMGhpZ2glMjBxdWFsaXR5fGVufDF8fHx8MTc3MjQyNDE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="3D Printing Detail"
          className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wider text-white/80">
              Disponible en La Plata
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60">
            Impresión 3D a Medida
            <br />
            Calidad Premium.
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Soluciones en todos los filamentos y acabados para llevar tus
            proyectos al siguiente nivel. Atención minorista y mayorista.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 bg-white text-black font-semibold rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Cotizar mi proyecto 3D
              <ArrowRight size={18} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              href="#value-prop" // changed to anchor to B2B section
              className="px-8 py-4 bg-transparent border border-white/30 text-white font-medium rounded-full flex items-center gap-2 hover:border-white transition-colors backdrop-blur-sm"
            >
              <Box size={18} />
              Ver catálogo mayorista
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}
