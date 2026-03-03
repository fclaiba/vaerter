import { Zap, PackageCheck, Palette, MapPin } from "lucide-react";

const badges = [
  { icon: Zap, text: "Calidad Premium Asegurada" },
  { icon: PackageCheck, text: "Minorista y Mayorista" },
  { icon: Palette, text: "Filamentos Industriales" },
  { icon: MapPin, text: "Envíos a todo el país" },
];

export function TrustTicker() {
  return (
    <section className="bg-black py-6 border-b border-white/[0.05] overflow-hidden flex relative z-20">

      {/* Left/Right Fade out Gradients */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling track */}
      <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] whitespace-nowrap items-center">
        {/* We map the array 3 times to create the infinite loop effect seamlessly */}
        {[...Array(3)].map((_, arrayIndex) => (
          <div key={`array-${arrayIndex}`} className="flex shrink-0 items-center justify-around gap-12 px-6">
            {badges.map((badge, index) => (
              <div
                key={`badge-${arrayIndex}-${index}`}
                className="flex items-center gap-3 py-2 px-5 rounded-full bg-[#1c1c1e] border border-white/5 cursor-default pointer-events-none"
              >
                <badge.icon className="w-4 h-4 text-white" strokeWidth={2} />
                <span className="text-sm font-medium tracking-tight text-[#86868b]">
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
