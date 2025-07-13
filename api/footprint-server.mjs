//DESPLIEGUE EN LA NUBE EN PLATAFORMA RENDER - SERVIDOR EXPRESS - PUERTO 3008

import express from "express";
import cors from "cors";
import { calcularHuellaCarbono } from "../calculations/carbon-footprint.mjs";

const app = express();
app.use(cors());
app.use(express.json());

// Ruta GET informativa (huella-carbono)
app.get("/api/huella-carbono", (req, res) => {
  console.log("GET en /api/huella-carbono");
  res.status(200).json({
    mensaje: "API Huella de Carbono activa - Usa POST para enviar datos",
  });
});

// Ruta POST principal (huella-carbono)
app.post("/api/huella-carbono", (req, res) => {
  try {
    const parametros = req.body;

    if (!parametros.state || parametros.state === "Select your State") {
      return res.status(400).json({ error: "Estado inválido o no seleccionado" });
    }
    if (!parametros.person || parametros.person <= 0) {
      return res.status(400).json({ error: "Número de personas debe ser mayor a 0" });
    }

    const datos = {
      state: parametros.state,
      elect: parseFloat(parametros.elect) || 0,
      gas: parseFloat(parametros.gas) || 0,
      water: parseFloat(parametros.water) || 0,
      lpg: parseFloat(parametros.lpg) || 0,
      gn: parseFloat(parametros.gn) || 0,
      fly: parseFloat(parametros.fly) || 0,
      cogs: parseFloat(parametros.cogs) || 0,
      person: parseInt(parametros.person) || 1,
    };

    const resultado = calcularHuellaCarbono(datos);

    if (resultado.error) {
      return res.status(400).json({ error: resultado.error });
    }

    console.log("Resultado huella-carbono:", resultado);
    return res.status(200).json(resultado);

  } catch (error) {
    console.error("Error interno en huella-carbono:", error);
    res.status(500).json({ error: "Error interno del servidor. Intente nuevamente más tarde." });
  }
});

// 🔁 Escuchar en el puerto que Render asigna
const PORT = process.env.PORT || 3008;
app.listen(PORT, "0.0.0.0", () => {
  console.log(` API de huella de carbono corriendo en http://localhost:${PORT}`);
});


