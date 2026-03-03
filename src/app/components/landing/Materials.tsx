import { motion } from 'motion/react';
import { Container } from '../ui/Container';
import { Layers, Droplet, Shield, Zap, Wrench, Paintbrush, Sparkles } from 'lucide-react';

const materials = [
  { name: 'PLA', desc: 'Biodegradable y versátil, ideal para prototipos rápidos y modelos conceptuales.', icon: Layers, color: 'text-emerald-400', bg: 'bg-emerald-400/10', glow: 'shadow-[0_0_30px_rgba(52,211,153,0.15)]' },
  { name: 'PETG', desc: 'Resistente y duradero, perfecto para piezas mecánicas y uso en exteriores.', icon: Droplet, color: 'text-blue-400', bg: 'bg-blue-400/10', glow: 'shadow-[0_0_30px_rgba(96,165,250,0.15)]' },
  { name: 'ABS', desc: 'Alto impacto y temperatura, la elección industrial para piezas exigentes.', icon: Shield, color: 'text-rose-400', bg: 'bg-rose-400/10', glow: 'shadow-[0_0_30px_rgba(251,113,133,0.15)]' },
  { name: 'TPU', desc: 'Flexible y elástico, absorbe impactos y soporta deformaciones continuas.', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10', glow: 'shadow-[0_0_30px_rgba(251,191,36,0.15)]' },
];

const finishes = [
  { name: 'Bruto', desc: 'Acabado estándar directo de la cama de impresión.', icon: Wrench },
  { name: 'Post-procesado', desc: 'Lijado, masillado y suavizado para superficies perfectas.', icon: Sparkles },
  { name: 'Pintado', desc: 'Acabado profesional a color con aerógrafo y lacas especiales.', icon: Paintbrush },
];

export function Materials() {
  return (
    <section id="materials" className="py-32 relative bg-[#030303] overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 -right-64 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      <Container className="relative z-10">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Catálogo Técnico</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6"
          >
            Materiales & Acabados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed"
          >
            Explorá nuestra biblioteca de polímeros de ingeniería y técnicas de post-producción desarrolladas para tolerancias industriales y estética premium.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Bento Box: Main Materials Grid (Spans 8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {materials.map((mat, i) => (
              <motion.div
                key={mat.name}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className={`group relative overflow-hidden bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 hover:-translate-y-1 ${mat.glow}`}
              >
                {/* Background Accent */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 ${mat.bg} rounded-full blur-[60px] group-hover:blur-[80px] transition-all opacity-50 group-hover:opacity-100`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-14 h-14 rounded-2xl ${mat.bg} border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <mat.icon className={`w-7 h-7 ${mat.color}`} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">{mat.name}</h3>
                  <p className="text-zinc-400 leading-relaxed font-light">{mat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bento Box: Finishes Stack (Spans 4 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full flex flex-col justify-between group overflow-hidden relative">

              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="mb-8 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Acabados Superficiales</h3>
                <p className="text-zinc-400 text-sm font-light">Llevá tus piezas desde prototipos funcionales hasta productos finales de exhibición.</p>
              </div>

              <div className="space-y-4 relative z-10">
                {finishes.map((finish, i) => (
                  <motion.div
                    key={finish.name}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <finish.icon className="w-5 h-5 text-zinc-300" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">{finish.name}</h4>
                      <p className="text-zinc-500 text-xs mt-0.5">{finish.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
