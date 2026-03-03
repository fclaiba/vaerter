import { useMemo, useState } from "react";
import { toast } from "sonner";
import { formatCurrency } from "@/app/admin/domain/crm";
import { getCrmStore } from "@/app/admin/data/localCrmRepository";
import {
  createClient,
  deleteClient,
  getClientSettingsStore,
  setClientStatus,
  updateClient,
  type ClientRecord,
  type ClientSegment,
  type ClientStatus,
} from "@/app/admin/data/clientSettingsRepository";

export default function ClientsPage() {
  const [store, setStore] = useState(getClientSettingsStore());
  const [search, setSearch] = useState("");
  const [segmentFilter, setSegmentFilter] = useState<"all" | ClientSegment>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ClientStatus>("all");
  const [selectedId, setSelectedId] = useState<string | null>(store.clients[0]?.id ?? null);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newSegment, setNewSegment] = useState<ClientSegment>("retail");
  const [newOptIn, setNewOptIn] = useState(true);

  const crmStore = getCrmStore();

  const clients = useMemo(() => {
    return store.clients.filter((client) => {
      const bySearch =
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase()) ||
        (client.company ?? "").toLowerCase().includes(search.toLowerCase());
      const bySegment = segmentFilter === "all" || client.segment === segmentFilter;
      const byStatus = statusFilter === "all" || client.status === statusFilter;
      return bySearch && bySegment && byStatus;
    });
  }, [store.clients, search, segmentFilter, statusFilter]);

  const selected = useMemo(
    () => store.clients.find((item) => item.id === selectedId) ?? null,
    [store.clients, selectedId],
  );

  const kpis = useMemo(() => {
    const total = store.clients.length;
    const active = store.clients.filter((item) => item.status === "active").length;
    const vip = store.clients.filter((item) => item.segment === "enterprise").length;
    const value = store.clients.reduce((acc, item) => acc + item.lifetimeValue, 0);
    return { total, active, vip, value };
  }, [store.clients]);

  const relatedCases = useMemo(() => {
    if (!selected) return [];
    return crmStore.cases.filter((item) => item.email === selected.email);
  }, [crmStore.cases, selected]);

  const create = () => {
    if (!newName || !newEmail) {
      toast.error("Completa al menos nombre y email");
      return;
    }

    const updated = createClient({
      name: newName,
      email: newEmail,
      phone: newPhone,
      company: newCompany,
      segment: newSegment,
      marketingOptIn: newOptIn,
    });
    setStore(updated);
    setSelectedId(updated.clients[0]?.id ?? null);
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    setNewCompany("");
    setNewSegment("retail");
    setNewOptIn(true);
    toast.success("Cliente creado");
  };

  const saveSelected = () => {
    if (!selected) return;
    const updated = updateClient(selected);
    setStore(updated);
    toast.success("Cliente actualizado");
  };

  const updateSelected = (patch: Partial<ClientRecord>) => {
    if (!selected) return;
    const merged: ClientRecord = { ...selected, ...patch };
    setStore((prev) => ({
      ...prev,
      clients: prev.clients.map((item) => (item.id === selected.id ? merged : item)),
    }));
  };

  const archiveSelected = () => {
    if (!selected) return;
    const updated = setClientStatus(selected.id, "inactive");
    setStore(updated);
    toast.message("Cliente marcado como inactivo");
  };

  const activateSelected = () => {
    if (!selected) return;
    const updated = setClientStatus(selected.id, "active");
    setStore(updated);
    toast.success("Cliente reactivado");
  };

  const removeSelected = () => {
    if (!selected) return;
    const updated = deleteClient(selected.id);
    setStore(updated);
    setSelectedId(updated.clients[0]?.id ?? null);
    toast.message("Cliente eliminado");
  };

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      <header>
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Clientes</h2>
        <p className="text-zinc-400 mt-2 font-medium">
          Gestión completa de cartera, segmentación y estado comercial.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-300 transition-colors">Clientes totales</p>
          <p className="text-3xl font-bold tracking-tight text-white mt-1.5">{kpis.total}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-300 transition-colors">Clientes activos</p>
          <p className="text-3xl font-bold tracking-tight text-white mt-1.5">{kpis.active}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-300 transition-colors">Segmento enterprise</p>
          <p className="text-3xl font-bold tracking-tight text-white mt-1.5">{kpis.vip}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-300 transition-colors">LTV acumulado</p>
          <p className="text-3xl font-bold tracking-tight text-white mt-1.5">{formatCurrency(kpis.value)}</p>
        </article>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[340px_1fr_360px] gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4 h-fit shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <h3 className="font-bold text-zinc-100 text-lg tracking-tight mb-2">Nuevo cliente</h3>
          <input
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
            placeholder="Nombre"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <input
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
            placeholder="Email"
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
          />
          <input
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
            placeholder="Teléfono"
            value={newPhone}
            onChange={(event) => setNewPhone(event.target.value)}
          />
          <input
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
            placeholder="Empresa"
            value={newCompany}
            onChange={(event) => setNewCompany(event.target.value)}
          />
          <select
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-300 appearance-none"
            value={newSegment}
            onChange={(event) => setNewSegment(event.target.value as ClientSegment)}
          >
            <option value="retail">Retail</option>
            <option value="wholesale">Wholesale</option>
            <option value="enterprise">Enterprise</option>
          </select>
          <label className="flex items-center gap-3 text-sm text-zinc-300 font-medium cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={newOptIn}
              onChange={(event) => setNewOptIn(event.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-black/40 text-white focus:ring-white/30 focus:ring-offset-0 cursor-pointer transition-colors"
            />
            Opt-in email marketing
          </label>
          <button
            type="button"
            className="w-full mt-4 px-4 py-3.5 rounded-full bg-white text-black font-bold uppercase tracking-wide text-xs hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            onClick={create}
          >
            Crear cliente
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
            <input
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
              placeholder="Buscar cliente..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-300 appearance-none"
              value={segmentFilter}
              onChange={(event) => setSegmentFilter(event.target.value as "all" | ClientSegment)}
            >
              <option value="all">Todos los segmentos</option>
              <option value="retail">Retail</option>
              <option value="wholesale">Wholesale</option>
              <option value="enterprise">Enterprise</option>
            </select>
            <select
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-300 appearance-none"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as "all" | ClientStatus)}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="blocked">Bloqueado</option>
            </select>
          </div>

          <div className="overflow-x-auto custom-scrollbar flex-1 pb-2">
            <table className="w-full text-sm">
              <thead className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 border-b border-white/10">
                <tr>
                  <th className="text-left py-3 px-2">Cliente</th>
                  <th className="text-left py-3 px-2">Segmento</th>
                  <th className="text-left py-3 px-2">Estado</th>
                  <th className="text-left py-3 px-2">Pedidos</th>
                  <th className="text-left py-3 px-2">LTV</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className={`border-b border-white/5 cursor-pointer transition-colors ${selectedId === client.id ? "bg-white/10" : "hover:bg-white/5"
                      }`}
                    onClick={() => setSelectedId(client.id)}
                  >
                    <td className="py-4 px-2">
                      <p className="font-semibold text-zinc-100">{client.name}</p>
                      <p className="text-xs font-medium text-zinc-400 mt-0.5">{client.email}</p>
                    </td>
                    <td className="py-4 px-2 text-zinc-300 font-medium capitalize">{client.segment}</td>
                    <td className="py-4 px-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${client.status === 'active' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' :
                          client.status === 'inactive' ? 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20' :
                            'bg-red-500/10 text-red-300 border-red-500/20'
                        }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-zinc-300 font-medium">{client.ordersCount}</td>
                    <td className="py-4 px-2 text-zinc-300 font-medium">
                      {formatCurrency(client.lifetimeValue)}
                    </td>
                  </tr>
                ))}
                {clients.length === 0 && (
                  <tr>
                    <td className="py-8 text-center text-zinc-500 font-medium" colSpan={5}>
                      No hay clientes para los filtros seleccionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 h-fit shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          {!selected && (
            <div className="flex flex-col items-center justify-center text-center py-10 opacity-70">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white">
                <span className="text-xl">👤</span>
              </div>
              <p className="text-zinc-400 font-medium">
                Selecciona un cliente para editar sus datos y preferencias.
              </p>
            </div>
          )}
          {selected && (
            <div className="space-y-4">
              <h3 className="font-bold text-zinc-100 text-lg tracking-tight mb-2">Ficha de cliente</h3>
              <input
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200"
                value={selected.name}
                onChange={(event) => updateSelected({ name: event.target.value })}
              />
              <input
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200"
                value={selected.email}
                onChange={(event) => updateSelected({ email: event.target.value })}
              />
              <input
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200"
                value={selected.phone}
                onChange={(event) => updateSelected({ phone: event.target.value })}
              />
              <input
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
                value={selected.company ?? ""}
                placeholder="Empresa"
                onChange={(event) => updateSelected({ company: event.target.value })}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-300 appearance-none"
                  value={selected.segment}
                  onChange={(event) =>
                    updateSelected({ segment: event.target.value as ClientSegment })
                  }
                >
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="enterprise">Enterprise</option>
                </select>
                <select
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-300 appearance-none"
                  value={selected.status}
                  onChange={(event) =>
                    updateSelected({ status: event.target.value as ClientStatus })
                  }
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                  <option value="blocked">Bloqueado</option>
                </select>
              </div>

              <textarea
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 custom-scrollbar resize-none"
                rows={4}
                value={selected.notes}
                placeholder="Notas u observaciones sobre el cliente..."
                onChange={(event) => updateSelected({ notes: event.target.value })}
              />

              <label className="flex items-center gap-3 text-sm text-zinc-300 font-medium cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={selected.marketingOptIn}
                  onChange={(event) =>
                    updateSelected({ marketingOptIn: event.target.checked })
                  }
                  className="w-4 h-4 rounded border-white/20 bg-black/40 text-white focus:ring-white/30 focus:ring-offset-0 cursor-pointer transition-colors"
                />
                Opt-in email marketing
              </label>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={saveSelected}
                  className="w-full sm:w-1/2 px-4 py-3 rounded-full bg-white text-black font-bold uppercase tracking-wide text-[11px] hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={selected.status === "inactive" ? activateSelected : archiveSelected}
                  className="w-full sm:w-1/2 px-4 py-3 rounded-full border border-white/20 bg-white/5 text-[11px] font-bold uppercase tracking-wide text-zinc-300 hover:text-white hover:bg-white/10 transition-colors shadow-sm"
                >
                  {selected.status === "inactive" ? "Reactivar" : "Inactivar"}
                </button>
              </div>
              <button
                type="button"
                onClick={removeSelected}
                className="w-full px-4 py-3 mt-1 rounded-full border border-red-500/30 bg-red-500/5 text-[11px] font-bold uppercase tracking-wide text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-colors shadow-sm"
              >
                Eliminar cliente
              </button>

              <div className="pt-4 mt-4 border-t border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3">
                  Casos asociados
                </p>
                {relatedCases.length === 0 && (
                  <p className="text-xs font-medium text-zinc-500">Sin casos en pipeline.</p>
                )}
                {relatedCases.length > 0 && (
                  <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                    {relatedCases.map((item) => (
                      <div key={item.id} className="text-xs font-medium text-zinc-300 bg-black/20 rounded-lg p-2.5 border border-white/5">
                        <p className="text-zinc-100 font-semibold mb-0.5">{item.name}</p>
                        <p className="text-zinc-500">{item.product} · <span className="capitalize">{item.stage}</span></p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
