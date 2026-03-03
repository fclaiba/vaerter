import { Zap, PackageCheck, Palette, MapPin } from "lucide-react";

const badges = [
  { icon: Zap, text: "Calidad Premium Asegurada", color: "text-amber-400" },
  { icon: PackageCheck, text: "Minorista y Mayorista", color: "text-blue-400" },
  { icon: Palette, text: "Filamentos Industriales", color: "text-purple-400" },
  { icon: MapPin, text: "Envíos a todo el país", color: "text-emerald-400" },
];

export function TrustBadges() {
  return (
    <section className="bg-black py-4 border-b border-white/[0.05] overflow-hidden flex relative z-20">

      {/* Left/Right Fade out Gradients */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling track */}
      <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
        {/* We map the array 3 times to create the infinite loop effect seamlessly */}
        {[...Array(3)].map((_, arrayIndex) => (
          <div key={`array-${arrayIndex}`} className="flex shrink-0 items-center justify-around gap-12 px-6">
            {badges.map((badge, index) => (
              <div
                key={`badge-${arrayIndex}-${index}`}
                className="flex items-center gap-3 py-3 px-6 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-md cursor-default pointer-events-none"
              >
                <badge.icon className={`w-4 h-4 ${badge.color}`} strokeWidth={2.5} />
                <span className="text-sm font-semibold tracking-wide text-zinc-300 uppercase">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
