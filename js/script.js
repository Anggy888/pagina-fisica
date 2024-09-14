// Función para validar entradas numéricas
function validarEntradaNumerica(...valores) {
    return valores.every(valor => !isNaN(valor) && valor !== null);
}

// Función para mostrar errores en el DOM
function mostrarError(idElemento, mensaje) {
    document.getElementById(idElemento).innerText = mensaje;
}

// Función para limpiar el mensaje de error
function limpiarError(idElemento) {
    document.getElementById(idElemento).innerText = '';
}

// Función para calcular notación científica
function calcularNotacionCientifica() {
    const operacion = document.getElementById('operacion').value;
    const numero1 = parseFloat(document.getElementById('numero1').value);
    const numero2 = parseFloat(document.getElementById('numero2').value);

    if (!validarEntradaNumerica(numero1, numero2)) {
        mostrarError('resultadoNotacionCientifica', 'Por favor ingresa números válidos.');
        return;
    }
    
    let resultado;
    switch (operacion) {
        case "multiplicacion":
            resultado = numero1 * numero2;
            break;
        case "division":
            resultado = numero1 / numero2;
            break;
        case "suma":
            resultado = numero1 + numero2;
            break;
        case "resta":
            resultado = numero1 - numero2;
            break;
        default:
            alert("Selecciona una operación válida.");
            return;
    }

    limpiarError('resultadoNotacionCientifica');
    document.getElementById('resultadoNotacionCientifica').innerHTML = `Resultado: ${resultado.toExponential()}`;
}

// Función para mostrar campos adicionales en cinemática
function mostrarCampos() {
    const datoDisponible = document.getElementById('datoDisponible').value;
    const inputsAdicionales = document.getElementById('inputsAdicionales');
    inputsAdicionales.innerHTML = '';

    switch (datoDisponible) {
        case 'distancia':
            inputsAdicionales.innerHTML += `
                <label for="distancia">Distancia (metros):</label>
                <input type="number" id="distancia" placeholder="Introduce la distancia" required>
            `;
            break;
        case 'tiempo':
            inputsAdicionales.innerHTML += `
                <label for="tiempo">Tiempo (segundos):</label>
                <input type="number" id="tiempo" placeholder="Introduce el tiempo" required>
            `;
            break;
        case 'rapidez':
            inputsAdicionales.innerHTML += `
                <label for="rapidez">Rapidez (m/s):</label>
                <input type="number" id="rapidez" placeholder="Introduce la rapidez" required>
            `;
            break;
        case 'velocidad':
            inputsAdicionales.innerHTML += `
                <label for="velocidad">Velocidad (m/s):</label>
                <input type="number" id="velocidad" placeholder="Introduce la velocidad" required>
            `;
            break;
    }
}

// Funciones refactorizadas para calcular fórmulas de movimiento
function calcularXf(xi, vxi, ax, t) {
    return xi + vxi * t + 0.5 * ax * t * t;
}

function calcularVxf(vxi, ax, t) {
    return vxi + ax * t;
}

function calcularT(vxf, vxi, ax) {
    return (vxf - vxi) / ax;
}

