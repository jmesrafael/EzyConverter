import { Link } from "react-router-dom";
import { Github, Twitter, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container py-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold mb-3">Converters</h3>
            <div className="flex flex-col gap-1.5">
              {[
                { to: "/length-converter", label: "Length" },
                { to: "/weight-converter", label: "Weight" },
                { to: "/temperature-converter", label: "Temperature" },
                { to: "/time-converter", label: "Time" },
                { to: "/data-converter", label: "Data Storage" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-3">Tools</h3>
            <div className="flex flex-col gap-1.5">
              {[
                { to: "/image-converter", label: "Image Converter" },
                { to: "/pdf-converter", label: "PDF Converter" },
                { to: "/math-converters", label: "Math Converters" },
                { to: "/engineering-converters", label: "Engineering" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-3">Company</h3>
            <div className="flex flex-col gap-1.5">
              {[
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
                { to: "/guides", label: "Guides" },
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Use" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ezy Converter. Made with{" "}
            <Heart className="inline w-3.5 h-3.5 text-destructive" />
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
