import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface NavbarProps {
  onOpenQuote: () => void;
}

export function Navbar({ onOpenQuote }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Apple's signature blur effect that intensifies on scroll
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        style={{ backgroundColor: navBackground }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "backdrop-blur-[20px] saturate-[1.8] border-b border-white/[0.05]" : "backdrop-blur-none border-b border-transparent"
        )}
      >
        <div className="max-w-[1024px] mx-auto px-4 h-12 flex items-center justify-between">

          {/* Logo (Left aligned like Apple) */}
          <div className="flex-1 flex justify-start">
            <a href="#" className="text-lg font-semibold tracking-tighter text-white/90 hover:text-white transition-colors z-[60]">
              VAERTER
            </a>
          </div>

          {/* Desktop Links (Center aligned, even spacing, micro typography) */}
          <div className="hidden md:flex items-center justify-center gap-10 text-[11px] font-medium tracking-wide">
            <NavLink href="#retail">Minorista</NavLink>
            <NavLink href="#wholesale">Mayorista</NavLink>
            <NavLink href="#materials">Materiales</NavLink>
            <NavLink href="#process">Proceso</NavLink>
          </div>

          {/* CTA & Mobile Trigger (Right aligned) */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="hidden md:block text-[11px] font-medium tracking-wide text-white/80 hover:text-white transition-colors"
            >
              Cotizar
            </button>
            <button
              className="md:hidden text-white/80 p-2 -mr-2 transition-colors hover:text-white relative z-[60]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} className="font-light" /> : <Menu size={20} className="font-light" />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Full screen mobile menu overlay imitating iOS/Apple.com */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-3xl pt-24 px-8 pb-12 overflow-y-auto flex flex-col"
          >
            <div className="flex flex-col gap-6 mt-4">
              <MobileNavLink index={1} onClick={() => setMobileMenuOpen(false)} href="#retail">Minorista</MobileNavLink>
              <MobileNavLink index={2} onClick={() => setMobileMenuOpen(false)} href="#wholesale">Mayorista</MobileNavLink>
              <MobileNavLink index={3} onClick={() => setMobileMenuOpen(false)} href="#materials">Materiales</MobileNavLink>
              <MobileNavLink index={4} onClick={() => setMobileMenuOpen(false)} href="#process">Proceso</MobileNavLink>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="text-left text-3xl font-semibold tracking-tight text-white block py-4 border-b border-white/10"
              >
                Cotizar Proyecto
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-white/80 hover:text-white transition-colors duration-300"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, onClick, children, index }: { href: string; onClick: () => void; children: React.ReactNode; index: number }) {
  return (
    <motion.a
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      href={href}
      onClick={onClick}
      className="text-3xl font-semibold tracking-tight text-[#86868b] hover:text-white block py-4 border-b border-white/10 transition-colors"
    >
      {children}
    </motion.a>
  );
}
