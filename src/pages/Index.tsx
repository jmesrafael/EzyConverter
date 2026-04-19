import { Link } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { Thermometer, Ruler, Weight, FileImage, FileText, Database, Zap, Clock } from "lucide-react";

const converterCategories = [
  {
    title: "Temperature",
    description: "Convert between Celsius, Fahrenheit, and Kelvin",
    icon: <Thermometer className="w-6 h-6" />,
    path: "/temperature-converter",
  },
  {
    title: "Length",
    description: "Convert between meters, feet, miles, and more",
    icon: <Ruler className="w-6 h-6" />,
    path: "/length-converter",
  },
  {
    title: "Weight",
    description: "Convert between kilograms, pounds, ounces, and more",
    icon: <Weight className="w-6 h-6" />,
    path: "/weight-converter",
  },
  {
    title: "Image",
    description: "Convert and compress images between formats",
    icon: <FileImage className="w-6 h-6" />,
    path: "/image-converter",
  },
  {
    title: "PDF",
    description: "Convert files to and from PDF format",
    icon: <FileText className="w-6 h-6" />,
    path: "/pdf-converter",
  },
  {
    title: "Data",
    description: "Convert between different data units and formats",
    icon: <Database className="w-6 h-6" />,
    path: "/data-converter",
  },
  {
    title: "Engineering",
    description: "Convert engineering units and measurements",
    icon: <Zap className="w-6 h-6" />,
    path: "/engineering-converters",
  },
  {
    title: "Math",
    description: "Mathematical conversions and calculations",
    icon: <Zap className="w-6 h-6" />,
    path: "/math-converters",
  },
  {
    title: "Time",
    description: "Convert between different time units",
    icon: <Clock className="w-6 h-6" />,
    path: "/time-converter",
  },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold">Welcome to Ezy Converter</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, fast, and accurate conversion tools for all your needs. Convert between units, formats, and data types instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {converterCategories.map((converter) => (
            <Link
              key={converter.path}
              to={converter.path}
              className="group p-6 rounded-xl border border-border bg-card hover:bg-primary/5 hover:border-primary/50 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                {converter.icon}
              </div>
              <h2 className="text-lg font-semibold mb-2">{converter.title}</h2>
              <p className="text-sm text-muted-foreground">{converter.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
