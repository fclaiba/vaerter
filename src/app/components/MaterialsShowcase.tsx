import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { MaterialType } from "./modals/MaterialDetailModal";

interface MaterialsShowcaseProps {
  onSelectMaterial: (material: MaterialType) => void;
}

const materials = [
  { 
    name: "PLA", 
    desc: "Ecológico y versátil. Ideal para prototipos rápidos.", 
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
    id: "PLA" as MaterialType
  },
  { 
    name: "PETG", 
    desc: "Resistente y duradero. Perfecto para uso mecánico.", 
    bg: "bg-purple-500/10", 
    border: "border-purple-500/20",
    text: "text-purple-400",
    id: "PETG" as MaterialType
  },
  { 
    name: "ABS", 
    desc: "Alta resistencia térmica. Para piezas funcionales.", 
    bg: "bg-orange-500/10", 
    border: "border-orange-500/20",
    text: "text-orange-400",
    id: "ABS" as MaterialType
  },
  { 
    name: "TPU", 
    desc: "Flexible y elástico. Amortiguación y sellos.", 
    bg: "bg-green-500/10", 
    border: "border-green-500/20",
    text: "text-green-400",
    id: "TPU" as MaterialType
  },
];

export function MaterialsShowcase({ onSelectMaterial }: MaterialsShowcaseProps) {
  return (
    <section id="materials" className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Materiales y Acabados.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl"
          >
            Desde filamentos estándar hasta ingeniería avanzada. Tratamientos post-procesado para un acabado profesional.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((mat, idx) => (
            <motion.div
              key={mat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onSelectMaterial(mat.id)}
              className={cn(
                "p-8 rounded-3xl border flex flex-col justify-between h-64 hover:bg-white/5 transition-all cursor-pointer group active:scale-95",
                mat.bg, mat.border
              )}
            >
              <div>
                <h3 className={cn("text-2xl font-bold mb-2", mat.text)}>{mat.name}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{mat.desc}</p>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity ml-auto">
                 <Check className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative aspect-video rounded-3xl overflow-hidden bg-neutral-900 border border-white/5 group"
            >
               <img 
                 src="https://images.unsplash.com/photo-1739169169463-450148af26ce?q=80&w=2070&auto=format&fit=crop" 
                 alt="Filament Spools"
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
               />
               <div className="absolute bottom-0 left-0 p-8">
                 <h3 className="text-2xl font-bold mb-2">Variedad de Colores</h3>
                 <p className="text-gray-300 text-sm">Stock permanente en toda la gama cromática.</p>
               </div>
            </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5 }}
               className="relative aspect-video rounded-3xl overflow-hidden bg-neutral-900 border border-white/5 group"
             >
               <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black p-8 flex flex-col justify-center items-center text-center">
                  <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">Post-Procesado</h3>
                  <p className="text-gray-400 max-w-sm">Lijado, pintado y tratamientos químicos para eliminar capas visibles y lograr acabados de inyección.</p>
               </div>
            </motion.div>
        </div>

      </div>
    </section>
  );
}
