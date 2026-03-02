import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface NavbarProps {
  onOpenQuote: () => void;
}

export function Navbar({ onOpenQuote }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const blur = useTransform(scrollY, [0, 100], [0, 12]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-black/80 backdrop-blur-xl border-white/10" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tighter text-white">
          VAERTER
        </a>

        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#retail">Minorista</NavLink>
          <NavLink href="#wholesale">Mayorista</NavLink>
          <NavLink href="#materials">Materiales</NavLink>
          <NavLink href="#process">Proceso</NavLink>
          <button 
            onClick={onOpenQuote}
            className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
          >
            Cotizar
          </button>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
        >
          <MobileNavLink onClick={() => setMobileMenuOpen(false)} href="#retail">Minorista</MobileNavLink>
          <MobileNavLink onClick={() => setMobileMenuOpen(false)} href="#wholesale">Mayorista</MobileNavLink>
          <MobileNavLink onClick={() => setMobileMenuOpen(false)} href="#materials">Materiales</MobileNavLink>
          <MobileNavLink onClick={() => setMobileMenuOpen(false)} href="#process">Proceso</MobileNavLink>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuote();
            }}
            className="w-full py-3 bg-white text-black font-medium rounded-lg mt-2"
          >
            Cotizar Proyecto
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className="text-lg font-medium text-gray-300 block py-2 border-b border-white/5"
    >
      {children}
    </a>
  );
}