// Función para calcular el movimiento en una dimensión (cinemática)
function calcularMovimiento1D() {
    const xi = parseFloat(document.getElementById('posicionInicial').value);
    const vxi = parseFloat(document.getElementById('velocidadInicial').value);
    const ax = parseFloat(document.getElementById('aceleracion').value);
    const t = parseFloat(document.getElementById('tiempo').value);
    const xf = parseFloat(document.getElementById('posicionFinal').value);
    const vxf = parseFloat(document.getElementById('velocidadFinal').value);

    let resultadoXf, resultadoVxf, resultadoT;
    
    if (document.getElementById('calcularPosicionFinal').checked) {
        if (validarEntradaNumerica(xi, vxi, ax, t)) {
            resultadoXf = calcularXf(xi, vxi, ax, t);
        } else {
            mostrarError("resultadoMovimiento1D", "Por favor, ingresa los datos necesarios para calcular la posición final.");
        }
    }

    if (document.getElementById('calcularVelocidadFinal').checked) {
        if (validarEntradaNumerica(vxi, ax, t)) {
            resultadoVxf = calcularVxf(vxi, ax, t);
        } else {
            mostrarError("resultadoMovimiento1D", "Por favor, ingresa los datos necesarios para calcular la velocidad final.");
        }
    }

    if (document.getElementById('calcularTiempo').checked) {
        if (validarEntradaNumerica(vxf, vxi, ax)) {
            resultadoT = calcularT(vxf, vxi, ax);
        } else {
            mostrarError("resultadoMovimiento1D", "Por favor, ingresa los datos necesarios para calcular el tiempo.");
        }
    }

    let resultadoTexto = "";
    if (resultadoXf !== undefined) resultadoTexto += `Posición final (xf): ${resultadoXf.toFixed(2)} metros<br>`;
    if (resultadoVxf !== undefined) resultadoTexto += `Velocidad final (vxf): ${resultadoVxf.toFixed(2)} m/s<br>`;
    if (resultadoT !== undefined) resultadoTexto += `Tiempo (t): ${resultadoT.toFixed(2)} segundos<br>`;
    
    document.getElementById('resultadoMovimiento1D').innerHTML = resultadoTexto || "No se calcularon resultados.";
}

// Movimiento Uniforme
// Función para validar entradas numéricas
// Movimiento Uniforme
// Función para mostrar los campos adicionales según el dato disponible
function mostrarCamposMovimientoUniforme() {
    const datoDisponible = document.getElementById('datoDisponibleMU').value;
    const camposAdicionales = document.getElementById('camposAdicionalesMU');
    
    camposAdicionales.innerHTML = ''; // Limpiar campos adicionales

    if (datoDisponible === 'distancia' || datoDisponible === 'tiempo' || datoDisponible === 'rapidez' || datoDisponible === 'velocidad') {
        camposAdicionales.innerHTML += `
            <label for="distanciaMU">Distancia (metros):</label>
            <input type="number" id="distanciaMU" placeholder="Introduce la distancia" step="any">
            <label for="tiempoMU">Tiempo (segundos):</label>
            <input type="number" id="tiempoMU" placeholder="Introduce el tiempo" step="any">
        `;
    }

    if (datoDisponible === 'rapidez' || datoDisponible === 'velocidad') {
        camposAdicionales.innerHTML += `
            <label for="rapidezMU">Rapidez (m/s):</label>
            <input type="number" id="rapidezMU" placeholder="Introduce la rapidez" step="any">
        `;
    }

    if (datoDisponible === 'distancia' || datoDisponible === 'velocidad') {
        camposAdicionales.innerHTML += `
            <label for="velocidadMU">Velocidad (m/s):</label>
            <input type="number" id="velocidadMU" placeholder="Introduce la velocidad" step="any">
        `;
    }

    if (datoDisponible === 'area') {
        camposAdicionales.innerHTML += `
            <label for="base">Base (metros):</label>
            <input type="number" id="base" placeholder="Introduce la base" step="any">
            <label for="altura">Altura (metros):</label>
            <input type="number" id="altura" placeholder="Introduce la altura" step="any">
        `;
    }
}

