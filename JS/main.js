// --- Declaración de Constantes ---
const TITULO_SIMULADOR = "Conversor de Unidades";
const OPCION_TEMPERATURA = "1";
const OPCION_DIVISA = "2";
const SALIR_SIMULADOR = "0";

// Mensajes claros para el usuario, usando saltos de línea (\n)
const MENSAJE_INICIO = `¡Hola! Bienvenido al ${TITULO_SIMULADOR}.\n\nPor favor, elige una opción de conversión:\n${OPCION_TEMPERATURA}. Temperatura (Celsius/Fahrenheit)\n${OPCION_DIVISA}. Divisa (Pesos/Dólares)\n${SALIR_SIMULADOR}. Salir`;
const MENSAJE_ERROR_OPCION = "Opción no válida. Por favor, ingresa 1, 2 o 0.";
const MENSAJE_DESPEDIDA = `¡Gracias por usar el ${TITULO_SIMULADOR}!\n¡Hasta la próxima!`;

// --- Declaración de Variables (pueden cambiar durante la ejecución) ---
let opcionSeleccionada = "";
let valorAConvertir = 0;
let resultadoConversion = 0;

// --- Arrays (para ejemplos si necesitas, aunque no estrictamente necesario para este conversor simple) ---
const unidadesTemperatura = ["Celsius", "Fahrenheit"];
const unidadesDivisa = ["Pesos Argentinos", "Dólares Estadounidenses"];

// --- Funciones del Simulador ---

// Función de ENTRADA: Solicita al usuario la opción de conversión
function seleccionarOpcion() {
    let opcionValida = false;
    let opcion;
    while (!opcionValida) {
        opcion = prompt(MENSAJE_INICIO);
        // Convertir a cadena por si el usuario presiona Cancel o ingresa null
        if (opcion === null) { // Si el usuario presiona Cancelar en el prompt
            opcion = SALIR_SIMULADOR; // Forzar la salida
            opcionValida = true;
        } else if (opcion === OPCION_TEMPERATURA || opcion === OPCION_DIVISA || opcion === SALIR_SIMULADOR) {
            opcionValida = true;
        } else {
            alert(MENSAJE_ERROR_OPCION);
            console.warn(`Intento de opción inválida: ${opcion}`); // Usar console.warn para entradas incorrectas
        }
    }
    return opcion;
}

// Función de ENTRADA/PROCESAMIENTO: Solicita un valor y lo valida
function solicitarValorNumerico(mensajePrompt) {
    let valor;
    let esValido = false;
    while (!esValido) {
        valor = prompt(mensajePrompt);
        if (valor === null) { // Si el usuario presiona Cancelar
            return null; // Devuelve null para indicar que se canceló
        }
        valor = parseFloat(valor); // Intenta convertir a número flotante

        if (isNaN(valor)) {
            alert("Entrada inválida. Por favor, ingresa un número.");
            console.error(`Error: Se esperaba un número, se recibió "${valor}"`);
        } else {
            esValido = true;
        }
    }
    return valor;
}

// Función de PROCESAMIENTO: Realiza la conversión de temperatura
function convertirTemperatura(valorCelsius) {
    // Pedir al usuario si quiere C a F o F a C
    let tipoConversion = prompt("¿Deseas convertir:\n1. Celsius a Fahrenheit\n2. Fahrenheit a Celsius");

    if (tipoConversion === "1") {
        // Celsius a Fahrenheit: (C * 9/5) + 32
        const fahrenheit = (valorCelsius * 9 / 5) + 32;
        console.log(`Conversión: ${valorCelsius}°C equivale a ${fahrenheit.toFixed(2)}°F`);
        return `${valorCelsius}°C son ${fahrenheit.toFixed(2)}°F`;
    } else if (tipoConversion === "2") {
        // Fahrenheit a Celsius: (F - 32) * 5/9
        // En este caso, 'valorCelsius' sería en realidad el valor Fahrenheit que se pasó
        const celsius = (valorCelsius - 32) * 5 / 9;
        console.log(`Conversión: ${valorCelsius}°F equivale a ${celsius.toFixed(2)}°C`);
        return `${valorCelsius}°F son ${celsius.toFixed(2)}°C`;
    } else {
        console.warn(`Opción de conversión de temperatura no válida: ${tipoConversion}`);
        return "Opción de temperatura no reconocida.";
    }
}

