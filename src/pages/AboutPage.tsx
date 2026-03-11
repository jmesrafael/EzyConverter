import { motion } from "framer-motion";
import { Info, Zap, Shield, Globe } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";

const AboutPage = () => (
  <MainLayout>
    <div className="container py-12 md:py-20 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Info className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">About Ezy Converter</h1>
        </div>
        <p className="text-muted-foreground mb-8">Your free, fast, and private online converter.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">Our Mission</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Ezy Converter was built with one goal: make unit conversions and file transformations as simple as possible. Everything runs directly in your browser — no data is uploaded to any server, no sign-up required, and no limits on usage.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: <Zap className="w-5 h-5 text-primary" />, title: "Lightning Fast", desc: "Instant results powered by client-side computation." },
          { icon: <Shield className="w-5 h-5 text-primary" />, title: "100% Private", desc: "Your files and data never leave your browser." },
          { icon: <Globe className="w-5 h-5 text-primary" />, title: "Free Forever", desc: "No subscriptions, no hidden fees, no ads." },
        ].map((item, i) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }} className="glass-card p-5 text-center">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">{item.icon}</div>
            <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </MainLayout>
);

export default AboutPage;
