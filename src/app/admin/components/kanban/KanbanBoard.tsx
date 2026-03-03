import {
  getStageLabel,
  stageMeta,
  type CustomerCase,
  type CustomerStage,
} from "@/app/admin/domain/crm";
import KanbanCard from "@/app/admin/components/kanban/KanbanCard";

interface KanbanBoardProps {
  items: CustomerCase[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onMoveBackward: (id: string) => void;
  onMoveForward: (id: string) => void;
}

function groupByStage(items: CustomerCase[]): Record<CustomerStage, CustomerCase[]> {
  return {
    lead: items.filter((item) => item.stage === "lead"),
    quote: items.filter((item) => item.stage === "quote"),
    order: items.filter((item) => item.stage === "order"),
    production: items.filter((item) => item.stage === "production"),
    delivery: items.filter((item) => item.stage === "delivery"),
  };
}

export default function KanbanBoard({
  items,
  selectedId,
  onSelect,
  onMoveBackward,
  onMoveForward,
}: KanbanBoardProps) {
  const grouped = groupByStage(items);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
      {stageMeta.map((stage) => (
        <div key={stage.key} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <header className="p-4 border-b border-white/10 bg-black/20 rounded-t-2xl">
            <div className="flex justify-between items-center gap-2">
              <h3 className="font-bold text-zinc-100 uppercase tracking-wide text-sm">{getStageLabel(stage.key)}</h3>
              <span className="text-xs font-bold bg-white/10 text-white px-2.5 py-1 rounded-full shadow-inner">
                {grouped[stage.key].length}
              </span>
            </div>
            <p className="text-xs font-medium text-zinc-400 mt-1.5">{stage.description}</p>
          </header>

          <div className="p-3 space-y-3 max-h-[68vh] overflow-y-auto custom-scrollbar">
            {grouped[stage.key].length === 0 && (
              <div className="rounded-xl border-2 border-dashed border-white/10 p-6 text-center text-xs font-medium text-zinc-500 bg-black/10">
                Sin casos en esta columna.
              </div>
            )}
            {grouped[stage.key].map((item) => (
              <KanbanCard
                key={item.id}
                item={item}
                isSelected={item.id === selectedId}
                onSelect={onSelect}
                onMoveBackward={onMoveBackward}
                onMoveForward={onMoveForward}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
