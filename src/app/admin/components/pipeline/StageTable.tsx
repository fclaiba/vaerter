import { formatCurrency, formatShortDate, type CustomerCase } from "@/app/admin/domain/crm";

interface StageTableProps {
  title: string;
  description: string;
  rows: CustomerCase[];
  actionLabel: string;
  onPrimaryAction: (id: string) => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: (id: string) => void;
}

export default function StageTable({
  title,
  description,
  rows,
  actionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
}: StageTableProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
      <header className="mb-6">
        <h3 className="font-semibold text-lg text-zinc-100 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{title}</h3>
        <p className="text-sm text-zinc-400 mt-1">{description}</p>
      </header>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-zinc-500 text-xs uppercase tracking-wider font-medium border-b border-white/10">
            <tr>
              <th className="text-left py-3 px-2">Cliente</th>
              <th className="text-left py-3 px-2">Proyecto</th>
              <th className="text-left py-3 px-2">Cantidad</th>
              <th className="text-left py-3 px-2">Valor</th>
              <th className="text-left py-3 px-2">Último contacto</th>
              <th className="text-right py-3 px-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td className="py-8 text-zinc-500 text-center" colSpan={6}>
                  No hay registros en esta etapa.
                </td>
              </tr>
            )}
            {rows.map((item) => (
              <tr key={item.id} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors group">
                <td className="py-4 px-2">
                  <p className="font-medium text-zinc-200 group-hover:text-white transition-colors">{item.name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{item.email}</p>
                </td>
                <td className="py-4 px-2 text-zinc-300 font-medium">{item.product}</td>
                <td className="py-4 px-2 text-zinc-400">
                  <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-md text-xs">{item.quantity}</span>
                </td>
                <td className="py-4 px-2 text-zinc-300 font-medium">{formatCurrency(item.estimatedValue)}</td>
                <td className="py-4 px-2 text-zinc-500 text-xs">{formatShortDate(item.lastContactedAt)}</td>
                <td className="py-4 px-2">
                  <div className="flex justify-end gap-2">
                    {secondaryActionLabel && onSecondaryAction && (
                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-all text-xs font-medium"
                        onClick={() => onSecondaryAction(item.id)}
                      >
                        {secondaryActionLabel}
                      </button>
                    )}
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 transition-all text-xs font-semibold shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                      onClick={() => onPrimaryAction(item.id)}
                    >
                      {actionLabel}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
