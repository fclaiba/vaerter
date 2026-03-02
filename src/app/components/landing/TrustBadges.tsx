import { motion } from "motion/react";
import { Zap, Package, Palette, MapPin } from "lucide-react";

const badges = [
  { icon: Zap, text: "Calidad Premium Asegurada" },
  { icon: Package, text: "Venta Mayorista y Minorista" },
  { icon: Palette, text: "Todos los filamentos y acabados" },
  { icon: MapPin, text: "Envíos desde La Plata" },
];

export function TrustBadges() {
  return (
    <section className="bg-black border-b border-white/10 py-8 relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left"
            >
              <div className="p-2 bg-white/5 rounded-full text-blue-400">
                <badge.icon size={20} />
              </div>
              <span className="text-sm font-medium text-gray-300">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
