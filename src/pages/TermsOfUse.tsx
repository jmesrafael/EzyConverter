import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";

const TermsOfUse = () => (
  <MainLayout>
    <div className="container py-12 md:py-20 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Terms of Use</h1>
        </div>
        <p className="text-muted-foreground mb-8">Last updated: March 2026</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
          <p>By using Ezy Converter, you agree to these terms. If you do not agree, please do not use the service.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">2. Service Description</h2>
          <p>Ezy Converter provides free online conversion tools including unit converters and image format converters. All processing is performed client-side in your browser.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">3. Accuracy</h2>
          <p>While we strive for accuracy, conversion results are provided "as-is" without warranty. For critical applications, please verify results independently.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">4. Intellectual Property</h2>
          <p>All content, design, and code on this website are the property of Ezy Converter. You may not reproduce or redistribute without permission.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">5. Limitation of Liability</h2>
          <p>Ezy Converter is not liable for any damages arising from the use of this service, including but not limited to inaccurate conversion results.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">6. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of updated terms.</p>
        </section>
      </motion.div>
    </div>
  </MainLayout>
);

export default TermsOfUse;
