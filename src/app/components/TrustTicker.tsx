import { Truck, Palette, Package, Zap } from "lucide-react";
import { motion } from "motion/react";

const badges = [
  { icon: Zap, text: "Calidad Premium Asegurada" },
  { icon: Package, text: "Venta Mayorista y Minorista" },
  { icon: Palette, text: "Todos los filamentos y acabados" },
  { icon: Truck, text: "Envíos desde La Plata" },
];

export function TrustTicker() {
  return (
    <section className="py-8 bg-neutral-950 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500">
          {badges.map((badge, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-sm md:text-base font-medium text-gray-300"
            >
              <badge.icon className="w-5 h-5 text-white" />
              <span>{badge.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
