/**Algoritmo que utilizará métodos del DOM para capturar el evento
 * de envío de datos, manipularlo y  conectarnos al puerto del servidor local que hemos configurado */

//1- API consumo enrgetico para pruebas locales

// Captando evento del formulario
// document.getElementById('consumo-form').addEventListener('submit', (event) => {
//     event.preventDefault(); // Evitar que el formulario recargue la página

//     const potencia = document.getElementById('potencia').value;
//     const horas = document.getElementById('horas').value;

// // Realizar la solicitud al servidor
//     fetch('http://localhost:3006/api/consumo-energetico', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ potencia: potencia, horas: horas })
//     })
//     .then(response => {
//         if (!response.ok) {
//             return response.text().then(errorMessage => {
//                 throw new Error(`Error en la solicitud: ${response.status} - ${errorMessage}`);
//             });
//         }
//         return response.json(); // Procesar la respuesta como JSON
//     })
//     .then(data => {
//         console.log('Consumo energético:', data);

// // Actualizar la interfaz del navegador con el resultado
//         const resultadoConsumo = document.getElementById('resultadoConsumo');
//         resultadoConsumo.textContent = `Consumo energético calculado: ${data.consumo_energetico} kWh`;
//         resultadoConsumo.style.color = "green"; // Estilo opcional para destacar el texto
//     })
//     .catch(error => {
//         console.error('Error al calcular el consumo:', error);

// // Mostrar mensaje de error en el navegador
//         const resultadoConsumo = document.getElementById('resultadoConsumo');
//         resultadoConsumo.textContent = `Error: ${error.message}`;
//         resultadoConsumo.style.color = "green"; // Estilo opcional para destacar el error
//     });
// });


//2- API consumo enrgetico para despliegue online en Vercel

document.getElementById("consumo-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Evitar que el formulario recargue la página

  const potencia = document.getElementById("potencia").value;
  const horas = document.getElementById("horas").value;

  // Realizar la solicitud al servidor
  // ¡Aquí está el cambio clave!
  fetch(`${window.location.origin}/api/consumo-energetico`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ potencia: potencia, horas: horas }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((errorMessage) => {
          throw new Error(
            `Error en la solicitud: ${response.status} - ${errorMessage}`
          );
        });
      }
      return response.json(); // Procesar la respuesta como JSON
    })
    .then((data) => {
      console.log("Consumo energético:", data);

      // Actualizar la interfaz del navegador con el resultado
      const resultadoConsumo = document.getElementById("resultadoConsumo");
      resultadoConsumo.textContent = `Consumo energético calculado: ${data.consumo_energetico} kWh`;
      resultadoConsumo.style.color = "green"; // Estilo opcional para destacar el texto
    })
    .catch((error) => {
      console.error("Error al calcular el consumo:", error);

      // Mostrar mensaje de error en el navegador
      const resultadoConsumo = document.getElementById("resultadoConsumo");
      resultadoConsumo.textContent = `Error: ${error.message}`;
      resultadoConsumo.style.color = "red"; // Cambié a rojo para errores, ¡importante!
    });
});
