import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const GradientInput = ({type, value, placeholder, id, name, onChange}) => {
  return (
    <motion.div
      className="flex justify-center items-center "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        name={name}
        className="p-2 text-white border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2 focus:ring-offset-transparent bg-transparent placeholder-gray-400
          transition-all duration-300
          ring-2 ring-transparent
          focus:ring-gradient-to-r focus:ring-from-blue-500 focus:ring-to-purple-500
          shadow-lg shadow-blue-500/50
          hover:shadow-xl hover:shadow-indo_blue/50
          "
      />
      <style>{`
        input {
          background: transparent;
          border-image: linear-gradient(to right, #00e380, #0071bc) 1;
          box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </motion.div>
  );
};

export default GradientInput;
