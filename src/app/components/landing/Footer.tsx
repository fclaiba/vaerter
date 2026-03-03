import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Container } from '../ui/Container';
import { MapPin, Instagram, Mail, Send, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  type: 'individual' | 'company';
  message: string;
  file?: FileList;
};

export function Footer() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    toast.success("Mensaje enviado con éxito. Te contactaremos pronto.", {
      style: { background: '#09090b', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }
    });
    reset();
  };

  return (
    <footer id="contact" className="bg-[#030303] border-t border-white/5 pt-32 pb-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 blur-sm" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">

          {/* CTA & Info */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Cotización</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 mb-6 leading-[0.9]">
                Vamos a darle
                <br />
                forma.
              </h2>
              <p className="text-xl text-zinc-400 leading-relaxed font-light max-w-md">
                Completá el formulario y recibí tu cotización personalizada. Empezá a fabricar en menos de 24 hs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8 pt-8 border-t border-white/5"
            >
              <div className="group flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Ubicación</h4>
                  <p className="text-zinc-400 font-light text-lg">Calle 50 e/ 6 y 7, La Plata<br />Buenos Aires</p>
                </div>
              </div>

              <div className="group flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Email directo</h4>
                  <a href="mailto:contacto@vaerter.com.ar" className="text-zinc-400 hover:text-white transition-colors font-light text-lg">contacto@vaerter.com.ar</a>
                </div>
              </div>

              <div className="group flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  <Instagram className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Instagram</h4>
                  <a href="#" className="text-zinc-400 hover:text-white transition-colors font-light text-lg">@vaerter_3d</a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/[0.02] backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Nombre</label>
                    <input
                      id="name"
                      {...register("name", { required: "Requerido" })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all placeholder:text-zinc-700 font-light"
                      placeholder="Tu nombre completo"
                    />
                    {errors.name && <span className="text-rose-400 text-xs font-medium">{errors.name.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Teléfono</label>
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone", { required: "Requerido" })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all placeholder:text-zinc-700 font-light"
                      placeholder="Cod. Área + Número"
                    />
                    {errors.phone && <span className="text-rose-400 text-xs font-medium">{errors.phone.message}</span>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email</label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Requerido",
                      pattern: { value: /^\S+@\S+$/i, message: "Email inválido" }
                    })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all placeholder:text-zinc-700 font-light"
                    placeholder="tucorreo@empresa.com"
                  />
                  {errors.email && <span className="text-rose-400 text-xs font-medium">{errors.email.message}</span>}
                </div>

                <div className="space-y-3 pb-2 pt-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Tipo de cliente</label>
                  <div className="flex gap-2">
                    <label className="flex-1">
                      <input type="radio" value="individual" {...register("type", { required: true })} className="peer sr-only" defaultChecked />
                      <div className="w-full text-center py-3 px-4 rounded-xl border border-white/10 bg-black/40 text-zinc-400 font-medium cursor-pointer transition-all peer-checked:bg-white/10 peer-checked:text-white peer-checked:border-white/30 hover:bg-white/5">
                        Particular
                      </div>
                    </label>
                    <label className="flex-1">
                      <input type="radio" value="company" {...register("type", { required: true })} className="peer sr-only" />
                      <div className="w-full text-center py-3 px-4 rounded-xl border border-white/10 bg-black/40 text-zinc-400 font-medium cursor-pointer transition-all peer-checked:bg-white/10 peer-checked:text-white peer-checked:border-white/30 hover:bg-white/5">
                        Empresa / Pyme
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Detalles del proyecto</label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message", { required: "Requerido" })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all placeholder:text-zinc-700 font-light resize-none"
                    placeholder="Contanos sobre las dimensiones, requerimientos mecánicos, material preferido..."
                  />
                  {errors.message && <span className="text-rose-400 text-xs font-medium">{errors.message.message}</span>}
                </div>

                <button
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-4.5 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group uppercase tracking-widest text-sm"
                >
                  {isSubmitting ? (
                    "Procesando..."
                  ) : (
                    <>
                      Solicitar Presupuesto
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        <div className="text-center pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
            <span className="text-xl font-black tracking-tighter text-white">VAERTER</span>
            <p className="text-zinc-600 text-sm font-medium">
              © {new Date().getFullYear()} Impresión 3D Premium. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
