import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Container } from '../ui/Container';

const portfolioImages = [
  "https://images.unsplash.com/photo-1653164579768-ea97833b3b03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBhcmNoaXRlY3R1cmFsJTIwbW9kZWwlMjBjbGVhbnxlbnwxfHx8fDE3NzI0MjQyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1638478872316-32fb5d4c2b21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBtZWRpY2FsJTIwZGV2aWNlJTIwY2xlYW58ZW58MXx8fHwxNzcyNDI0MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1761646238073-2854cebdc344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBmYXNoaW9uJTIwYWNjZXNzb3J5JTIwYXZhbnQlMjBnYXJkZXxlbnwxfHx8fDE3NzI0MjQyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1758677821691-1a63fdc9a183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBwcm90b3R5cGUlMjBtZWNoYW5pY2FsJTIwcGFydCUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzcyNDI0MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1739169169463-450148af26ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMDNkJTIwcHJpbnRpbmclMjBmaWxhbWVudCUyMHNwb29scyUyMGFydGlzdGljfGVufDF8fHx8MTc3MjQyNDIzOHww&ixlib=rb-4.1.0&q=80&w=1080",
];

const testimonials = [
  { name: "Juan Pérez", role: "Diseñador Industrial", text: "La calidad de impresión es impecable. El layering es prácticamente invisible.", company: "Estudio Alfa" },
  { name: "María González", role: "Arquitecta", text: "Me salvaron con una maqueta urgente. La atención fue excelente y el resultado final superó mis expectativas.", company: "MG Arquitectura" },
  { name: "Carlos Rodríguez", role: "Ingeniero Mecánico", text: "Piezas funcionales en tiempo récord. Gran variedad de materiales técnicos.", company: "TechSolutions" },
];

export function SocialProof() {
  return (
    <section className="py-24 bg-zinc-900 border-t border-white/5">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Nuestros Trabajos</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Desde prototipos funcionales hasta piezas de arte, nuestra galería habla por sí sola.
          </p>
        </div>

        <div className="mb-24">
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
            <Masonry gutter="20px">
              {portfolioImages.map((image, i) => (
                <div key={i} className="relative group overflow-hidden rounded-2xl">
                  <img
                    src={image}
                    alt={`Portfolio item ${i + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-medium tracking-wide border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">Ver Detalle</span>
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>

        <div className="bg-zinc-800/30 rounded-3xl p-8 md:p-12 border border-white/5">
          <h3 className="text-2xl font-bold text-white mb-10 text-center">Lo que dicen nuestros clientes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{testimonial.name}</h4>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
