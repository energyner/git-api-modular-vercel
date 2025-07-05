
export function calcularProduccionSolar(req, res) {
    console.log("1.1 - Calculando produccion-solar");

    const { area, irradiacion, eficiencia } = req.body; // <--- Mantenemos esta línea para obtener los datos del cuerpo

    if (!area || !irradiacion || !eficiencia) {
        console.log("1.1.1 - Error: Faltan parámetros");
        return res.status(400).json({
            error: "Faltan parámetros: area, irradiacion y eficiencia son requeridos" // Corregí el mensaje
        });
    }

    try {
        console.log("Parámetros recibidos:", area, irradiacion, eficiencia);
        const resultado = parseFloat(area) * parseFloat(irradiacion) * parseFloat(eficiencia); // Asegúrate de que sean números
        console.log("1.2 - Cálculo resuelto:", resultado);
        res.json({ produccion_solar: resultado });
    } catch (error) {
        console.error("Error al calcular la produccion solar:", error);
        res.status(500).json({ error: "Error interno al calcular la produccion solar." });
    }
}