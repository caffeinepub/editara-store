import {
  SiFacebook,
  SiInstagram,
  SiTelegram,
  SiWhatsapp,
  SiX,
} from "react-icons/si";

const socials = [
  {
    name: "Instagram",
    icon: SiInstagram,
    url: "https://www.instagram.com/editara_official",
    gradient: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)",
    glow: "rgba(225,48,108,0.5)",
  },
  {
    name: "Facebook",
    icon: SiFacebook,
    url: "https://www.facebook.com/share/1CN3zL8jVr/",
    gradient: "linear-gradient(135deg, #1877F2, #0C63D4)",
    glow: "rgba(24,119,242,0.5)",
  },
  {
    name: "Twitter / X",
    icon: SiX,
    url: "https://x.com/rishabh_v_2009",
    gradient: "linear-gradient(135deg, #1C1C1E, #3A3A3C)",
    glow: "rgba(255,255,255,0.2)",
  },
  {
    name: "Telegram",
    icon: SiTelegram,
    url: "https://t.me/editaraOfficial",
    gradient: "linear-gradient(135deg, #2AABEE, #229ED9)",
    glow: "rgba(42,171,238,0.5)",
  },
  {
    name: "WhatsApp",
    icon: SiWhatsapp,
    url: "https://wa.me/917715804457",
    gradient: "linear-gradient(135deg, #25D366, #128C7E)",
    glow: "rgba(37,211,102,0.5)",
  },
];

export default function SocialConnect() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(180deg, transparent, rgba(91,33,182,0.05) 50%, transparent)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-black font-heading text-white mb-3">
          📱 Connect With Us
        </h2>
        <p className="text-gray-400 mb-10">
          Follow us for tips, updates, and exclusive offers.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {socials.map((social, idx) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`social.link.${idx + 1}`}
              className="social-card flex flex-col items-center gap-3 group"
              style={{
                transition: "transform 0.3s ease",
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl"
                style={{
                  background: social.gradient,
                  boxShadow: `0 4px 20px ${social.glow}`,
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 8px 35px ${social.glow}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 4px 20px ${social.glow}`;
                }}
              >
                <social.icon />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
