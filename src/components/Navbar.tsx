import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/booking", label: "Custom Order" },
  { path: "/process", label: "Process" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 pb-5"
    >
      <div className="flex items-center justify-evenly px-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative font-body text-base md:text-lg uppercase tracking-widest transition-all duration-300 py-3 ${
              location.pathname === item.path
                ? "text-primary [filter:drop-shadow(0_0_10px_hsl(328_100%_60%_/_0.9))]"
                : "text-foreground/80 hover:text-primary hover:[filter:drop-shadow(0_0_8px_hsl(328_100%_60%_/_0.5))]"
            }`}
          >
            {item.label}
            {location.pathname === item.path && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -top-0.5 left-0 right-0 h-0.5 bg-gradient-psychedelic rounded-full"
              />
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
