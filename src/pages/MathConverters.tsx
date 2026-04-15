import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Copy, Check, Trash2 } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";

type MathMode = "frac2dec" | "dec2pct" | "pct2dec" | "sci2dec";

const modes: { key: MathMode; label: string }[] = [
  { key: "frac2dec", label: "Fraction → Decimal" },
  { key: "dec2pct", label: "Decimal → Percentage" },
  { key: "pct2dec", label: "Percentage → Decimal" },
  { key: "sci2dec", label: "Scientific → Decimal" },
];

const MathConverters = () => {
  const [mode, setMode] = useState<MathMode>("frac2dec");
  const [numerator, setNumerator] = useState("");
  const [denominator, setDenominator] = useState("");
  const [decimalInput, setDecimalInput] = useState("");
  const [percentInput, setPercentInput] = useState("");
  const [mantissa, setMantissa] = useState("");
  const [exponent, setExponent] = useState("");
  const [copied, setCopied] = useState(false);

  const getResult = (): { value: string; formula: string } | null => {
    switch (mode) {
      case "frac2dec": {
        const n = parseFloat(numerator);
        const d = parseFloat(denominator);
        if (isNaN(n) || isNaN(d) || d === 0) return null;
        const r = n / d;
        return { value: String(r), formula: `${n} / ${d} = ${r}` };
      }
      case "dec2pct": {
        const v = parseFloat(decimalInput);
        if (isNaN(v)) return null;
        const r = v * 100;
        return { value: `${r}%`, formula: `${v} × 100 = ${r}%` };
      }
      case "pct2dec": {
        const v = parseFloat(percentInput);
        if (isNaN(v)) return null;
        const r = v / 100;
        return { value: String(r), formula: `${v}% / 100 = ${r}` };
      }
      case "sci2dec": {
        const m = parseFloat(mantissa);
        const e = parseFloat(exponent);
        if (isNaN(m) || isNaN(e)) return null;
        const r = m * Math.pow(10, e);
        return { value: String(r), formula: `${m} × 10^${e} = ${r}` };
      }
    }
  };

  const result = getResult();

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setNumerator(""); setDenominator(""); setDecimalInput(""); setPercentInput(""); setMantissa(""); setExponent("");
  };

  return (
    <MainLayout>
      <div className="container py-12 md:py-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Math Converters</h1>
          </div>
          <p className="text-muted-foreground mb-8">Convert fractions, decimals, percentages, and scientific notation.</p>
        </motion.div>

        {/* Mode Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2 mb-6">
          {modes.map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === m.key ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {m.label}
            </button>
          ))}
        </motion.div>

        {/* Input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-6 mb-6">
          {mode === "frac2dec" && (
            <div className="flex items-center gap-2">
              <input type="number" value={numerator} onChange={(e) => setNumerator(e.target.value)} placeholder="Numerator" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <span className="text-xl font-bold text-muted-foreground">/</span>
              <input type="number" value={denominator} onChange={(e) => setDenominator(e.target.value)} placeholder="Denominator" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
          )}
          {mode === "dec2pct" && (
            <input type="number" value={decimalInput} onChange={(e) => setDecimalInput(e.target.value)} placeholder="Enter decimal (e.g. 0.75)" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          )}
          {mode === "pct2dec" && (
            <div className="flex items-center gap-2">
              <input type="number" value={percentInput} onChange={(e) => setPercentInput(e.target.value)} placeholder="Enter percentage (e.g. 75)" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <span className="text-lg font-bold text-muted-foreground">%</span>
            </div>
          )}
          {mode === "sci2dec" && (
            <div className="flex items-center gap-2">
              <input type="number" value={mantissa} onChange={(e) => setMantissa(e.target.value)} placeholder="Mantissa" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <span className="text-sm font-bold text-muted-foreground">× 10^</span>
              <input type="number" value={exponent} onChange={(e) => setExponent(e.target.value)} placeholder="Exp" className="w-20 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
          )}

          {/* Result */}
          {result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
              <div className="rounded-lg bg-muted p-3 flex items-center justify-between">
                <span className="text-primary font-semibold text-lg">{result.value}</span>
                <button onClick={copy} className="flex items-center gap-1 px-2 py-1 rounded bg-primary/10 text-primary text-xs">
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground font-mono bg-secondary/50 p-2 rounded">{result.formula}</p>
            </motion.div>
          )}

          <button onClick={clear} className="mt-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors">
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default MathConverters;
