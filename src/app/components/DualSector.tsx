import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface DualSectorProps {
  onOpenRetail: () => void;
  onOpenWholesale: () => void;
}

export function DualSector({ onOpenRetail, onOpenWholesale }: DualSectorProps) {
  return (
    <section className="relative min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Retail Side */}
      <div 
        id="retail" 
        onClick={onOpenRetail}
        className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-screen border-r border-white/10 group overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-0 bg-neutral-900 transition-colors group-hover:bg-neutral-800" />
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
           <img 
            src="https://images.unsplash.com/photo-1665714792545-a167d49dcffa?q=80&w=1080&auto=format&fit=crop" 
            alt="Retail 3D Printing Art"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
           />
        </div>
        
        <div className="relative z-10 p-12 h-full flex flex-col justify-end md:justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4 block">Para Minoristas</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Materializamos<br/>tus ideas.</h2>
            <p className="text-gray-300 text-lg max-w-md mb-8 leading-relaxed">
              Enfocado en piezas únicas, prototipos, repuestos a medida o regalos personalizados.
            </p>
            <button className="flex items-center gap-2 text-white font-medium group/btn">
              <span>Empezar proyecto</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Wholesale Side */}
      <div 
        id="wholesale" 
        onClick={onOpenWholesale}
        className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-screen group overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-0 bg-black transition-colors group-hover:bg-neutral-950" />
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
           <img 
            src="https://images.unsplash.com/photo-1742466526307-f9d4e2e9291f?q=80&w=1080&auto=format&fit=crop" 
            alt="Wholesale Production"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
           />
        </div>

        <div className="relative z-10 p-12 h-full flex flex-col justify-end md:justify-center md:items-end md:text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-4 block">Para Mayoristas</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Escalamos<br/>tu negocio.</h2>
            <p className="text-gray-300 text-lg max-w-md mb-8 leading-relaxed ml-auto">
              Producción en serie, merchandising, piezas industriales y precios por volumen.
            </p>
            <button className="flex items-center gap-2 text-white font-medium group/btn ml-auto">
              <span>Ver soluciones B2B</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
