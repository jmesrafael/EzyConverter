import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { ToggleSwitch } from "./ToggleSwitch";
import { EzyLogo } from "./EzyLogo";

const mainNavLinks = [
  { to: "/", label: "Home" },
];

const converterLinks = [
  { to: "/temperature-converter", label: "Temperature" },
  { to: "/length-converter", label: "Length" },
  { to: "/weight-converter", label: "Weight" },
  { to: "/image-converter", label: "Image" },
  { to: "/pdf-converter", label: "PDF" },
  { to: "/data-converter", label: "Data" },
  { to: "/engineering-converters", label: "Engineering" },
  { to: "/math-converters", label: "Math" },
  { to: "/time-converter", label: "Time" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [convertersOpen, setConvertersOpen] = useState(false);
  const location = useLocation();

  return (
    <header
      className="sticky top-0 z-50 border-b border-border backdrop-blur-md"
      style={{ background: "hsl(224 22% 4% / 0.88)" }}
    >
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 font-heading font-bold text-xl">
          <EzyLogo size={34} />
          <span>Ezy Converter</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {mainNavLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Converters Dropdown */}
          <div className="relative group">
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1">
              Converters
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {converterLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="ml-4">
            <ToggleSwitch />
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-b border-border"
          >
            <nav className="container flex flex-col gap-1 py-4">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => setConvertersOpen(!convertersOpen)}
                className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-between"
              >
                Converters
                <ChevronDown className={`w-4 h-4 transition-transform ${convertersOpen ? "rotate-180" : ""}`} />
              </button>

              {convertersOpen && (
                <div className="pl-4 flex flex-col gap-1">
                  {converterLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => {
                        setMobileOpen(false);
                        setConvertersOpen(false);
                      }}
                      className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              <div className="px-4 pt-2">
                <ToggleSwitch />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
