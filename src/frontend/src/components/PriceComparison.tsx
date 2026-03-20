import { useEffect, useRef, useState } from "react";

interface PriceComparisonProps {
  openPaymentModal: (name: string, amount: number) => void;
}

const rows = [
  {
    service: "AI Chatbot",
    market: "₹5,000+",
    editara: "₹299",
    amount: 299,
    discount: "94%",
  },
  {
    service: "Website Design",
    market: "₹10,000+",
    editara: "₹999",
    amount: 999,
    discount: "90%",
  },
  {
    service: "Logo Design",
    market: "₹2,000+",
    editara: "₹299",
    amount: 299,
    discount: "85%",
  },
  {
    service: "Social Media Posts",
    market: "₹5,000+",
    editara: "₹999",
    amount: 999,
    discount: "80%",
  },
  {
    service: "Google Maps Listing",
    market: "₹1,000+",
    editara: "₹150",
    amount: 150,
    discount: "85%",
  },
];

export default function PriceComparison({
  openPaymentModal,
}: PriceComparisonProps) {
  const [barWidth, setBarWidth] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            setBarWidth(85);
          }
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
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white mb-3">
            💰 See How Much You Save
          </h2>
          <p className="text-gray-400">
            Compare Editara prices with market rates
          </p>
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg, #F59E0B, #16A34A)" }}
          />
        </div>

        <div
          className="rounded-2xl overflow-hidden reveal"
          style={{
            background: "rgba(20,15,40,0.9)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(139,92,246,0.25)",
          }}
        >
          <div
            className="grid grid-cols-4 gap-4 px-6 py-4 text-xs font-bold uppercase tracking-wider"
            style={{
              background:
                "linear-gradient(135deg, rgba(91,33,182,0.3), rgba(59,130,246,0.2))",
              borderBottom: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            <div className="text-gray-300">Service</div>
            <div className="text-center text-gray-400">Market Price</div>
            <div className="text-center text-purple-300">Editara Price</div>
            <div className="text-center text-green-400">You Save</div>
          </div>

          {rows.map((row, idx) => (
            <button
              type="button"
              key={row.service}
              className="grid grid-cols-4 gap-4 px-6 py-4 w-full items-center cursor-pointer transition-all duration-200 hover:bg-purple-900/10 text-left"
              style={{
                borderBottom:
                  idx < rows.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
              }}
              data-ocid={`comparison.row.${idx + 1}`}
              onClick={() => openPaymentModal(row.service, row.amount)}
            >
              <div className="text-sm font-semibold text-white">
                {row.service}
              </div>
              <div className="text-center text-sm text-gray-500 line-through">
                {row.market}
              </div>
              <div
                className="text-center text-base font-black price-mono"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {row.editara}
              </div>
              <div className="flex justify-center">
                <span
                  className="badge-pill font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #16A34A, #15803D)",
                  }}
                >
                  {row.discount} off
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 reveal">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-300 font-semibold">
              Our clients save on average
            </span>
            <span
              className="font-black text-xl price-mono"
              style={{
                background: "linear-gradient(135deg, #F59E0B, #F97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              85%
            </span>
          </div>
          <div
            className="h-4 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <div
              className="h-full rounded-full shimmer-bar transition-all duration-[1500ms] ease-out"
              style={{ width: `${barWidth}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Based on industry standard pricing vs Editara rates
          </p>
        </div>
      </div>
    </section>
  );
}
