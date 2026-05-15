import GetNoticia from "../components/noticias/GetNoticia";
import Footer from "../components/Footer";

const NoticiaPage = () => {
  return (
    <div>      
      <div className="pt-8">
        <GetNoticia />
        <Footer/>
      </div>
    </div>
  );
};

export default NoticiaPage;
