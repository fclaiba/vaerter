import { useState } from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { ScrollTextReveal } from "../components/ScrollTextReveal";
import { TrustTicker } from "../components/TrustTicker";
import { DualSector } from "../components/DualSector";
import { MaterialsShowcase } from "../components/MaterialsShowcase";
import { StickyFeatures } from "../components/StickyFeatures";
import { Footer } from "../components/Footer";
import { CtaSection } from "../components/CtaSection";
import { QuoteModal } from "../components/modals/QuoteModal";
import { MaterialDetailModal, MaterialType } from "../components/modals/MaterialDetailModal";
import { SectorDetailModal, SectorType } from "../components/modals/SectorDetailModal";
import { GlobalBackground } from "../components/GlobalBackground";
import { Testimonials } from "../components/Testimonials";
import { PerformanceSpecs } from "../components/PerformanceSpecs";
import { SmoothScroll } from "../components/landing/SmoothScroll";
import { Preloader } from "../components/landing/Preloader";
import { CustomCursor } from "../components/landing/CustomCursor";

export default function LandingPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>(null);
  const [selectedSector, setSelectedSector] = useState<SectorType>(null);

  const handleOpenQuote = () => setIsQuoteOpen(true);
  const handleCloseQuote = () => setIsQuoteOpen(false);

  const handleOpenRetail = () => setSelectedSector("retail");
  const handleOpenWholesale = () => setSelectedSector("wholesale");
  const handleCloseSector = () => setSelectedSector(null);

  const handleSelectMaterial = (mat: MaterialType) => setSelectedMaterial(mat);
  const handleCloseMaterial = () => setSelectedMaterial(null);

  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <div className="min-h-screen bg-transparent text-white font-sans selection:bg-white/20">
        <GlobalBackground />
        <Navbar onOpenQuote={handleOpenQuote} />

        <main className="flex flex-col gap-32 md:gap-48 lg:gap-64 pb-32 md:pb-48 pt-20">
          <Hero
            onOpenQuote={handleOpenQuote}
            onOpenWholesale={handleOpenWholesale}
          />

          {/* Ambient Video / Showreel Section */}
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#111] border border-white/5 shadow-2xl">
              <motion.img
                animate={{ scale: [1.05, 1.15, 1.05], x: ["0%", "-1%", "0%"], y: ["0%", "-1%", "0%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                src="https://images.unsplash.com/photo-1589375769589-dd309bab3556?q=80&w=2560&auto=format&fit=crop"
                alt="Showreel Corporativo"
                className="absolute inset-0 w-full h-full object-cover opacity-[0.45] mix-blend-luminosity filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute inset-0 bg-black/20" /> {/* Subtle dimming */}
            </div>
          </div>

          <ScrollTextReveal text="Donde la precisión se encuentra con la innovación. Creamos soluciones y materializamos tus ideas en el mundo físico superando los límites de la fabricación tradicional." />

          <PerformanceSpecs />

          <DualSector
            onOpenRetail={handleOpenRetail}
            onOpenWholesale={handleOpenWholesale}
          />
          <MaterialsShowcase onSelectMaterial={handleSelectMaterial} />

          <Testimonials />

          <StickyFeatures />
        </main>

        <CtaSection onOpenQuote={handleOpenQuote} />

        <Footer />

        {/* Modals */}
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={handleCloseQuote}
        />

        <MaterialDetailModal
          isOpen={!!selectedMaterial}
          material={selectedMaterial}
          onClose={handleCloseMaterial}
        />

        <SectorDetailModal
          isOpen={!!selectedSector}
          sector={selectedSector}
          onClose={handleCloseSector}
          onQuote={handleOpenQuote}
        />
      </div>
    </SmoothScroll>
  );
}
