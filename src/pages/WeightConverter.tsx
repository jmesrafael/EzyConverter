import { Weight } from "lucide-react";
import { ConverterPage } from "@/components/ConverterPage";

const units = [
  { key: "kg", label: "Kilogram (kg)", factor: 1 },
  { key: "g", label: "Gram (g)", factor: 0.001 },
  { key: "mg", label: "Milligram (mg)", factor: 0.000001 },
  { key: "lb", label: "Pound (lb)", factor: 0.453592 },
  { key: "oz", label: "Ounce (oz)", factor: 0.0283495 },
  { key: "t", label: "Metric Ton (t)", factor: 1000 },
];

const commonConversions = [
  { from: "1", to: "2.20462", fromUnit: "kg", toUnit: "lb" },
  { from: "1", to: "35.274", fromUnit: "kg", toUnit: "oz" },
  { from: "1", to: "1000", fromUnit: "kg", toUnit: "g" },
  { from: "1", to: "16", fromUnit: "lb", toUnit: "oz" },
  { from: "1", to: "0.453592", fromUnit: "lb", toUnit: "kg" },
];

const educationalContent = [
  { title: "Mass vs Weight", body: "Mass is a measure of the amount of matter, while weight is the force exerted by gravity on that mass. On Earth, 1 kg has a weight of about 9.8 Newtons." },
  { title: "Why SI Uses Kilograms", body: "The kilogram is the SI base unit of mass. It was originally defined as the mass of one liter of water at 4°C and is now defined by the Planck constant." },
];

const programmaticLinks = [
  { label: "Kg → Lbs", path: "/kg-to-lbs" },
  { label: "Lbs → Kg", path: "/lbs-to-kg" },
  { label: "Kg → Grams", path: "/kg-to-grams" },
  { label: "Ounces → Grams", path: "/ounces-to-grams" },
  { label: "Grams → Ounces", path: "/grams-to-ounces" },
  { label: "Lbs → Ounces", path: "/lbs-to-ounces" },
];

const WeightConverter = () => (
  <ConverterPage
    title="Weight Converter"
    description="Convert between kilograms, pounds, ounces, grams, and more."
    icon={<Weight className="w-5 h-5 text-primary" />}
    units={units}
    commonConversions={commonConversions}
    educationalContent={educationalContent}
    programmaticLinks={programmaticLinks}
    metaTitle="Weight Converter – Kilograms, Pounds, Ounces"
    metaDescription="Free online weight converter. Convert between kilograms, pounds, ounces, grams and metric tons."
  />
);

export default WeightConverter;
