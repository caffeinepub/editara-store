import { useEffect, useRef } from "react";

const features = [
  {
    icon: "🚀",
    title: "Ultra Affordable",
    desc: "Starting from ₹49. No hidden costs, no subscriptions. Pay once, own forever.",
    color: "#5B21B6",
  },
  {
    icon: "⚡",
    title: "24-Hour Delivery",
    desc: "Get your service delivered within 24 hours of payment confirmation.",
    color: "#3B82F6",
  },
  {
    icon: "📞",
    title: "WhatsApp Support",
    desc: "Free 30 days of WhatsApp support after every purchase. We're always there.",
    color: "#16A34A",
  },
  {
    icon: "🎯",
    title: "Made for India",
    desc: "Designed specifically for Indian shops, coaching classes, and small businesses.",
    color: "#D97706",
  },
];

export default function WhyEditara() {
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
          "linear-gradient(180deg, transparent, rgba(59,130,246,0.04) 50%, transparent)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white mb-3">
            Why 500+ Businesses Trust Editara
          </h2>
          <p className="text-gray-400">
            Affordable, fast, and reliable — built for Indian entrepreneurs.
          </p>
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg, #3B82F6, #5B21B6)" }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={feat.title}
              className="glass-card rounded-2xl p-6 text-center reveal"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
                style={{
                  background: `${feat.color}20`,
                  boxShadow: `0 0 20px ${feat.color}30`,
                }}
              >
                {feat.icon}
              </div>
              <h3 className="text-base font-bold font-heading text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
