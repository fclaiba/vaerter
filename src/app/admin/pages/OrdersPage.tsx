import { useMemo, useState } from "react";
import { toast } from "sonner";
import StageTable from "@/app/admin/components/pipeline/StageTable";
import { advanceCase, getCrmStore, revertCase } from "@/app/admin/data/localCrmRepository";

export default function OrdersPage() {
  const [store, setStore] = useState(getCrmStore());

  const orders = useMemo(
    () => store.cases.filter((item) => item.stage === "order"),
    [store.cases],
  );

  const startProduction = (id: string) => {
    setStore(advanceCase(id));
    toast.success("Pedido movido a produccion");
  };

  const backToQuote = (id: string) => {
    setStore(revertCase(id));
    toast.message("Pedido devuelto a cotizacion");
  };

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      <header>
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Pedidos</h2>
        <p className="text-zinc-400 mt-2 font-medium">
          Pedidos confirmados, listos para planificación operativa.
        </p>
      </header>

      <StageTable
        title="Pedidos en espera de producción"
        description="Casos confirmados por el cliente para iniciar fabricación."
        rows={orders}
        actionLabel="Iniciar producción"
        onPrimaryAction={startProduction}
        secondaryActionLabel="Volver a cotización"
        onSecondaryAction={backToQuote}
      />
    </div>
  );
}
