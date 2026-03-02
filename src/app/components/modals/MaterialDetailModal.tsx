import { Modal } from "../ui/Modal";
import { Check, X, Thermometer, Hammer, Zap, Layers } from "lucide-react";
import { cn } from "../../../lib/utils";

export type MaterialType = "PLA" | "PETG" | "ABS" | "TPU" | null;

interface MaterialDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  material: MaterialType;
}

const materialData: Record<string, any> = {
  PLA: {
    name: "PLA (Ácido Poliláctico)",
    tagline: "El estándar de la industria. Biodegradable y fácil de imprimir.",
    description: "Ideal para prototipos rápidos, modelos decorativos y piezas que no estarán expuestas a altas temperaturas o estrés mecánico severo. Es el material más popular por su gran variedad de colores y acabados.",
    image: "https://images.unsplash.com/photo-1739169169463-450148af26ce?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Resistencia Térmica", value: "Baja (hasta 60°C)", icon: Thermometer, color: "text-red-400" },
      { label: "Resistencia al Impacto", value: "Media-Baja", icon: Hammer, color: "text-orange-400" },
      { label: "Facilidad de Impresión", value: "Alta", icon: Zap, color: "text-green-400" },
      { label: "Acabado Superficial", value: "Excelente", icon: Layers, color: "text-blue-400" },
    ],
    pros: ["Económico", "Gran variedad de colores", "Biodegradable", "Alta rigidez"],
    cons: ["Se deforma con el calor (sol directo)", "Frágil ante golpes fuertes"],
    bestFor: ["Prototipos visuales", "Figuras y Juguetes", "Maquetas arquitectónicas", "Organizadores de escritorio"],
  },
  PETG: {
    name: "PETG (Polietileno Tereftalato)",
    tagline: "El equilibrio perfecto entre resistencia y facilidad de uso.",
    description: "Combina la facilidad de impresión del PLA con la resistencia del ABS. Es ideal para piezas funcionales, soportes y elementos que requieren cierta flexibilidad y resistencia química.",
    image: "https://images.unsplash.com/photo-1570717909903-2a032f8c0e1a?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Resistencia Térmica", value: "Media (hasta 75°C)", icon: Thermometer, color: "text-orange-400" },
      { label: "Resistencia al Impacto", value: "Alta", icon: Hammer, color: "text-green-400" },
      { label: "Facilidad de Impresión", value: "Media-Alta", icon: Zap, color: "text-yellow-400" },
      { label: "Flexibilidad", value: "Media", icon: Layers, color: "text-blue-400" },
    ],
    pros: ["Resistente al agua y químicos", "Duradero", "No emite olores fuertes", "Certificable para contacto alimentario (según marca)"],
    cons: ["Puede hacer 'hilos' (stringing)", "Difícil de pegar o pintar"],
    bestFor: ["Piezas mecánicas", "Soportes", "Macetas", "Piezas para exterior"],
  },
  ABS: {
    name: "ABS (Acrilonitrilo Butadieno Estireno)",
    tagline: "El clásico de la ingeniería. Robusto y mecanizable.",
    description: "Un material técnico conocido por su dureza y resistencia al calor. Es perfecto para piezas que sufrirán desgaste, y permite un post-procesado químico con acetona para lograr superficies lisas como vidrio.",
    image: "https://images.unsplash.com/photo-1750534232339-017655f56081?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Resistencia Térmica", value: "Alta (hasta 95°C)", icon: Thermometer, color: "text-green-400" },
      { label: "Resistencia al Impacto", value: "Muy Alta", icon: Hammer, color: "text-green-400" },
      { label: "Facilidad de Impresión", value: "Media-Baja", icon: Zap, color: "text-red-400" },
      { label: "Post-Procesado", value: "Excelente", icon: Layers, color: "text-purple-400" },
    ],
    pros: ["Muy resistente al calor", "Lijable y pintable", "Alisado químico posible", "Durabilidad extrema"],
    cons: ["Requiere impresora cerrada (warping)", "Emite olores al imprimir", "Se contrae al enfriar"],
    bestFor: ["Piezas automotrices", "Carcasas electrónicas", "Engranajes", "Piezas expuestas al sol"],
  },
  TPU: {
    name: "TPU (Poliuretano Termoplástico)",
    tagline: "Flexible, elástico y resistente a la abrasión.",
    description: "Un material similar a la goma que se puede estirar y doblar sin romperse. Ideal para amortiguadores, sellos, fundas de celular y cualquier pieza que necesite absorber impactos.",
    image: "https://images.unsplash.com/photo-1758677821691-1a63fdc9a183?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Resistencia Térmica", value: "Media (hasta 60-70°C)", icon: Thermometer, color: "text-yellow-400" },
      { label: "Resistencia al Impacto", value: "Indestructible", icon: Hammer, color: "text-green-400" },
      { label: "Facilidad de Impresión", value: "Baja", icon: Zap, color: "text-red-400" },
      { label: "Elasticidad", value: "Extrema", icon: Layers, color: "text-purple-400" },
    ],
    pros: ["Flexible", "Amortigua vibraciones", "Resistente a aceites y grasas", "Irrompible"],
    cons: ["Impresión lenta", "Difícil de usar con soportes", "No se puede lijar bien"],
    bestFor: ["Fundas de teléfono", "Neumáticos RC", "Juntas y sellos", "Topes de puerta"],
  },
};

export function MaterialDetailModal({ isOpen, onClose, material }: MaterialDetailModalProps) {
  const data = material ? materialData[material] : null;

  if (!data) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalle de Material">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden group">
          <img 
            src={data.image} 
            alt={data.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">{data.name}</h2>
            <p className="text-lg md:text-xl text-gray-300 font-medium">{data.tagline}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Descripción</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {data.description}
              </p>
            </div>

            <div>
               <h3 className="text-xl font-semibold text-white mb-4">Especificaciones Técnicas</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {data.specs.map((spec: any, idx: number) => (
                   <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                     <div className={cn("p-2 rounded-lg bg-white/5", spec.color)}>
                       <spec.icon className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{spec.label}</p>
                       <p className="text-white font-medium">{spec.value}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
              <h4 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                <Check className="w-5 h-5" /> Ventajas
              </h4>
              <ul className="space-y-2">
                {data.pros.map((item: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
              <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                <X className="w-5 h-5" /> Limitaciones
              </h4>
              <ul className="space-y-2">
                {data.cons.map((item: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h4 className="text-white font-bold mb-4">Usos Recomendados</h4>
              <div className="flex flex-wrap gap-2">
                {data.bestFor.map((tag: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-white/10 text-xs font-medium text-gray-300 rounded-full border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
