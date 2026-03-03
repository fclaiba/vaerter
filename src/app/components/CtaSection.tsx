import { useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, X, User, Mail, Phone, FileText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../lib/utils";

type CtaType = "retail" | "wholesale";

interface CtaSectionProps {
  onOpenQuote: () => void;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const emptyForm: ContactFormData = { name: "", email: "", phone: "", message: "" };

export function CtaSection({ onOpenQuote }: CtaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [modalType, setModalType] = useState<CtaType | null>(null);
  const [form, setForm] = useState<ContactFormData>(emptyForm);
  const [sending, setSending] = useState(false);

  const openModal = (type: CtaType) => {
    setModalType(type);
    setForm(emptyForm);
  };

  const closeModal = () => {
    setModalType(null);
    setForm(emptyForm);
    setSending(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Completa los campos obligatorios.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast.success(
        modalType === "retail"
          ? "Recibimos tu consulta"
          : "Consulta corporativa enviada",
        {
          description: "Nos comunicaremos contigo a la brevedad.",
          duration: 5000,
        },
      );
      closeModal();
    }, 1400);
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-32 overflow-hidden bg-transparent text-white"
        id="cta"
      >
        <div className="relative z-10 max-w-[1024px] mx-auto px-6 text-center">

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-[#86868b]"
          >
            Empieza a imprimir.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#86868b] max-w-2xl mx-auto mb-16 font-medium leading-relaxed tracking-tight"
          >
            Da el primer paso. Cuéntanos qué necesitas y nuestro equipo se encargará del resto.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => openModal("retail")}
              className="relative group w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-lg transition-all duration-500 active:scale-95 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_80px_rgba(255,255,255,0.4)] overflow-hidden"
            >
              <span className="relative z-10 w-full block">Proyecto Minorista</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute -inset-full animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,255,255,0)_0%,rgba(0,0,0,0.1)_50%,rgba(255,255,255,0)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </button>
            <button
              onClick={() => openModal("wholesale")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white font-semibold text-lg transition-all duration-300 active:scale-95 hover:scale-105 hover:bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              Proyecto Mayorista
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-20 text-sm text-[#86868b] font-medium"
          >
            O comunícate directamente a{" "}
            <a href="mailto:consultas@vaerter.com.ar" className="text-white hover:underline underline-offset-4 transition-all">
              consultas@vaerter.com.ar
            </a>
          </motion.div>
        </div>
      </section>

      {/* iOS Style Modal */}
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            onClick={closeModal}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-md bg-[#1c1c1e] rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {modalType === "retail" ? "Consulta Minorista" : "Soluciones Corporativas"}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white/70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                  Nombre
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                  Detalles del proyecto
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  rows={4}
                  className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 mt-4 hover:bg-gray-200"
              >
                {sending ? "Enviando..." : "Enviar mensaje"}
                {!sending && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
