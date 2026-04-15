import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Image, FileText, ArrowRight, Zap, Shield, Wifi, Upload, Settings2, Download } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";

const features = [
  {
    icon: Shield,
    title: "100% Private",
    desc: "Files are processed entirely in your browser. Nothing is ever uploaded to a server.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    desc: "Client-side processing means no waiting on uploads or queues. Converts in milliseconds.",
  },
  {
    icon: Wifi,
    title: "Works Offline",
    desc: "Once the page loads, no internet connection is needed to convert your files.",
  },
];

const converters = [
  {
    to: "/image-converter",
    icon: Image,
    title: "Image Converter",
    desc: "Convert between PNG, JPG, and WebP. Adjust quality and download a ZIP of all results.",
    badge: "PNG · JPG · WebP",
  },
  {
    to: "/pdf-converter",
    icon: FileText,
    title: "PDF Converter",
    desc: "Merge, split, or compress your PDF files with a simple drag-and-drop interface.",
    badge: "Merge · Split · Compress",
  },
];

const steps = [
  { icon: Upload,    label: "Drop your files",   desc: "Drag & drop or click to select files from your device." },
  { icon: Settings2, label: "Choose options",     desc: "Pick output format, quality, or conversion mode."       },
  { icon: Download,  label: "Download results",   desc: "Get individual files or a bundled ZIP instantly."       },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const Home = () => {
  return (
    <MainLayout>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero-glow container py-24 md:py-36 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/[0.08] text-primary text-xs font-semibold mb-8 tracking-wide uppercase">
            <Zap className="w-3 h-3" /> Free · Private · No sign-up required
          </span>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.08]">
            Convert files{" "}
            <span className="gradient-text">the easy way</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Transform images and PDFs directly in your browser — fast, private, and completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/image-converter"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl gradient-bg text-black font-bold hover:opacity-90 transition-opacity shadow-lg"
            >
              Convert Images <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pdf-converter"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors border border-border"
            >
              Convert PDFs
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Converter cards ──────────────────────────────────── */}
      <section className="container pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto"
        >
          {converters.map((c) => (
            <motion.div key={c.to} variants={item}>
              <Link to={c.to} className="glass-card metallic block p-7 group hover:scale-[1.015] transition-transform">
                <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center mb-5 icon-glow">
                  <c.icon className="w-5 h-5 text-black" />
                </div>
                <h3 className="text-base font-bold mb-1.5">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{c.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border border-primary/20 bg-primary/[0.08] text-primary/80">
                  {c.badge}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Speed callout ────────────────────────────────────── */}
      <section className="container pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto rounded-2xl border border-primary/25 px-7 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 metallic"
          style={{ background: "linear-gradient(135deg, hsl(43 88% 52% / 0.07), hsl(224 22% 7%))" }}
        >
          <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 icon-glow">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm mb-1">Built for speed — no upload queues, no waiting</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Unlike cloud-based converters, everything runs locally in your browser. Just drag any image file into the Image Converter and get your result instantly.
            </p>
          </div>
          <Link
            to="/image-converter"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl gradient-bg text-black text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Try it <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="container pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">How it works</h2>
          <p className="text-muted-foreground text-sm">Three steps, zero friction.</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto grid md:grid-cols-3 gap-5 relative"
        >
          {/* Gold connecting line — desktop only */}
          <div
            className="hidden md:block absolute top-[58px] left-[calc(33.33%+4px)] right-[calc(33.33%+4px)] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, hsl(43 88% 52% / 0.6), hsl(36 90% 62% / 0.25), hsl(43 88% 52% / 0.6))" }}
          />

          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              variants={item}
              className="premium-card metallic rounded-2xl overflow-hidden relative flex flex-col items-center text-center px-6 pt-8 pb-7"
            >
              {/* Step badge at top */}
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/50 mb-3">
                Step 0{i + 1}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-5 icon-glow">
                <s.icon className="w-6 h-6 text-black" />
              </div>

              <h3 className="font-bold text-base mb-2">{s.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>

              {/* Decorative number — bottom-right, contained */}
              <span
                className="absolute bottom-3 right-4 text-[64px] font-black leading-none select-none pointer-events-none gradient-text opacity-[0.09]"
                aria-hidden
              >
                {i + 1}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="container pb-28">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={item} className="glass-card metallic p-6 text-center">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </MainLayout>
  );
};

export default Home;
