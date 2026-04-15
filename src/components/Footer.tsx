import { Link } from "react-router-dom";
import { EzyLogo } from "./EzyLogo";

const links = [
  { to: "/image-converter", label: "Image Converter" },
  { to: "/pdf-converter", label: "PDF Converter" },
  { to: "/settings", label: "Settings" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto" style={{ background: "linear-gradient(to top, hsl(224 22% 3%), hsl(224 22% 5%))" }}>
      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2 font-heading font-bold text-base">
              <EzyLogo size={28} />
              <span>Ezy Converter</span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Free, fast, and private file converter. Everything happens in your browser — no uploads, no accounts.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Converters</span>
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ezy Converter. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Your files never leave your device.
          </p>
        </div>
      </div>
    </footer>
  );
};
