export function calcularConsumoEnergetico(req, res) {
    console.log("1.1 - Calculando consumo-energetico");

    const { potencia, horas } = req.body;

    if (!potencia || !horas) {
        console.log("1.1.1 - Error: Faltan parámetros");
        return res.status(400).json({
            error: "Faltan parámetros: potencia y horas son requeridos"
        });
    }

    try {
        console.log("Parámetros recibidos:", potencia, horas);
        const resultado = parseFloat(potencia) * parseFloat(horas); // Asegúrate de que sean números
        console.log("1.2 - Cálculo resuelto:", resultado);
        res.json({ consumo_energetico: resultado });
    } catch (error) {
        console.error("Error al calcular el consumo energético:", error);
        res.status(500).json({ error: "Error interno al calcular el consumo energético." });
    }
}