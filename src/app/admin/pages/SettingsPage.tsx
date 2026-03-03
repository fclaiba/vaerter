import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  getSettingsHistory,
  getClientSettingsStore,
  replaceAppSettings,
  resetClientSettingsStore,
  restoreSettingsSnapshot,
  type AppSettings,
} from "@/app/admin/data/clientSettingsRepository";

export default function SettingsPage() {
  const [store, setStore] = useState(() => getClientSettingsStore());
  const [draft, setDraft] = useState(() => getClientSettingsStore().settings);
  const [history, setHistory] = useState(() => getSettingsHistory());
  const fileRef = useRef<HTMLInputElement | null>(null);

  const isDirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(store.settings),
    [draft, store.settings],
  );

  const validationErrors = useMemo(() => {
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!draft.business.companyName.trim()) errors.push("El nombre de empresa es obligatorio.");
    if (!emailRegex.test(draft.business.contactEmail))
      errors.push("El email de contacto no es valido.");
    if (!emailRegex.test(draft.emailMarketing.defaultSenderEmail))
      errors.push("El email remitente no es valido.");
    if (draft.pipeline.quoteSlaHours < 1) errors.push("SLA de cotizacion debe ser mayor a 0.");
    if (draft.pipeline.productionSlaDays < 1)
      errors.push("SLA de produccion debe ser mayor a 0.");
    if (draft.pipeline.deliverySlaDays < 1) errors.push("SLA de entrega debe ser mayor a 0.");
    if (draft.analytics.refreshIntervalMin < 1)
      errors.push("Refresh de analytics debe ser mayor a 0.");
    if (draft.emailMarketing.openRateGoal < 0 || draft.emailMarketing.openRateGoal > 100)
      errors.push("Objetivo open rate debe estar entre 0 y 100.");
    if (draft.emailMarketing.clickRateGoal < 0 || draft.emailMarketing.clickRateGoal > 100)
      errors.push("Objetivo click rate debe estar entre 0 y 100.");

    return errors;
  }, [draft]);

  const updateDraft = (mutator: (current: AppSettings) => AppSettings) => {
    setDraft((current) => mutator(current));
  };

  const save = () => {
    if (validationErrors.length > 0) {
      toast.error("Corrige los errores antes de guardar");
      return;
    }
    const updated = replaceAppSettings(draft, "manual_save");
    setStore(updated);
    setHistory(getSettingsHistory());
    toast.success("Configuracion guardada");
  };

  const discard = () => {
    setDraft(store.settings);
    toast.message("Cambios descartados");
  };

  const restoreDefaults = () => {
    const updated = resetClientSettingsStore();
    setStore(updated);
    setDraft(updated.settings);
    setHistory(getSettingsHistory());
    toast.message("Configuracion restablecida");
  };

  const restoreSnapshot = (snapshotId: string) => {
    const updated = restoreSettingsSnapshot(snapshotId);
    setStore(updated);
    setDraft(updated.settings);
    setHistory(getSettingsHistory());
    toast.success("Snapshot restaurado");
  };

  const exportSettings = () => {
    const payload = JSON.stringify(draft, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `vaerter-settings-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast.success("Configuracion exportada");
  };

  const importSettings = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as AppSettings;
      const updated = replaceAppSettings(parsed, "import");
      setStore(updated);
      setDraft(updated.settings);
      setHistory(getSettingsHistory());
      toast.success("Configuracion importada");
    } catch {
      toast.error("Archivo de configuracion invalido");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      <header>
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Configuración</h2>
        <p className="text-zinc-400 mt-2 font-medium">
          Parámetros globales de negocio, automatización y monitoreo del dashboard.
        </p>
      </header>

      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="text-sm font-medium text-zinc-300">
            Estado:{" "}
            <span className={`px-2 py-1 rounded-full text-xs font-bold tracking-wide uppercase border ${isDirty ? "bg-amber-500/10 text-amber-300 border-amber-500/20" : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"}`}>
              {isDirty ? "Cambios pendientes" : "Sin cambios pendientes"}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={save}
              disabled={!isDirty || validationErrors.length > 0}
              className="px-5 py-2.5 rounded-full bg-white text-black font-bold uppercase tracking-wide text-[11px] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Guardar configuración
            </button>
            <button
              type="button"
              onClick={discard}
              disabled={!isDirty}
              className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-[11px] font-bold uppercase tracking-wide text-zinc-300 hover:text-white hover:bg-white/10 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Descartar cambios
            </button>
            <button
              type="button"
              onClick={exportSettings}
              className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-[11px] font-bold uppercase tracking-wide text-zinc-300 hover:text-white hover:bg-white/10 transition-colors shadow-sm"
            >
              Exportar JSON
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-[11px] font-bold uppercase tracking-wide text-zinc-300 hover:text-white hover:bg-white/10 transition-colors shadow-sm"
            >
              Importar JSON
            </button>
            <button
              type="button"
              onClick={restoreDefaults}
              className="px-5 py-2.5 rounded-full border border-red-500/30 bg-red-500/5 text-[11px] font-bold uppercase tracking-wide text-red-400 hover:bg-red-500/10 transition-colors shadow-sm"
            >
              Restablecer defaults
            </button>
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void importSettings(file);
            event.target.value = "";
          }}
        />
        {validationErrors.length > 0 && (
          <div className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm font-medium text-red-300 shadow-inner">
            {validationErrors.map((error) => (
              <p key={error} className="mb-1 last:mb-0">• {error}</p>
            ))}
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <h3 className="font-bold text-zinc-100 text-lg tracking-tight mb-2">Perfil del negocio</h3>
          <input
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
            placeholder="Nombre de la empresa"
            value={draft.business.companyName}
            onChange={(event) =>
              updateDraft((prev) => ({
                ...prev,
                business: { ...prev.business, companyName: event.target.value },
              }))
            }
          />
          <input
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
            placeholder="Email de contacto"
            value={draft.business.contactEmail}
            onChange={(event) =>
              updateDraft((prev) => ({
                ...prev,
                business: { ...prev.business, contactEmail: event.target.value },
              }))
            }
          />
          <input
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
            placeholder="Teléfono de contacto"
            value={draft.business.contactPhone}
            onChange={(event) =>
              updateDraft((prev) => ({
                ...prev,
                business: { ...prev.business, contactPhone: event.target.value },
              }))
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
              placeholder="Zona horaria"
              value={draft.business.timezone}
              onChange={(event) =>
                updateDraft((prev) => ({
                  ...prev,
                  business: { ...prev.business, timezone: event.target.value },
                }))
              }
            />
            <input
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
              placeholder="Moneda"
              value={draft.business.currency}
              onChange={(event) =>
                updateDraft((prev) => ({
                  ...prev,
                  business: { ...prev.business, currency: event.target.value },
                }))
              }
            />
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <h3 className="font-bold text-zinc-100 text-lg tracking-tight mb-2">Alertas y notificaciones</h3>
          {(
            [
              ["salesAlerts", "Alertas comerciales"],
              ["productionAlerts", "Alertas de producción"],
              ["deliveryAlerts", "Alertas de entrega"],
              ["dailySummary", "Resumen diario"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between text-sm font-medium text-zinc-300 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent">
              <span>{label}</span>
              <input
                type="checkbox"
                checked={draft.notifications[key]}
                onChange={(event) =>
                  updateDraft((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, [key]: event.target.checked },
                  }))
                }
                className="w-4 h-4 rounded border-white/20 bg-black/40 text-white focus:ring-white/30 focus:ring-offset-0 cursor-pointer transition-colors"
              />
            </label>
          ))}
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <h3 className="font-bold text-zinc-100 text-lg tracking-tight mb-2">Reglas de pipeline</h3>
          <label className="flex items-center justify-between text-sm font-medium text-zinc-300 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent">
            <span>Auto-avance cotización -&gt; pedido</span>
            <input
              type="checkbox"
              checked={draft.pipeline.autoAdvanceFromQuote}
              onChange={(event) =>
                updateDraft((prev) => ({
                  ...prev,
                  pipeline: {
                    ...prev.pipeline,
                    autoAdvanceFromQuote: event.target.checked,
                  },
                }))
              }
              className="w-4 h-4 rounded border-white/20 bg-black/40 text-white focus:ring-white/30 focus:ring-offset-0 cursor-pointer transition-colors"
            />
          </label>
          <div className="space-y-1">
            <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">SLA cotización (horas)</label>
            <input
              type="number"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200"
              value={draft.pipeline.quoteSlaHours}
              onChange={(event) =>
                updateDraft((prev) => ({
                  ...prev,
                  pipeline: { ...prev.pipeline, quoteSlaHours: Number(event.target.value) },
                }))
              }
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">SLA producción (días)</label>
              <input
                type="number"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200"
                value={draft.pipeline.productionSlaDays}
                onChange={(event) =>
                  updateDraft((prev) => ({
                    ...prev,
                    pipeline: {
                      ...prev.pipeline,
                      productionSlaDays: Number(event.target.value),
                    },
                  }))
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">SLA entrega (días)</label>
              <input
                type="number"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200"
                value={draft.pipeline.deliverySlaDays}
                onChange={(event) =>
                  updateDraft((prev) => ({
                    ...prev,
                    pipeline: {
                      ...prev.pipeline,
                      deliverySlaDays: Number(event.target.value),
                    },
                  }))
                }
              />
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <h3 className="font-bold text-zinc-100 text-lg tracking-tight mb-2">Email marketing y analytics</h3>
          <input
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
            placeholder="Nombre remitente por defecto"
            value={draft.emailMarketing.defaultSenderName}
            onChange={(event) =>
              updateDraft((prev) => ({
                ...prev,
                emailMarketing: {
                  ...prev.emailMarketing,
                  defaultSenderName: event.target.value,
                },
              }))
            }
          />
          <input
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
            placeholder="Email remitente por defecto"
            value={draft.emailMarketing.defaultSenderEmail}
            onChange={(event) =>
              updateDraft((prev) => ({
                ...prev,
                emailMarketing: {
                  ...prev.emailMarketing,
                  defaultSenderEmail: event.target.value,
                },
              }))
            }
          />
          <label className="flex items-center justify-between text-sm font-medium text-zinc-300 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent">
            <span>Automatizaciones por etapa</span>
            <input
              type="checkbox"
              checked={draft.emailMarketing.enableStageAutomations}
              onChange={(event) =>
                updateDraft((prev) => ({
                  ...prev,
                  emailMarketing: {
                    ...prev.emailMarketing,
                    enableStageAutomations: event.target.checked,
                  },
                }))
              }
              className="w-4 h-4 rounded border-white/20 bg-black/40 text-white focus:ring-white/30 focus:ring-offset-0 cursor-pointer transition-colors"
            />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">Objetivo open rate (%)</label>
              <input
                type="number"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200"
                value={draft.emailMarketing.openRateGoal}
                onChange={(event) =>
                  updateDraft((prev) => ({
                    ...prev,
                    emailMarketing: {
                      ...prev.emailMarketing,
                      openRateGoal: Number(event.target.value),
                    },
                  }))
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">Objetivo click rate (%)</label>
              <input
                type="number"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200"
                value={draft.emailMarketing.clickRateGoal}
                onChange={(event) =>
                  updateDraft((prev) => ({
                    ...prev,
                    emailMarketing: {
                      ...prev.emailMarketing,
                      clickRateGoal: Number(event.target.value),
                    },
                  }))
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">Refresh analytics (min)</label>
              <input
                type="number"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200"
                value={draft.analytics.refreshIntervalMin}
                onChange={(event) =>
                  updateDraft((prev) => ({
                    ...prev,
                    analytics: {
                      ...prev.analytics,
                      refreshIntervalMin: Number(event.target.value),
                    },
                  }))
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">Rango por defecto</label>
              <select
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-300 appearance-none"
                value={draft.analytics.defaultDateRange}
                onChange={(event) =>
                  updateDraft((prev) => ({
                    ...prev,
                    analytics: {
                      ...prev.analytics,
                      defaultDateRange: event.target.value as "7d" | "30d" | "90d",
                    },
                  }))
                }
              >
                <option value="7d">7 días</option>
                <option value="30d">30 días</option>
                <option value="90d">90 días</option>
              </select>
            </div>
          </div>
          <label className="flex items-center justify-between text-sm font-medium text-zinc-300 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent">
            <span>Incluir clientes archivados en reportes</span>
            <input
              type="checkbox"
              checked={draft.analytics.includeArchivedClients}
              onChange={(event) =>
                updateDraft((prev) => ({
                  ...prev,
                  analytics: {
                    ...prev.analytics,
                    includeArchivedClients: event.target.checked,
                  },
                }))
              }
              className="w-4 h-4 rounded border-white/20 bg-black/40 text-white focus:ring-white/30 focus:ring-offset-0 cursor-pointer transition-colors"
            />
          </label>
        </article>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        <h3 className="font-bold text-zinc-100 text-lg tracking-tight mb-4">Historial de configuración</h3>
        <div className="space-y-3">
          {history.length === 0 && (
            <p className="text-sm font-medium text-zinc-500">No hay snapshots disponibles.</p>
          )}
          {history.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 border border-white/5 bg-black/20 rounded-xl p-4 transition-colors hover:bg-black/40 hover:border-white/10"
            >
              <div className="text-sm">
                <p className="font-semibold text-zinc-200">{item.source}</p>
                <p className="text-zinc-500 text-xs font-medium tracking-wide">
                  {new Date(item.changedAt).toLocaleString("es-AR")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => restoreSnapshot(item.id)}
                className="text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors shadow-sm"
              >
                Restaurar
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
