import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import KpiCard from "@/app/admin/components/analytics/KpiCard";
import ChartCard from "@/app/admin/components/analytics/ChartCard";
import {
  formatCurrency,
  getStageLabel,
  stageOrder,
} from "@/app/admin/domain/crm";
import {
  aggregateCampaignPerformance,
  type CampaignRun,
} from "@/app/admin/domain/emailMarketing";
import { getCrmStore } from "@/app/admin/data/localCrmRepository";

function stageCountData() {
  const store = getCrmStore();
  return stageOrder.map((stage) => ({
    stage,
    name: getStageLabel(stage),
    count: store.cases.filter((item) => item.stage === stage).length,
    value: store.cases
      .filter((item) => item.stage === stage)
      .reduce((acc, item) => acc + item.estimatedValue, 0),
  }));
}

function buildTimeline(runs: CampaignRun[]) {
  return runs
    .slice(0, 7)
    .reverse()
    .map((run) => ({
      date: new Date(run.executedAt).toLocaleDateString("es-AR", {
        month: "short",
        day: "2-digit",
      }),
      openRate: run.sent > 0 ? Number(((run.opened / run.sent) * 100).toFixed(1)) : 0,
      clickRate: run.sent > 0 ? Number(((run.clicked / run.sent) * 100).toFixed(1)) : 0,
    }));
}

export default function AnalyticsPage() {
  const store = getCrmStore();

  const stageData = useMemo(() => stageCountData(), [store.updatedAt]);
  const campaignTotals = useMemo(
    () => aggregateCampaignPerformance(store.campaignRuns),
    [store.campaignRuns],
  );
  const timelineData = useMemo(
    () => buildTimeline(store.campaignRuns),
    [store.campaignRuns],
  );

  const orderCount = stageData.find((entry) => entry.stage === "order")?.count ?? 0;
  const deliveredCount = stageData.find((entry) => entry.stage === "delivery")?.count ?? 0;
  const conversionRate =
    orderCount > 0 ? Number(((deliveredCount / orderCount) * 100).toFixed(1)) : 0;
  const pipelineValue = stageData.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      <header>
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Analíticas y Estadísticas</h2>
        <p className="text-zinc-400 mt-2 font-medium">
          Indicadores comerciales y performance de comunicaciones por etapa.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard label="Valor total del pipeline" value={formatCurrency(pipelineValue)} />
        <KpiCard label="Conversión pedidos -> entregas" value={`${conversionRate}%`} />
        <KpiCard label="Open rate acumulado" value={`${campaignTotals.openRate}%`} />
        <KpiCard label="Click rate acumulado" value={`${campaignTotals.clickRate}%`} />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartCard
          title="Embudo por etapa"
          description="Cantidad de casos por fase comercial y operativa."
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2f2f34" vertical={false} />
              <XAxis dataKey="name" stroke="#8a8a91" tick={{ fontSize: 11, fontWeight: 500 }} tickMargin={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#8a8a91" tick={{ fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              <Bar dataKey="count" fill="url(#colorCount)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Distribución de valor"
          description="Valor económico estimado por estado del kanban."
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stageData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                fill="#4f46e5"
                label={{ fill: '#e4e4e7', fontSize: 11, fontWeight: 500 }}
              />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartCard
          title="Rendimiento de campañas"
          description="Open rate y click rate por ejecución reciente."
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2f2f34" vertical={false} />
              <XAxis dataKey="date" stroke="#8a8a91" tick={{ fontSize: 11, fontWeight: 500 }} tickMargin={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#8a8a91" tick={{ fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              <Line type="monotone" dataKey="openRate" stroke="#34d399" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="clickRate" stroke="#a78bfa" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <h3 className="font-bold text-zinc-100 text-lg tracking-tight">Índices del sistema</h3>
          <p className="text-xs font-medium text-zinc-400 mt-1">
            Lectura rápida de estado comercial y operativo.
          </p>

          <div className="mt-6 space-y-3.5 text-sm">
            <div className="rounded-xl bg-black/40 border border-white/5 p-4 flex justify-between items-center transition-colors hover:bg-black/60 hover:border-white/10">
              <span className="text-zinc-400 font-medium">Casos totales</span>
              <span className="font-bold text-white tracking-wide">{store.cases.length}</span>
            </div>
            <div className="rounded-xl bg-black/40 border border-white/5 p-4 flex justify-between items-center transition-colors hover:bg-black/60 hover:border-white/10">
              <span className="text-zinc-400 font-medium">Campañas creadas</span>
              <span className="font-bold text-white tracking-wide">{store.campaigns.length}</span>
            </div>
            <div className="rounded-xl bg-black/40 border border-white/5 p-4 flex justify-between items-center transition-colors hover:bg-black/60 hover:border-white/10">
              <span className="text-zinc-400 font-medium">Ejecuciones simuladas</span>
              <span className="font-bold text-white tracking-wide">{store.campaignRuns.length}</span>
            </div>
            <div className="rounded-xl bg-black/40 border border-white/5 p-4 flex justify-between items-center transition-colors hover:bg-black/60 hover:border-white/10">
              <span className="text-zinc-400 font-medium">Emails enviados</span>
              <span className="font-bold text-white tracking-wide">{campaignTotals.sent}</span>
            </div>
            <div className="rounded-xl bg-black/40 border border-white/5 p-4 flex justify-between items-center transition-colors hover:bg-black/60 hover:border-white/10">
              <span className="text-zinc-400 font-medium">Promedio click/ejecución</span>
              <span className="font-bold text-white tracking-wide">
                {store.campaignRuns.length > 0
                  ? Number((campaignTotals.clicked / store.campaignRuns.length).toFixed(1))
                  : 0}
              </span>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
