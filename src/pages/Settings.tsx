import { motion } from "framer-motion";
import { Settings, RotateCcw } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";
import { ToggleSwitch } from "@/components/ToggleSwitch";

const SettingsPage = () => {
  return (
    <MainLayout>
      <div className="container py-12 md:py-20 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
          <p className="text-muted-foreground mb-8">Customize your Ezy Converter experience.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Theme */}
          <div className="glass-card p-6">
            <h2 className="font-semibold mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Dark / Light Mode</p>
                <p className="text-xs text-muted-foreground">Toggle between dark and light theme</p>
              </div>
              <ToggleSwitch />
            </div>
          </div>

          {/* Font */}
          <div className="glass-card p-6">
            <h2 className="font-semibold mb-4">Typography</h2>
            <div>
              <label className="block text-sm font-medium mb-1.5">Heading Font</label>
              <select className="w-full px-3 py-2 rounded-lg bg-secondary text-secondary-foreground border border-border text-sm">
                <option>Space Grotesk</option>
                <option>Inter</option>
              </select>
            </div>
          </div>

          {/* Reset */}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium">
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </button>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
