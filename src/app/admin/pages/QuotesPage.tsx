import { useMemo, useState } from "react";
import { toast } from "sonner";
import StageTable from "@/app/admin/components/pipeline/StageTable";
import { advanceCase, getCrmStore, revertCase } from "@/app/admin/data/localCrmRepository";

export default function QuotesPage() {
  const [store, setStore] = useState(getCrmStore());

  const quotes = useMemo(
    () => store.cases.filter((item) => item.stage === "quote"),
    [store.cases],
  );

  const approve = (id: string) => {
    setStore(advanceCase(id));
    toast.success("Cotizacion aprobada", {
      description: "Se genero el pedido comercial.",
    });
  };

  const returnToLead = (id: string) => {
    setStore(revertCase(id));
    toast.message("Cotizacion devuelta a lead");
  };

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      <header>
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Cotizaciones</h2>
        <p className="text-zinc-400 mt-2 font-medium">
          Emisión, seguimiento y aprobación de propuestas económicas.
        </p>
      </header>

      <StageTable
        title="Cotizaciones Activas"
        description="Gestión de propuestas en revisión comercial."
        rows={quotes}
        actionLabel="Aprobar a pedido"
        onPrimaryAction={approve}
        secondaryActionLabel="Volver a lead"
        onSecondaryAction={returnToLead}
      />
    </div>
  );
}
