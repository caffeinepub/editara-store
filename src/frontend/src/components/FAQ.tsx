import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    q: "How do I pay via UPI?",
    a: "Click any 'Buy Now' button → A payment modal opens → Scan the QR or copy the UPI ID → Complete payment in Google Pay, PhonePe, or Paytm → Send screenshot on WhatsApp to confirm.",
  },
  {
    q: "When does work start after payment?",
    a: "Work begins within 1 hour of receiving your payment confirmation screenshot on WhatsApp. Your service is delivered within 24 hours, guaranteed.",
  },
  {
    q: "What support do I get after purchase?",
    a: "Every purchase includes 30 days of free WhatsApp support. Just message us anytime at +91 77158 04457 and we'll help you out.",
  },
  {
    q: "Can I customize the service?",
    a: "Yes! All services include one free customization request. Just tell us your requirements when placing the order. Additional changes may be charged separately.",
  },
  {
    q: "What is the refund policy?",
    a: "We offer a full refund if work hasn't started within 24 hours of payment confirmation. Once work is delivered, refunds are not available. We guarantee quality in every delivery.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("visible");
        }
      },
      { threshold: 0.1 },
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    if (elements) {
      for (const el of elements) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(180deg, transparent, rgba(91,33,182,0.05) 50%, transparent)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white mb-3">
            ❓ Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Everything you need to know before buying.
          </p>
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg, #8B5CF6, #3B82F6)" }}
          />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              className="rounded-xl overflow-hidden reveal"
              style={{
                background: "rgba(20,15,40,0.9)",
                border:
                  open === idx
                    ? "1px solid rgba(139,92,246,0.5)"
                    : "1px solid rgba(139,92,246,0.2)",
                transition: "border-color 0.3s ease",
              }}
              data-ocid={`faq.item.${idx + 1}`}
            >
              <button
                type="button"
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(open === idx ? null : idx)}
                data-ocid={`faq.toggle.${idx + 1}`}
              >
                <span className="text-sm font-semibold text-white pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className="flex-shrink-0 text-purple-400 transition-transform duration-300"
                  style={{
                    transform: open === idx ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              <div
                style={{
                  maxHeight: open === idx ? "300px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <p className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
