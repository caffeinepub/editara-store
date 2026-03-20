import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  copyUPI: () => void;
}

export default function Header({ copyUPI: _copyUPI }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Combos", href: "#combos" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(15, 10, 30, 0.97)"
          : "rgba(15, 10, 30, 0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(139, 92, 246, 0.3)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-2"
            data-ocid="nav.link"
            onClick={() => handleNavClick("#home")}
          >
            <span
              className="text-2xl font-bold font-heading"
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Editara
            </span>
            <span className="text-xs text-gray-400 hidden sm:block">
              ✨ AI for India
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                data-ocid="nav.link"
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                  style={{
                    background: "linear-gradient(90deg, #8B5CF6, #3B82F6)",
                  }}
                />
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/917715804457"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.primary_button"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #16a34a, #15803d)",
                boxShadow: "0 0 15px rgba(22, 163, 74, 0.4)",
              }}
            >
              <MessageCircle size={15} />
              Chat on WhatsApp
            </a>
            <button
              type="button"
              className="md:hidden p-2 text-gray-300 hover:text-white"
              data-ocid="nav.toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2"
          style={{ background: "rgba(15, 10, 30, 0.98)" }}
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              data-ocid="nav.link"
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left py-3 text-gray-300 hover:text-white border-b border-gray-800 text-sm font-medium"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://wa.me/917715804457"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 justify-center px-4 py-3 rounded-full text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
          >
            <MessageCircle size={15} />
            Chat on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
