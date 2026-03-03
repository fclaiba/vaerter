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
    name: "PLA",
    tagline: "El estándar para prototipos rápidos.",
    description: "Biodegradable y con excelente resolución de impresión. Ideal para prototipos visuales, maquetas arquitectónicas y piezas que no requieren soportar altos esfuerzos mecánicos o temperaturas superiores a 50°C. Disponible en la mayor variedad de colores.",
    image: "https://images.unsplash.com/photo-1739169169463-450148af26ce?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Resistencia Térmica", value: "Baja (hasta 55°C)", icon: Thermometer },
      { label: "Resistencia al Impacto", value: "Media-Baja", icon: Hammer },
      { label: "Facilidad de Formateo", value: "Alta", icon: Zap },
      { label: "Acabado Superficial", value: "Excelente", icon: Layers },
    ],
    pros: ["Económico y accesible", "Resolución de detalles máxima", "Sin deformaciones al imprimir", "Opciones de colores vibrantes"],
    cons: ["Se ablanda bajo exposición directa al sol", "Comportamiento frágil bajo estrés"],
    bestFor: ["Prototipos estéticos", "Figuras decorativas", "Piezas funcionales de interior", "Maquetas"],
  },
  PETG: {
    name: "PETG",
    tagline: "El equilibrio perfecto entre flexibilidad y dureza.",
    description: "Un termoplástico de ingeniería que combina la facilidad de impresión del PLA con la fuerza del ABS. Resistente al agua y a químicos ligeros, es el material predilecto para fundas mecánicas, contenedores y piezas funcionales de uso diario.",
    image: "https://images.unsplash.com/photo-1758677821691-1a63fdc9a183?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Resistencia Térmica", value: "Media (hasta 75°C)", icon: Thermometer },
      { label: "Resistencia al Impacto", value: "Alta", icon: Hammer },
      { label: "Flexibilidad Tensional", value: "Media", icon: Zap },
      { label: "Tolerancia Química", value: "Excelente", icon: Layers },
    ],
    pros: ["Ligeramente flexible, no se quiebra", "Excelente adherencia entre capas", "Apto para estar a la intemperie", "No emite olores tóxicos"],
    cons: ["Propenso a formar hilos (stringing)", "No reacciona bien al lijado rústico"],
    bestFor: ["Piezas estructurales", "Soportes de cámara", "Envases funcionales", "Partes de uso exterior"],
  },
  ABS: {
    name: "ABS",
    tagline: "Ultra resistente, hecho para la industria.",
    description: "El clásico material industrial (el mismo que usan las piezas de LEGO). Extremadamente duro y resistente a las altas temperaturas, es perfecto para piezas automotrices y piezas que sufrirán impacto y fricción constante.",
    image: "https://images.unsplash.com/photo-1761646238073-2854cebdc344?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Resistencia Térmica", value: "Alta (hasta 95°C)", icon: Thermometer },
      { label: "Resistencia al Impacto", value: "Muy Alta", icon: Hammer },
      { label: "Mecanizabilidad", value: "Excelente", icon: Zap },
      { label: "Post-Procesado", value: "Óptimo", icon: Layers },
    ],
    pros: ["Soporta ambientes de calor extremo", "Se puede lijar y taladrar fácilmente", "Permite alisado químico con vapor", "No cede ante tensión constante"],
    cons: ["Sufre contracción térmica rápida", "Emisiones agresivas durante impresión"],
    bestFor: ["Piezas de motor y automotor", "Carcasas de herramientas", "Engranajes funcionales", "Repuestos industriales"],
  },
  TPU: {
    name: "TPU",
    tagline: "Propiedades del caucho. Libertad geométrica.",
    description: "Un elastómero que permite crear piezas que se doblan y estiran como la goma. Diseñado para casos de uso que requieren absorción de impactos, sellos herméticos o características táctiles suaves.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Resistencia Térmica", value: "Media (70°C)", icon: Thermometer },
      { label: "Absorción de Impacto", value: "Extrema", icon: Hammer },
      { label: "Elasticidad Continua", value: "Imbatible", icon: Zap },
      { label: "Resistencia a Abrasión", value: "Muy Alta", icon: Layers },
    ],
    pros: ["Virtualmente indestructible por impacto", "Amortigua fuertes vibraciones", "Se flexiona y recobra su forma", "Alta tolerancia a los aceites"],
    cons: ["Requiere velocidades de impresión muy lentas", "Los voladizos son difíciles de lograr sin fallas"],
    bestFor: ["Sellos y Juntas", "Fundas Anti-choque", "Plantillas de calzado", "Neumáticos R/C"],
  },
};

export function MaterialDetailModal({ isOpen, onClose, material }: MaterialDetailModalProps) {
  const data = material ? materialData[material] : null;

  if (!data) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Especificaciones del Material">
      <div className="space-y-10 pb-8">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden group border border-white/10 bg-black">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-3 tracking-tighter">{data.name}</h2>
            <p className="text-xl md:text-2xl text-[#86868b] font-medium tracking-tight bg-clip-text max-w-2xl">{data.tagline}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <p className="text-[#86868b] leading-relaxed text-lg md:text-xl font-medium tracking-tight">
                {data.description}
              </p>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">Capacidades Técnicas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.specs.map((spec: any, idx: number) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex items-center gap-5">
                    <div className="p-3 rounded-xl bg-white/10 text-white">
                      <spec.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#86868b] uppercase tracking-wider font-bold mb-1">{spec.label}</p>
                      <p className="text-white font-semibold">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">
              <h4 className="text-white font-bold mb-5 flex items-center gap-2">
                Puntos Fuertes
              </h4>
              <ul className="space-y-4">
                {data.pros.map((item: string, idx: number) => (
                  <li key={idx} className="text-sm font-medium text-[#86868b] flex items-start gap-3">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">
              <h4 className="text-white font-bold mb-5 flex items-center gap-2">
                Limitaciones
              </h4>
              <ul className="space-y-4">
                {data.cons.map((item: string, idx: number) => (
                  <li key={idx} className="text-sm font-medium text-[#86868b] flex items-start gap-3">
                    <X className="w-4 h-4 text-[#86868b] opacity-50 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">
              <h4 className="text-white font-bold mb-5">Aplicaciones Ideales</h4>
              <div className="flex flex-wrap gap-2">
                {data.bestFor.map((tag: string, idx: number) => (
                  <span key={idx} className="px-3 py-1.5 bg-white/10 text-xs font-semibold text-white rounded-full border border-white/5">
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
