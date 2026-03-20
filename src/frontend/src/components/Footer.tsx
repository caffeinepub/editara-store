import { Copy, Mail, MessageCircle } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiTelegram,
  SiWhatsapp,
  SiX,
} from "react-icons/si";

interface FooterProps {
  copyUPI: () => void;
}

const socials = [
  {
    icon: SiInstagram,
    url: "https://www.instagram.com/editara_official",
    label: "Instagram",
  },
  {
    icon: SiFacebook,
    url: "https://www.facebook.com/share/1CN3zL8jVr/",
    label: "Facebook",
  },
  { icon: SiX, url: "https://x.com/rishabh_v_2009", label: "Twitter" },
  { icon: SiTelegram, url: "https://t.me/editaraOfficial", label: "Telegram" },
  { icon: SiWhatsapp, url: "https://wa.me/917715804457", label: "WhatsApp" },
];

export default function Footer({ copyUPI }: FooterProps) {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      style={{
        background: "linear-gradient(180deg, #0F0F1A, #1A0B3A)",
        borderTop: "1px solid rgba(139,92,246,0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div
              className="text-2xl font-black font-heading mb-2"
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Editara
            </div>
            <p className="text-sm text-gray-400 mb-4">
              AI for Every Indian Business
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Helping local shops, coaching classes, MSMEs, and startups grow
              with affordable AI technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Services", id: "#services" },
                { label: "Combos", id: "#combos" },
                { label: "How It Works", id: "#home" },
                { label: "FAQ", id: "#contact" },
                { label: "Contact", id: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    data-ocid="footer.link"
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-gray-400 hover:text-purple-300 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:editara.digital@gmail.com"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-purple-400" />
                editara.digital@gmail.com
              </a>
              <a
                href="https://wa.me/917715804457"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle size={14} className="text-green-400" />
                +91 77158 04457
              </a>
            </div>
          </div>

          {/* UPI */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Pay via UPI
            </h4>
            <div
              className="flex items-center justify-between p-3 rounded-xl mb-4"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              <span className="font-mono text-sm text-purple-300">
                7715804457@fam
              </span>
              <button
                type="button"
                data-ocid="footer.secondary_button"
                onClick={copyUPI}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Copy size={14} />
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {socials.map((s, idx) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`footer.link.${idx + 1}`}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:bg-purple-900/30"
                  title={s.label}
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span>© {year} Editara. Made in India 🇮🇳</span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