// Función para calcular según la opción seleccionada
function calcularMovimientoUniforme() {
    const calcularRapidez = document.getElementById('calcularRapidez').checked;
    const calcularVelocidad = document.getElementById('calcularVelocidad').checked;
    const calcularDistancia = document.getElementById('calcularDistancia').checked;
    const calcularArea = document.getElementById('calcularArea').checked;

    let resultadoTexto = "";

    const distanciaInput = document.getElementById('distanciaMU');
    const tiempoInput = document.getElementById('tiempoMU');
    const rapidezInput = document.getElementById('rapidezMU');
    const velocidadInput = document.getElementById('velocidadMU');
    const baseInput = document.getElementById('base');
    const alturaInput = document.getElementById('altura');

    // Cálculo de Rapidez Promedio
    if (calcularRapidez) {
        const distancia = parseFloat(distanciaInput?.value);
        const tiempo = parseFloat(tiempoInput?.value);

        if (validarEntradaNumerica(distancia, tiempo) && tiempo !== 0) {
            const resultado = distancia / tiempo;
            resultadoTexto += `Rapidez Promedio: ${resultado.toFixed(2)} m/s<br>`;
        } else {
            resultadoTexto += "Datos inválidos para calcular la rapidez promedio.<br>";
        }
    }

    // Cálculo de Velocidad Promedio
    if (calcularVelocidad) {
        const distancia = parseFloat(distanciaInput?.value);
        const tiempo = parseFloat(tiempoInput?.value);

        if (validarEntradaNumerica(distancia, tiempo) && tiempo !== 0) {
            const resultado = distancia / tiempo;
            resultadoTexto += `Velocidad Promedio: ${resultado.toFixed(2)} m/s<br>`;
        } else {
            resultadoTexto += "Datos inválidos para calcular la velocidad promedio.<br>";
        }
    }

    // Cálculo de Distancia
    if (calcularDistancia) {
        const velocidad = parseFloat(velocidadInput?.value);
        const tiempo = parseFloat(tiempoInput?.value);

        if (validarEntradaNumerica(velocidad, tiempo)) {
            const resultado = velocidad * tiempo;
            resultadoTexto += `Distancia: ${resultado.toFixed(2)} metros<br>`;
        } else {
            resultadoTexto += "Datos inválidos para calcular la distancia.<br>";
        }
    }

    // Cálculo de Área
    if (calcularArea) {
        const base = parseFloat(baseInput?.value);
        const altura = parseFloat(alturaInput?.value);

        if (validarEntradaNumerica(base, altura)) {
            const resultado = base * altura;
            resultadoTexto += `Área: ${resultado.toFixed(2)} metros cuadrados<br>`;
        } else {
            resultadoTexto += "Datos inválidos para calcular el área.<br>";
        }
    }

    document.getElementById('resultadoMovimientoUniforme').innerHTML = resultadoTexto || "No se calcularon resultados.";
};
// Movimiento Uniformemente Acelerado (MUA)
// Función para calcular los resultados de MUA
function calcularMUA() {
    // Obtener los valores ingresados por el usuario
    const velocidadInicial = parseFloat(document.getElementById('velocidadInicial').value) || 0;
    const velocidadFinal = parseFloat(document.getElementById('velocidadFinal').value) || 0;
    const aceleracion = parseFloat(document.getElementById('aceleracion').value) || 0;
    const tiempo = parseFloat(document.getElementById('tiempo').value) || 0;
    const distancia = parseFloat(document.getElementById('distancia').value) || 0;
    
    // Obtener la opción seleccionada
    const calcular = document.getElementById('calcular').value;
    
    let resultado = '';

    switch (calcular) {
        case 'velocidadFinal':
            if (velocidadInicial !== 0 && aceleracion !== 0 && tiempo !== 0) {
                resultado = `Velocidad Final (v) = ${(velocidadInicial + aceleracion * tiempo).toFixed(2)} m/s`;
            } else {
                resultado = 'Por favor ingresa los valores de Velocidad Inicial, Aceleración y Tiempo.';
            }
            break;
            
        case 'distancia':
            if (velocidadInicial !== 0 && aceleracion !== 0 && tiempo !== 0) {
                resultado = `Distancia (s) = ${(velocidadInicial * tiempo + 0.5 * aceleracion * Math.pow(tiempo, 2)).toFixed(2)} m`;
            } else {
                resultado = 'Por favor ingresa los valores de Velocidad Inicial, Aceleración y Tiempo.';
            }
            break;

        case 'velocidadInicial':
            if (velocidadFinal !== 0 && aceleracion !== 0 && tiempo !== 0) {
                resultado = `Velocidad Inicial (v₀) = ${(velocidadFinal - aceleracion * tiempo).toFixed(2)} m/s`;
            } else {
                resultado = 'Por favor ingresa los valores de Velocidad Final, Aceleración y Tiempo.';
            }
            break;

        case 'aceleracion':
            if (velocidadFinal !== 0 && velocidadInicial !== 0 && tiempo !== 0) {
                resultado = `Aceleración (a) = ${((velocidadFinal - velocidadInicial) / tiempo).toFixed(2)} m/s²`;
            } else {
                resultado = 'Por favor ingresa los valores de Velocidad Final, Velocidad Inicial y Tiempo.';
            }
            break;

        case 'tiempo':
            if (velocidadFinal !== 0 && velocidadInicial !== 0 && aceleracion !== 0) {
                resultado = `Tiempo (t) = ${((velocidadFinal - velocidadInicial) / aceleracion).toFixed(2)} s`;
            } else {
                resultado = 'Por favor ingresa los valores de Velocidad Final, Velocidad Inicial y Aceleración.';
            }
            break;
        
        default:
            resultado = 'Por favor selecciona qué deseas calcular.';
    }
    
    // Mostrar el resultado
    document.getElementById('resultadoMUA').innerText = resultado;
}



