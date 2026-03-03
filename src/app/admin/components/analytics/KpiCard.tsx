interface KpiCardProps {
  label: string;
  value: string;
  hint?: string;
}

export default function KpiCard({ label, value, hint }: KpiCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group h-full">
      <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-300 transition-colors">{label}</p>
      <p className="text-3xl font-bold tracking-tight text-white mt-1.5">{value}</p>
      {hint && <p className="text-[10px] font-semibold text-zinc-500 mt-2">{hint}</p>}
    </article>
  );
}
