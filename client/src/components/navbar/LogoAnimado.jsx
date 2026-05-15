//import Logo from "../../assets/logo_i_nega.svg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const LogoAnimado = () => {
  const { scrollYProgress } = useScroll();
  const [scrollValue, setScrollValue] = useState(0);
  const [dotLottie, setDotLottie] = useState(null);
  const { pathname } = useLocation();

  const dotLottieRefCallback = (dotLottie) => {
    setDotLottie(dotLottie);
  };

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setScrollValue(v); // Guarda el valor en la variable de estado
    });

    return () => unsubscribe(); // Limpia el listener
  }, [scrollYProgress]);

  if (scrollValue != 0) {
    if (dotLottie) {
      dotLottie.play();
    }
  }
  if (scrollValue == 0) {
    if (dotLottie) {
      dotLottie.setFrame(1);
      dotLottie.stop();
    }
  }

  return (
    <motion.div
      animate={{ scale: scrollValue != 0 ? 1 : 0.9 }} // o width/height si es más adecuado
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={pathname === "/" ? scrollValue != 0 ? "h-12" : "h-20 2xl:h-24 :h-24": "h-12"}
    >
      <DotLottieReact
        src="https://lottie.host/80c6e1ae-3945-4e5e-95a0-78ba8620e587/2jvCylBpIK.json"
        dotLottieRefCallback={dotLottieRefCallback}
      />
    </motion.div>
  );
};

export default LogoAnimado;
