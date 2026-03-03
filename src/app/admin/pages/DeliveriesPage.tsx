import { useMemo, useState } from "react";
import { toast } from "sonner";
import StageTable from "@/app/admin/components/pipeline/StageTable";
import { getCrmStore, revertCase } from "@/app/admin/data/localCrmRepository";

export default function DeliveriesPage() {
  const [store, setStore] = useState(getCrmStore());

  const deliveries = useMemo(
    () => store.cases.filter((item) => item.stage === "delivery"),
    [store.cases],
  );

  const reopenProduction = (id: string) => {
    setStore(revertCase(id));
    toast.message("Entrega reabierta en produccion");
  };

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      <header>
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Entregas</h2>
        <p className="text-zinc-400 mt-2 font-medium">
          Cierre operativo de pedidos y confirmación de entrega al cliente.
        </p>
      </header>

      <StageTable
        title="Entregas Cerradas"
        description="Pedidos completados y registrados como entregados."
        rows={deliveries}
        actionLabel="Reabrir en producción"
        onPrimaryAction={reopenProduction}
      />
    </div>
  );
}
