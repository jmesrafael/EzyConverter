import { motion } from "framer-motion";

interface ConversionTableProps {
  fromLabel: string;
  toLabel: string;
  rows: { from: number; to: string }[];
}

export const ConversionTable = ({ fromLabel, toLabel, rows }: ConversionTableProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">{fromLabel}</th>
            <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">{toLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
              <td className="py-2.5 px-3 font-medium">{row.from}</td>
              <td className="py-2.5 px-3 text-primary font-semibold">{row.to}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};
