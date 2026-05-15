import { motion } from "framer-motion";

const gradienteButon = ({ placeholder, texto, disabled }) => {
  return (
    <motion.div
      className="flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        type="submit"
        placeholder={placeholder}
        disabled={disabled}
        className="p-2 text-white bg-black bg-opacity-15 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2 focus:ring-offset-transparent bg-transparent placeholder-gray-400
          transition-all duration-300
          ring-2 ring-transparent
          focus:ring-gradient-to-r focus:ring-from-blue-500 focus:ring-to-purple-500
          shadow-lg shadow-blue-500/50
          hover:shadow-xl hover:shadow-indo_blue/50
          "
      >
        {texto}
      </button>

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

export default gradienteButon;
