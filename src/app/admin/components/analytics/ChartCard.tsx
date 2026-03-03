import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col h-full">
      <header className="mb-6">
        <h3 className="font-bold text-zinc-100 text-lg tracking-tight">{title}</h3>
        {description && <p className="text-xs font-medium text-zinc-400 mt-1.5">{description}</p>}
      </header>
      <div className="h-[280px] w-full mt-auto">{children}</div>
    </section>
  );
}
