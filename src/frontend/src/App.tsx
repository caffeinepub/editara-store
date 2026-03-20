import { Toaster } from "@/components/ui/sonner";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import Combos from "./components/Combos";
import FAQ from "./components/FAQ";
import FloatingElements from "./components/FloatingElements";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PaymentModal from "./components/PaymentModal";
import PriceComparison from "./components/PriceComparison";
import Services from "./components/Services";
import SocialConnect from "./components/SocialConnect";
import Testimonials from "./components/Testimonials";
import WhyEditara from "./components/WhyEditara";

export interface ModalState {
  isOpen: boolean;
  serviceName: string;
  amount: number;
  step: 1 | 2 | 3;
  txnId: string;
}

export default function App() {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    serviceName: "",
    amount: 0,
    step: 1,
    txnId: "",
  });

  const openPaymentModal = useCallback(
    (serviceName: string, amount: number) => {
      setModal({ isOpen: true, serviceName, amount, step: 1, txnId: "" });
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false, step: 1, txnId: "" }));
  }, []);

  const copyUPI = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("7715804457@fam");
      toast.success("✅ Copied! UPI ID copied to clipboard.");
    } catch {
      toast.error("Could not copy. Please copy manually.");
    }
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modal.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal.isOpen]);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <Header copyUPI={copyUPI} />
      <main>
        <Hero openPaymentModal={openPaymentModal} />
        <Services openPaymentModal={openPaymentModal} />
        <Combos openPaymentModal={openPaymentModal} />
        <WhyEditara />
        <PriceComparison openPaymentModal={openPaymentModal} />
        <SocialConnect />
        <Testimonials />
        <FAQ />
      </main>
      <Footer copyUPI={copyUPI} />
      <FloatingElements />
      {modal.isOpen && (
        <PaymentModal
          modal={modal}
          setModal={setModal}
          onClose={closeModal}
          copyUPI={copyUPI}
        />
      )}
    </div>
  );
}
