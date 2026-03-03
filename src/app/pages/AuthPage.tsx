import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";
import { motion } from "motion/react";
import {
  getAuthSession,
  loginAccount,
  registerAccount,
} from "../auth/authStore";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const navigate = useNavigate();
  const existingSession = getAuthSession();
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (existingSession) {
    return <Navigate to="/admin" replace />;
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (mode === "register") {
      if (password !== confirmPassword) {
        toast.error("Las contraseñas no coinciden.");
        return;
      }
      const result = registerAccount({ name, email, password });
      if (!result.ok) {
        toast.error(result.error ?? "No se pudo registrar la cuenta.");
        return;
      }
      toast.success("Registro exitoso");
      navigate("/admin", { replace: true });
      return;
    }

    const result = loginAccount(email, password);
    if (!result.ok) {
      toast.error(result.error ?? "No se pudo iniciar sesión.");
      return;
    }
    toast.success("Sesión iniciada");
    navigate("/admin", { replace: true });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white p-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <img
          src="https://images.unsplash.com/photo-1589375769589-dd309bab3556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50aW5nJTIwY2xvc2UlMjB1cCUyMGxheWVycyUyMGhpZ2glMjBxdWFsaXR5fGVufDF8fHx8MTc3MjQyNDE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="3D Printing Detail Background"
          className="w-full h-full object-cover opacity-50 scale-105"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 w-full max-w-md rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Acceso VAERTER
          </h1>
          <p className="text-sm text-zinc-400">
            {mode === "login"
              ? "Inicia sesión para ingresar al panel admin."
              : "Crea una cuenta para acceder al panel admin."}
          </p>
        </div>

        {/* Tab Toggles */}
        <div className="relative flex rounded-full bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`relative w-1/2 rounded-full py-2 text-sm font-medium transition-colors z-10 ${mode === "login" ? "text-black" : "text-white/60 hover:text-white"
              }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`relative w-1/2 rounded-full py-2 text-sm font-medium transition-colors z-10 ${mode === "register" ? "text-black" : "text-white/60 hover:text-white"
              }`}
          >
            Registrarse
          </button>
          {/* Active pill background */}
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white transition-all duration-300 ease-out z-0 ${mode === "login" ? "left-1" : "left-[calc(50%+2px)]"
              }`}
          />
        </div>

        <form className="space-y-4" onSubmit={submit}>
          {mode === "register" && (
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-zinc-500 font-medium ml-1">Nombre</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nombre completo"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 placeholder:text-zinc-600"
              />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-zinc-500 font-medium ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@email.com"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 placeholder:text-zinc-600"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-zinc-500 font-medium ml-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 placeholder:text-zinc-600"
            />
          </div>
          {mode === "register" && (
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-zinc-500 font-medium ml-1">Confirmar Contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 placeholder:text-zinc-600"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-white text-black hover:bg-gray-100 transition-colors py-3.5 text-sm font-semibold shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] mt-2"
          >
            {mode === "login" ? "Ingresar al panel" : "Crear mi cuenta"}
          </button>
        </form>

        <div className="pt-2 border-t border-white/10 text-center">
          <p className="text-xs text-zinc-500">
            Demo access: <span className="font-mono text-zinc-400">admin@vaerter.com</span> / <span className="font-mono text-zinc-400">admin123</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
