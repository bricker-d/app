import { Button } from "@/components/ui/button";
import { Activity, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  title?: string;
  description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <header className="fixed top-0 w-full z-50 glass-effect border-b border-border/20 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 hover:scale-105">
            <div className="relative">
              <Activity className="h-6 w-6 text-primary pulse-gentle" />
              <div className="absolute inset-0 h-6 w-6 bg-primary/20 rounded-full animate-ping"></div>
            </div>
            <span className="text-xl font-light tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BioPrecision
            </span>
          </Link>
          
          <Link to="/">
            <Button variant="ghost" size="sm" className="font-light text-foreground/70 hover:text-primary transition-all duration-300">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>
        
        {(title || description) && (
          <div className="mt-4 sm:mt-6 pb-2">
            {title && <h1 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h1>}
            {description && <p className="text-sm sm:text-base text-muted-foreground">{description}</p>}
          </div>
        )}
      </div>
    </header>
  );
};
