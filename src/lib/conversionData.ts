// Central unit configuration — single source of truth for all converters.
// Adding a new category (e.g. speed, area, volume) requires only adding an entry here.

export interface UnitDef {
  key: string;
  label: string;
  slug: string; // URL-friendly name e.g. "meters"
  factor: number; // relative to category base unit
}

export interface CategoryDef {
  key: string;
  label: string;
  slug: string; // e.g. "length"
  baseUnit: string; // key of the base unit
  icon: string; // lucide icon name
  route: string; // category page route
  units: UnitDef[];
  /** If true, uses custom conversion (e.g. temperature) */
  custom?: boolean;
}

export const categories: CategoryDef[] = [
  {
    key: "length",
    label: "Length",
    slug: "length",
    baseUnit: "m",
    icon: "Ruler",
    route: "/length-converter",
    units: [
      { key: "m", label: "Meter (m)", slug: "meters", factor: 1 },
      { key: "km", label: "Kilometer (km)", slug: "kilometers", factor: 1000 },
      { key: "cm", label: "Centimeter (cm)", slug: "centimeters", factor: 0.01 },
      { key: "mm", label: "Millimeter (mm)", slug: "millimeters", factor: 0.001 },
      { key: "mi", label: "Mile (mi)", slug: "miles", factor: 1609.34 },
      { key: "yd", label: "Yard (yd)", slug: "yards", factor: 0.9144 },
      { key: "ft", label: "Foot (ft)", slug: "feet", factor: 0.3048 },
      { key: "in", label: "Inch (in)", slug: "inches", factor: 0.0254 },
    ],
  },
  {
    key: "weight",
    label: "Weight",
    slug: "weight",
    baseUnit: "kg",
    icon: "Weight",
    route: "/weight-converter",
    units: [
      { key: "kg", label: "Kilogram (kg)", slug: "kg", factor: 1 },
      { key: "g", label: "Gram (g)", slug: "grams", factor: 0.001 },
      { key: "mg", label: "Milligram (mg)", slug: "milligrams", factor: 0.000001 },
      { key: "lb", label: "Pound (lb)", slug: "lbs", factor: 0.453592 },
      { key: "oz", label: "Ounce (oz)", slug: "ounces", factor: 0.0283495 },
      { key: "t", label: "Metric Ton (t)", slug: "metric-tons", factor: 1000 },
    ],
  },
  {
    key: "temperature",
    label: "Temperature",
    slug: "temperature",
    baseUnit: "C",
    icon: "Thermometer",
    route: "/temperature-converter",
    custom: true,
    units: [
      { key: "C", label: "Celsius (°C)", slug: "celsius", factor: 1 },
      { key: "F", label: "Fahrenheit (°F)", slug: "fahrenheit", factor: 1 },
      { key: "K", label: "Kelvin (K)", slug: "kelvin", factor: 1 },
    ],
  },
  {
    key: "time",
    label: "Time",
    slug: "time",
    baseUnit: "s",
    icon: "Clock",
    route: "/time-converter",
    units: [
      { key: "s", label: "Second (s)", slug: "seconds", factor: 1 },
      { key: "min", label: "Minute (min)", slug: "minutes", factor: 60 },
      { key: "h", label: "Hour (h)", slug: "hours", factor: 3600 },
      { key: "d", label: "Day (d)", slug: "days", factor: 86400 },
      { key: "wk", label: "Week (wk)", slug: "weeks", factor: 604800 },
      { key: "mo", label: "Month (mo)", slug: "months", factor: 2592000 },
      { key: "yr", label: "Year (yr)", slug: "years", factor: 31536000 },
    ],
  },
  {
    key: "data",
    label: "Data Storage",
    slug: "data",
    baseUnit: "byte",
    icon: "HardDrive",
    route: "/data-converter",
    units: [
      { key: "bit", label: "Bit", slug: "bits", factor: 0.125 },
      { key: "byte", label: "Byte", slug: "bytes", factor: 1 },
      { key: "KB", label: "Kilobyte (KB)", slug: "kb", factor: 1024 },
      { key: "MB", label: "Megabyte (MB)", slug: "mb", factor: 1048576 },
      { key: "GB", label: "Gigabyte (GB)", slug: "gb", factor: 1073741824 },
      { key: "TB", label: "Terabyte (TB)", slug: "tb", factor: 1099511627776 },
    ],
  },
  {
    key: "speed",
    label: "Speed",
    slug: "speed",
    baseUnit: "m/s",
    icon: "Gauge",
    route: "/speed-converter",
    units: [
      { key: "m/s", label: "Meters/second (m/s)", slug: "meters-per-second", factor: 1 },
      { key: "km/h", label: "Kilometers/hour (km/h)", slug: "kilometers-per-hour", factor: 0.277778 },
      { key: "mph", label: "Miles/hour (mph)", slug: "miles-per-hour", factor: 0.44704 },
      { key: "kn", label: "Knot (kn)", slug: "knots", factor: 0.514444 },
      { key: "ft/s", label: "Feet/second (ft/s)", slug: "feet-per-second", factor: 0.3048 },
    ],
  },
  {
    key: "area",
    label: "Area",
    slug: "area",
    baseUnit: "m2",
    icon: "Square",
    route: "/area-converter",
    units: [
      { key: "m2", label: "Square Meter (m²)", slug: "square-meters", factor: 1 },
      { key: "km2", label: "Square Kilometer (km²)", slug: "square-kilometers", factor: 1000000 },
      { key: "ft2", label: "Square Foot (ft²)", slug: "square-feet", factor: 0.092903 },
      { key: "acre", label: "Acre", slug: "acres", factor: 4046.86 },
      { key: "ha", label: "Hectare (ha)", slug: "hectares", factor: 10000 },
    ],
  },
  {
    key: "volume",
    label: "Volume",
    slug: "volume",
    baseUnit: "L",
    icon: "Beaker",
    route: "/volume-converter",
    units: [
      { key: "L", label: "Liter (L)", slug: "liters", factor: 1 },
      { key: "mL", label: "Milliliter (mL)", slug: "milliliters", factor: 0.001 },
      { key: "gal", label: "US Gallon (gal)", slug: "gallons", factor: 3.78541 },
      { key: "qt", label: "US Quart (qt)", slug: "quarts", factor: 0.946353 },
      { key: "pt", label: "US Pint (pt)", slug: "pints", factor: 0.473176 },
      { key: "cup", label: "US Cup", slug: "cups", factor: 0.236588 },
      { key: "fl_oz", label: "US Fluid Ounce", slug: "fluid-ounces", factor: 0.0295735 },
      { key: "m3", label: "Cubic Meter (m³)", slug: "cubic-meters", factor: 1000 },
    ],
  },
  {
    key: "energy",
    label: "Energy",
    slug: "energy",
    baseUnit: "J",
    icon: "Flame",
    route: "/energy-converter",
    units: [
      { key: "J", label: "Joule (J)", slug: "joules", factor: 1 },
      { key: "kJ", label: "Kilojoule (kJ)", slug: "kilojoules", factor: 1000 },
      { key: "cal", label: "Calorie (cal)", slug: "calories", factor: 4.184 },
      { key: "kcal", label: "Kilocalorie (kcal)", slug: "kilocalories", factor: 4184 },
      { key: "Wh", label: "Watt-hour (Wh)", slug: "watt-hours", factor: 3600 },
      { key: "kWh", label: "Kilowatt-hour (kWh)", slug: "kilowatt-hours", factor: 3600000 },
      { key: "BTU", label: "BTU", slug: "btu", factor: 1055.06 },
    ],
  },
  {
    key: "pressure",
    label: "Pressure",
    slug: "pressure",
    baseUnit: "Pa",
    icon: "Gauge",
    route: "/pressure-converter",
    units: [
      { key: "Pa", label: "Pascal (Pa)", slug: "pascals", factor: 1 },
      { key: "kPa", label: "Kilopascal (kPa)", slug: "kilopascals", factor: 1000 },
      { key: "bar", label: "Bar", slug: "bar", factor: 100000 },
      { key: "atm", label: "Atmosphere (atm)", slug: "atmospheres", factor: 101325 },
      { key: "psi", label: "PSI", slug: "psi", factor: 6894.76 },
      { key: "mmHg", label: "mmHg", slug: "mmhg", factor: 133.322 },
    ],
  },
];

// ── Lookup helpers ──────────────────────────────────────────────────────────

/** slug → unit definition */
const _slugToUnit = new Map<string, { unit: UnitDef; category: CategoryDef }>();
/** key (lowercase) → unit definition (fallback) */
const _keyToUnit = new Map<string, { unit: UnitDef; category: CategoryDef }>();

for (const cat of categories) {
  for (const u of cat.units) {
    _slugToUnit.set(u.slug.toLowerCase(), { unit: u, category: cat });
    _keyToUnit.set(u.key.toLowerCase(), { unit: u, category: cat });
  }
}

export function findUnitBySlug(slug: string) {
  return _slugToUnit.get(slug.toLowerCase()) ?? _keyToUnit.get(slug.toLowerCase()) ?? null;
}

export function getAllProgrammaticRoutes(): { from: UnitDef; to: UnitDef; category: CategoryDef; path: string }[] {
  const routes: { from: UnitDef; to: UnitDef; category: CategoryDef; path: string }[] = [];
  for (const cat of categories) {
    for (const from of cat.units) {
      for (const to of cat.units) {
        if (from.key !== to.key) {
          routes.push({ from, to, category: cat, path: `/${from.slug}-to-${to.slug}` });
        }
      }
    }
  }
  return routes;
}
