// 1- SERVIDOR EXPRESS - PUERTO 3008
import express from 'express';
import cors from 'cors';
import {calcularHuellaCarbono} from '../calculations/carbon-footprint.mjs';

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json());

// 2- RUTAS GET PARA CADA API


console.log("3.1 - Calculando  huella-carbono ")
// Ruta POST para calcular la huella de carbono
app.post('/api/huella-carbono', (req, res) => {
    try {
        const parametros = req.body;

        // Validaciones básicas
        if (!parametros.state || parametros.state === "Select your State") {
            return res.status(400).json({ error: "Estado inválido o no seleccionado" });
        }
        if (!parametros.person || parametros.person <= 0) {
            return res.status(400).json({ error: "Número de personas debe ser mayor a 0" });
        }

        // Normalización de datos y asignación de valores predeterminados
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

        // Llamar a la función calcularHuellaCarbono
        const resultado = calcularHuellaCarbono(datos);

        if (resultado.error) {
            return res.status(400).json({ error: resultado.error });
        }

        // Respuesta exitosa
        res.status(200).json(resultado);
        console.log("3.2 Cálculo completado para huella-carbono:", resultado);
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ error: "Error interno del servidor. Intente nuevamente más tarde." });
    }
});

const PORT = 3008;
//app.listen(PORT, '127.0.0.1', () => {
app.listen(PORT, '0.0.0.0', () => {//facilitando acceder desde diferentes maquinas en la misma red
    console.log(`4 - API corriendo en el puerto ${PORT}`);
})