import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const menuItems = [
  { label: "INICIO", path: "/" },
  { label: "NOTICIAS", path: "/noticias" },
  { label: "RANKING", path: "/ranking" },
  { label: "CONTACTANOS", path: "/contacto" },
  { label: "NOSOTROS", path: "/about" },
];

const itemVariants = { 
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const Menu = () => {
  return (
    <motion.ul
      className="flex flex-row gap-6 text-sm font-bold"
      initial="hidden"
      animate="visible"
    >
      {menuItems.map((item, i) => (
        <motion.li key={item.label} custom={i} variants={itemVariants} className="">
          {item.path.startsWith("/") ? (
            <Link
              to={item.path}
              className="group relative transition-colors duration-300"
            >
              <span className="hover:text-indo_green transition-colors duration-300">
                {item.label}
              </span>
              <span
                className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indo_green transition-all duration-300 group-hover:w-full"
              />
            </Link>
          ) : (
            <a
              href={item.path}
              className="group relative transition-colors duration-300"
            >
              <span className="hover:text-indo_green transition-colors duration-300">
                {item.label}
              </span>
              <span
                className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indo_green transition-all duration-300 group-hover:w-full"
              />
            </a>
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Menu;

