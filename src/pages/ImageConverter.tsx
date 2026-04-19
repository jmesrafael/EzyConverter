// src/pages/ImageConverter.tsx
import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image, Settings2, Archive, Trash2, Download, AlertCircle } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/context/AuthContext";
import JSZip from "jszip";

const MAX_FILES_FREE = 5;
const MAX_FILE_SIZE_FREE = 50 * 1024 * 1024; // 50 MB

// ── Format config ─────────────────────────────────────────────────────────────
const FORMATS = {
  webp: { mime: "image/webp" as const, ext: "webp", label: "WebP (good for websites)"    },
  jpg:  { mime: "image/jpeg" as const, ext: "jpg",  label: "JPG (not transparent)"       },
  png:  { mime: "image/png"  as const, ext: "png",  label: "PNG (supports transparency)" },
} as const;

type FormatKey = keyof typeof FORMATS;

// ── Types ─────────────────────────────────────────────────────────────────────
interface ConvertedFile {
  name:   string;
  blob:   Blob;
  format: FormatKey;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024)         return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return                                  `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function pct(a: number, b: number): number {
  return b > 0 ? Math.round((1 - a / b) * 100) : 0;
}

// ── Core conversion ───────────────────────────────────────────────────────────
async function convertImage(
  file: File,
  q:    number,     // 1–100 integer; ignored for PNG
  fmt:  FormatKey
): Promise<ConvertedFile> {
  const { mime, ext } = FORMATS[fmt];
  const bitmap = await createImageBitmap(file);
  const canvas  = document.createElement("canvas");
  canvas.width  = bitmap.width;
  canvas.height = bitmap.height;
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0);

  return new Promise<ConvertedFile>((resolve, reject) =>
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Conversion failed"));
        resolve({
          name:   file.name.replace(/\.[^/.]+$/, `.${ext}`),
          blob,
          format: fmt,
        });
      },
      mime,
      fmt === "png" ? undefined : q / 100   // PNG is lossless
    )
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
const ImageConverter = () => {
  const { isPro } = useAuth();
  const [files,        setFiles]        = useState<File[]>([]);
  const [converted,    setConverted]    = useState<Record<number, ConvertedFile>>({});
  const [previews,     setPreviews]     = useState<Record<number, string>>({});
  const [quality,      setQuality]      = useState<number>(80);
  const [format,       setFormat]       = useState<FormatKey>("webp");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [dragOver,     setDragOver]     = useState<boolean>(false);
  const [error,        setError]        = useState<string | null>(null);

  // Snapshot of settings used in the last conversion run.
  // Convert All is disabled until quality, format, or file list diverges from this.
  const [lastConvertedWith, setLastConvertedWith] = useState<{
    quality: number;
    format:  FormatKey;
    fileCount: number;
  } | null>(null);

  const downloadAllRef = useRef<HTMLAnchorElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  // ── Re-enable logic ──────────────────────────────────────────────────────────
  const activeFiles      = files.filter((f): f is File => f !== null);
  const convertedEntries = Object.values(converted) as ConvertedFile[];

  const needsConvert = useMemo<boolean>(() => {
    if (!activeFiles.length) return false;
    if (!lastConvertedWith)  return true;
    if (lastConvertedWith.quality    !== quality)            return true;
    if (lastConvertedWith.format     !== format)             return true;
    if (lastConvertedWith.fileCount  !== activeFiles.length) return true;
    return files.some((f, i) => f && !converted[i]);
  }, [activeFiles.length, lastConvertedWith, quality, format, files, converted]);

  // ── File management ──────────────────────────────────────────────────────────
  const addFiles = (selectedFiles: FileList | File[]) => {
    setError(null);
    const filesArray = Array.from(selectedFiles);
    const imageFiles = filesArray.filter((f): f is File => f.type.startsWith("image/"));
    if (!imageFiles.length) return;

    // Check free tier limits
    if (!isPro) {
      const oversizedFiles = imageFiles.filter(f => f.size > MAX_FILE_SIZE_FREE);
      if (oversizedFiles.length > 0) {
        setError(`File size limit is 50 MB for free users. ${oversizedFiles.length} file(s) exceed this limit.`);
        return;
      }

      const activeFiles = files.filter(f => f !== null);
      const totalFiles = activeFiles.length + imageFiles.length;
      if (totalFiles > MAX_FILES_FREE) {
        setError(`Free users can upload maximum 5 images per session. You have ${activeFiles.length} and trying to add ${imageFiles.length}.`);
        return;
      }
    }

    const startIndex = files.length;
    setFiles(prev => [...prev, ...imageFiles]);
    imageFiles.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews(prev => ({ ...prev, [startIndex + idx]: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    });
    setLastConvertedWith(null); // new file → re-enable Convert All
  };

  const removeFile = (index: number) => {
    setFiles    (prev => prev.map((f, i) => i === index ? null : f) as File[]);
    setConverted(prev => { const c = { ...prev }; delete c[index]; return c; });
    setPreviews (prev => { const c = { ...prev }; delete c[index]; return c; });
    setLastConvertedWith(null); // removed file → re-enable Convert All
  };

  const clearAllFiles = () => {
    setFiles([]);
    setConverted({});
    setPreviews({});
    setLastConvertedWith(null);
  };

  // ── Convert All ───────────────────────────────────────────────────────────────
  const convertAll = async () => {
    const todo = files
      .map((f, i) => (f ? i : null))
      .filter((i): i is number => i !== null);
    if (!todo.length) return;

    setIsConverting(true);
    setConverted({});

    const zip = new JSZip();
    let firstName = "";

    for (const i of todo) {
      const file = files[i]!;
      if (!firstName) firstName = file.name.replace(/\.[^/.]+$/, "");
      const result = await convertImage(file, quality, format);
      setConverted(prev => ({ ...prev, [i]: result }));
      zip.file(result.name, result.blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    if (downloadAllRef.current) {
      downloadAllRef.current.href     = URL.createObjectURL(content);
      downloadAllRef.current.download = `${firstName}_converted.zip`;
    }

    // Lock button until user changes something
    setLastConvertedWith({ quality, format, fileCount: activeFiles.length });
    setIsConverting(false);
  };

  // ── Per-file download ─────────────────────────────────────────────────────────
  const downloadSingle = (index: number) => {
    const file = converted[index];
    if (!file) return;
    const a = document.createElement("a");
    a.href     = URL.createObjectURL(file.blob);
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // ── Derived stats ─────────────────────────────────────────────────────────────
  const totalOriginal  = activeFiles.reduce((s: number, f: File) => s + f.size, 0);
  const totalConverted = convertedEntries.reduce((s: number, c: ConvertedFile) => s + c.blob.size, 0);
  const totalSaved     = convertedEntries.length > 0 ? totalOriginal - totalConverted : 0;
  const hasConverted   = convertedEntries.length > 0;

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <MainLayout>
      <div className="container py-12 md:py-20 max-w-3xl">

        {/* ── Heading ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Image className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Image Converter</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Convert images to WebP, JPG, or PNG with adjustable quality.
          </p>

          {!isPro && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-500 mb-1">Free Plan Limits</p>
                <p className="text-sm text-blue-500/80">Maximum 5 images per session, 50 MB per file</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Error Message ── */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-500">{error}</p>
          </motion.div>
        )}

        {/* ── Upload / Drop zone ── */}
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
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <Upload className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
          <p className="font-medium mb-1">Drop files here or click to browse</p>
          <p className="text-sm text-muted-foreground">Supports PNG, JPG, WebP, SVG, GIF, BMP</p>
        </motion.div>

        {/* ── File list ── */}
        <AnimatePresence mode="popLayout">
          {activeFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-3 mb-8"
            >
              {/* List header */}
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Files ({activeFiles.length})
                </h2>
                <span className="text-xs text-muted-foreground">
                  {convertedEntries.length} / {activeFiles.length} converted
                </span>
              </div>

              {/* File rows */}
              {files.map((file, i) => !file ? null : (
                <motion.div
                  key={`${file.name}-${file.size}-${i}`}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="glass-card p-3 flex items-center gap-3"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                    {previews[i]
                      ? <img src={previews[i]} alt={file.name} className="w-full h-full object-cover" />
                      : <Image className="w-5 h-5 text-muted-foreground/40" />}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                    <span className="font-medium text-sm truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      Original: {formatSize(file.size)}
                    </span>
                    {converted[i] ? (
                      <span className="text-xs text-primary">
                        → {converted[i].name} · {formatSize(converted[i].blob.size)}
                        &nbsp;
                        <span className="text-muted-foreground">
                          ({pct(converted[i].blob.size, file.size)}% smaller)
                        </span>
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Not yet converted</span>
                    )}
                  </div>

                  {/* Row actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Download — green tint */}
                    {converted[i] && (
                      <button
                        onClick={() => downloadSingle(i)}
                        className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        Save
                      </button>
                    )}
                    {/* Remove — plain × only */}
                    <button
                      onClick={() => removeFile(i)}
                      aria-label="Remove file"
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors text-base font-semibold leading-none"
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Settings: format + quality ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Settings2 className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold">Conversion Options</h2>
          </div>

          {/* Format dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1.5">Output Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as FormatKey)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {(Object.entries(FORMATS) as [FormatKey, { mime: string; ext: string; label: string }][]).map(
                ([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                )
              )}
            </select>
          </div>

          {/* Quality slider — hidden for PNG (lossless) */}
          {format !== "png" ? (
            <div>
              <label className="block text-sm font-medium mb-1.5">Quality</label>
              <div className="flex items-center gap-3">
                <Slider
                  value={[quality]}
                  onValueChange={([v]: number[]) => setQuality(v)}
                  min={1}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-10 text-right">{quality}%</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              PNG is lossless — quality setting does not apply.
            </p>
          )}
        </motion.div>

        {/* ── Summary / Stats ── */}
        {activeFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-4 mb-4 text-sm"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Total Original</span>
                <span className="font-semibold text-foreground">{formatSize(totalOriginal)}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Total Converted</span>
                <span className="font-semibold text-primary">
                  {hasConverted ? formatSize(totalConverted) : "—"}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Bytes Saved</span>
                <span className="font-semibold text-foreground">
                  {hasConverted
                    ? `${formatSize(totalSaved)} (${pct(totalConverted, totalOriginal)}%)`
                    : "—"}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Action bar — Convert All / Download All / Clear All ── */}
        <div className="flex gap-3 justify-center">

          {/* Convert All — locked after run, re-enabled when settings/files change */}
          <button
            onClick={convertAll}
            disabled={isConverting || !needsConvert}
            className="flex-1 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConverting ? "Converting…" : "Convert All"}
          </button>

          {/* Download All — only active after a conversion */}
          <a
            ref={downloadAllRef}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold transition-colors ${
              hasConverted
                ? "hover:bg-secondary/80 cursor-pointer"
                : "opacity-50 cursor-not-allowed pointer-events-none"
            }`}
          >
            <Archive className="w-4 h-4" />
            Download All (.zip)
          </a>

          {/* Clear All — red tint */}
          <button
            onClick={clearAllFiles}
            disabled={activeFiles.length === 0}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 text-red-600 font-semibold hover:bg-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>

        </div>

      </div>
    </MainLayout>
  );
};

export default ImageConverter;