import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { ConverterPage } from "@/components/ConverterPage";
import { MainLayout } from "@/components/MainLayout";
import { UnitDefinition } from "@/hooks/useConverter";

interface EngCategory {
  key: string;
  label: string;
  units: UnitDefinition[];
  commonConversions: { from: string; to: string; fromUnit: string; toUnit: string }[];
}

const categories: EngCategory[] = [
  {
    key: "force",
    label: "Force",
    units: [
      { key: "N", label: "Newton (N)", factor: 1 },
      { key: "kgf", label: "Kilogram-force (kgf)", factor: 9.80665 },
      { key: "lbf", label: "Pound-force (lbf)", factor: 4.44822 },
      { key: "dyn", label: "Dyne (dyn)", factor: 0.00001 },
    ],
    commonConversions: [
      { from: "1", to: "0.10197", fromUnit: "N", toUnit: "kgf" },
      { from: "1", to: "0.22481", fromUnit: "N", toUnit: "lbf" },
    ],
  },
  {
    key: "pressure",
    label: "Pressure",
    units: [
      { key: "Pa", label: "Pascal (Pa)", factor: 1 },
      { key: "kPa", label: "Kilopascal (kPa)", factor: 1000 },
      { key: "bar", label: "Bar", factor: 100000 },
      { key: "psi", label: "PSI", factor: 6894.76 },
      { key: "atm", label: "Atmosphere (atm)", factor: 101325 },
    ],
    commonConversions: [
      { from: "1", to: "14.696", fromUnit: "atm", toUnit: "psi" },
      { from: "1", to: "100", fromUnit: "bar", toUnit: "kPa" },
    ],
  },
  {
    key: "torque",
    label: "Torque",
    units: [
      { key: "Nm", label: "Newton-meter (N·m)", factor: 1 },
      { key: "ftlb", label: "Foot-pound (ft·lb)", factor: 1.35582 },
      { key: "kgfm", label: "kgf·m", factor: 9.80665 },
    ],
    commonConversions: [
      { from: "1", to: "0.73756", fromUnit: "N·m", toUnit: "ft·lb" },
    ],
  },
  {
    key: "voltage",
    label: "Voltage",
    units: [
      { key: "V", label: "Volt (V)", factor: 1 },
      { key: "mV", label: "Millivolt (mV)", factor: 0.001 },
      { key: "kV", label: "Kilovolt (kV)", factor: 1000 },
    ],
    commonConversions: [
      { from: "1", to: "1000", fromUnit: "V", toUnit: "mV" },
      { from: "1", to: "1000", fromUnit: "kV", toUnit: "V" },
    ],
  },
  {
    key: "resistance",
    label: "Resistance",
    units: [
      { key: "ohm", label: "Ohm (Ω)", factor: 1 },
      { key: "kohm", label: "Kilohm (kΩ)", factor: 1000 },
      { key: "Mohm", label: "Megaohm (MΩ)", factor: 1000000 },
    ],
    commonConversions: [
      { from: "1", to: "1000", fromUnit: "kΩ", toUnit: "Ω" },
    ],
  },
];

const EngineeringConverters = () => {
  const [selected, setSelected] = useState(0);
  const cat = categories[selected];

  return (
    <MainLayout>
      <div className="container py-12 md:py-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Engineering Converters</h1>
          </div>
          <p className="text-muted-foreground mb-8">Convert force, pressure, torque, voltage, and resistance.</p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((c, i) => (
            <button
              key={c.key}
              onClick={() => setSelected(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selected === i ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Render the ConverterPage inline content — we'll use our own mini converter */}
      <InlineConverter cat={cat} />
    </MainLayout>
  );
};

// Mini inline converter using the same hook
import { useConverter } from "@/hooks/useConverter";
import { ArrowRightLeft, Copy, Check, Trash2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const InlineConverter = ({ cat }: { cat: EngCategory }) => {
  const { state, setInput, setUnitFrom, setUnitTo, setPrecision, swapUnits, clearInput, result } = useConverter(cat.units);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(String(result.value));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container max-w-3xl pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6">
        <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1.5">From</label>
            <select value={state.unitFrom} onChange={(e) => setUnitFrom(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-2">
              {cat.units.map((u) => <option key={u.key} value={u.key}>{u.label}</option>)}
            </select>
            <input type="number" value={state.input} onChange={(e) => setInput(e.target.value)} placeholder="Enter value" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <button onClick={swapUnits} className="self-center p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"><ArrowRightLeft className="w-4 h-4 text-muted-foreground" /></button>
          <div>
            <label className="block text-sm font-medium mb-1.5">To</label>
            <select value={state.unitTo} onChange={(e) => setUnitTo(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-2">
              {cat.units.map((u) => <option key={u.key} value={u.key}>{u.label}</option>)}
            </select>
            <div className="w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-medium min-h-[38px] flex items-center">
              {result ? <span className="text-primary font-semibold">{result.value}</span> : <span className="text-muted-foreground">—</span>}
            </div>
          </div>
        </div>
        {result && <p className="mt-3 text-xs text-muted-foreground font-mono bg-secondary/50 p-2 rounded">{result.formula}</p>}
        <div className="flex items-center gap-2 mt-4">
          <button onClick={copy} disabled={!result} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium disabled:opacity-50">
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copied ? "Copied" : "Copy"}
          </button>
          <button onClick={clearInput} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80">
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        </div>
        <div className="mt-4">
          <label className="block text-xs text-muted-foreground mb-1">Decimal places: {state.precision}</label>
          <Slider value={[state.precision]} onValueChange={([v]) => setPrecision(v)} min={0} max={10} step={1} className="w-40" />
        </div>
      </motion.div>

      {/* Common conversions table */}
      {cat.commonConversions.length > 0 && (
        <div className="glass-card p-4">
          <h3 className="text-sm font-medium mb-2">Common {cat.label} Conversions</h3>
          <table className="w-full text-sm">
            <tbody>
              {cat.commonConversions.map((row, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="py-2">{row.from} {row.fromUnit}</td>
                  <td className="py-2 text-primary">{row.to} {row.toUnit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EngineeringConverters;
