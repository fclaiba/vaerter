import { useMemo, useState } from "react";
import { toast } from "sonner";
import StageTable from "@/app/admin/components/pipeline/StageTable";
import { advanceCase, getCrmStore, revertCase } from "@/app/admin/data/localCrmRepository";

export default function ProductionPage() {
  const [store, setStore] = useState(getCrmStore());

  const productions = useMemo(
    () => store.cases.filter((item) => item.stage === "production"),
    [store.cases],
  );

  const markDelivery = (id: string) => {
    setStore(advanceCase(id));
    toast.success("Produccion finalizada", {
      description: "Caso movido a etapa de entrega.",
    });
  };

  const backToOrder = (id: string) => {
    setStore(revertCase(id));
    toast.message("Caso devuelto a pedido");
  };

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      <header>
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Producción</h2>
        <p className="text-zinc-400 mt-2 font-medium">
          Monitoreo de lotes en fabricación y control operativo.
        </p>
      </header>

      <StageTable
        title="Producción Activa"
        description="Pedidos en proceso de fabricación, pruebas y terminación."
        rows={productions}
        actionLabel="Enviar a entrega"
        onPrimaryAction={markDelivery}
        secondaryActionLabel="Volver a pedido"
        onSecondaryAction={backToOrder}
      />
    </div>
  );
}
