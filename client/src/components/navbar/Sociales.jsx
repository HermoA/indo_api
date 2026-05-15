import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const Sociales = () => {
  return (
    <div className="flex flex-row gap-4 text-base text-white items-center">
      <a
        href="https://www.facebook.com/indoamericalaradio?mibextid=ZbWKwL"
        target="_blank"
        className="hover:opacity-50 transition-all ease-out"
      >
        <FaFacebookF />
      </a>
      <a
        href="https://www.instagram.com/indoamericalaradio/"
        target="_blank"
        className="hover:opacity-50 transition-all ease-out"
      >
        <FaInstagram />
      </a>
      <a
        href="https://www.tiktok.com/@indoamericalaradio?_t=8oQrw3495Hx&_r=1"
        target="_blank"
        className="hover:opacity-50 transition-all ease-out"
      >
        <FaTiktok />
      </a>
      <a
        href="https://wa.me/59171811002"
        target="_blank"
        className="hover:opacity-50 transition-all ease-out"
      >
        <FaWhatsapp />
      </a>
      <a
        href="mailto:indoamericalaradio@gmail.com"
        className="hover:opacity-50 transition-all ease-out"
      >
        <MdOutlineMail />
      </a> 
    </div>
  );
};

export default Sociales;
