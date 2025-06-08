// --- Constantes ---
const TITULO_SIMULADOR = "Conversor de Unidades";
const OPCION_TEMPERATURA = "1";
const OPCION_DIVISA = "2";
const SALIR_SIMULADOR = "0";

// Mensajes 
const MENSAJE_INICIO = `Bienvenido al ${TITULO_SIMULADOR}.\n\nPor favor, elige una opción de conversión:\n${OPCION_TEMPERATURA}. Temperatura (Celsius/Fahrenheit)\n${OPCION_DIVISA}. Divisa (Pesos/Dólares)\n${SALIR_SIMULADOR}. Salir`;
const MENSAJE_ERROR_OPCION = "Opción no válida. Por favor, ingresa 1, 2 o 0.";
const MENSAJE_DESPEDIDA = `¡Gracias por usar el ${TITULO_SIMULADOR}!\n¡Hasta la próxima!`;

let opcionSeleccionada = "";
let valorAConvertir = 0;
let resultadoConversion = 0;


const unidadesTemperatura = ["Celsius", "Fahrenheit"];
const unidadesDivisa = ["Pesos Argentinos", "Dólares Estadounidenses"];


function seleccionarOpcion() {
    let opcionValida = false;
    let opcion;
    while (!opcionValida) {
        opcion = prompt(MENSAJE_INICIO);
        if (opcion === null) { 
            opcion = SALIR_SIMULADOR; 
            opcionValida = true;
        } else if (opcion === OPCION_TEMPERATURA || opcion === OPCION_DIVISA || opcion === SALIR_SIMULADOR) {
            opcionValida = true;
        } else {
            alert(MENSAJE_ERROR_OPCION);
            console.warn(`Intento de opción inválida: ${opcion}`); 
        }
    }
    return opcion;
}

function solicitarValorNumerico(mensajePrompt) {
    let valor;
    let esValido = false;
    while (!esValido) {
        valor = prompt(mensajePrompt);
        if (valor === null) { 
            return null; 
        }
        valor = parseFloat(valor);

        if (isNaN(valor)) {
            alert("Entrada inválida. Por favor, ingresa un número.");
            console.error(`Error: Se esperaba un número, se recibió "${valor}"`);
        } else {
            esValido = true;
        }
    }
    return valor;
}


function convertirTemperatura(valorCelsius) {
    let tipoConversion = prompt("¿Deseas convertir:\n1. Celsius a Fahrenheit\n2. Fahrenheit a Celsius");

    if (tipoConversion === "1") {
        const fahrenheit = (valorCelsius * 9 / 5) + 32;
        console.log(`Conversión: ${valorCelsius}°C equivale a ${fahrenheit.toFixed(2)}°F`);
        return `${valorCelsius}°C son ${fahrenheit.toFixed(2)}°F`;
    } else if (tipoConversion === "2") {
        const celsius = (valorCelsius - 32) * 5 / 9;
        console.log(`Conversión: ${valorCelsius}°F equivale a ${celsius.toFixed(2)}°C`);
        return `${valorCelsius}°F son ${celsius.toFixed(2)}°C`;
    } else {
        console.warn(`Opción de conversión de temperatura no válida: ${tipoConversion}`);
        return "Opción de temperatura no reconocida.";
    }
}

function convertirDivisa(valorPesos) {
    const TASA_CAMBIO_PESOS_A_DOLARES = 1150; 
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


function mostrarResultado(mensajeResultado) {
    alert(`Resultado:\n\n${mensajeResultado}`);
}

function iniciarSimulador() {
    alert(MENSAJE_INICIO); 
    do {
        opcionSeleccionada = seleccionarOpcion(); 

        if (opcionSeleccionada === OPCION_TEMPERATURA) {
            valorAConvertir = solicitarValorNumerico("Ingresa el valor de temperatura a convertir:");
            if (valorAConvertir !== null) {
                resultadoConversion = convertirTemperatura(valorAConvertir); 
                mostrarResultado(resultadoConversion);
            }
        } else if (opcionSeleccionada === OPCION_DIVISA) {
            valorAConvertir = solicitarValorNumerico("Ingresa el valor de divisa a convertir:");
            if (valorAConvertir !== null) {
                resultadoConversion = convertirDivisa(valorAConvertir);
                mostrarResultado(resultadoConversion); 
            }
        } else if (opcionSeleccionada !== SALIR_SIMULADOR) {
            alert(MENSAJE_ERROR_OPCION);
            console.error(`Opción inesperada capturada en el ciclo principal: ${opcionSeleccionada}`);
        }
        if (opcionSeleccionada !== SALIR_SIMULADOR && valorAConvertir !== null) {
            let continuar = confirm("¿Deseas realizar otra conversión?");
            if (!continuar) {
                opcionSeleccionada = SALIR_SIMULADOR; 
            }
        } else if (valorAConvertir === null && opcionSeleccionada !== SALIR_SIMULADOR) {
            let cancelarOperacion = confirm("Operación cancelada. ¿Deseas salir del simulador?");
            if (cancelarOperacion) {
                opcionSeleccionada = SALIR_SIMULADOR;
            } else {
                opcionSeleccionada = ""; 
            }
        }

    } while (opcionSeleccionada !== SALIR_SIMULADOR);

    alert(MENSAJE_DESPEDIDA); 
    console.log("Simulador de Unidades: Sesión finalizada.");
}

iniciarSimulador();