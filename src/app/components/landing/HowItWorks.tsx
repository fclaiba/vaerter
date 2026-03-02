import { motion } from 'motion/react';
import { Container } from '../ui/Container';
import { Upload, Calculator, Box } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: "Enviá tu idea/modelo",
    desc: "Compartinos el archivo STL o contanos tu idea. Nosotros nos encargamos de analizar la viabilidad.",
    color: "bg-indigo-500"
  },
  {
    icon: Calculator,
    title: "Cotización y Asesoramiento",
    desc: "Elegimos el mejor material y acabado para tu necesidad y te pasamos el presupuesto detallado.",
    color: "bg-purple-500"
  },
  {
    icon: Box,
    title: "Impresión y Entrega",
    desc: "Producimos con calidad premium y lo retirás en La Plata o te lo enviamos a donde estés.",
    color: "bg-pink-500"
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-zinc-950 relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent hidden lg:block" />
      
      <Container>
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Proceso Simple</h2>
          <p className="text-zinc-400 text-lg">De la idea a la realidad en 3 pasos.</p>
        </div>

        <div className="space-y-12 lg:space-y-24 relative z-10">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Icon / Number */}
              <div className="relative flex-shrink-0">
                <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center shadow-lg shadow-${step.color}/20 z-10 relative rotate-3 hover:rotate-0 transition-transform duration-300`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full z-0" />
                <span className="absolute -top-6 -right-6 text-6xl font-bold text-white/5 select-none">{index + 1}</span>
              </div>

              {/* Text */}
              <div className={`flex-1 text-center ${index % 2 === 1 ? 'lg:text-right' : 'lg:text-left'}`}>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-md mx-auto lg:mx-0 lg:inline-block">
                  {step.desc}
                </p>
              </div>
              
              {/* Spacer for the other side to balance the flex (optional, but good for alignment) */}
              <div className="flex-1 hidden lg:block" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
