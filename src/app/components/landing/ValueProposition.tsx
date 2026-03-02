import { motion } from 'motion/react';
import { Container } from '../ui/Container';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export function ValueProposition() {
  const [activeTab, setActiveTab] = useState<'retail' | 'wholesale'>('retail');

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl opacity-30" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Content */}
          <div className="flex-1 w-full space-y-8">
            <div className="flex gap-4 p-1 bg-white/5 rounded-full w-fit backdrop-blur-sm border border-white/5">
              <button
                onClick={() => setActiveTab('retail')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'retail' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' : 'text-zinc-400 hover:text-white'}`}
              >
                Minoristas
              </button>
              <button
                onClick={() => setActiveTab('wholesale')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'wholesale' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25' : 'text-zinc-400 hover:text-white'}`}
              >
                Mayoristas
              </button>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                {activeTab === 'retail' ? 'Materializamos tus ideas' : 'Escalamos tu negocio'}
              </h2>
              <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
                {activeTab === 'retail' 
                  ? 'Nos enfocamos en piezas únicas, prototipos funcionales, repuestos a medida o regalos personalizados que no podés encontrar en ningún otro lado.'
                  : 'Producción en serie, merchandising corporativo y piezas industriales con precios competitivos por volumen y tiempos de entrega optimizados.'
                }
              </p>
              
              <ul className="space-y-4">
                {(activeTab === 'retail' ? 
                  ['Prototipos de alta fidelidad', 'Piezas de repuesto discontinuadas', 'Regalos 100% personalizados'] : 
                  ['Descuentos por volumen', 'Factura A disponible', 'Entregas programadas']
                ).map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-zinc-300"
                  >
                    <div className={`w-2 h-2 rounded-full ${activeTab === 'retail' ? 'bg-indigo-500' : 'bg-pink-500'}`} />
                    {item}
                  </motion.li>
                ))}
              </ul>

              <button className={`mt-8 group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'retail' ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-pink-600 hover:bg-pink-500 text-white'}`}>
                {activeTab === 'retail' ? 'Empezar mi proyecto' : 'Solicitar presupuesto'}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Visual */}
          <div className="flex-1 w-full relative group">
             <div className={`absolute inset-0 rounded-3xl blur-2xl transition-colors duration-500 opacity-20 ${activeTab === 'retail' ? 'bg-indigo-600' : 'bg-pink-600'}`} />
             <motion.div
               key={activeTab + '-img'}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
               className="relative overflow-hidden rounded-3xl aspect-square md:aspect-[4/5] border border-white/10"
             >
               <img
                 src={activeTab === 'retail' 
                   ? "https://images.unsplash.com/photo-1758677821691-1a63fdc9a183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBwcm90b3R5cGUlMjBtZWNoYW5pY2FsJTIwcGFydCUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzcyNDI0MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                   : "https://images.unsplash.com/photo-1767498051855-f28d8c941b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBtYXNzJTIwcHJvZHVjdGlvbiUyMGZhY3RvcnklMjBjbGVhbnxlbnwxfHx8fDE3NzI0MjQyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                 }
                 alt={activeTab === 'retail' ? "Retail 3D Printing" : "Wholesale 3D Printing"}
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent opacity-60" />
               
               <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                    <p className="text-white font-medium text-sm">
                      {activeTab === 'retail' ? 'Precisión micrométrica' : 'Producción 24/7'}
                    </p>
                    <div className="h-1 w-full bg-white/20 mt-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className={`h-full ${activeTab === 'retail' ? 'bg-indigo-500' : 'bg-pink-500'}`} 
                      />
                    </div>
                  </div>
               </div>
             </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
