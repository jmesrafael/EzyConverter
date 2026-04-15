import { Clock } from "lucide-react";
import { ConverterPage } from "@/components/ConverterPage";

const units = [
  { key: "s", label: "Second (s)", factor: 1 },
  { key: "min", label: "Minute (min)", factor: 60 },
  { key: "h", label: "Hour (h)", factor: 3600 },
  { key: "d", label: "Day (d)", factor: 86400 },
  { key: "wk", label: "Week (wk)", factor: 604800 },
  { key: "mo", label: "Month (mo)", factor: 2592000 },
  { key: "yr", label: "Year (yr)", factor: 31536000 },
];

const commonConversions = [
  { from: "1", to: "60", fromUnit: "min", toUnit: "s" },
  { from: "1", to: "24", fromUnit: "d", toUnit: "h" },
  { from: "1", to: "7", fromUnit: "wk", toUnit: "d" },
  { from: "1", to: "365", fromUnit: "yr", toUnit: "d" },
  { from: "1", to: "8760", fromUnit: "yr", toUnit: "h" },
];

const educationalContent = [
  { title: "How Time Units Relate", body: "Time is measured in seconds (SI base unit). 60 seconds make a minute, 60 minutes make an hour, and 24 hours make a day. A year is approximately 365.25 days." },
];

const programmaticLinks = [
  { label: "Seconds → Minutes", path: "/seconds-to-minutes" },
  { label: "Minutes → Hours", path: "/minutes-to-hours" },
  { label: "Hours → Days", path: "/hours-to-days" },
  { label: "Days → Weeks", path: "/days-to-weeks" },
  { label: "Weeks → Months", path: "/weeks-to-months" },
  { label: "Days → Years", path: "/days-to-years" },
];

const TimeConverter = () => (
  <ConverterPage
    title="Time Converter"
    description="Convert between seconds, minutes, hours, days, weeks, months, and years."
    icon={<Clock className="w-5 h-5 text-primary" />}
    units={units}
    commonConversions={commonConversions}
    educationalContent={educationalContent}
    programmaticLinks={programmaticLinks}
    metaTitle="Time Converter – Seconds, Minutes, Hours, Days"
    metaDescription="Free online time converter. Convert between seconds, minutes, hours, days, weeks, months, and years."
  />
);

export default TimeConverter;
