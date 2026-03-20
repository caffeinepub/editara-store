import { useEffect, useRef } from "react";

interface ServicesProps {
  openPaymentModal: (name: string, amount: number) => void;
}

const services = [
  {
    icon: "🤖",
    name: "AI Chatbot",
    price: 299,
    badge: "🔥 Most Popular",
    badgeColor: "#EF4444",
    gradient: "linear-gradient(135deg, #5B21B6, #7C3AED)",
    features: [
      "24/7 customer support",
      "WhatsApp integration",
      "Website integration",
      "Instagram integration",
    ],
  },
  {
    icon: "💬",
    name: "WhatsApp Bot",
    price: 499,
    badge: "⭐ Best for Shops",
    badgeColor: "#16A34A",
    gradient: "linear-gradient(135deg, #16A34A, #15803D)",
    features: [
      "Auto-reply 24/7",
      "Order taking automation",
      "Payment reminders",
      "Customer follow-up",
    ],
  },
  {
    icon: "🌐",
    name: "1-Page Website",
    price: 999,
    badge: "📱 Mobile Ready",
    badgeColor: "#3B82F6",
    gradient: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
    features: [
      "Mobile responsive",
      "WhatsApp CTA button",
      "Contact form",
      "Fast loading",
    ],
  },
  {
    icon: "🗺️",
    name: "Google Maps Listing",
    price: 150,
    badge: "🆕 New! Best Price",
    badgeColor: "#0891B2",
    gradient: "linear-gradient(135deg, #0891B2, #16A34A)",
    features: [
      "Add to Google Maps",
      "Location pin setup",
      "Business hours",
      "Photo gallery",
    ],
  },
  {
    icon: "🎨",
    name: "AI Logo Design",
    price: 299,
    badge: "🎨 Trending",
    badgeColor: "#D97706",
    gradient: "linear-gradient(135deg, #D97706, #F59E0B)",
    features: [
      "10 unique options",
      "Multiple formats",
      "Commercial rights",
      "Source files included",
    ],
  },
  {
    icon: "📝",
    name: "AI Content 30 Posts",
    price: 499,
    badge: "✍️ Ready to Post",
    badgeColor: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #C4B5FD)",
    features: [
      "30 captions + hashtags",
      "Ready to post",
      "All platforms",
      "Brand voice match",
    ],
  },
];

export default function Services({ openPaymentModal }: ServicesProps) {
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
      id="services"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white mb-3">
            ⚡ Choose Your Service
          </h2>
          <p className="text-gray-400 text-base">
            Pay once, own forever. Start in 24 hours.
          </p>
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg, #5B21B6, #3B82F6)" }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={service.name}
              className="glass-card rounded-2xl p-6 relative overflow-hidden reveal"
              data-ocid={`services.item.${idx + 1}`}
            >
              {/* Badge */}
              <div
                className="absolute top-4 right-4 badge-pill text-white"
                style={{ background: service.badgeColor }}
              >
                {service.badge}
              </div>

              {/* Top gradient bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: service.gradient }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4"
                style={{ background: "rgba(139, 92, 246, 0.15)" }}
              >
                {service.icon}
              </div>

              <h3 className="text-lg font-bold font-heading text-white mb-1">
                {service.name}
              </h3>

              <div
                className="text-3xl font-black price-mono mb-4"
                style={{
                  background: service.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ₹{service.price}
              </div>

              <ul className="space-y-1.5 mb-6">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <span className="text-green-400 text-xs">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                data-ocid={`services.primary_button.${idx + 1}`}
                onClick={() => openPaymentModal(service.name, service.price)}
                className="w-full py-3 rounded-xl font-bold text-sm text-white glow-btn transition-all duration-300"
              >
                Buy Now — ₹{service.price}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
