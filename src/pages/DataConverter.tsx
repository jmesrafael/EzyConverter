import { HardDrive } from "lucide-react";
import { ConverterPage } from "@/components/ConverterPage";

const units = [
  { key: "bit", label: "Bit", factor: 0.125 },
  { key: "byte", label: "Byte (B)", factor: 1 },
  { key: "KB", label: "Kilobyte (KB)", factor: 1024 },
  { key: "MB", label: "Megabyte (MB)", factor: 1048576 },
  { key: "GB", label: "Gigabyte (GB)", factor: 1073741824 },
  { key: "TB", label: "Terabyte (TB)", factor: 1099511627776 },
];

const commonConversions = [
  { from: "1", to: "1024", fromUnit: "KB", toUnit: "B" },
  { from: "1", to: "1024", fromUnit: "MB", toUnit: "KB" },
  { from: "1", to: "1024", fromUnit: "GB", toUnit: "MB" },
  { from: "1", to: "1024", fromUnit: "TB", toUnit: "GB" },
  { from: "1", to: "8", fromUnit: "B", toUnit: "bit" },
];

const educationalContent = [
  { title: "Binary vs Decimal", body: "In computing, storage uses binary (base-2): 1 KB = 1024 bytes. The decimal standard (SI) defines 1 KB = 1000 bytes. This converter uses the binary standard." },
  { title: "Common Storage Sizes", body: "A typical text file is a few KB. A high-resolution photo is 2-10 MB. A movie can be 1-5 GB. Modern hard drives are measured in TB." },
];

const DataConverter = () => (
  <ConverterPage
    title="Data Storage Converter"
    description="Convert between bits, bytes, kilobytes, megabytes, gigabytes, and terabytes."
    icon={<HardDrive className="w-5 h-5 text-primary" />}
    units={units}
    commonConversions={commonConversions}
    educationalContent={educationalContent}
    metaTitle="Data Storage Converter – Bytes, KB, MB, GB, TB"
    metaDescription="Free online data storage converter. Convert between bits, bytes, KB, MB, GB, and TB using binary standard."
  />
);

export default DataConverter;
