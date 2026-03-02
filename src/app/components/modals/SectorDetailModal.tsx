import { Modal } from "../ui/Modal";
import { CheckCircle2, Factory, Palette, Truck, Zap, Box, FileBarChart, Users } from "lucide-react";

export type SectorType = "retail" | "wholesale" | null;

interface SectorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sector: SectorType;
  onQuote: () => void; // Function to open quote modal from here
}

export function SectorDetailModal({ isOpen, onClose, sector, onQuote }: SectorDetailModalProps) {
  if (!sector) return null;

  const isRetail = sector === "retail";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isRetail ? "Servicios para Particulares" : "Soluciones Corporativas"}>
      <div className="space-y-12 pb-12">
        {/* Hero Header */}
        <div className="text-center space-y-4 py-8 relative overflow-hidden rounded-3xl bg-neutral-900 border border-white/5">
           <div className={`absolute inset-0 opacity-20 bg-gradient-to-r ${isRetail ? "from-blue-500/30 to-purple-500/30" : "from-orange-500/30 to-red-500/30"}`} />
           <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white relative z-10">
             {isRetail ? "Tu imaginación, impresa." : "Producción Escalable."}
           </h2>
           <p className="text-xl text-gray-400 max-w-2xl mx-auto relative z-10">
             {isRetail 
               ? "Desde prototipos únicos hasta regalos personalizados. Calidad de museo en tu hogar." 
               : "Fabricación aditiva para industria. Lotes pequeños y medianos sin costos de matricería."}
           </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {isRetail ? (
             <>
               <FeatureCard 
                 icon={Palette} 
                 title="Libertad de Diseño" 
                 desc="Imprimimos geometrías imposibles para métodos tradicionales. Si podés modelarlo, podemos imprimirlo."
               />
               <FeatureCard 
                 icon={Zap} 
                 title="Prototipado Rápido" 
                 desc="Iterá tus diseños en horas, no semanas. Validá forma y función antes de invertir en moldes."
               />
               <FeatureCard 
                 icon={Box} 
                 title="Repuestos a Medida" 
                 desc="¿Se rompió una pieza plástica que ya no se consigue? La rediseñamos y fabricamos para vos."
               />
             </>
           ) : (
             <>
               <FeatureCard 
                 icon={Factory} 
                 title="Flota de Impresoras" 
                 desc="Capacidad instalada para producir cientos de piezas por semana. Tiempos de entrega garantizados."
               />
               <FeatureCard 
                 icon={FileBarChart} 
                 title="Costos Optimizados" 
                 desc="Precios escalonados por volumen. Cuanto más imprimís, menor es el costo unitario."
               />
               <FeatureCard 
                 icon={Users} 
                 title="Atención Personalizada" 
                 desc="Un ingeniero a cargo de tu cuenta para optimizar diseños y seleccionar los materiales adecuados."
               />
             </>
           )}
        </div>

        {/* Comparison / Pricing Table (Mock) */}
        <div className="border border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-white/5 p-4 border-b border-white/10">
            <h3 className="font-bold text-white text-lg">
              {isRetail ? "Ejemplos de Precios Estimados" : "Descuentos por Volumen"}
            </h3>
          </div>
          <div className="divide-y divide-white/5 bg-black/20">
            {isRetail ? (
               <>
                 <PriceRow label="Llavero personalizado (PLA)" price="$2.500 - $4.000" />
                 <PriceRow label="Soporte de celular (PETG)" price="$8.000 - $12.000" />
                 <PriceRow label="Figura de colección 15cm (Resina)" price="$25.000 - $45.000" />
                 <PriceRow label="Repuesto técnico complejo (ABS)" price="A cotizar según peso" />
               </>
            ) : (
               <>
                 <PriceRow label="Lote de prueba (1-10 unidades)" price="Precio de lista" />
                 <PriceRow label="Producción baja (11-50 unidades)" price="15% OFF" />
                 <PriceRow label="Producción media (51-200 unidades)" price="25% OFF" />
                 <PriceRow label="Producción alta (+200 unidades)" price="Consultar contrato" />
               </>
            )}
          </div>
        </div>
        
        {/* Gallery Preview */}
        <div>
           <h3 className="text-2xl font-bold text-white mb-6">Galería de Trabajos</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-64">
              <img 
                src="https://images.unsplash.com/photo-1772062692027-3fc1849d0ff1?q=80&w=400&auto=format&fit=crop" 
                className="w-full h-full object-cover rounded-xl bg-white/5" 
                alt="Gallery 1" 
              />
              <img 
                src="https://images.unsplash.com/photo-1758677821691-1a63fdc9a183?q=80&w=400&auto=format&fit=crop" 
                className="w-full h-full object-cover rounded-xl bg-white/5" 
                alt="Gallery 2" 
              />
              <img 
                src="https://images.unsplash.com/photo-1665714792545-a167d49dcffa?q=80&w=400&auto=format&fit=crop" 
                className="w-full h-full object-cover rounded-xl bg-white/5" 
                alt="Gallery 3" 
              />
              <img 
                src="https://images.unsplash.com/photo-1742466526307-f9d4e2e9291f?q=80&w=400&auto=format&fit=crop" 
                className="w-full h-full object-cover rounded-xl bg-white/5" 
                alt="Gallery 4" 
              />
           </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-8 border-t border-white/10">
           <button 
             onClick={() => {
               onClose();
               onQuote();
             }}
             className="px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:scale-105 transition-transform flex items-center gap-3 shadow-xl shadow-white/10"
           >
             {isRetail ? "Cotizar mi idea ahora" : "Solicitar presupuesto empresarial"}
             <Truck className="w-5 h-5" />
           </button>
        </div>
      </div>
    </Modal>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 text-white">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function PriceRow({ label, price }: { label: string, price: string }) {
  return (
    <div className="flex justify-between items-center p-4 hover:bg-white/5 transition-colors">
      <span className="text-gray-300 font-medium">{label}</span>
      <span className="text-white font-bold">{price}</span>
    </div>
  );
}
