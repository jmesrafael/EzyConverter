import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Image, FileText, ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Convert files in seconds with optimized processing." },
  { icon: Shield, title: "Secure & Private", desc: "Your files never leave your browser. 100% client-side." },
  { icon: Clock, title: "No Limits", desc: "Convert as many files as you want, no sign-up required." },
];

const converters = [
  {
    to: "/image-converter",
    icon: Image,
    title: "Image Converter",
    desc: "Convert between PNG, JPG, WebP, SVG and more.",
    color: "bg-primary/10 text-primary",
  },
  {
    to: "/pdf-converter",
    icon: FileText,
    title: "PDF Converter",
    desc: "Merge, split, compress or convert PDF files.",
    color: "bg-accent/10 text-accent",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="container py-20 md:py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Convert files{" "}
            <span className="gradient-text">the easy way</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Free, fast, and private file converter. Transform images, PDFs, and documents right in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/image-converter"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/settings"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors"
            >
              Settings
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Converters */}
      <section className="container pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {converters.map((c) => (
            <motion.div key={c.to} variants={item}>
              <Link to={c.to} className="glass-card block p-6 group hover:scale-[1.02] transition-transform">
                <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center mb-4`}>
                  <c.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="container pb-20">
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
    </MainLayout>
  );
};

export default Home;
