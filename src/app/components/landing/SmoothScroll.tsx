import React, { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Native desktop only, ignore mobile touch devices for better performance
        if (typeof window !== "undefined" && !window.matchMedia("(pointer: coarse)").matches) {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like easing
            });

            function raf(time: number) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);

            return () => {
                lenis.destroy();
            };
        }
    }, []);

    return <>{children}</>;
}