// Función de PROCESAMIENTO: Realiza la conversión de divisa (ej. Pesos a Dólares)
function convertirDivisa(valorPesos) {
    const TASA_CAMBIO_PESOS_A_DOLARES = 1000; // Ejemplo: 1 Dólar = 1000 Pesos (ajusta a la realidad)
    // Pedir al usuario si quiere Pesos a Dólares o Dólares a Pesos
    let tipoConversion = prompt("¿Deseas convertir:\n1. Pesos a Dólares\n2. Dólares a Pesos");

    if (tipoConversion === "1") {
        const dolares = valorPesos / TASA_CAMBIO_PESOS_A_DOLARES;
        console.log(`Conversión: $${valorPesos.toFixed(2)} ARS equivale a $${dolares.toFixed(2)} USD`);
        return `$${valorPesos.toFixed(2)} ARS son $${dolares.toFixed(2)} USD`;
    } else if (tipoConversion === "2") {
        const pesos = valorPesos * TASA_CAMBIO_PESOS_A_DOLARES;
        console.log(`Conversión: $${valorPesos.toFixed(2)} USD equivale a $${pesos.toFixed(2)} ARS`);
        return `$${valorPesos.toFixed(2)} USD son $${pesos.toFixed(2)} ARS`;
    } else {
        console.warn(`Opción de conversión de divisa no válida: ${tipoConversion}`);
        return "Opción de divisa no reconocida.";
    }
}

// Función de SALIDA: Muestra el resultado al usuario
function mostrarResultado(mensajeResultado) {
    alert(`Resultado:\n\n${mensajeResultado}`);
}

// --- Lógica Principal del Simulador ---
function iniciarSimulador() {
    alert(MENSAJE_INICIO); // Muestra el mensaje de bienvenida al inicio

    do {
        opcionSeleccionada = seleccionarOpcion(); // Llama a la función de ENTRADA

        if (opcionSeleccionada === OPCION_TEMPERATURA) {
            valorAConvertir = solicitarValorNumerico("Ingresa el valor de temperatura a convertir:");
            if (valorAConvertir !== null) { // Solo si el usuario no canceló
                resultadoConversion = convertirTemperatura(valorAConvertir); // Llama a la función de PROCESAMIENTO
                mostrarResultado(resultadoConversion); // Llama a la función de SALIDA
            }
        } else if (opcionSeleccionada === OPCION_DIVISA) {
            valorAConvertir = solicitarValorNumerico("Ingresa el valor de divisa a convertir:");
            if (valorAConvertir !== null) { // Solo si el usuario no canceló
                resultadoConversion = convertirDivisa(valorAConvertir); // Llama a la función de PROCESAMIENTO
                mostrarResultado(resultadoConversion); // Llama a la función de SALIDA
            }
        } else if (opcionSeleccionada !== SALIR_SIMULADOR) {
            // Esto solo se ejecutaría si seleccionarOpcion() permitiera una opción no 1, 2 o 0,
            // pero ya lo manejamos dentro de esa función. Es una buena práctica para el futuro.
            alert(MENSAJE_ERROR_OPCION);
            console.error(`Opción inesperada capturada en el ciclo principal: ${opcionSeleccionada}`);
        }

        // Si el usuario cancela en solicitarValorNumerico, salimos del ciclo de conversión actual
        // y preguntamos si quiere continuar con el simulador.
        if (opcionSeleccionada !== SALIR_SIMULADOR && valorAConvertir !== null) {
            let continuar = confirm("¿Deseas realizar otra conversión?");
            if (!continuar) {
                opcionSeleccionada = SALIR_SIMULADOR; // Sale del bucle si el usuario no quiere continuar
            }
        } else if (valorAConvertir === null && opcionSeleccionada !== SALIR_SIMULADOR) {
            // Si se canceló la entrada del valor, volvemos a preguntar si quiere salir o seguir
            let cancelarOperacion = confirm("Operación cancelada. ¿Deseas salir del simulador?");
            if (cancelarOperacion) {
                opcionSeleccionada = SALIR_SIMULADOR;
            } else {
                opcionSeleccionada = ""; // Reiniciar para volver a pedir opción principal
            }
        }

    } while (opcionSeleccionada !== SALIR_SIMULADOR);

    alert(MENSAJE_DESPEDIDA); // Muestra el mensaje de despedida
    console.log("Simulador de Unidades: Sesión finalizada.");
}

// Iniciar el simulador cuando el script se carga
iniciarSimulador();