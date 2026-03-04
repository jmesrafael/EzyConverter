import { Github, Twitter, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ezy Converter. Made with{" "}
          <Heart className="inline w-3.5 h-3.5 text-destructive" />
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
