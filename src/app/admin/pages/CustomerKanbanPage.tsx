import { useMemo, useState } from "react";
import { toast } from "sonner";
import KanbanBoard from "@/app/admin/components/kanban/KanbanBoard";
import {
  formatCurrency,
  getStageLabel,
  nextStage,
  previousStage,
  type CustomerCase,
  type CustomerPriority,
  type CustomerStage,
} from "@/app/admin/domain/crm";
import {
  getCrmStore,
  moveCustomerCase,
  resetCrmStore,
} from "@/app/admin/data/localCrmRepository";

function buildKpis(items: CustomerCase[]) {
  const pipelineValue = items.reduce((acc, item) => acc + item.estimatedValue, 0);
  const activeOrders = items.filter((item) => item.stage === "production").length;
  const delivered = items.filter((item) => item.stage === "delivery").length;
  const highPriority = items.filter((item) => item.priority === "high").length;

  return {
    pipelineValue,
    activeOrders,
    delivered,
    highPriority,
  };
}

export default function CustomerKanbanPage() {
  const [store, setStore] = useState(getCrmStore());
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<"all" | CustomerStage>("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | CustomerPriority>("all");
  const [selectedId, setSelectedId] = useState<string | null>(store.cases[0]?.id ?? null);

  const filteredItems = useMemo(() => {
    return store.cases.filter((item) => {
      const bySearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.product.toLowerCase().includes(search.toLowerCase());
      const byStage = stageFilter === "all" || item.stage === stageFilter;
      const byPriority = priorityFilter === "all" || item.priority === priorityFilter;
      return bySearch && byStage && byPriority;
    });
  }, [store.cases, search, stageFilter, priorityFilter]);

  const selectedCase = useMemo(
    () => filteredItems.find((item) => item.id === selectedId) ?? null,
    [filteredItems, selectedId],
  );

  const kpis = useMemo(() => buildKpis(store.cases), [store.cases]);

  const moveBackward = (id: string) => {
    const item = store.cases.find((candidate) => candidate.id === id);
    if (!item) return;
    const stage = previousStage(item.stage);
    if (!stage) return;

    setStore(moveCustomerCase(id, stage));
    toast.success("Caso actualizado", {
      description: `${item.name} volvio a ${getStageLabel(stage)}.`,
    });
  };

  const moveForward = (id: string) => {
    const item = store.cases.find((candidate) => candidate.id === id);
    if (!item) return;
    const stage = nextStage(item.stage);
    if (!stage) return;

    setStore(moveCustomerCase(id, stage));
    toast.success("Caso actualizado", {
      description: `${item.name} paso a ${getStageLabel(stage)}.`,
    });
  };

  const clearData = () => {
    setStore(resetCrmStore());
    toast.message("Datos reiniciados", {
      description: "Se restauro el dataset base del modulo CRM.",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Kanban Comercial + Operaciones</h2>
          <p className="text-zinc-400 mt-2 font-medium">
            Gestión comercial desde consulta inicial hasta entrega final.
          </p>
        </div>
        <button
          type="button"
          onClick={clearData}
          className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all shadow-[0_4px_14px_0_rgba(255,255,255,0.05)]"
        >
          Reiniciar dataset
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group">
          <p className="text-xs uppercase tracking-wider font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">Valor del pipeline</p>
          <p className="text-3xl font-bold tracking-tight text-white mt-1">{formatCurrency(kpis.pipelineValue)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group">
          <p className="text-xs uppercase tracking-wider font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">Pedidos en desarrollo</p>
          <p className="text-3xl font-bold tracking-tight text-white mt-1">{kpis.activeOrders}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group">
          <p className="text-xs uppercase tracking-wider font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">Pedidos entregados</p>
          <p className="text-3xl font-bold tracking-tight text-white mt-1">{kpis.delivered}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group">
          <p className="text-xs uppercase tracking-wider font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">Casos de alta prioridad</p>
          <p className="text-3xl font-bold tracking-tight text-white mt-1">{kpis.highPriority}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por cliente, email o producto..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 placeholder:text-zinc-600 text-zinc-200"
            />
            <select
              value={stageFilter}
              onChange={(event) => setStageFilter(event.target.value as "all" | CustomerStage)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 appearance-none text-zinc-300"
            >
              <option value="all">Todas las etapas</option>
              <option value="lead">Leads</option>
              <option value="quote">Cotizaciones</option>
              <option value="order">Pedidos</option>
              <option value="production">Producción</option>
              <option value="delivery">Entregas</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value as "all" | CustomerPriority)
              }
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 appearance-none text-zinc-300"
            >
              <option value="all">Todas las prioridades</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>

          <KanbanBoard
            items={filteredItems}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onMoveBackward={moveBackward}
            onMoveForward={moveForward}
          />
        </div>

        <aside className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 h-fit sticky top-24 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          {!selectedCase && (
            <div className="text-center py-8">
              <h3 className="font-semibold text-zinc-100">Detalle del caso</h3>
              <p className="text-xs font-medium text-zinc-500 mt-2">
                Selecciona una tarjeta para ver datos del cliente y acciones sugeridas.
              </p>
            </div>
          )}

          {selectedCase && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{selectedCase.name}</h3>
                <p className="text-sm font-medium text-zinc-400 mt-1">{selectedCase.email}</p>
                <p className="text-sm font-medium text-zinc-500">{selectedCase.phone}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-zinc-500 font-medium">Etapa:</span>
                  <span className="text-zinc-200 font-semibold bg-white/5 px-2 py-0.5 rounded-md">{getStageLabel(selectedCase.stage)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-zinc-500 font-medium">Proyecto:</span>
                  <span className="text-zinc-300 font-medium">{selectedCase.product}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-zinc-500 font-medium">Valor est.:</span>{" "}
                  <span className="text-zinc-200 font-bold">{formatCurrency(selectedCase.estimatedValue)}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-white/5 pb-2">
                  <span className="text-zinc-500 font-medium">Próxima acción:</span>{" "}
                  <span className="text-zinc-300 font-medium">{selectedCase.nextAction}</span>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-2">Notas</p>
                <p className="text-sm font-medium text-zinc-300 bg-black/30 border border-white/10 rounded-xl p-4 shadow-inner">
                  {selectedCase.statusNote}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-2">Etiquetas</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold tracking-wide bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
