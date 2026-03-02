import { useState } from "react";
import { Toaster } from "sonner";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustTicker } from "./components/TrustTicker";
import { DualSector } from "./components/DualSector";
import { MaterialsShowcase } from "./components/MaterialsShowcase";
import { ProcessSteps } from "./components/ProcessSteps";
import { Footer } from "./components/Footer";
import { QuoteModal } from "./components/modals/QuoteModal";
import { MaterialDetailModal, MaterialType } from "./components/modals/MaterialDetailModal";
import { SectorDetailModal, SectorType } from "./components/modals/SectorDetailModal";

export default function App() {
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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
      <Toaster theme="dark" position="top-center" />
      
      <Navbar onOpenQuote={handleOpenQuote} />
      
      <main>
        <Hero 
          onOpenQuote={handleOpenQuote} 
          onOpenWholesale={handleOpenWholesale} 
        />
        <TrustTicker />
        <DualSector 
          onOpenRetail={handleOpenRetail} 
          onOpenWholesale={handleOpenWholesale} 
        />
        <MaterialsShowcase onSelectMaterial={handleSelectMaterial} />
        <ProcessSteps />
      </main>
      
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
  );
}
