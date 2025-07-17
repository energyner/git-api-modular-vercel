
//1- DESPLIEGE EN LA NUBE EN LA PLATAFORMA VERCEL
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