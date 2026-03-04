import { motion } from "framer-motion";
import { Upload, FileText, Settings2 } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";
import { FileCard } from "@/components/FileCard";

const PDFConverter = () => {
  const demoFiles = [
    { name: "document-report.pdf", size: "3.8 MB", type: "pdf" as const },
  ];

  return (
    <MainLayout>
      <div className="container py-12 md:py-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <h1 className="text-3xl font-bold">PDF Converter</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Merge, split, compress or convert your PDF files easily.
          </p>
        </motion.div>

        {/* Drop zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="drop-zone mb-8 cursor-pointer"
        >
          <Upload className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
          <p className="font-medium mb-1">Drop PDF files here or click to browse</p>
          <p className="text-sm text-muted-foreground">Supports PDF files up to 50 MB</p>
        </motion.div>

        {/* Demo files */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 mb-8"
        >
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Files</h2>
          {demoFiles.map((f) => (
            <FileCard key={f.name} {...f} onRemove={() => {}} />
          ))}
        </motion.div>

        {/* Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Settings2 className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold">PDF Options</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {["Merge", "Split", "Compress"].map((action) => (
              <button
                key={action}
                className="px-4 py-3 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors border border-border"
              >
                {action}
              </button>
            ))}
          </div>
        </motion.div>

        <button className="w-full py-3 rounded-xl gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
          Convert PDF
        </button>
      </div>
    </MainLayout>
  );
};

export default PDFConverter;
