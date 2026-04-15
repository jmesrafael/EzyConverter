import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";

const PrivacyPolicy = () => (
  <MainLayout>
    <div className="container py-12 md:py-20 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>
        <p className="text-muted-foreground mb-8">Last updated: March 2026</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">1. Data Collection</h2>
          <p>Ezy Converter does not collect, store, or transmit any personal data. All conversions and file processing happen entirely in your browser. No files are uploaded to any server.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">2. Cookies</h2>
          <p>We use localStorage only to save your theme preference (dark/light mode). No tracking cookies are used.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">3. Third-Party Services</h2>
          <p>We load Google Fonts for typography. Google may collect usage data per their own privacy policy. No other third-party services are integrated.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">4. Analytics</h2>
          <p>No analytics or tracking tools are currently in use. We do not track page views, user interactions, or any behavioral data.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">5. Contact</h2>
          <p>If you have questions about this privacy policy, please reach out via our Contact page.</p>
        </section>
      </motion.div>
    </div>
  </MainLayout>
);

export default PrivacyPolicy;
