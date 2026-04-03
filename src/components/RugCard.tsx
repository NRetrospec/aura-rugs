import { motion } from "framer-motion";

interface RugCardProps {
  name: string;
  price: number;
  image: string;
  index: number;
}

const RugCard = ({ name, price, image, index }: RugCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -12, rotateY: 5, rotateX: -3 }}
      className="group relative"
      style={{ perspective: "1000px" }}
    >
      <div className="relative overflow-hidden rounded-lg bg-card border border-border/50 transition-shadow duration-500 group-hover:glow-pink">
        <div className="aspect-[3/4] overflow-hidden">
          <motion.img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">{name}</h3>
          <p className="font-body text-primary font-medium text-lg">${price.toLocaleString()}</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 w-full py-3 rounded-md bg-gradient-psychedelic text-accent-foreground font-body font-semibold text-sm uppercase tracking-wider transition-all duration-300"
          >
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RugCard;
