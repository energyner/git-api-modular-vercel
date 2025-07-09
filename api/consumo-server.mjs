// // 1- SERVIDOR EXPRESS - PUERTO 3006 FUNCIONAL EN AMBIENTE LOCAL
// import express from "express";
// import cors from "cors";
// import { calcularConsumoEnergetico } from "../calculations/energy-consumption.mjs";

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // 2- RUTAS GET PARA CADA API

// //  Api consumo-energetico

// // 🔹 **Rutas GET**
// app.get("/api/consumo-energetico", (req, res) => {
//   console.log("Solicitud GET en /api/consumo-energetico");
//   res.json({
//     mensaje: "API Calculador Enrgetico activo - Usa POST para calcular el consumo energético de equipos",
//   });
// });

// // 3- PROCESADORES PARA CAPTAR POR POST DE CADA API

// // Importamos consumo-energetico
// app.post("/api/consumo-energetico", calcularConsumoEnergetico);

// // 4- CODIGO COMUN DEL SERVIDOR

// // Iniciar servidor
// const PORT = 3006;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`4 - API corriendo en http://localhost:${PORT}`);
// });



//DESPLIEGE EN LA NUBE EN LA PLATAFORMA VERCEL
/**Eliminar express y app.listen del servidor para convertirlo en una función
 * handler pura compatible con Vercel. También ajustar la lógica de frontend para mejorar
 * validación, visualización y compatibilidad.*/

import { calcularConsumoEnergetico } from "../calculations/energy-consumption.mjs";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      mensaje: "API Calculador Energético activo - Usa POST para calcular el consumo energético de equipos"
    });
  }

  if (req.method === "POST") {
    return calcularConsumoEnergetico(req, res);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Método ${req.method} no permitido`);
}