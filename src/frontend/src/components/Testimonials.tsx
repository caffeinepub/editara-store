import { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "Kirana Store, Mumbai",
    quote:
      "The WhatsApp bot brought us 20+ extra orders every week! Editara is absolutely amazing. Best investment for my shop.",
    initials: "RK",
    color: "#5B21B6",
    service: "WhatsApp Bot",
  },
  {
    name: "Priya Sharma",
    company: "Coaching Classes, Pune",
    quote:
      "My AI chatbot answers student queries 24/7. It saves me 10 hours every single week. Completely worth it!",
    initials: "PS",
    color: "#3B82F6",
    service: "AI Chatbot",
  },
  {
    name: "Amit Patel",
    company: "MSME Owner, Ahmedabad",
    quote:
      "After the Google Maps listing, new customers started finding us online. 100% worth it — wish I'd done it sooner!",
    initials: "AP",
    color: "#D97706",
    service: "Google Maps Listing",
  },
];

export default function Testimonials() {
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
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white mb-3">
            ⭐ Real Results from Real Businesses
          </h2>
          <p className="text-gray-400">
            Trusted by shopkeepers, coaches, and entrepreneurs across India.
          </p>
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg, #F59E0B, #EF4444)" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={t.name}
              className="glass-card rounded-2xl p-6 reveal"
              style={{ transitionDelay: `${idx * 0.15}s` }}
              data-ocid={`testimonials.item.${idx + 1}`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: stars have no meaningful key
                  <span key={i} className="text-yellow-400 text-sm">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
                    boxShadow: `0 0 15px ${t.color}50`,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.company}</p>
                </div>
                <div className="ml-auto">
                  <span
                    className="badge-pill text-white"
                    style={{
                      background: "rgba(139,92,246,0.3)",
                      border: "1px solid rgba(139,92,246,0.4)",
                    }}
                  >
                    {t.service}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
