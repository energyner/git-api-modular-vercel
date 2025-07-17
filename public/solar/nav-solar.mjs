// 2- API produccion solar para despliegue online en Vercel

document.getElementById("produccion-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Evita recarga

  const areaRaw = document.getElementById("area").value.trim();
  const irradiacionRaw = document.getElementById("irradiacion").value.trim();
  const eficienciaRaw = document.getElementById("eficiencia").value.trim();

  // Normalización
  const area = parseFloat(areaRaw.replace(",", "."));
  const irradiacion = parseFloat(irradiacionRaw.replace(",", "."));
  const eficiencia = parseFloat(eficienciaRaw.replace(",", "."));

  // Validación básica
  if ([area, irradiacion, eficiencia].some(val => isNaN(val))) {
    alert("Por favor, ingresa valores numéricos válidos en todos los campos.");
    return;
  }

  const submitBtn = document.querySelector("button[type='submit']");
  const resultadoSolar = document.getElementById("resultadoSolar");

  // Feedback visual
  submitBtn.disabled = true;
  submitBtn.textContent = "Calculando...";
  resultadoSolar.textContent = "";

  // Solicitud al microservicio serverless
  fetch("/api/solar-server", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ area, irradiacion, eficiencia })
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((errorMessage) => {
          throw new Error(`Error en la solicitud: ${response.status} - ${errorMessage}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Producción solar:", data);
      resultadoSolar.textContent = `Producción solar calculada: ${data.produccion_solar} Wh`;
      resultadoSolar.style.color = "green";
    })
    .catch((error) => {
      console.error("Error al calcular la producción solar:", error);
      resultadoSolar.textContent = `Error: ${error.message}`;
      resultadoSolar.style.color = "red";
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Calcular";
    });
});