// Caída Libre
function calcularCaidaLibre() {
    let h = parseFloat(document.getElementById("altura").value);
    const g = 9.8; // Aceleración debido a la gravedad en m/s^2
    
    if (isNaN(h) || h < 0) {
        mostrarError("resultadoCaidaLibre", "Por favor ingresa una altura válida.");
        return;
    }
    
    let tiempo = Math.sqrt(2 * h / g);
    limpiarError("resultadoCaidaLibre");
    document.getElementById("resultadoCaidaLibre").innerText = "Tiempo de caída: " + tiempo.toFixed(2) + " segundos";
}

// Conversión de Unidades
const conversiones = {
    "metros-kilometros": valor => valor / 1000,
    "kilometros-metros": valor => valor * 1000,
    "metros-millas": valor => valor / 1609.34,
    "kilometros-millas": valor => valor / 1.60934,
    "millas-kilometros": valor => valor * 1.60934,
    "millas-metros": valor => valor * 1609.34
};

function convertirUnidades() {
    let valor = parseFloat(document.getElementById("valor").value);
    let unidadInicial = document.getElementById("unidadInicial").value;
    let unidadFinal = document.getElementById("unidadFinal").value;

    if (isNaN(valor)) {
        mostrarError("resultadoConversion", "Por favor ingresa un valor válido.");
        return;
    }

    const clave = `${unidadInicial}-${unidadFinal}`;
    let resultado;
    
    if (conversiones[clave]) {
        resultado = conversiones[clave](valor);
        limpiarError("resultadoConversion");
    } else {
        mostrarError("resultadoConversion", "Conversión no soportada.");
        return;
    }

    document.getElementById("resultadoConversion").innerText = "Resultado: " + resultado + " " + unidadFinal;
}

// Función para mostrar una sección y ocultar otras
function mostrarSeccion(idMostrar) {
    const secciones = ['notacionCientifica', 'cinematica', 'movimientoUniforme', 'mua', 'caidaLibre', 'conversion'];
    secciones.forEach(id => {
        if (id === idMostrar) {
            document.getElementById(id).style.display = 'block';
        } else {
            document.getElementById(id).style.display = 'none';
        }
    });
}

// Inicialización de eventos
document.getElementById('btnCalcularNotacionCientifica').addEventListener('click', calcularNotacionCientifica);
document.getElementById('datoDisponible').addEventListener('change', mostrarCampos);
document.getElementById('btnCalcularMovimiento1D').addEventListener('click', calcularMovimiento1D);

document.getElementById('btnCalcularMUA').addEventListener('click', calcularMUA);
document.getElementById('btnCalcularMovimientoUniforme').addEventListener('click', calcularMovimientoUniforme);
document.getElementById('btnCalcularCaidaLibre').addEventListener('click', calcularCaidaLibre);
document.getElementById('btnConvertirUnidades').addEventListener('click', convertirUnidades);

// Mostrar sección inicial
mostrarSeccion('inicio');

