import Logo from "../assets/logo_i_nega.svg";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

function Footer() {
  const stileButon =
    "rounded-full p-2 border border-gray-400 hover:bg-indo_green hover:text-white hover:border-none transition-all ease-in duration-350";
  return (
    <div className=" w-full bg-black text-gray-400 pt-6 pb-20 ">
      <div className="lg:grid-cols-2 lg:grid flex flex-col justify-items-center w-4/5 m-auto gap-4  border-b-2 border-gray-400 py-6 ">
        <div className=" flex w-full lg:justify-start col-span-4 lg:col-span-1 justify-center pb-10 lg:py-0">
          <img src={Logo} alt="logo" className="w-60" />
        </div>
        <div className="flex flex-row gap-4 text-2xl items-center justify-center">
          <a
            href="https://maps.app.goo.gl/Xrkci2y5FjS5Eejc8"
            target="blanck"
            className={stileButon}
          >
            <SiGooglemaps />
          </a>
          <a href="" className={stileButon}>
            <FaWhatsapp />
          </a>
          <a
            href="https://www.facebook.com/indoamericalaradio?mibextid=ZbWKwL"
            target="_blank"
            className={stileButon}
          >
            <FaFacebookF /> 
          </a>
          <a
            href="https://www.instagram.com/indoamericalaradio/"
            target="_blank"
            className={stileButon}
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.tiktok.com/@indoamericalaradio?_t=8oQrw3495Hx&_r=1"
            target="_blank"
            className={stileButon}
          >
            <IoLogoTiktok />
          </a>
          <a className={stileButon} href="mailto:indoamericalaradio@gmail.com">
            <CiMail />
          </a>
        </div>
      </div>

      <div className="lg:w-8/12 w-11/12 mx-auto py-3 text-center flex flex-col justify-center text-base ">
        <h2 className=" hidden sm:block font-bold">indoamericalaradio.com</h2>
        <h2 className="sm:hidden block">
          Indoamérica La Radio | La Radio de los Éxitos ®
        </h2>
        <p className=" hidden sm:flex justify-center ">
          © 2026 Indoamérica La Radio Todos los derechos reservados.
        </p>
        <div className=" hidden lg:flex lg:flex-row flex-col gap-2 mx-auto">
          <p className="">Esta empresa está regulada y fiscalizada por la</p>
          <a
            href="https://plataformas.att.gob.bo/index.php/sinadi/index/AM"
            target="_blank"
            className="text-indo_green hover:text-white "
          >
            ATT
          </a>
        </div>
        <div className="flex lg:flex-row flex-col gap-2 mx-auto">
          <p>
            WhatsApp para oyentes: 
            <a
              href="https://wa.link/8m0ck7"
              target="_blank"
              className="text-indo_green hover:text-white pl-1"
            >
              64362904
            </a>{" "}
          </p>

          <p className=" hidden sm:block">Área comercial:</p>
          <a
            href="https://wa.link/q6zbbq"
            target="_blank"
            className="text-indo_green hover:text-white hidden sm:block"
          >
            60483724
          </a>
        </div>
        <p className="hidden sm:block">
          Indoamérica La Radio | La Radio de los Éxitos ® |{" "}
          <a
            href="https://wa.link/7ygq41"
            target="black"
            className=" hover:text-blue-700 transition-all ease-in hover:scale-105 "
          >
            Desarollado por: Hermo Medrano
          </a>{" "}
        </p>
        <a
          href="https://wa.link/7ygq41"
          target="black"
          className=" hover:text-blue-700 transition-all ease-in hover:scale-105 sm:hidden "
        >
          Desarollado por: Hermo Medrano
        </a>{" "}
      </div>
    </div>
  );
}

export default Footer;
