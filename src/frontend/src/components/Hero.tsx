import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface HeroProps {
  openPaymentModal: (name: string, amount: number) => void;
}

const TYPEWRITER_LINES = [
  "Buy. Pay via UPI. Start Growing in Under 1 Hour.",
  "Affordable AI for Every Indian Business.",
  "24-Hour Delivery. No Hidden Costs.",
];

const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 13 + 11) % 100}%`,
  size: `${(i % 4) + 3}px`,
  opacity: 0.15 + (i % 4) * 0.08,
  delay: `${(i % 5) * 1.2}s`,
  duration: `${5 + (i % 4)}s`,
}));

export default function Hero({ openPaymentModal }: HeroProps) {
  const [typeText, setTypeText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [countersVisible, setCountersVisible] = useState(false);
  const [clientCount, setClientCount] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = TYPEWRITER_LINES[lineIndex];
    const speed = isDeleting ? 40 : 60;
    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setTypeText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else if (!isDeleting && charIndex === current.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex > 0) {
        setTypeText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else {
        setIsDeleting(false);
        setLineIndex((l) => (l + 1) % TYPEWRITER_LINES.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, lineIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCountersVisible(true);
      },
      { threshold: 0.5 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!countersVisible) return;
    let count = 0;
    const interval = setInterval(() => {
      count += 10;
      setClientCount(Math.min(count, 500));
      if (count >= 500) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [countersVisible]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center hero-bg"
    >
      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-float"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background:
                p.id % 3 === 0
                  ? "rgba(139, 92, 246, 0.6)"
                  : p.id % 3 === 1
                    ? "rgba(59, 130, 246, 0.5)"
                    : "rgba(245, 158, 11, 0.4)",
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div
        className="absolute top-20 left-10 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(91, 33, 182, 0.25), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
          style={{
            background: "rgba(91, 33, 182, 0.2)",
            border: "1px solid rgba(139, 92, 246, 0.4)",
            color: "#C4B5FD",
          }}
        >
          🇮🇳 Trusted by 500+ Indian Businesses · Starting at ₹49
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading leading-tight mb-6">
          <span className="text-white">✨ AI-Powered</span>{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #3B82F6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Digital Solutions
          </span>
          <br />
          <span className="text-white">for </span>
          <span
            className="animate-pulse-gold"
            style={{
              background: "linear-gradient(135deg, #F59E0B, #F97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Indian Businesses
          </span>
        </h1>

        {/* Typewriter */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-10">
          <p
            className="text-base sm:text-xl text-gray-300 font-medium"
            style={{ minHeight: "1.5em" }}
          >
            {typeText}
            <span
              className="inline-block w-0.5 h-5 ml-1 bg-purple-400 animate-pulse"
              style={{ verticalAlign: "middle" }}
            />
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={() => {
              const el = document.querySelector("#services");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-full text-white font-bold text-base glow-btn"
          >
            ✨ Browse Services
          </button>
          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={() => openPaymentModal("Custom Service", 299)}
            className="px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:bg-purple-900/30"
            style={{
              border: "2px solid rgba(139, 92, 246, 0.6)",
              color: "#C4B5FD",
            }}
          >
            💳 Pay with UPI
          </button>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
        >
          <div className="text-center">
            <div
              className="text-3xl font-black font-heading"
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {clientCount}+
            </div>
            <div className="text-xs text-gray-400 mt-1">Happy Clients</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-gray-700" />
          <div className="text-center">
            <div
              className="text-3xl font-black font-heading animate-pulse-gold"
              style={{
                background: "linear-gradient(135deg, #F59E0B, #F97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ₹49
            </div>
            <div className="text-xs text-gray-400 mt-1">Starting Price</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-gray-700" />
          <div className="text-center">
            <div
              className="text-3xl font-black font-heading"
              style={{
                background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              24hr
            </div>
            <div className="text-xs text-gray-400 mt-1">Delivery</div>
          </div>
        </div>
      </div>

      {/* Scroll arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 animate-scroll-bounce">
        <ChevronDown size={28} />
      </div>
    </section>
  );
}
