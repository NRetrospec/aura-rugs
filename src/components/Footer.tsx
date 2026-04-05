import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 bg-background/80 backdrop-blur-lg mt-20">
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-display text-xl font-bold">
          <span className="text-gradient-psychedelic">FLY</span>
          <span className="text-foreground"> STUFF ONLY</span>
        </div>
        <div className="flex gap-8 text-sm text-muted-foreground font-body">
          <Link to="/booking" className="hover:text-foreground transition-colors">Custom Orders</Link>
          <Link to="/process" className="hover:text-foreground transition-colors">Process</Link>
        </div>
        <p className="text-xs text-muted-foreground font-body">
          © 2026 Fly Stuff Only. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
