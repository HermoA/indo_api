import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center font-roboto gap-10">
      <p className=" text-5xl text-indo_gray">La pagina no esta disponible</p>
      <p className=" text-6xl text-red-600 font-bold ">Error 404</p>
      <Link href="http://localhost:5173/"> regresa a indomeria la radio</Link>
    </div>
  );
}

export default NotFoundPage;
