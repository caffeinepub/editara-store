import { useEffect, useRef } from "react";

interface CombosProps {
  openPaymentModal: (name: string, amount: number) => void;
}

const combos = [
  {
    icon: "🏪",
    name: "Local Shop Special",
    price: 1499,
    originalPrice: 2196,
    savings: 697,
    badge: "🔥 BEST SELLER",
    badgeColor: "#EF4444",
    gradient: "linear-gradient(135deg, #5B21B6, #DB2777)",
    includes: [
      "1-Page Website",
      "Google Maps Listing",
      "WhatsApp Bot",
      "AI Logo Design",
      "5 Product Photos",
    ],
  },
  {
    icon: "📚",
    name: "Coaching Class Pack",
    price: 2499,
    originalPrice: 3346,
    savings: 847,
    badge: "⭐ MOST POPULAR",
    badgeColor: "#2563EB",
    gradient: "linear-gradient(135deg, #1D4ED8, #0891B2)",
    includes: [
      "3-Page Website",
      "AI Chatbot",
      "10 Social Posts",
      "Google Maps",
      "Automation Setup",
    ],
  },
  {
    icon: "🚀",
    name: "Startup Launch",
    price: 3999,
    originalPrice: 6845,
    savings: 2846,
    badge: "👑 BEST VALUE",
    badgeColor: "#D97706",
    gradient: "linear-gradient(135deg, #D97706, #7C3AED)",
    includes: [
      "5-Page Website",
      "AI Logo Design",
      "20 Social Posts",
      "AI Chatbot",
      "Basic App + Google Maps",
    ],
  },
  {
    icon: "🍽️",
    name: "Restaurant Digital Pack",
    price: 2499,
    originalPrice: 3146,
    savings: 647,
    badge: "🍕 HOT DEAL",
    badgeColor: "#EA580C",
    gradient: "linear-gradient(135deg, #EA580C, #DC2626)",
    includes: [
      "Digital Menu Website",
      "Table Booking Bot",
      "10 Food Photos",
      "Google Maps",
      "10 Social Posts",
    ],
  },
];

export default function Combos({ openPaymentModal }: CombosProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    if (elements) {
      for (const el of elements) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="combos"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(180deg, transparent, rgba(91,33,182,0.06) 50%, transparent)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white mb-3">
            🎁 Best Value Combos
          </h2>
          <p className="text-gray-400 text-base">Bundled savings up to 40%</p>
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg, #F59E0B, #EF4444)" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {combos.map((combo, idx) => (
            <div
              key={combo.name}
              className="relative rounded-2xl p-6 overflow-hidden reveal group"
              data-ocid={`combos.item.${idx + 1}`}
              style={{
                background: "rgba(20, 15, 40, 0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(139, 92, 246, 0.25)",
                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-6px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 20px 60px rgba(139,92,246,0.3)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(139,92,246,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(139, 92, 246, 0.25)";
              }}
            >
              {/* Gradient top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: combo.gradient }}
              />

              {/* Badge */}
              <div
                className="absolute top-4 right-4 badge-pill text-white"
                style={{ background: combo.badgeColor }}
              >
                {combo.badge}
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: "rgba(139, 92, 246, 0.15)" }}
                >
                  {combo.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-white">
                    {combo.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span
                      className="text-3xl font-black price-mono"
                      style={{
                        background: combo.gradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      ₹{combo.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{combo.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span
                      className="badge-pill text-white"
                      style={{ background: "#16A34A" }}
                    >
                      Save ₹{combo.savings}
                    </span>
                  </div>
                </div>
              </div>

              {/* Included items */}
              <div className="mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                  Includes:
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {combo.includes.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-1.5 text-sm text-gray-300"
                    >
                      <span className="text-green-400">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                data-ocid={`combos.primary_button.${idx + 1}`}
                onClick={() => openPaymentModal(combo.name, combo.price)}
                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all duration-300"
                style={{
                  background: combo.gradient,
                  boxShadow: "0 4px 20px rgba(91,33,182,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 8px 30px rgba(91,33,182,0.6)";
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 4px 20px rgba(91,33,182,0.3)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "";
                }}
              >
                Buy Combo — ₹{combo.price.toLocaleString("en-IN")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
