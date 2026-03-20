import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";

export default function FloatingElements() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* WhatsApp float button (bottom-right) */}
      <a
        href="https://wa.me/917715804457"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group"
        style={{ filter: "drop-shadow(0 4px 15px rgba(37,211,102,0.5))" }}
      >
        <span
          className="wa-label px-3 py-2 rounded-full text-white text-xs font-semibold whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #25D366, #128C7E)",
            boxShadow: "0 4px 15px rgba(37,211,102,0.4)",
          }}
        >
          Chat with us!
        </span>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl"
          style={{
            background: "linear-gradient(135deg, #25D366, #128C7E)",
            boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
          }}
        >
          <SiWhatsapp />
        </div>
      </a>

      {/* Back to top (bottom-left) */}
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          data-ocid="scroll.button"
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #5B21B6, #3B82F6)",
            boxShadow: "0 4px 20px rgba(91,33,182,0.5)",
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
}
