// 1- SERVIDOR EXPRESS - PUERTO 3006
import express from "express";
import cors from "cors";
import { calcularConsumoEnergetico } from "../calculations/energy-consumption.mjs";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 2- RUTAS GET PARA CADA API

//  Api consumo-energetico

// 🔹 **Rutas GET**
app.get("/api/consumo-energetico", (req, res) => {
  console.log("Solicitud GET en /api/consumo-energetico");
  res.json({
    mensaje: "API Calculador Enrgetico activo - Usa POST para calcular el consumo energético de equipos",
  });
});

// 3- PROCESADORES PARA CAPTAR POR POST DE CADA API

// Importamos consumo-energetico
app.post("/api/consumo-energetico", calcularConsumoEnergetico);

// 4- CODIGO COMUN DEL SERVIDOR

// Iniciar servidor
const PORT = 3006;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`4 - API corriendo en http://localhost:${PORT}`);
});
