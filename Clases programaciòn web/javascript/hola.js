function calcularCalor() {
    var t0 = parseFloat(document.getElementById("t0").value);
    var ts = parseFloat(document.getElementById("ts").value);
    var k = parseFloat(document.getElementById("k").value);
    var t = parseFloat(document.getElementById("t").value);
    var resultado = ts + (t0 - ts) * Math.exp(-k * t);
    var resultadoFinal = Math.round(resultado);
    document.getElementById("resultado-calor").innerText = "Resultado: " + resultadoFinal + " °C";
}
function calcularCombinacionesTotales() {
    var n1 = parseInt(document.getElementById("n1").value);
    var r1 = parseInt(document.getElementById("r1").value);
    var n2 = parseInt(document.getElementById("n2").value);
    var r2 = parseInt(document.getElementById("r2").value);
    if (r1 > n1 || r2 > n2) {
        alert("Error: El valor de 'r' no puede ser mayor que 'n'.");
        return;
    }
    var comb1 = factorial(n1) / (factorial(r1) * factorial(n1 - r1));
    var comb2 = factorial(n2) / (factorial(r2) * factorial(n2 - r2));
    var resultadoTotal = comb1 * comb2;
    document.getElementById("resultado-comb").innerText = "Total Combinaciones: " + resultadoTotal;
}

function factorial(num) {
    var resultado = 1;
    for (var i = 2; i <= num; i++) {
        resultado *= i;
    }
    return resultado;
}