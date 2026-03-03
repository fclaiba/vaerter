import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  getStageLabel,
  type CustomerStage,
  stageOrder,
} from "@/app/admin/domain/crm";
import {
  aggregateCampaignPerformance,
  createCampaignDraft,
  templateForStage,
} from "@/app/admin/domain/emailMarketing";
import {
  createCampaign,
  executeCampaign,
  getCrmStore,
  type CreateCampaignInput,
} from "@/app/admin/data/localCrmRepository";

export default function EmailMarketingPage() {
  const [store, setStore] = useState(getCrmStore());
  const [selectedStage, setSelectedStage] = useState<CustomerStage>("lead");
  const [draftName, setDraftName] = useState("");
  const [draftSubject, setDraftSubject] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");

  const audienceCount = useMemo(
    () => store.cases.filter((item) => item.stage === selectedStage).length,
    [store.cases, selectedStage],
  );

  const campaignTotals = useMemo(
    () => aggregateCampaignPerformance(store.campaignRuns),
    [store.campaignRuns],
  );

  const loadTemplate = (stage: CustomerStage) => {
    const seed = createCampaignDraft(stage, new Date().toISOString());
    setDraftName(seed.name);
    setDraftSubject(seed.subject);
    setDraftBody(seed.body);
  };

  const submitCampaign = () => {
    const payload: CreateCampaignInput = {
      name: draftName || templateForStage(selectedStage).title,
      targetStage: selectedStage,
      subject: draftSubject || templateForStage(selectedStage).subject,
      body: draftBody || templateForStage(selectedStage).body,
      status: scheduleDate ? "scheduled" : "draft",
      scheduledFor: scheduleDate || undefined,
    };

    const updated = createCampaign(payload);
    setStore(updated);
    toast.success("Campana creada", {
      description: `${payload.name} (${getStageLabel(payload.targetStage)})`,
    });
  };

  const runCampaign = (campaignId: string) => {
    const updated = executeCampaign(campaignId);
    setStore(updated);
    toast.success("Campana ejecutada", {
      description: "Se simularon envios y metricas de interaccion.",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      <header>
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Email Marketing</h2>
        <p className="text-zinc-400 mt-2 font-medium">
          Comunicaciones por fase comercial con simulación de performance.
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-6 h-fit shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <h3 className="font-bold text-zinc-100 text-lg tracking-tight">Nueva campaña</h3>

          <div className="space-y-2">
            <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">Segmento objetivo</label>
            <select
              value={selectedStage}
              onChange={(event) => {
                const stage = event.target.value as CustomerStage;
                setSelectedStage(stage);
                loadTemplate(stage);
              }}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 appearance-none text-zinc-300"
            >
              {stageOrder.map((stage) => (
                <option key={stage} value={stage}>
                  {getStageLabel(stage)}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs font-medium text-zinc-300 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 shadow-inner">
            Audiencia actual para el segmento: <strong className="text-indigo-300">{audienceCount}</strong> clientes.
          </div>

          <button
            type="button"
            onClick={() => loadTemplate(selectedStage)}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors shadow-[0_4px_14px_0_rgba(255,255,255,0.05)]"
          >
            Cargar plantilla por etapa
          </button>

          <div className="space-y-2">
            <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">Nombre</label>
            <input
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
              placeholder="Ej: Reactivación cartera Q2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">Asunto</label>
            <input
              value={draftSubject}
              onChange={(event) => setDraftSubject(event.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600"
              placeholder="Asunto del email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">Contenido</label>
            <textarea
              value={draftBody}
              onChange={(event) => setDraftBody(event.target.value)}
              rows={5}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-200 placeholder:text-zinc-600 resize-none custom-scrollbar"
              placeholder="Mensaje de la campaña"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">Programación (opcional)</label>
            <input
              value={scheduleDate}
              onChange={(event) => setScheduleDate(event.target.value)}
              type="datetime-local"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-zinc-300 [color-scheme:dark]"
            />
          </div>

          <button
            type="button"
            onClick={submitCampaign}
            className="w-full px-4 py-3.5 rounded-full bg-white text-black font-bold uppercase tracking-wide text-xs hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] mt-2"
          >
            Guardar campaña
          </button>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group">
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-300 transition-colors">Emails enviados</p>
              <p className="text-3xl font-bold tracking-tight text-white mt-1">{campaignTotals.sent}</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group">
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-300 transition-colors">Open rate</p>
              <p className="text-3xl font-bold tracking-tight text-white mt-1">{campaignTotals.openRate}%</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group">
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-300 transition-colors">Click rate</p>
              <p className="text-3xl font-bold tracking-tight text-white mt-1">{campaignTotals.clickRate}%</p>
            </article>
          </div>

          <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h3 className="font-bold text-zinc-100 text-lg tracking-tight mb-4">Campañas</h3>
            <div className="overflow-x-auto custom-scrollbar pb-2">
              <table className="w-full text-sm">
                <thead className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 border-b border-white/10">
                  <tr>
                    <th className="text-left py-3 px-2">Nombre</th>
                    <th className="text-left py-3 px-2">Segmento</th>
                    <th className="text-left py-3 px-2">Estado</th>
                    <th className="text-left py-3 px-2">Última ejecución</th>
                    <th className="text-right py-3 px-2">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {store.campaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-2 font-medium text-zinc-200">{campaign.name}</td>
                      <td className="py-4 px-2 text-zinc-400">{getStageLabel(campaign.targetStage)}</td>
                      <td className="py-4 px-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-zinc-300">
                          {campaign.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-zinc-500 font-medium">
                        {campaign.lastRunAt
                          ? new Date(campaign.lastRunAt).toLocaleString("es-AR")
                          : "Nunca"}
                      </td>
                      <td className="py-4 px-2 text-right">
                        <button
                          type="button"
                          onClick={() => runCampaign(campaign.id)}
                          className="text-[11px] font-semibold tracking-wide uppercase px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-200 hover:text-white hover:bg-white/10 transition-colors shadow-sm"
                        >
                          Ejecutar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {store.campaigns.length === 0 && (
                    <tr>
                      <td className="py-8 text-center text-zinc-500 font-medium" colSpan={5}>
                        No hay campañas creadas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h3 className="font-bold text-zinc-100 text-lg tracking-tight mb-4">Historial de envíos simulados</h3>
            <div className="overflow-x-auto custom-scrollbar pb-2">
              <table className="w-full text-sm">
                <thead className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 border-b border-white/10">
                  <tr>
                    <th className="text-left py-3 px-2">Campaña</th>
                    <th className="text-left py-3 px-2">Fecha</th>
                    <th className="text-left py-3 px-2">Estado</th>
                    <th className="text-right py-3 px-2">Enviados</th>
                    <th className="text-right py-3 px-2">Abiertos</th>
                    <th className="text-right py-3 px-2">Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {store.campaignRuns.length === 0 && (
                    <tr>
                      <td className="py-8 text-center text-zinc-500 font-medium" colSpan={6}>
                        Aún no hay ejecuciones de campaña.
                      </td>
                    </tr>
                  )}
                  {store.campaignRuns.map((run) => (
                    <tr key={run.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-2 font-medium text-zinc-200">{run.campaignName}</td>
                      <td className="py-4 px-2 text-zinc-400 font-medium">
                        {new Date(run.executedAt).toLocaleString("es-AR")}
                      </td>
                      <td className="py-4 px-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">
                          sent
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right font-medium text-zinc-300">{run.sent}</td>
                      <td className="py-4 px-2 text-right font-medium text-zinc-300">{run.opened}</td>
                      <td className="py-4 px-2 text-right font-medium text-zinc-300">{run.clicked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
