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
