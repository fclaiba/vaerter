import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ArrowRight, ArrowLeft, Upload, CheckCircle2, User, Building2, Package, Mail, Phone, Palette, FileText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../../lib/utils";

type QuoteFormInputs = {
  name: string;
  email: string;
  phone: string;
  isCompany: boolean;
  projectType: "retail" | "wholesale";
  description: string;
  material: string;
  file: FileList;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = ["Contacto", "Proyecto", "Detalles"];

export function QuoteModal({ isOpen, onClose }: ModalProps) {
  const [step, setStep] = useState(0);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<QuoteFormInputs>({
    defaultValues: {
      projectType: "retail",
      material: "PLA",
      isCompany: false
    }
  });

  const onSubmit: SubmitHandler<QuoteFormInputs> = (data) => {
    // Simulate API call
    console.log(data);
    setTimeout(() => {
      toast.success("¡Cotización enviada!", {
        description: "Te contactaremos en menos de 2 horas.",
        position: "top-center",
        duration: 5000,
      });
      onClose();
      setStep(0);
    }, 1500);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-neutral-900 sticky top-0 z-10">
            <div>
              <h2 className="text-xl font-bold text-white">Cotizar Proyecto</h2>
              <p className="text-sm text-gray-400">Paso {step + 1} de {steps.length}: {steps[step]}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400"
            >
              <ArrowLeft className="w-5 h-5 rotate-180" /> {/* Close icon visual using arrow for now or X */}
              <span className="sr-only">Cerrar</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/5">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <form id="quote-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Step 0: Contact Info */}
              {step === 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <User className="w-4 h-4" /> Nombre Completo
                      </label>
                      <input 
                        {...register("name", { required: true })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                        placeholder="Juan Pérez"
                      />
                      {errors.name && <span className="text-red-400 text-xs">Requerido</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Email
                        </label>
                        <input 
                          type="email"
                          {...register("email", { required: true })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                          placeholder="hola@ejemplo.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <Phone className="w-4 h-4" /> WhatsApp / Teléfono
                        </label>
                        <input 
                          type="tel"
                          {...register("phone", { required: true })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                          placeholder="+54 9 221..."
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                      <input 
                        type="checkbox" 
                        id="isCompany"
                        {...register("isCompany")}
                        className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-transparent"
                      />
                      <label htmlFor="isCompany" className="flex items-center gap-2 cursor-pointer select-none text-gray-300">
                        <Building2 className="w-4 h-4" />
                        Represento a una empresa / Soy mayorista
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Project Type */}
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                     <label className="text-sm font-medium text-gray-300">Tipo de Proyecto</label>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className={cn(
                          "relative p-6 rounded-2xl border cursor-pointer transition-all hover:bg-white/5 flex flex-col gap-3",
                          watch("projectType") === "retail" ? "border-blue-500 bg-blue-500/5" : "border-white/10 bg-white/5"
                        )}>
                          <input type="radio" value="retail" {...register("projectType")} className="sr-only" />
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <Package className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-white block">Pieza Única / Prototipo</span>
                            <span className="text-sm text-gray-400">Para uso personal, repuestos o regalos.</span>
                          </div>
                          {watch("projectType") === "retail" && (
                            <div className="absolute top-4 right-4 text-blue-500"><CheckCircle2 className="w-5 h-5" /></div>
                          )}
                        </label>

                        <label className={cn(
                          "relative p-6 rounded-2xl border cursor-pointer transition-all hover:bg-white/5 flex flex-col gap-3",
                          watch("projectType") === "wholesale" ? "border-purple-500 bg-purple-500/5" : "border-white/10 bg-white/5"
                        )}>
                          <input type="radio" value="wholesale" {...register("projectType")} className="sr-only" />
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-white block">Producción en Serie</span>
                            <span className="text-sm text-gray-400">Merchandising, lotes industriales (+10 u).</span>
                          </div>
                          {watch("projectType") === "wholesale" && (
                            <div className="absolute top-4 right-4 text-purple-500"><CheckCircle2 className="w-5 h-5" /></div>
                          )}
                        </label>
                     </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                       <Upload className="w-4 h-4" /> Archivo 3D (STL, OBJ, STEP)
                    </label>
                    <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-white/40 hover:bg-white/5 transition-all group cursor-pointer relative">
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" {...register("file")} />
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-white" />
                      </div>
                      <p className="text-sm font-medium text-white">Arrastrá tu archivo aquí o hacé click</p>
                      <p className="text-xs text-gray-500 mt-2">Máx 50MB. Si no tenés archivo, describí tu idea abajo.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                       <Palette className="w-4 h-4" /> Material Preferido
                     </label>
                     <select 
                        {...register("material")}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
                     >
                        <option value="PLA" className="bg-neutral-900">PLA (Estándar, Económico)</option>
                        <option value="PETG" className="bg-neutral-900">PETG (Resistente, Mecánico)</option>
                        <option value="ABS" className="bg-neutral-900">ABS (Alta Temp, Lijable)</option>
                        <option value="TPU" className="bg-neutral-900">TPU (Flexible, Goma)</option>
                        <option value="RESINA" className="bg-neutral-900">Resina (Alto Detalle, Figuras)</option>
                        <option value="OTRO" className="bg-neutral-900">No estoy seguro / Asesoramiento</option>
                     </select>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                       <FileText className="w-4 h-4" /> Descripción del Proyecto
                     </label>
                     <textarea 
                       {...register("description")}
                       rows={4}
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none placeholder:text-gray-600"
                       placeholder="Contanos sobre el uso de la pieza, cantidad, colores deseados o cualquier detalle importante..."
                     />
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-300">Resumen</p>
                      <p className="text-xs text-blue-200/70 mt-1">
                        Te contactaremos al email provisto con una cotización formal. Si es urgente, mencionálo en la descripción.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-white/5 bg-neutral-900 flex justify-between items-center">
            {step > 0 ? (
              <button 
                type="button" 
                onClick={prevStep}
                className="px-6 py-3 text-gray-400 hover:text-white font-medium transition-colors"
              >
                Atrás
              </button>
            ) : (
              <div /> /* Spacer */
            )}

            {step < steps.length - 1 ? (
              <button 
                type="button"
                onClick={nextStep}
                className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                Siguiente <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                type="submit"
                form="quote-form"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                Enviar Solicitud <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
