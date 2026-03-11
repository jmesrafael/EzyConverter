import { motion } from "framer-motion";
import { BookOpen, Ruler, Thermometer, Weight, Clock } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";

const articles = [
  {
    title: "Metric vs Imperial System",
    icon: <Ruler className="w-5 h-5 text-primary" />,
    content: `The metric system (SI) is used by most countries worldwide and is based on powers of 10. The base unit of length is the meter, mass is the kilogram, and temperature is measured in Celsius or Kelvin.\n\nThe imperial system is primarily used in the United States and includes units like inches, feet, miles, pounds, and Fahrenheit. Converting between the two systems requires specific conversion factors — for example, 1 inch = 2.54 centimeters, and 1 pound ≈ 0.4536 kilograms.\n\nThe metric system's decimal-based structure makes arithmetic easier: multiplying or dividing by 10 simply shifts the decimal point.`,
  },
  {
    title: "How Temperature Conversion Works",
    icon: <Thermometer className="w-5 h-5 text-primary" />,
    content: `Temperature scales differ in their zero points and degree sizes.\n\n• Celsius: Water freezes at 0°C and boils at 100°C.\n• Fahrenheit: Water freezes at 32°F and boils at 212°F.\n• Kelvin: Starts at absolute zero (0 K = -273.15°C). There are no negative Kelvin values.\n\nKey formulas:\n• C → F: F = C × 9/5 + 32\n• F → C: C = (F - 32) × 5/9\n• C → K: K = C + 273.15\n\nFahrenheit degrees are smaller than Celsius degrees — a 1°C change equals a 1.8°F change.`,
  },
  {
    title: "Why Engineers Use SI Units",
    icon: <Weight className="w-5 h-5 text-primary" />,
    content: `The International System of Units (SI) is the standard for engineering and science because it provides a coherent, universally accepted framework.\n\nSI avoids confusion: 1 Newton is always 1 kg·m/s², regardless of location. Engineering calculations involving force, pressure, torque, and energy all link together cleanly in SI.\n\nThe Mars Climate Orbiter was famously lost because one team used imperial units while another used metric — a $125 million lesson in the importance of unit consistency.`,
  },
  {
    title: "History of Measurement Units",
    icon: <Clock className="w-5 h-5 text-primary" />,
    content: `Early measurement systems were based on the human body — a "foot" was literally the length of a foot, and a "cubit" was the distance from elbow to fingertip.\n\nThe French Revolution led to the creation of the metric system in 1795, aiming for a universal, rational system. The meter was defined as one ten-millionth of the distance from the equator to the North Pole.\n\nToday, SI units are defined by fundamental physical constants: the meter by the speed of light, the kilogram by the Planck constant, and the second by cesium atom vibrations.`,
  },
  {
    title: "Understanding Digital Storage Units",
    icon: <BookOpen className="w-5 h-5 text-primary" />,
    content: `Digital storage is measured in bits and bytes. A bit is the smallest unit (0 or 1), and a byte is 8 bits.\n\nThe binary standard used in computing defines:\n• 1 KB = 1,024 bytes\n• 1 MB = 1,048,576 bytes\n• 1 GB = 1,073,741,824 bytes\n\nHowever, storage manufacturers often use the decimal standard (1 KB = 1,000 bytes), which is why a "500 GB" hard drive shows less capacity in your operating system.\n\nThe IEC introduced unambiguous prefixes: KiB (kibibyte), MiB (mebibyte), GiB (gibibyte) for binary, but these are rarely used in consumer contexts.`,
  },
];

const GuidesPage = () => (
  <MainLayout>
    <div className="container py-12 md:py-20 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Guides & Articles</h1>
        </div>
        <p className="text-muted-foreground mb-8">Learn about units, conversions, and the history of measurement.</p>
      </motion.div>

      <div className="space-y-6">
        {articles.map((a, i) => (
          <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              {a.icon}
              <h2 className="text-lg font-semibold">{a.title}</h2>
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{a.content}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </MainLayout>
);

export default GuidesPage;
