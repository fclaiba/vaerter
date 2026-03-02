import { motion } from 'motion/react';
import { Container } from '../ui/Container';

const materials = [
  { name: 'PLA', desc: 'Biodegradable y versátil', color: 'bg-emerald-500' },
  { name: 'PETG', desc: 'Resistente y duradero', color: 'bg-blue-500' },
  { name: 'ABS', desc: 'Alto impacto y temperatura', color: 'bg-red-500' },
  { name: 'TPU', desc: 'Flexible y elástico', color: 'bg-yellow-500' },
];

const finishes = [
  { name: 'Bruto', desc: 'Acabado estándar de impresión', icon: '🛠️' },
  { name: 'Post-procesado', desc: 'Lijado y suavizado', icon: '✨' },
  { name: 'Pintado', desc: 'Acabado profesional a color', icon: '🎨' },
];

export function Materials() {
  return (
    <section className="py-24 bg-zinc-900 overflow-hidden">
      <Container>
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Materiales & Acabados</h2>
          <p className="text-zinc-400 text-lg">
            Explorá nuestra amplia gama de filamentos técnicos y opciones de post-procesado para conseguir exactamente el resultado que buscás.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Materials Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Filamentos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {materials.map((mat, i) => (
                <div key={mat.name} className="group relative p-6 bg-zinc-800/50 rounded-2xl border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-full ${mat.color} mb-4 opacity-80 group-hover:opacity-100 transition-opacity blur-xl absolute top-4 left-4`} />
                  <div className={`w-3 h-3 rounded-full ${mat.color} mb-4 relative z-10`} />
                  <h4 className="text-xl font-medium text-white mb-1 relative z-10">{mat.name}</h4>
                  <p className="text-zinc-400 text-sm relative z-10">{mat.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Finishes Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Acabados</h3>
            <div className="flex flex-col gap-4 h-full">
              {finishes.map((finish, i) => (
                <div key={finish.name} className="flex-1 flex items-center gap-6 p-6 bg-zinc-800/30 rounded-2xl border border-white/5 hover:bg-zinc-800/60 transition-colors">
                  <span className="text-4xl bg-zinc-900 w-16 h-16 flex items-center justify-center rounded-xl">{finish.icon}</span>
                  <div>
                    <h4 className="text-xl font-medium text-white">{finish.name}</h4>
                    <p className="text-zinc-400 text-sm">{finish.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
