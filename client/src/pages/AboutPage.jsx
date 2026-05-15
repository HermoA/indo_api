// RadioHistory.jsx
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import f1 from "../assets/FOTOS RADIO/CABINA.jpg";
import f2 from "../assets/FOTOS RADIO/ANGEL COLQUE.jpg";
import g1 from "../assets/FOTOS RADIO/NINOSKA BASPINEYRO.jpg";
import logo from "../assets/FOTOS RADIO/PRIMER LOGO.jpg";
import Galeria from "../components/about/Galeria";

const AboutPage = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // más cinematográfico
      smooth: true,
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="bg-indo_gray text-white min-h-screen sm:pt-24 pt-16">
      <div className="h-2"></div>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto space-y-6 flex flex-col justify-center items-center px-5"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center text-indo_green">
          Historia de Radio Indoamérica
        </h1>
        <img src={logo} alt="Logo Radio Indoamérica" className="w-80" />
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-lg leading-relaxed text-justify whitespace-pre-line px-5 sm:px-0"
        >
          {`Escribir la historia de cualquier actividad resulta una tarea complicada, aunque no imposible, más aún si se trata de un medio de comunicación que, en su brillante trayectoria, ha prestado y continúa ofreciendo invalorables servicios a la colectividad y, específicamente, a su pueblo.
Fue en el año 1942 cuando las ondas jóvenes e inquietas de esta emisora surcaron por primera vez los limpios cielos de Potosí. Un 4 de julio de aquel año, a las 20:00 horas, RADIO INDOAMÉRICA inició oficialmente sus emisiones. Las primeras señales salieron desde el edificio ubicado en las calles Bolívar y Junín, cuya planta baja estaba ocupada por la firma Casa Grace y Cía. Personalidades notables del ámbito político y cultural acompañaron aquella noche de inauguración, al igual que la población potosina, que aguardaba con gran expectativa la apertura de este nuevo medio de comunicación.`}
        </motion.p>
        <motion.div
          whileInView={{ y: [50, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.img
            src={f1}
            alt="Foto 1"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="rounded-xl shadow-xl w-10/12 mx-auto"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-lg leading-relaxed text-justify whitespace-pre-line"
        >
          {`Su primer director y propietario fue el señor Marco Antonio Careaga B., quien inauguró RADIO INDOAMÉRICA con el sugestivo lema: “La voz de la juventud al servicio de la cultura y el deporte”. Como anécdota histórica, se recuerda que el primer micrófono utilizado en la emisora fue construido artesanalmente por el mismo Careaga, y prestó servicio durante mucho tiempo.
A lo largo de estos 83 años de vida, INDOAMÉRICA se ha consolidado como una verdadera Escuela de Locutores. Varias generaciones de radialistas se formaron entre sus micrófonos, muchos de los cuales llegaron a fundar sus propios medios de comunicación o aportaron con su talento a otras emisoras del departamento.
Figuras como Víctor Hugo Baspineyro, Agustín Padilla, Agustín Vera, Walter Zabala, Heriberto Abastoflor, Javier Ossio, Ciro de Ferrari, Hugo Mendívil, Augusto Ibañez, Antonio Barriga, Guido Rojas Villagómez, Mario Hurtado, Jaime Garabito, Julio Fajardo, Gonzalo Calderón, Benigno “Dinky” Castillo, Ramiro Almendras, Roberto Gonzáles Mariscal, Miguel Coro, Jorge Vidaurre y otros connotados comunicadores como Juan José Baspineyro, Gustavo Salinas, Jeraldo Gutiérrez, Johnny Puma, Ricardo Velásquez, Richard Montecinos, Johan Sánchez y muchos más han aportado significativamente al crecimiento de INDOAMÉRICA.`}
        </motion.p>
        <motion.div
          whileInView={{ y: [50, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.img
            src={f2}
            alt="Foto 2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="rounded-xl shadow-xl w-10/12 mx-auto"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-lg leading-relaxed text-justify whitespace-pre-line"
        >
          {`Tampoco podemos olvidar la invalorable participación femenina con nombres como Ninoska Baspineyro, Raquel Cordero, Mery Oña, María del Rosario Barriga, Eda Valverde, Carmela Zuleta, Niroslava Gómez, Silvia Brenelí Mamani, Zulma Guachalla, Nercy Ameller, Danitza Subieta, Gaby Solares y muchas otras damas potosinas que hicieron gustar sus voces y programas.
A lo largo del tiempo, INDOAMÉRICA ha propiciado y participado en numerosas campañas de solidaridad en beneficio de los más necesitados. También fue por sus ondas que se convocó a la población a participar en la naciente fiesta de Ch’utillos. Gracias al impulso de Gonzalo Calderón y su programa Sonido Nuevo, esta celebración se ha convertido en la más importante festividad folklórico-religiosa del país.`}
        </motion.p>
        <motion.div
          whileInView={{ y: [50, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.img
            src={g1}
            alt="Foto 3"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="rounded-xl shadow-xl w-10/12 mx-auto"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-lg leading-relaxed text-justify whitespace-pre-line"
        >
          {`En un momento crítico para los medios de comunicación, el impulso de Corina Vda. de Baspineyro, quien apostó por continuar el legado de Víctor Hugo Baspineyro, fue determinante. Gracias a su visión, y con la posterior consolidación de la EMPRESA RADIAL INDOAMÉRICA LTDA., la radio continúa hasta hoy brindando contenidos de calidad y programas originales, bajo la dirección y administración de Juan José Baspineyro, Juan Carlos Baspineyro Avilés y el valioso acompañamiento de Mauricio Salamanca Baspineiro, reflejando así la continuidad de una labor colectiva y familiar.
Actualmente, Radio Indoamérica continúa evolucionando con el tiempo y expandiendo su alcance a través de plataformas digitales, llevando su legado y pasión por la radio más allá del dial y más cerca de las nuevas generaciones.`}
        </motion.p>
      </motion.div>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-center text-indo_green">
          Galería histórica
        </h2>
        <Galeria />
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
