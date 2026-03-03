import {
  canMoveBackward,
  canMoveForward,
  formatCurrency,
  formatShortDate,
  stageProgressPercent,
  type CustomerCase,
} from "@/app/admin/domain/crm";

interface KanbanCardProps {
  item: CustomerCase;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onMoveBackward: (id: string) => void;
  onMoveForward: (id: string) => void;
}

export default function KanbanCard({
  item,
  isSelected,
  onSelect,
  onMoveBackward,
  onMoveForward,
}: KanbanCardProps) {
  const priorityClass =
    item.priority === "high"
      ? "text-red-300 bg-red-500/10 border-red-400/30"
      : item.priority === "medium"
        ? "text-amber-300 bg-amber-500/10 border-amber-400/30"
        : "text-emerald-300 bg-emerald-500/10 border-emerald-400/30";

  return (
    <article
      className={`rounded-xl border p-4 space-y-4 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${isSelected
          ? "border-white/30 bg-white/10 ring-1 ring-white/20"
          : "border-white/10 bg-black/20 hover:bg-black/40 hover:border-white/20"
        }`}
      onClick={() => onSelect(item.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onSelect(item.id);
        }
      }}
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          <h4 className="font-bold text-zinc-100 tracking-tight leading-tight">{item.name}</h4>
          <p className="text-xs font-medium text-zinc-400 mt-0.5">{item.product}</p>
        </div>
        <span
          className={`text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 rounded-md shadow-sm ${priorityClass}`}
        >
          {item.priority}
        </span>
      </div>

      <div className="text-[11px] font-medium text-zinc-400 space-y-1 bg-black/20 p-2.5 rounded-lg border border-white/5">
        <p className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-zinc-600"></span>{item.email}</p>
        <p className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-zinc-600"></span><span className="text-zinc-300 font-semibold">{item.quantity} un.</span> · {formatCurrency(item.estimatedValue)}</p>
        <p className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-zinc-600"></span>Ult. contacto: {formatShortDate(item.lastContactedAt)}</p>
      </div>

      <div className="pt-1">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
          <span>Progreso</span>
          <span>{stageProgressPercent(item.stage)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-black/40 overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-zinc-500 to-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-500 ease-out"
            style={{ width: `${stageProgressPercent(item.stage)}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-2 pt-2 border-t border-white/5">
        <button
          type="button"
          disabled={!canMoveBackward(item.stage)}
          onClick={(event) => {
            event.stopPropagation();
            onMoveBackward(item.id);
          }}
          className="text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-md border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5 transition-colors"
        >
          Atrás
        </button>
        <button
          type="button"
          disabled={!canMoveForward(item.stage)}
          onClick={(event) => {
            event.stopPropagation();
            onMoveForward(item.id);
          }}
          className="text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-md bg-white text-black hover:bg-zinc-200 disabled:opacity-30 shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
        >
          Sig.
        </button>
      </div>
    </article>
  );
}
