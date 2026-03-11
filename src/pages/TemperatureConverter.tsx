import { Thermometer } from "lucide-react";
import { ConverterPage } from "@/components/ConverterPage";

const units = [
  { key: "C", label: "Celsius (°C)", factor: 1 },
  { key: "F", label: "Fahrenheit (°F)", factor: 1 },
  { key: "K", label: "Kelvin (K)", factor: 1 },
];

function customConvert(value: number, from: string, to: string) {
  if (from === to) return { value, formula: `${value} ${from} = ${value} ${to}` };
  const map: Record<string, (v: number) => { r: number; f: string }> = {
    "C-F": (v) => ({ r: v * 9 / 5 + 32, f: `${v}°C × 9/5 + 32` }),
    "F-C": (v) => ({ r: (v - 32) * 5 / 9, f: `(${v}°F - 32) × 5/9` }),
    "C-K": (v) => ({ r: v + 273.15, f: `${v}°C + 273.15` }),
    "K-C": (v) => ({ r: v - 273.15, f: `${v}K - 273.15` }),
    "F-K": (v) => ({ r: (v - 32) * 5 / 9 + 273.15, f: `(${v}°F - 32) × 5/9 + 273.15` }),
    "K-F": (v) => ({ r: (v - 273.15) * 9 / 5 + 32, f: `(${v}K - 273.15) × 9/5 + 32` }),
  };
  const fn = map[`${from}-${to}`];
  if (!fn) return null;
  const { r, f } = fn(value);
  return { value: parseFloat(r.toFixed(4)), formula: `${f} = ${r.toFixed(4)}` };
}

const commonConversions = [
  { from: "0", to: "32", fromUnit: "°C", toUnit: "°F" },
  { from: "100", to: "212", fromUnit: "°C", toUnit: "°F" },
  { from: "37", to: "98.6", fromUnit: "°C", toUnit: "°F" },
  { from: "0", to: "273.15", fromUnit: "°C", toUnit: "K" },
  { from: "-40", to: "-40", fromUnit: "°C", toUnit: "°F" },
];

const educationalContent = [
  { title: "How Temperature Conversion Works", body: "Celsius and Fahrenheit use different scales. Water freezes at 0°C (32°F) and boils at 100°C (212°F). Kelvin starts at absolute zero (-273.15°C), the lowest possible temperature." },
  { title: "Absolute Zero", body: "Absolute zero (0 K or -273.15°C) is the theoretical lowest temperature, where particles have minimal kinetic energy. It has never been fully achieved in experiments." },
];

const programmaticLinks = [
  { label: "Celsius → Fahrenheit", path: "/celsius-to-fahrenheit" },
  { label: "Fahrenheit → Celsius", path: "/fahrenheit-to-celsius" },
  { label: "Celsius → Kelvin", path: "/celsius-to-kelvin" },
  { label: "Kelvin → Celsius", path: "/kelvin-to-celsius" },
  { label: "Fahrenheit → Kelvin", path: "/fahrenheit-to-kelvin" },
  { label: "Kelvin → Fahrenheit", path: "/kelvin-to-fahrenheit" },
];

const TemperatureConverter = () => (
  <ConverterPage
    title="Temperature Converter"
    description="Convert between Celsius, Fahrenheit, and Kelvin."
    icon={<Thermometer className="w-5 h-5 text-primary" />}
    units={units}
    commonConversions={commonConversions}
    educationalContent={educationalContent}
    customConvert={customConvert}
    programmaticLinks={programmaticLinks}
    metaTitle="Temperature Converter – Celsius, Fahrenheit, Kelvin"
    metaDescription="Free online temperature converter. Convert between Celsius, Fahrenheit, and Kelvin instantly."
  />
);

export default TemperatureConverter;
