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
    console.log(data);
    setTimeout(() => {
      toast.success("¡Cotización enviada!", {
        description: "Te contactaremos a la brevedad.",
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
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-full max-w-2xl bg-[#1c1c1e]/60 backdrop-blur-[60px] saturate-[1.8] border border-white/10 rounded-[40px] overflow-hidden flex flex-col max-h-[90vh] shadow-[0_0_80px_rgba(0,0,0,0.8)]"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-transparent sticky top-0 z-10">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Iniciar Proyecto</h2>
              <p className="text-sm font-medium text-[#86868b]">Paso {step + 1} de {steps.length}: {steps[step]}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white/70"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
              <span className="sr-only">Cerrar</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/5">
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
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
                      <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider flex items-center gap-2">
                        <User className="w-3.5 h-3.5" /> Nombre Completo
                      </label>
                      <input
                        {...register("name", { required: true })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:border-white/30 transition-all font-medium placeholder:text-white/30"
                        placeholder="Juan Pérez"
                      />
                      {errors.name && <span className="text-red-400 text-xs">Requerido</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5" /> Email
                        </label>
                        <input
                          type="email"
                          {...register("email", { required: true })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:border-white/30 transition-all font-medium placeholder:text-white/30"
                          placeholder="hola@ejemplo.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5" /> WhatsApp
                        </label>
                        <input
                          type="tel"
                          {...register("phone", { required: true })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:border-white/30 transition-all font-medium placeholder:text-white/30"
                          placeholder="+54 9 221..."
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-5 bg-white/5 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                      <input
                        type="checkbox"
                        id="isCompany"
                        {...register("isCompany")}
                        className="w-5 h-5 rounded border-white/20 text-blue-500 focus:ring-blue-500 bg-black/30"
                      />
                      <label htmlFor="isCompany" className="flex items-center gap-2 cursor-pointer select-none text-white font-medium">
                        <Building2 className="w-4 h-4 text-[#86868b]" />
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
                    <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">Tipo de Proyecto</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className={cn(
                        "relative p-6 rounded-2xl border cursor-pointer transition-all flex flex-col gap-3",
                        watch("projectType") === "retail" ? "border-white bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"
                      )}>
                        <input type="radio" value="retail" {...register("projectType")} className="sr-only" />
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", watch("projectType") === "retail" ? "bg-white text-black" : "bg-white/10 text-white")}>
                          <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-white block">Minorista</span>
                          <span className="text-sm text-[#86868b]">Prototipos, repuestos o regalos únicos.</span>
                        </div>
                        {watch("projectType") === "retail" && (
                          <div className="absolute top-4 right-4 text-white"><CheckCircle2 className="w-5 h-5" /></div>
                        )}
                      </label>

                      <label className={cn(
                        "relative p-6 rounded-2xl border cursor-pointer transition-all flex flex-col gap-3",
                        watch("projectType") === "wholesale" ? "border-white bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"
                      )}>
                        <input type="radio" value="wholesale" {...register("projectType")} className="sr-only" />
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", watch("projectType") === "wholesale" ? "bg-white text-black" : "bg-white/10 text-white")}>
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-white block">Mayorista</span>
                          <span className="text-sm text-[#86868b]">Producción B2B y lotes industriales.</span>
                        </div>
                        {watch("projectType") === "wholesale" && (
                          <div className="absolute top-4 right-4 text-white"><CheckCircle2 className="w-5 h-5" /></div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider flex items-center gap-2">
                      <Upload className="w-3.5 h-3.5" /> Archivo 3D (Opcional)
                    </label>
                    <div className="border border-dashed border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-white/40 hover:bg-white/5 transition-all group cursor-pointer relative bg-black/20">
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" {...register("file")} />
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-sm font-medium text-white">Adjuntar STL, OBJ o STEP</p>
                      <p className="text-xs text-[#86868b] mt-2">Máx 50MB. Si no tienes modelo, describe tu idea.</p>
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
                    <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider flex items-center gap-2">
                      <Palette className="w-3.5 h-3.5" /> Material Preferido
                    </label>
                    <select
                      {...register("material")}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:border-white/30 transition-all font-medium appearance-none cursor-pointer"
                    >
                      <option value="PLA" className="bg-[#1c1c1e] text-white">PLA (Estándar, Detalles visuales)</option>
                      <option value="PETG" className="bg-[#1c1c1e] text-white">PETG (Resistente mecánica y térmica)</option>
                      <option value="ABS" className="bg-[#1c1c1e] text-white">ABS (Alta Temp, Uso técnico)</option>
                      <option value="TPU" className="bg-[#1c1c1e] text-white">TPU (Flexible, Goma elástica)</option>
                      <option value="RESINA" className="bg-[#1c1c1e] text-white">Resina (Precisión ultra alta)</option>
                      <option value="OTRO" className="bg-[#1c1c1e] text-white">Solicitar asesoramiento</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5" /> Detalles Adicionales
                    </label>
                    <textarea
                      {...register("description")}
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:border-white/30 transition-all font-medium resize-none placeholder:text-white/30"
                      placeholder="Especifica usos, acabados, colores necesarios o cualquier requerimiento especial..."
                    />
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">Siguiente paso</p>
                      <p className="text-xs text-[#86868b] mt-1">
                        Un especialista de nuestro equipo revisará tu solicitud y se pondrá en contacto para enviar una cotización final.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-white/5 bg-transparent flex justify-between items-center relative z-10">
            {step > 0 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 text-[#86868b] hover:text-white font-medium transition-colors"
              >
                Anterior
              </button>
            ) : (
              <div /> /* Spacer */
            )}

            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 hover:scale-105 transition-all flex items-center gap-2 active:scale-95"
              >
                Siguiente <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="quote-form"
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 hover:scale-105 transition-all flex items-center gap-2 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Confirmar <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
