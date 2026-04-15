import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Settings2, Trash2, Download, GitMerge, Scissors, Minimize2 } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";

type PDFMode = "merge" | "compress";

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const MODES = [
  { key: "merge" as PDFMode, label: "Merge", icon: GitMerge, desc: "Combine multiple PDFs into one file." },
  { key: "compress" as PDFMode, label: "Compress", icon: Minimize2, desc: "Reduce PDF file size for sharing." },
];

const PDFConverter = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<PDFMode>("merge");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (selected: FileList | File[]) => {
    const pdfs = Array.from(selected).filter((f) => f.type === "application/pdf");
    if (!pdfs.length) return;
    setFiles((prev) => [...prev, ...pdfs]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => setFiles([]);

  // Placeholder action — wires up UI without a full PDF library
  const handleConvert = () => {
    alert(`${mode === "merge" ? "Merge" : "Compress"} coming soon! Add your PDF processing library here.`);
  };

  return (
    <MainLayout>
      <div className="container py-12 md:py-20 max-w-3xl">

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <h1 className="text-3xl font-bold">PDF Converter</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Merge or compress PDF files directly in your browser.
          </p>
        </motion.div>

        {/* Drop zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`drop-zone mb-8 cursor-pointer ${dragOver ? "border-primary/50 bg-primary/5" : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            addFiles(e.dataTransfer.files);
          }}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <Upload className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
          <p className="font-medium mb-1">Drop PDF files here or click to browse</p>
          <p className="text-sm text-muted-foreground">Supports PDF files up to 50 MB each</p>
        </motion.div>

        {/* File list */}
        <AnimatePresence mode="popLayout">
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="space-y-3 mb-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Files ({files.length})
                </h2>
                <button
                  onClick={clearAll}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear all
                </button>
              </div>

              {files.map((file, i) => (
                <motion.div
                  key={`${file.name}-${i}`}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="glass-card p-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-medium text-sm truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground">{formatSize(file.size)}</span>
                  </div>
                  <button
                    onClick={() => removeFile(i)}
                    aria-label="Remove file"
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors text-base font-semibold leading-none flex-shrink-0"
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Settings2 className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold">PDF Options</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {MODES.map(({ key, label, icon: Icon, desc }) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-colors ${
                  mode === key
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-secondary/30 text-secondary-foreground hover:bg-secondary/60"
                }`}
              >
                <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </button>
            ))}
          </div>

          {mode === "merge" && files.length < 2 && (
            <p className="mt-3 text-xs text-muted-foreground">
              Add at least 2 PDF files to merge them.
            </p>
          )}
        </motion.div>

        {/* Action bar */}
        <div className="flex gap-3">
          <button
            onClick={handleConvert}
            disabled={files.length === 0 || (mode === "merge" && files.length < 2)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            {mode === "merge" ? "Merge & Download" : "Compress & Download"}
          </button>

          {files.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 text-red-600 font-semibold hover:bg-red-500/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </MainLayout>
  );
};

export default PDFConverter;
