import { useMemo, useState } from "react";
import { toast } from "sonner";
import StageTable from "@/app/admin/components/pipeline/StageTable";
import { formatCurrency } from "@/app/admin/domain/crm";
import { advanceCase, createLead, getCrmStore } from "@/app/admin/data/localCrmRepository";

export default function LeadsPage() {
  const [store, setStore] = useState(getCrmStore());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState(50000);
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const leads = useMemo(
    () => store.cases.filter((item) => item.stage === "lead"),
    [store.cases],
  );

  const totalLeadValue = useMemo(
    () => leads.reduce((acc, item) => acc + item.estimatedValue, 0),
    [leads],
  );

  const toQuote = (id: string) => {
    setStore(advanceCase(id));
    toast.success("Lead convertido", {
      description: "El lead se movio a Cotizaciones.",
    });
  };

  const submitLead = () => {
    if (!name || !email || !product) {
      toast.error("Completa nombre, email y proyecto");
      return;
    }

    const updated = createLead({
      name,
      email,
      phone,
      product,
      quantity,
      estimatedValue: value,
      priority,
    });
    setStore(updated);
    setName("");
    setEmail("");
    setPhone("");
    setProduct("");
    setQuantity(1);
    setValue(50000);
    setPriority("medium");
    toast.success("Lead creado");
  };

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      <header>
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Leads</h2>
        <p className="text-zinc-400 mt-2 font-medium">
          Captura y calificación de consultas entrantes para iniciar el flujo comercial.
        </p>
      </header>

      <section className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] space-y-5 h-fit">
          <h3 className="font-semibold text-lg text-zinc-100 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Nuevo lead</h3>

          <div className="space-y-4">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 placeholder:text-zinc-600"
              placeholder="Nombre completo"
            />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 placeholder:text-zinc-600"
              placeholder="Email"
            />
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 placeholder:text-zinc-600"
              placeholder="Teléfono"
            />
            <input
              value={product}
              onChange={(event) => setProduct(event.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 placeholder:text-zinc-600"
              placeholder="Proyecto requerido"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(event) => setQuantity(Number(event.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 placeholder:text-zinc-600"
                placeholder="Cantidad"
              />
              <input
                type="number"
                value={value}
                min={0}
                onChange={(event) => setValue(Number(event.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 placeholder:text-zinc-600"
                placeholder="Valor"
              />
            </div>

            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value as "low" | "medium" | "high")}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 appearance-none text-zinc-300"
            >
              <option value="high">Prioridad Alta</option>
              <option value="medium">Prioridad Media</option>
              <option value="low">Prioridad Baja</option>
            </select>
          </div>

          <button
            type="button"
            onClick={submitLead}
            className="w-full px-4 py-3 mt-2 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
          >
            Crear lead
          </button>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex justify-between items-center group hover:bg-white/10 transition-colors">
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">Valor total en etapa lead</p>
              <p className="text-3xl font-bold tracking-tight text-white mt-1">{formatCurrency(totalLeadValue)}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <span className="text-xl font-bold">L</span>
            </div>
          </div>

          <StageTable
            title="Leads Activos"
            description="Todos los casos de entrada pendientes de propuesta formal."
            rows={leads}
            actionLabel="Avanzar a Cotizar"
            onPrimaryAction={toQuote}
          />
        </div>
      </section>
    </div>
  );
}
