import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only apply on non-touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        // Hide default cursor across the entire document
        document.body.style.cursor = "none";

        // Add a global class to ensure custom cursor styles apply deeply
        document.body.classList.add("custom-cursor-active");

        const updateMousePosition = (e: MouseEvent) => {
            // Show cursor when inside window bounds
            if (e.clientX > 0 && e.clientY > 0 && e.clientX < window.innerWidth && e.clientY < window.innerHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if we are hovering a clickable element
            if (
                target.tagName.toLowerCase() === "button" ||
                target.tagName.toLowerCase() === "a" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("cursor-pointer") ||
                target.closest(".cursor-pointer") ||
                getComputedStyle(target).cursor === "pointer"
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            document.removeEventListener("mouseover", handleMouseOver);
            document.body.style.cursor = "auto";
            document.body.classList.remove("custom-cursor-active");
        };
    }, []);

    // Use inline styles to forcefully hide the native mouse when the component mounts
    // if we happen to miss any custom overrides
    return (
        <>
            <style>{`
        body.custom-cursor-active * {
          cursor: none !important;
        }
      `}</style>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                    scale: !isVisible ? 0 : isHovering ? 4 : 1,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            />
            {/* Outer subtle ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/30 pointer-events-none z-[9998] hidden md:block mix-blend-difference"
                animate={{
                    x: mousePosition.x - 20,
                    y: mousePosition.y - 20,
                    scale: !isVisible ? 0 : isHovering ? 0 : 1,
                    opacity: !isVisible ? 0 : isHovering ? 0 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 20,
                    mass: 0.8,
                }}
            />
        </>
    );
}
