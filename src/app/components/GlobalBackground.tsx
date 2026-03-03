import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";

export function GlobalBackground() {
    const { scrollY, scrollYProgress } = useScroll();
    const [windowHeight, setWindowHeight] = useState(1000);

    useEffect(() => {
        setWindowHeight(window.innerHeight);
        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Parallax gradient orbs that react to global scroll
    // As the user scrolls down, the orbs shift position and change color slightly
    const yOrb1 = useTransform(scrollY, [0, windowHeight * 5], [0, 800]);
    const yOrb2 = useTransform(scrollY, [0, windowHeight * 5], [0, -600]);

    const opacityGradient = useTransform(scrollY, [0, windowHeight], [0.8, 0.3]);

    // Kinetic finale acceleration near the bottom CTA/Footer
    const rotateFinale = useTransform(scrollYProgress, [0.8, 1], [0, 180]);
    const scaleFinale = useTransform(scrollYProgress, [0.85, 1], [1, 1.4]);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-black pointer-events-none">
            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none z-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Dynamic gradients that shift with scroll to make it feel "alive" but unified */}
            <motion.div
                style={{ y: yOrb1, opacity: opacityGradient, rotate: rotateFinale, scale: scaleFinale }}
                className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-zinc-800/20 to-transparent blur-[120px]"
            />

            <motion.div
                style={{ y: yOrb2, rotate: rotateFinale }}
                className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-zinc-900/40 to-transparent blur-[100px]"
            />

            <motion.div
                style={{ scale: scaleFinale }}
                className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[50vw] rounded-full bg-gradient-to-t from-zinc-800/30 to-transparent blur-[150px]"
            />
        </div>
    );
}
