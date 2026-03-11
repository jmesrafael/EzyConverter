import { Ruler } from "lucide-react";
import { ConverterPage } from "@/components/ConverterPage";

const units = [
  { key: "m", label: "Meter (m)", factor: 1 },
  { key: "km", label: "Kilometer (km)", factor: 1000 },
  { key: "cm", label: "Centimeter (cm)", factor: 0.01 },
  { key: "mm", label: "Millimeter (mm)", factor: 0.001 },
  { key: "mi", label: "Mile (mi)", factor: 1609.34 },
  { key: "yd", label: "Yard (yd)", factor: 0.9144 },
  { key: "ft", label: "Foot (ft)", factor: 0.3048 },
  { key: "in", label: "Inch (in)", factor: 0.0254 },
];

const commonConversions = [
  { from: "1", to: "3.28084", fromUnit: "m", toUnit: "ft" },
  { from: "1", to: "0.621371", fromUnit: "km", toUnit: "mi" },
  { from: "1", to: "2.54", fromUnit: "in", toUnit: "cm" },
  { from: "1", to: "1.09361", fromUnit: "m", toUnit: "yd" },
  { from: "1", to: "1000", fromUnit: "km", toUnit: "m" },
  { from: "1", to: "12", fromUnit: "ft", toUnit: "in" },
];

const educationalContent = [
  { title: "Metric vs Imperial", body: "The metric system uses meters, centimeters, and kilometers, while the imperial system uses inches, feet, and miles. The metric system is based on powers of 10, making conversions straightforward." },
  { title: "History of the Meter", body: "The meter was originally defined in 1793 as one ten-millionth of the distance from the equator to the North Pole. Today, it is defined by the speed of light in a vacuum." },
];

const programmaticLinks = [
  { label: "Meters → Feet", path: "/meters-to-feet" },
  { label: "Feet → Meters", path: "/feet-to-meters" },
  { label: "Kilometers → Miles", path: "/kilometers-to-miles" },
  { label: "Miles → Kilometers", path: "/miles-to-kilometers" },
  { label: "Inches → Centimeters", path: "/inches-to-centimeters" },
  { label: "Centimeters → Inches", path: "/centimeters-to-inches" },
  { label: "Yards → Meters", path: "/yards-to-meters" },
  { label: "Feet → Inches", path: "/feet-to-inches" },
];

const LengthConverter = () => (
  <ConverterPage
    title="Length Converter"
    description="Convert between metric and imperial length units instantly."
    icon={<Ruler className="w-5 h-5 text-primary" />}
    units={units}
    commonConversions={commonConversions}
    educationalContent={educationalContent}
    programmaticLinks={programmaticLinks}
    metaTitle="Length Converter – Meters, Feet, Miles, Inches"
    metaDescription="Free online length converter. Convert between meters, kilometers, feet, miles, inches, and more."
  />
);

export default LengthConverter;
