import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <MainLayout>
      <div className="container py-12 md:py-20 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Contact Us</h1>
          </div>
          <p className="text-muted-foreground mb-8">Have a question, suggestion, or found a bug? Let us know!</p>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Thank you!</h2>
            <p className="text-sm text-muted-foreground">Your message has been received. We'll get back to you soon.</p>
          </motion.div>
        ) : (
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Name</label>
              <input required maxLength={100} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input required type="email" maxLength={255} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Message</label>
              <textarea required maxLength={1000} rows={5} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none" placeholder="How can we help?" />
            </div>
            <button type="submit" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </motion.form>
        )}
      </div>
    </MainLayout>
  );
};

export default ContactPage;
