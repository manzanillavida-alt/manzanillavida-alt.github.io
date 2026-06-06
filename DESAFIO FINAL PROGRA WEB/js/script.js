// 1.SIMULADOR DE CARBURANTES
function calcularCarburante() {
    // Captura de elementos DOM
    const txtInicial = document.getElementById('carb-inicial').value;
    const txtConsumo = document.getElementById('carb-consumo').value;
    const txtReabasto = document.getElementById('carb-reabasto').value;
    const txtCritico = document.getElementById('carb-critico').value;
    const resBox = document.getElementById('resultado-carburante');

    // Validar que los campos no estén vacíos (Requisito Obligatorio)
    if (txtInicial === "" || txtConsumo === "" || txtReabasto === "" || txtCritico === "") {
        alert("Por favor, complete todos los campos numéricos del simulador de carburantes.");
        return;
    }

    // Conversión a valores numéricos flotantes
    const inicial = parseFloat(txtInicial);
    const consumo = parseFloat(txtConsumo);
    const reabasto = parseFloat(txtReabasto);
    const critico = parseFloat(txtCritico);

    // Reiniciar clases de estado previas
    resBox.className = "resultado-box";

    // Modelo matemático interactivo
    const perdidaNetaDiaria = consumo - reabasto;

    if (perdidaNetaDiaria <= 0) {
        // El reabastecimiento es igual o superior al consumo diario
        resBox.innerHTML = `
            <strong>Estado: Sostenible Temporalmente</strong><br>
            El volumen de reabastecimiento diario (${reabasto} L) cubre o supera el consumo estimado (${consumo} L). 
            Las reservas no tienden a agotarse bajo este modelo matemático estático.
        `;
        resBox.classList.add('estado-normal');
    } else {
        // Cálculo de tiempos de declive
        const diasHastaCritico = (inicial - critico) / perdidaNetaDiaria;
        const diasHastaAgotamiento = inicial / perdidaNetaDiaria;
        let mensajeHTML = "";
        if (inicial <= critico) {
            resBox.classList.add('estado-critico');
            mensajeHTML += `<strong>ALERTA CRÍTICA:</strong> El volumen inicial ya se encuentra por debajo o igual al nivel de seguridad crítico.<br>`;
        } else {
            resBox.classList.add('estado-alerta');
            mensajeHTML += `<strong>Proyección de Alerta:</strong> La reserva descenderá al nivel crítico en aproximadamente <strong>${Math.max(0, diasHastaCritico).toFixed(1)}</strong> días.<br>`;
        }

        mensajeHTML += `<strong>Agotamiento Total:</strong> Al ritmo neto actual de pérdidas (-${perdidaNetaDiaria} L/día), el combustible se agotará por completo en <strong>${diasHastaAgotamiento.toFixed(1)}</strong> días.`;
        resBox.innerHTML = mensajeHTML;
    }

    // Mostrar el contenedor de resultados
    resBox.classList.remove('hidden');
}

function limpiarCarburante() {
    document.getElementById('form-carburante').reset();
    const resBox = document.getElementById('resultado-carburante');
    resBox.innerHTML = "";
    resBox.className = "resultado-box hidden";
}

// 2.SIMULADOR DE CANASTA FAMILIAR
function calcularCanasta() {
    // Captura de elementos DOM
    const producto = document.getElementById('prod-nombre').value.trim();
    const txtPrecioAnt = document.getElementById('prod-precio-ant').value;
    const txtPrecioAct = document.getElementById('prod-precio-act').value;
    const txtCantidad = document.getElementById('prod-cantidad').value;
    const txtSemanas = document.getElementById('prod-semanas').value;
    const resBox = document.getElementById('resultado-canasta');

    // Validación básica estricta
    if (producto === "" || txtPrecioAnt === "" || txtPrecioAct === "" || txtCantidad === "" || txtSemanas === "") {
        alert("Por favor, complete todos los campos de la sección canasta familiar.");
        return;
    }

    const precioAnt = parseFloat(txtPrecioAnt);
    const precioAct = parseFloat(txtPrecioAct);
    const cantidadSemanal = parseFloat(txtCantidad);
    const semanas = parseInt(txtSemanas);

    // Reiniciar estilos de estado
    resBox.className = "resultado-box";
    // Cálculos sugeridos según el pliego técnico
    const incrementoPrecio = precioAct - precioAnt;
    const porcentajeAumento = (incrementoPrecio / precioAnt) * 100;
    const gastoSemanalAnterior = precioAnt * cantidadSemanal;
    const gastoSemanalActual = precioAct * cantidadSemanal;
    const gastoTotalActualProyectado = gastoSemanalActual * semanas;
    const sobreprecioTotalAcumulado = (gastoSemanalActual - gastoSemanalAnterior) * semanas;
    // Determinar nivel visual según la gravedad del porcentaje de incremento
    if (porcentajeAumento <= 0) {
        resBox.classList.add('estado-normal');
    } else if (porcentajeAumento > 0 && porcentajeAumento <= 20) {
        resBox.classList.add('estado-alerta');
    } else {
        resBox.classList.add('estado-critico');
    }

    // Inserción de resultados dinámicos visibles
    resBox.innerHTML = `
        <h3>Análisis de Impacto: ${producto}</h3>
        <p>El incremento directo por unidad es de <strong>${incrementoPrecio.toFixed(2)} Bs</strong>, representando un aumento porcentual de <strong>${porcentajeAumento.toFixed(1)}%</strong>.</p>
        <hr style="margin: 0.5rem 0; border: 0; border-top: 1px solid #ccc;">
        <p>• Gasto semanal anterior: ${gastoSemanalAnterior.toFixed(2)} Bs</p>
        <p>• Gasto semanal actual: ${gastoSemanalActual.toFixed(2)} Bs</p>
        <p>• Gasto total proyectado (${semanas} semanas): <strong>${gastoTotalActualProyectado.toFixed(2)} Bs</strong></p>
        <p style="color: #c0392b; font-weight: bold;">Pérdida del poder adquisitivo: La familia gasta un extra total de ${sobreprecioTotalAcumulado.toFixed(2)} Bs por el mismo volumen de consumo.</p>
    `;
    resBox.classList.remove('hidden');
}

function limpiarCanasta() {
    document.getElementById('form-canasta').reset();
    const resBox = document.getElementById('resultado-canasta');
    resBox.innerHTML = "";
    resBox.className = "resultado-box hidden";
}