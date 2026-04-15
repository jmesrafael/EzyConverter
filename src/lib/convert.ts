// Universal conversion engine
import { findUnitBySlug, type UnitDef, type CategoryDef } from "./conversionData";

export interface ConversionResult {
  value: number;
  formula: string;
  fromUnit: UnitDef;
  toUnit: UnitDef;
  category: CategoryDef;
}

function convertTemperature(value: number, from: string, to: string): { value: number; formula: string } | null {
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
  return { value: parseFloat(r.toFixed(6)), formula: `${f} = ${r.toFixed(6)}` };
}

/**
 * Universal converter — works with slugs or keys.
 */
export function convertValue(
  value: number,
  fromSlug: string,
  toSlug: string,
  precision = 6
): ConversionResult | null {
  const fromInfo = findUnitBySlug(fromSlug);
  const toInfo = findUnitBySlug(toSlug);
  if (!fromInfo || !toInfo) return null;
  if (fromInfo.category.key !== toInfo.category.key) return null;

  const cat = fromInfo.category;
  const from = fromInfo.unit;
  const to = toInfo.unit;

  if (cat.custom && cat.key === "temperature") {
    const tempResult = convertTemperature(value, from.key, to.key);
    if (!tempResult) return null;
    return { ...tempResult, fromUnit: from, toUnit: to, category: cat };
  }

  const converted = value * (from.factor / to.factor);
  const rounded = parseFloat(converted.toFixed(precision));
  return {
    value: rounded,
    formula: `${value} ${from.label} × (${from.factor} / ${to.factor}) = ${rounded} ${to.label}`,
    fromUnit: from,
    toUnit: to,
    category: cat,
  };
}
