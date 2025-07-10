// 1- SERVIDOR EXPRESS - PUERTO 3010
import express from "express";
import cors from "cors";
import { calcularProduccionSolar } from "../calculations/solar-production.mjs";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 2- RUTAS GET PARA CADA API

//  Api produccion-solar
app.get("/api/produccion-solar", (req, res) => {
  console.log("1 - Captando solicitud GET en /api/produccion-solar");
  res.send(
    "API Produccion Solar  activa -Usa POST para calcular la produccion-solar de paneles solares."
  );
});
// 3- PROCESADORES PARA CAPTAR POR POST DE CADA API

// Importamos produccion-solar
app.post("/api/produccion-solar", calcularProduccionSolar);

// 4- CODIGO COMUN DEL SERVIDOR

// Iniciar servidor
const PORT = 3010;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`4 - API corriendo en http://localhost:${PORT}`);
});


//2- DESPLIEGE EN LA NUBE EN LA PLATAFORMA VERCEL
/**Eliminar express y app.listen del servidor para convertirlo en una función
 * handler pura compatible con Vercel. */

import { calcularProduccionSolar } from "../calculations/solar-production.mjs";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      mensaje: "API Producción Solar activa - Usa POST para calcular la producción solar de paneles"
    });
  }

  if (req.method === "POST") {
    return calcularProduccionSolar(req, res);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Método ${req.method} no permitido`);
}