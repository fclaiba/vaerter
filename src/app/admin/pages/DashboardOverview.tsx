import { useMemo } from "react";
import { Activity, DollarSign, Package, UserPlus } from "lucide-react";
import { formatCurrency, getStageLabel, stageOrder } from "@/app/admin/domain/crm";
import { getCrmStore } from "@/app/admin/data/localCrmRepository";

export default function DashboardOverview() {
  const store = getCrmStore();

  const metrics = useMemo(() => {
    const totalValue = store.cases.reduce((acc, item) => acc + item.estimatedValue, 0);
    const leads = store.cases.filter((item) => item.stage === "lead").length;
    const orders = store.cases.filter((item) => item.stage === "order").length;
    const deliveries = store.cases.filter((item) => item.stage === "delivery").length;
    const conversion = orders > 0 ? Number(((deliveries / orders) * 100).toFixed(1)) : 0;

    return { totalValue, leads, orders, conversion };
  }, [store.cases]);

  const grouped = useMemo(
    () =>
      stageOrder.map((stage) => ({
        stage,
        label: getStageLabel(stage),
        count: store.cases.filter((item) => item.stage === stage).length,
      })),
    [store.cases],
  );

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Resumen General</h2>
        <p className="text-zinc-400 mt-2">
          Control unificado del flujo comercial y operativo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Leads activos",
            icon: UserPlus,
            value: String(metrics.leads),
            sub: "Entrada comercial",
            color: "text-blue-400",
          },
          {
            title: "Pedidos confirmados",
            icon: Package,
            value: String(metrics.orders),
            sub: "Listos para producción",
            color: "text-indigo-400",
          },
          {
            title: "Tasa de entrega",
            icon: Activity,
            value: `${metrics.conversion}%`,
            sub: "Pedidos -> Entregas",
            color: "text-emerald-400",
          },
          {
            title: "Valor pipeline",
            icon: DollarSign,
            value: formatCurrency(metrics.totalValue),
            sub: "Valor estimado total",
            color: "text-amber-400",
          },
        ].map((kpi) => (
          <div
            key={kpi.title}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/10 transition-colors shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">{kpi.title}</span>
              <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${kpi.color}`}>
                <kpi.icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold tracking-tight text-white mb-1">{kpi.value}</div>
              <p className="text-xs font-medium text-zinc-500">{kpi.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <h3 className="font-semibold text-lg text-zinc-100 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Distribución por etapa</h3>
          <div className="space-y-1">
            {grouped.map((item) => (
              <div
                key={item.stage}
                className="flex items-center justify-between border-b border-white/5 pb-3 pt-2 last:border-b-0 hover:bg-white/5 px-2 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium text-zinc-300">{item.label}</span>
                <span className="font-semibold text-zinc-100 bg-white/10 px-2 py-0.5 rounded-md text-sm">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <h3 className="font-semibold text-lg text-zinc-100 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Últimos casos actualizados</h3>
          <div className="space-y-2">
            {store.cases.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-white/5 pb-3 pt-2 last:border-b-0 hover:bg-white/5 px-2 rounded-lg transition-colors"
              >
                <div>
                  <p className="font-medium text-zinc-200 text-sm">{item.name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{item.product}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                    {getStageLabel(item.stage)}
                  </span>
                  <p className="text-[10px] text-zinc-500 font-medium">
                    {new Date(item.updatedAt).toLocaleDateString("es-AR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
