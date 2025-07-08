/**Algoritmo que utilizará métodos del DOM para capturar el evento 
 * de envío de datos, manipularlo y  conectarnos al puerto del servidor local que hemos configurado */


/**  EJECUCION DE CADA API */

// 1- API produccion solar para pruebas locales

// Captando evento del formulario
// document.getElementById('produccion-form').addEventListener('submit', (event) => {
//     event.preventDefault(); // Evitar que el formulario recargue la página

//     const area = document.getElementById('area').value;
//     const irradiacion = document.getElementById('irradiacion').value;
//     const eficiencia = document.getElementById('eficiencia').value;

// // Realizar la solicitud al servidor
//     fetch('http://localhost:3010/api/produccion-solar', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ area: area, irradiacion: irradiacion, eficiencia: eficiencia })
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
//         console.log('Produccion solar:', data);

// // Actualizar la interfaz del navegador con el resultado
//         const resultadoSolar = document.getElementById('resultadoSolar');
//         resultadoSolar.textContent = `Produccion solar calculada: ${data.produccion_solar} kWh`;
//         resultadoSolar.style.color = "red"; // Estilo opcional para destacar el texto
//     })
//     .catch(error => {
//         console.error('Error al calcular la produccion solar:', error);

// // Mostrar mensaje de error en el navegador
//         const resultadoSolar = document.getElementById('resultadoSolar');
//         resultadoSolar.textContent = `Error: ${error.message}`;
//         resultadoSolar.style.color = "red"; // Estilo opcional para destacar el error
//     });
// });



// 2- API produccion solar para despliegue online en Vercel


document.getElementById('produccion-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar que el formulario recargue la página

    const area = document.getElementById('area').value;
    const irradiacion = document.getElementById('irradiacion').value;
    const eficiencia = document.getElementById('eficiencia').value;

    // Realizar la solicitud al servidor
    // ¡CAMBIO CLAVE AQUÍ! Usamos la ruta relativa.
    fetch(`${window.location.origin}/api/produccion-solar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ area: area, irradiacion: irradiacion, eficiencia: eficiencia })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorMessage => {
                throw new Error(`Error en la solicitud: ${response.status} - ${errorMessage}`);
            });
        }
        return response.json(); // Procesar la respuesta como JSON
    })
    .then(data => {
        console.log('Produccion solar:', data);

        // Actualizar la interfaz del navegador con el resultado
        const resultadoSolar = document.getElementById('resultadoSolar');
        resultadoSolar.textContent = `Produccion solar calculada: ${data.produccion_solar} kWh`;
        resultadoSolar.style.color = "green"; // Cambié a verde para éxito, ¡importante!
    })
    .catch(error => {
        console.error('Error al calcular la produccion solar:', error);

        // Mostrar mensaje de error en el navegador
        const resultadoSolar = document.getElementById('resultadoSolar');
        resultadoSolar.textContent = `Error: ${error.message}`;
        resultadoSolar.style.color = "red"; // Estilo para destacar el error
    });
});