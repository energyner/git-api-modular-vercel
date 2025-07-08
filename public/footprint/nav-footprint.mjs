/**Algoritmo que utilizará métodos del DOM para capturar el evento 
 * de envío de datos, manipularlo y  conectarnos al puerto 3008 del servidor local que hemos configurado */

/**  Funcion para manejar la logica comun para conectarse. Recibe los parámetros
 *  para la URL de la API, el ID del elemento, maneja los eventos de envio de los 
 * formularios y los mensajes de impresion.  */

//1- API huella-carbono para pruebas locales

// const api_Url = 'http://localhost:3008';
// document.getElementById("calcular").addEventListener("click", async function (event) {
//     event.preventDefault();
// console.log("Formulario enviado con los datos:");
//     // Obtener los valores del formulario
//     const state = document.getElementById("state").value;
//     const elect = parseFloat(document.getElementById("elect").value) || 0;
//     const gas = parseFloat(document.getElementById("gas").value) || 0;
//     const water = parseFloat(document.getElementById("water").value) || 0;
//     const lpg = parseFloat(document.getElementById("lpg").value) || 0;
//     const gn = parseFloat(document.getElementById("gn").value) || 0;
//     const fly = parseFloat(document.getElementById("fly").value) || 0;
//     const cogs = parseFloat(document.getElementById("cogs").value) || 0;
//     const person = parseInt(document.getElementById("person").value) || 1;

//     // Crear el objeto de datos
//     const data = { state, elect, gas, water, lpg, gn, fly, cogs, person };

//     try {
//         // Enviar los datos al servidor
//         const response = await fetch(api_Url + "/api/huella-carbono", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });

//         // Manejar la respuesta del servidor
//         if (!response.ok) {
//             const errorData = await response.json();
//             alert("Error: " + (errorData.error || "Error desconocido"));
//             return;
//         }

//         const result = await response.json();

//         // Mostrar los resultados en el frontend
//         document.getElementById("resultado").value = result.total || 0;
//         document.getElementById("estado").value = result.estado || "N/A";
//         document.getElementById("percapita").value = result.per_capita || 0;
//         document.getElementById("per_capita_estado").value = result.per_capita_estado || 0;
//         document.getElementById("promedioUSA").value = result.promedioUSA || 0;
//         document.getElementById("promedioMundial").value = result.promedioMundial || 0;
//         document.getElementById("porcentajeEstado").value = result.porcentajeEstado + "%" || "N/A";
//         document.getElementById("porcentajeUSA").value = result.porcentajeUSA + "%" || "N/A";
//         document.getElementById("porcentajeMundial").value = result.porcentajeMundial + "%" || "N/A";
//         console.log("Detalles:", result.detalles);
//     } catch (error) {
//         console.error("Error al enviar los datos:", error);
//         alert("Hubo un error al comunicarse con el servidor.");
//     }
// });


//2- API huella-carbono para despliegue online en Vercel


document.getElementById("calcular").addEventListener("click", async function (event) {
    event.preventDefault();
    console.log("Formulario enviado con los datos:");
    // Obtener los valores del formulario
    const state = document.getElementById("state").value;
    const elect = parseFloat(document.getElementById("elect").value) || 0;
    const gas = parseFloat(document.getElementById("gas").value) || 0;
    const water = parseFloat(document.getElementById("water").value) || 0;
    const lpg = parseFloat(document.getElementById("lpg").value) || 0;
    const gn = parseFloat(document.getElementById("gn").value) || 0;
    const fly = parseFloat(document.getElementById("fly").value) || 0;
    const cogs = parseFloat(document.getElementById("cogs").value) || 0;
    const person = parseInt(document.getElementById("person").value) || 1;

    // Crear el objeto de datos
    const data = { state, elect, gas, water, lpg, gn, fly, cogs, person };

    try {
        // Enviar los datos al servidor
        // ¡CAMBIO CLAVE AQUÍ! Usamos la ruta relativa directamente.
        const response = await fetch("/api/huella-carbono", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Manejar la respuesta del servidor
        if (!response.ok) {
            const errorData = await response.json();
            alert("Error: " + (errorData.error || "Error desconocido"));
            return;
        }

        const result = await response.json();

        // Mostrar los resultados en el frontend
        document.getElementById("resultado").value = result.total || 0;
        document.getElementById("estado").value = result.estado || "N/A";
        document.getElementById("percapita").value = result.per_capita || 0;
        document.getElementById("per_capita_estado").value = result.per_capita_estado || 0;
        document.getElementById("promedioUSA").value = result.promedioUSA || 0;
        document.getElementById("promedioMundial").value = result.promedioMundial || 0;
        document.getElementById("porcentajeEstado").value = result.porcentajeEstado + "%" || "N/A";
        document.getElementById("porcentajeUSA").value = result.porcentajeUSA + "%" || "N/A";
        document.getElementById("porcentajeMundial").value = result.porcentajeMundial + "%" || "N/A";
        console.log("Detalles:", result.detalles);
    } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("Hubo un error al comunicarse con el servidor.");
    }
});