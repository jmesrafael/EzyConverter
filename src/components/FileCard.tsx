import { motion } from "framer-motion";
import { FileText, X, Image, Download, Loader2, Check, Clock } from "lucide-react";

export type FileStatus = "pending" | "converting" | "completed";

interface FileCardProps {
  name: string;
  size: string;
  type: "image" | "pdf";
  status?: FileStatus;
  convertedSize?: string;
  previewUrl?: string;
  onRemove?: () => void;
  onDownload?: () => void;
}

export const FileCard = ({ name, size, type, status, convertedSize, previewUrl, onRemove, onDownload }: FileCardProps) => {
  const Icon = type === "image" ? Image : FileText;

  const statusConfig: Record<FileStatus, { icon: React.ReactNode; label: string; className: string }> = {
    pending: {
      icon: <Clock className="w-3.5 h-3.5" />,
      label: "Pending",
      className: "text-muted-foreground bg-muted",
    },
    converting: {
      icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
      label: "Converting",
      className: "text-primary bg-primary/10",
    },
    completed: {
      icon: <Check className="w-3.5 h-3.5" />,
      label: "Completed",
      className: "text-green-600 bg-green-500/10 dark:text-green-400",
    },
  };

  const currentStatus = status ? statusConfig[status] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="glass-card flex items-center gap-4 p-4"
    >
      {previewUrl ? (
        <img
          src={previewUrl}
          alt={name}
          className="w-16 h-16 object-cover rounded-lg shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{size}</span>
          {convertedSize && (
            <>
              <span>→</span>
              <span className="text-primary font-medium">{convertedSize}</span>
            </>
          )}
        </div>
      </div>
      {currentStatus && (
        <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${currentStatus.className}`}>
          {currentStatus.icon}
          {currentStatus.label}
        </div>
      )}
      <div className="flex items-center gap-1 shrink-0">
        {onDownload && status === "completed" && (
          <button
            onClick={onDownload}
            className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        )}
        {onRemove && (
          <button
            onClick={onRemove}
            className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
