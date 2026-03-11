import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, Copy, Trash2, Clock, ChevronDown, ChevronUp, Check, Share2 } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";
import { SEOHead } from "@/components/SEOHead";
import { ConversionTable } from "@/components/converter/ConversionTable";
import { useConverter, UnitDefinition } from "@/hooks/useConverter";
import { useConversionHistory } from "@/hooks/useConversionHistory";
import { generateToolSchema, generateFAQSchema } from "@/lib/schema";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";

interface CommonRow {
  from: string;
  to: string;
  fromUnit: string;
  toUnit: string;
}

interface ConverterPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  units: UnitDefinition[];
  commonConversions?: CommonRow[];
  metaTitle?: string;
  metaDescription?: string;
  educationalContent?: { title: string; body: string }[];
  customConvert?: (value: number, from: string, to: string) => { value: number; formula: string } | null;
  /** Programmatic sub-links to show */
  programmaticLinks?: { label: string; path: string }[];
}

export const ConverterPage = ({
  title,
  description,
  icon,
  units,
  commonConversions,
  educationalContent,
  customConvert,
  metaTitle,
  metaDescription,
  programmaticLinks,
}: ConverterPageProps) => {
  const { state, setInput, setUnitFrom, setUnitTo, setPrecision, swapUnits, clearInput, result: linearResult, addToHistory } = useConverter(units);
  const { addEntry } = useConversionHistory();
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showEducation, setShowEducation] = useState(false);

  const val = parseFloat(state.input);
  const customResult = customConvert && !isNaN(val) ? customConvert(val, state.unitFrom, state.unitTo) : null;
  const result = customConvert ? customResult : linearResult;

  const schema = useMemo(() => generateToolSchema(
    metaTitle ?? title,
    metaDescription ?? description,
    window.location.href
  ), [metaTitle, metaDescription, title, description]);

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(String(result.value));
    setCopied(true);
    addToHistory();
    addEntry({
      input: state.input,
      fromUnit: state.unitFrom,
      toUnit: state.unitTo,
      result: String(result.value),
      category: title,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputError = state.input !== "" && isNaN(parseFloat(state.input)) ? "Enter a valid number" : null;

  // Generate dynamic table from current units
  const dynamicTable = useMemo(() => {
    if (!result) return [];
    const from = units.find(u => u.key === state.unitFrom);
    const to = units.find(u => u.key === state.unitTo);
    if (!from || !to) return [];
    return [1, 2, 5, 10, 25, 50, 100].map(v => {
      const converted = customConvert
        ? customConvert(v, state.unitFrom, state.unitTo)
        : { value: parseFloat((v * (from.factor / to.factor)).toFixed(state.precision)) };
      return { from: v, to: String(converted?.value ?? "—") };
    });
  }, [state.unitFrom, state.unitTo, state.precision, units, customConvert, result]);

  return (
    <MainLayout>
      <SEOHead title={metaTitle ?? title} description={metaDescription ?? description} schema={schema} />

      <div className="container py-12 md:py-20 max-w-3xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              {icon}
            </div>
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
          <p className="text-muted-foreground mb-8">{description}</p>
        </motion.div>

        {/* Input Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 mb-6">
          <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-1.5">From</label>
              <select value={state.unitFrom} onChange={(e) => setUnitFrom(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-2">
                {units.map((u) => <option key={u.key} value={u.key}>{u.label}</option>)}
              </select>
              <input type="number" value={state.input} onChange={(e) => setInput(e.target.value)} placeholder="Enter value" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              {inputError && <p className="text-xs text-destructive mt-1">{inputError}</p>}
            </div>

            <button onClick={swapUnits} className="self-center p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors" aria-label="Swap units">
              <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
            </button>

            <div>
              <label className="block text-sm font-medium mb-1.5">To</label>
              <select value={state.unitTo} onChange={(e) => setUnitTo(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-2">
                {units.map((u) => <option key={u.key} value={u.key}>{u.label}</option>)}
              </select>
              <div className="w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-medium min-h-[38px] flex items-center">
                {result ? (
                  <motion.span key={result.value} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-primary font-semibold">
                    {result.value}
                  </motion.span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </div>
            </div>
          </div>

          {result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 rounded-lg bg-secondary/50 text-xs text-muted-foreground font-mono">
              {result.formula}
            </motion.div>
          )}

          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <button onClick={copyResult} disabled={!result} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50">
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button onClick={shareLink} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors">
              <Share2 className="w-3 h-3" /> Share
            </button>
            <button onClick={clearInput} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors">
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-xs text-muted-foreground mb-1">Decimal places: {state.precision}</label>
            <Slider value={[state.precision]} onValueChange={([v]) => setPrecision(v)} min={0} max={10} step={1} className="w-40" />
          </div>
        </motion.div>

        {/* History */}
        {state.history.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4 mb-6">
            <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-2 w-full text-sm font-medium">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Recent Conversions ({state.history.length})
              {showHistory ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
            </button>
            {showHistory && (
              <div className="mt-3 space-y-2">
                {state.history.map((h, i) => (
                  <div key={i} className="flex items-center justify-between text-xs text-muted-foreground bg-secondary/30 rounded-lg px-3 py-2">
                    <span>{h.input} {h.unitFrom} → {h.result} {h.unitTo}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Dynamic Conversion Table */}
        {dynamicTable.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4 mb-6">
            <button onClick={() => setShowTable(!showTable)} className="flex items-center gap-2 w-full text-sm font-medium">
              Conversion Table
              {showTable ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
            </button>
            {showTable && (
              <div className="mt-3">
                <ConversionTable
                  fromLabel={units.find(u => u.key === state.unitFrom)?.label ?? "From"}
                  toLabel={units.find(u => u.key === state.unitTo)?.label ?? "To"}
                  rows={dynamicTable}
                />
              </div>
            )}
          </motion.div>
        )}

        {/* Educational Content */}
        {educationalContent && educationalContent.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4 mb-6">
            <button onClick={() => setShowEducation(!showEducation)} className="flex items-center gap-2 w-full text-sm font-medium">
              Learn More
              {showEducation ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
            </button>
            {showEducation && (
              <div className="mt-3 space-y-4">
                {educationalContent.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Programmatic Links */}
        {programmaticLinks && programmaticLinks.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-4">
            <h2 className="text-sm font-medium mb-3">Popular Conversions</h2>
            <div className="flex flex-wrap gap-2">
              {programmaticLinks.map((link) => (
                <Link key={link.path} to={link.path} className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};
