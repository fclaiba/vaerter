import { Modal } from "../ui/Modal";
import { Truck, Box, Cpu, Package, Hexagon, Layers } from "lucide-react";

export type SectorType = "retail" | "wholesale" | null;

interface SectorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sector: SectorType;
  onQuote: () => void;
}

export function SectorDetailModal({ isOpen, onClose, sector, onQuote }: SectorDetailModalProps) {
  if (!sector) return null;

  const isRetail = sector === "retail";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isRetail ? "Proyectos Singulares" : "Producción Escalable B2B"}>
      <div className="space-y-12 pb-12">
        {/* Hero Header */}
        <div className="text-center space-y-6 py-12 relative overflow-hidden rounded-[32px] bg-black border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white relative z-10 px-4">
            {isRetail ? "Imagina. Imprime." : "Dimensión Industrial."}
          </h2>
          <p className="text-xl md:text-2xl text-[#86868b] font-medium tracking-tight max-w-2xl mx-auto relative z-10 px-4">
            {isRetail
              ? "De lo intangible a lo tangible. Prototipos, herramientas o accesorios únicos fabricados bajo demanda."
              : "Fabricación aditiva en serie. Superamos los límites de la matricería tradicional con flexibilidad absoluta."}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isRetail ? (
            <>
              <FeatureCard
                icon={Hexagon}
                title="Libertad Total"
                desc="Imprimimos geometrías complejas que los métodos tradicionales no pueden lograr."
              />
              <FeatureCard
                icon={Cpu}
                title="Prototipado Eficiente"
                desc="Itera funciones y validaciones en tiempos récord, antes de comprometer grandes inversiones."
              />
              <FeatureCard
                icon={Box}
                title="Personalización a Medida"
                desc="Cada pieza es concebida específicamente para tus requerimientos, sin pedir mínimos."
              />
            </>
          ) : (
            <>
              <FeatureCard
                icon={Layers}
                title="Granjas de Impresión"
                desc="Acceso a nuestra infraestructura escalable preparada para satisfacer volúmenes de forma rápida."
              />
              <FeatureCard
                icon={Package}
                title="Costos Agresivos"
                desc="Nuestros precios se reestructuran a medida que el volumen o los lotes corporativos aumentan."
              />
              <FeatureCard
                icon={Truck}
                title="Logística Integral"
                desc="Nos encargamos del Post-procesado (QA) y empaquetado para entregar el proyecto listo."
              />
            </>
          )}
        </div>

        {/* Comparison / Pricing List */}
        <div className="border border-white/10 rounded-[32px] overflow-hidden bg-[#1c1c1e]">
          <div className="p-8 border-b border-white/5">
            <h3 className="font-bold text-white text-2xl tracking-tight">
              {isRetail ? "Esquema de Ejemplos Base" : "Estructura de Descuentos"}
            </h3>
            <p className="text-[#86868b] mt-2 font-medium">Los valores son paramétricos y se ajustan al modelo final.</p>
          </div>
          <div className="divide-y divide-white/5">
            {isRetail ? (
              <>
                <PriceRow label="Prototipos Básicos (PLA o PETG)" price="Desde $5.000" />
                <PriceRow label="Accesorios o Soportes de Electrónica" price="Desde $12.000" />
                <PriceRow label="Modelos Visuales de Precisión (Resina)" price="Desde $25.000" />
                <PriceRow label="Mecanismos y Repuestos Especializados" price="Sujeto a Ingeniería" />
              </>
            ) : (
              <>
                <PriceRow label="Lote Inicial (Piloto de Viabilidad)" price="Pricing Estándar" />
                <PriceRow label="Tier 1 (Más de 50 copias idénticas)" price="-20% OFF Unitario" />
                <PriceRow label="Tier 2 (Más de 250 copias idénticas)" price="-40% OFF Unitario" />
                <PriceRow label="Producción Continua Mensual" price="Pricing SLA Corporativo" />
              </>
            )}
          </div>
        </div>

        {/* Gallery Preview */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-56 md:h-64 mt-6">
            <img
              src={sector === "retail"
                ? "https://images.unsplash.com/photo-1665714792545-a167d49dcffa?q=80&w=400&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop"
              }
              className="w-full h-full object-cover rounded-3xl mix-blend-luminosity opacity-70 hover:opacity-100 hover:mix-blend-normal hover:scale-105 transition-all duration-500 cursor-pointer border border-white/10"
              alt="Process 1"
            />
            <img
              src={sector === "retail"
                ? "https://images.unsplash.com/photo-1638478872316-32fb5d4c2b21?q=80&w=400&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1742466526307-f9d4e2e9291f?q=80&w=400&auto=format&fit=crop"
              }
              className="w-full h-full object-cover rounded-3xl mix-blend-luminosity opacity-70 hover:opacity-100 hover:mix-blend-normal hover:scale-105 transition-all duration-500 cursor-pointer border border-white/10"
              alt="Process 2"
            />
            <img
              src={sector === "retail"
                ? "https://images.unsplash.com/photo-1739169169463-450148af26ce?q=80&w=400&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1589375769589-dd309bab3556?q=80&w=400&auto=format&fit=crop"
              }
              className="w-full h-full object-cover rounded-3xl mix-blend-luminosity opacity-70 hover:opacity-100 hover:mix-blend-normal hover:scale-105 transition-all duration-500 cursor-pointer border border-white/10"
              alt="Process 3"
            />
            <img
              src={sector === "retail"
                ? "https://images.unsplash.com/photo-1761646238073-2854cebdc344?q=80&w=400&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1758677821691-1a63fdc9a183?q=80&w=400&auto=format&fit=crop"
              }
              className="w-full h-full object-cover rounded-3xl mix-blend-luminosity opacity-70 hover:opacity-100 hover:mix-blend-normal hover:scale-105 transition-all duration-500 cursor-pointer border border-white/10"
              alt="Process 4"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-10">
          <button
            onClick={() => {
              onClose();
              onQuote();
            }}
            className="px-10 py-5 bg-white text-black font-semibold rounded-full text-lg hover:bg-gray-200 transition-colors active:scale-95 flex items-center gap-3"
          >
            {isRetail ? "Comenzar un proyecto" : "Desarrollar solución industrial"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-8 bg-[#1c1c1e] rounded-[32px] border border-white/5 hover:bg-white/[0.03] transition-colors">
      <div className="w-12 h-12 rounded-full flex items-center mb-6 text-white bg-white/10 justify-center">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-[#86868b] leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function PriceRow({ label, price }: { label: string, price: string }) {
  return (
    <div className="flex justify-between items-center px-8 py-5 hover:bg-white/[0.02] transition-colors">
      <span className="text-[#86868b] font-semibold text-sm">{label}</span>
      <span className="text-white font-bold">{price}</span>
    </div>
  );
}
