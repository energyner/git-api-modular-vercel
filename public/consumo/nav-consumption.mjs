//2- API consumo enrgetico para despliegue online en Vercel

document.getElementById("consumo-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Evitar recarga de página

  const potenciaRaw = document.getElementById("potencia").value.trim();
  const horasRaw = document.getElementById("horas").value.trim();

  // Normalización: reemplazar comas, quitar espacios
  const potencia = parseFloat(potenciaRaw.replace(",", "."));
  const horas = parseFloat(horasRaw.replace(",", "."));

  // Validación básica
  if (isNaN(potencia) || isNaN(horas)) {
    alert("Por favor, ingresa valores numéricos válidos para potencia y horas.");
    return;
  }

  const submitBtn = document.querySelector("button[type='submit']");
  const resultadoConsumo = document.getElementById("resultadoConsumo");

  // Feedback visual mientras se procesa
  submitBtn.disabled = true;
  submitBtn.textContent = "Calculando...";
  resultadoConsumo.textContent = ""; // Limpiar resultados previos

  // Enviar la solicitud al backend serverless
  fetch("/api/consumo-server", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ potencia, horas }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((errorMessage) => {
          throw new Error(
            `Error en la solicitud: ${response.status} - ${errorMessage}`
          );
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Consumo energético:", data);

      resultadoConsumo.textContent = `Consumo energético calculado: ${data.consumo_energetico} kWh`;
      resultadoConsumo.style.color = "green";
    })
    .catch((error) => {
      console.error("Error al calcular el consumo:", error);

      resultadoConsumo.textContent = `Error: ${error.message}`;
      resultadoConsumo.style.color = "red";
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Calcular";
    });
});