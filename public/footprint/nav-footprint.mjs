/**Algoritmo que utilizará métodos del DOM para capturar el evento 
 * de envío de datos, manipularlo y  conectarnos al puerto 3008 del servidor local que hemos configurado */

/**  Funcion para manejar la logica comun para conectarse. Recibe los parámetros
 *  para la URL de la API, el ID del elemento, maneja los eventos de envio de los 
 * formularios y los mensajes de impresion.  */


//2- API huella-carbono para despliegue online en Vercel

document.getElementById("calcular").addEventListener("click", async function (event) {
  event.preventDefault();

  const resultado = document.getElementById("resultado");
  const estado = document.getElementById("estado");

  const datos = {
    state: document.getElementById("state").value.trim(),
    elect: parseFloat(document.getElementById("elect").value.replace(",", ".")) || 0,
    gas: parseFloat(document.getElementById("gas").value.replace(",", ".")) || 0,
    water: parseFloat(document.getElementById("water").value.replace(",", ".")) || 0,
    lpg: parseFloat(document.getElementById("lpg").value.replace(",", ".")) || 0,
    gn: parseFloat(document.getElementById("gn").value.replace(",", ".")) || 0,
    fly: parseFloat(document.getElementById("fly").value.replace(",", ".")) || 0,
    cogs: parseFloat(document.getElementById("cogs").value.replace(",", ".")) || 0,
    person: parseInt(document.getElementById("person").value) || 1,
  };

  if (!datos.state || datos.state === "Select your State") {
    alert("Por favor selecciona un estado válido.");
    return;
  }

  if (datos.person <= 0) {
    alert("El número de personas debe ser mayor que 0.");
    return;
  }

  const submitBtn = document.getElementById("calcular");
  submitBtn.disabled = true;
  submitBtn.textContent = "Calculando...";

  try {
    const response = await fetch("/api/footprint-server", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error desconocido");
    }

    const result = await response.json();

    // Mostrar resultados
    resultado.value = result.total || 0;
    estado.value = result.estado || "N/A";
    document.getElementById("percapita").value = result.per_capita || 0;
    document.getElementById("per_capita_estado").value = result.per_capita_estado || 0;
    document.getElementById("promedioUSA").value = result.promedioUSA || 0;
    document.getElementById("promedioMundial").value = result.promedioMundial || 0;
    document.getElementById("porcentajeEstado").value = result.porcentajeEstado + "%" || "N/A";
    document.getElementById("porcentajeUSA").value = result.porcentajeUSA + "%" || "N/A";
    document.getElementById("porcentajeMundial").value = result.porcentajeMundial + "%" || "N/A";

    console.log(" Resultado recibido:", result);
  } catch (error) {
    console.error(" Error en cálculo:", error);
    alert("Hubo un error: " + error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Calcular";
  }
});