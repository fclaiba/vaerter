import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Container } from '../ui/Container';
import { MapPin, Instagram, Mail, Phone, Upload, Send } from 'lucide-react';

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
    toast.success("Mensaje enviado con éxito. Te contactaremos pronto.");
    reset();
  };

  return (
    <footer className="bg-zinc-950 border-t border-white/10 pt-24 pb-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 blur-sm" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">

          {/* CTA & Info */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              ¿Listo para darle forma a tu proyecto?
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Completá el formulario y recibí tu cotización personalizada. Si tenés dudas, estamos acá para ayudarte.
            </p>

            <div className="space-y-6 pt-8">
              <div className="flex items-start gap-4 text-zinc-300">
                <MapPin className="w-6 h-6 text-indigo-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Ubicación</h4>
                  <p>Calle 50 e/ 6 y 7, La Plata, Buenos Aires</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-zinc-300">
                <Mail className="w-6 h-6 text-indigo-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <p>contacto@vaerter.com.ar</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-zinc-300">
                <Instagram className="w-6 h-6 text-indigo-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Instagram</h4>
                  <p>@vaerter_3d</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-300">Nombre</label>
                  <input
                    id="name"
                    {...register("name", { required: "El nombre es obligatorio" })}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
                    placeholder="Tu nombre"
                  />
                  {errors.name && <span className="text-red-400 text-xs">{errors.name.message}</span>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-zinc-300">Teléfono</label>
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone", { required: "El teléfono es obligatorio" })}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
                    placeholder="Cod. Área + Número"
                  />
                  {errors.phone && <span className="text-red-400 text-xs">{errors.phone.message}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "El email es obligatorio",
                    pattern: { value: /^\S+@\S+$/i, message: "Email inválido" }
                  })}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
                  placeholder="ejemplo@email.com"
                />
                {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Soy...</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="individual"
                      {...register("type", { required: true })}
                      className="accent-indigo-500"
                      defaultChecked
                    />
                    <span className="text-zinc-300">Particular</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="company"
                      {...register("type", { required: true })}
                      className="accent-indigo-500"
                    />
                    <span className="text-zinc-300">Empresa</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-300">Mensaje</label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message", { required: "Contanos sobre tu proyecto" })}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600 resize-none"
                  placeholder="Detalles de la pieza, cantidad, material preferido..."
                />
                {errors.message && <span className="text-red-400 text-xs">{errors.message.message}</span>}
              </div>

              <button
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar Consulta
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center pt-12 border-t border-white/5">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} VAERTER 3D. Todos los derechos reservados.
          </p>
        </div>
      </Container>


    </footer>
  );
}
