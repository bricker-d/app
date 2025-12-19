import { PersonaDemo } from "@/components/PersonaDemo";
import { Button } from "@/components/ui/button";
import { Activity, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Demo = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border/20">
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
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <Link to="/"><Button variant="ghost" size="sm" className="font-light text-foreground/70 hover:text-primary transition-all duration-300 hover:bg-primary/5">Home</Button></Link>
              <Link to="/features"><Button variant="ghost" size="sm" className="font-light text-foreground/70 hover:text-primary transition-all duration-300 hover:bg-primary/5">Features</Button></Link>
              <Link to="/science"><Button variant="ghost" size="sm" className="font-light text-foreground/70 hover:text-primary transition-all duration-300 hover:bg-primary/5">Science</Button></Link>
              <Link to="/pricing"><Button variant="ghost" size="sm" className="font-light text-foreground/70 hover:text-primary transition-all duration-300 hover:bg-primary/5">Pricing</Button></Link>
              <Button size="sm" className="shadow-neon hover:shadow-glow transition-all duration-300">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content with top padding for fixed nav */}
      <div className="pt-16">
        <PersonaDemo />
      </div>
    </div>
  );
};

export default Demo;