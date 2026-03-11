import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Image, FileText, ArrowRight, Zap, Shield, Clock,
  Ruler, Weight, Thermometer, HardDrive, Calculator, Wrench, BookOpen, Search,
} from "lucide-react";
import { MainLayout } from "@/components/MainLayout";
import { useState, useMemo } from "react";

const converterCategories = [
  {
    category: "Measurement",
    items: [
      { to: "/length-converter", icon: Ruler, title: "Length Converter", desc: "Meters, feet, miles, inches, and more." },
      { to: "/weight-converter", icon: Weight, title: "Weight Converter", desc: "Kilograms, pounds, ounces, grams." },
      { to: "/temperature-converter", icon: Thermometer, title: "Temperature Converter", desc: "Celsius, Fahrenheit, Kelvin." },
      { to: "/time-converter", icon: Clock, title: "Time Converter", desc: "Seconds, minutes, hours, days, years." },
    ],
  },
  {
    category: "Digital",
    items: [
      { to: "/data-converter", icon: HardDrive, title: "Data Storage Converter", desc: "Bits, bytes, KB, MB, GB, TB." },
      { to: "/image-converter", icon: Image, title: "Image Converter", desc: "Convert between PNG, JPG, WebP." },
      { to: "/pdf-converter", icon: FileText, title: "PDF Converter", desc: "Merge, split, compress PDF files." },
    ],
  },
  {
    category: "Math & Engineering",
    items: [
      { to: "/math-converters", icon: Calculator, title: "Math Converters", desc: "Fractions, decimals, percentages." },
      { to: "/engineering-converters", icon: Wrench, title: "Engineering Converters", desc: "Force, pressure, torque, voltage." },
    ],
  },
];

const allConverters = converterCategories.flatMap((c) => c.items);

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Convert in seconds with optimized client-side processing." },
  { icon: Shield, title: "Secure & Private", desc: "Your files and data never leave your browser." },
  { icon: Clock, title: "No Limits", desc: "Convert as many files as you want, no sign-up required." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Home = () => {
  const [search, setSearch] = useState("");

  const filteredConverters = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return allConverters.filter(
      (c) => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <MainLayout>
      {/* Hero */}
      <section className="container py-20 md:py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Free Online{" "}
            <span className="gradient-text">Converters & Calculators</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Fast, accurate, and private. Transform units, images, and documents right in your browser.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto mb-10 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search converters..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Search results */}
          {filteredConverters && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto mb-10 space-y-2 text-left">
              {filteredConverters.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center">No converters found.</p>
              ) : (
                filteredConverters.map((c) => (
                  <Link key={c.to} to={c.to} className="glass-card block p-3 hover:scale-[1.01] transition-transform">
                    <div className="flex items-center gap-3">
                      <c.icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{c.title}</p>
                        <p className="text-xs text-muted-foreground">{c.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </motion.div>
          )}

          {!filteredConverters && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/length-converter"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/guides"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors"
              >
                <BookOpen className="w-4 h-4" /> Read Guides
              </Link>
            </div>
          )}
        </motion.div>
      </section>

      {/* Converter Categories */}
      {!filteredConverters && converterCategories.map((cat) => (
        <section key={cat.category} className="container pb-12">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{cat.category}</h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {cat.items.map((c) => (
              <motion.div key={c.to} variants={item}>
                <Link to={c.to} className="glass-card block p-5 group hover:scale-[1.02] transition-transform">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{c.title}</h3>
                  <p className="text-xs text-muted-foreground">{c.desc}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      ))}

      {/* Features */}
      {!filteredConverters && (
        <section className="container pb-20">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">Why Use Our Converters</h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={item} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Latest Guides CTA */}
      {!filteredConverters && (
        <section className="container pb-20">
          <div className="glass-card p-8 text-center">
            <h2 className="text-xl font-bold mb-2">Learn About Conversions</h2>
            <p className="text-sm text-muted-foreground mb-4">Read our guides on metric vs imperial, temperature, engineering units, and more.</p>
            <Link to="/guides" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-sm">
              <BookOpen className="w-4 h-4" /> View Guides
            </Link>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default Home;
