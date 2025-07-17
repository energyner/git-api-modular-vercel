//DESPLIEGUE EN LA NUBE EN PLATAFORMA VERCEL- SERVIDOR EXPRESS - PUERTO 3008

// api/footprint-server.mjs
import { calcularHuellaCarbono } from '../calculations/carbon-footprint.mjs';

export default function handler(req, res) {
  console.log("Procesando huella-carbono desde Vercel");

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

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

    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al procesar huella-carbono:", error);
    res.status(500).json({ error: "Error interno del servidor. Intente nuevamente más tarde." });
  }
}