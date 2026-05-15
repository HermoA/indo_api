import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import usuario from "./routes/usuarios.routes.js";
import programa from "./routes/programas.routes.js";
import noticia from "./routes/noticias.routes.js";
import ranking from "./routes/ranking.routes.js";
import canciones from "./routes/canciones.routes.js";
import votos from "./routes/votos.routes.js";
import login from "./routes/login.routes.js";
import contacto from "./routes/contacto.routes.js";
import cookieParser from "cookie-parser";
import itunes from "./routes/itunes.routes.js";
import "./logers.js";

const app = express();
dotenv.config();

/*app.use(
   cors({
     origin: "*",    
     credentials: true,
   })
 );*/
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.0.122:5173",
  "https://www.astrodev.indoamericalaradio.com",
  "https://www.indoamericalaradio.com",  // ← sin barra al final
  "https://indoamericalaradio.com",      // ← también sin www por si acaso
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS: " + origin));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(indexRoutes);
app.use(usuario);
app.use(programa);
app.use(noticia);
app.use(ranking);
app.use(canciones);
app.use(votos);
app.use(login);
app.use(contacto);
app.use(itunes);


app.get("/api", (req, res) => {
  res.json({ mensaje: "CORS habilitado" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
