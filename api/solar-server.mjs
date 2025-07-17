//1- DESPLIEGE EN LA NUBE EN LA PLATAFORMA VERCEL
/**Eliminar express y app.listen del servidor para convertirlo en una función
 * handler pura compatible con Vercel. */

import { calcularProduccionSolar } from "../calculations/solar-production.mjs";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      mensaje:
        "API Producción Solar activa - Usa POST para calcular la producción solar de paneles",
    });
  }

  if (req.method === "POST") {
    return calcularProduccionSolar(req, res);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Método ${req.method} no permitido`);
}
