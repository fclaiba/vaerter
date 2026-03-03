import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenQuote?: () => void;
}

export function Navbar({ onOpenQuote }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Super simple active section tracking
      const sections = ["hero", "value-prop", "materials", "process", "contact"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#hero", id: "hero" },
    { name: "Servicios", href: "#value-prop", id: "value-prop" },
    { name: "Materiales", href: "#materials", id: "materials" },
    { name: "Proceso", href: "#process", id: "process" },
    { name: "Contacto", href: "#contact", id: "contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out pt-4 px-4 sm:px-6 md:px-8`}
      >
        <div
          className={`mx-auto max-w-7xl transition-all duration-500 ${isScrolled
              ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full py-3 px-6"
              : "bg-transparent border-transparent py-4 px-2"
            }`}
        >
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-black font-black text-xl leading-none">V</span>
              </div>
              <span className={`text-xl font-bold tracking-tighter ${isScrolled ? 'text-white' : 'text-white'} transition-colors`}>
                VAERTER
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveSection(link.id)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive
                        ? "text-black"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-pill"
                        className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              {onOpenQuote && (
                <button
                  onClick={onOpenQuote}
                  className="hidden md:inline-flex px-5 py-2 text-sm font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all"
                >
                  Cotizar
                </button>
              )}
              <button
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden bg-black/95 backdrop-blur-3xl pt-28 px-6 pb-6 flex flex-col"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`text-3xl font-bold tracking-tighter p-4 rounded-2xl transition-all ${isActive ? "bg-white text-black" : "text-white/60 active:bg-white/10"
                      }`}
                    onClick={() => {
                      setActiveSection(link.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
            </div>

            {onOpenQuote && (
              <div className="mt-auto pt-8">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-2xl"
                >
                  Cotizar Proyecto
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
