// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

var a = 4;
var b = 5;
var c = a + b;

console.log(c);

let presupuesto = 0;

function actualizarPresupuesto(movimiento) {
    if (typeof movimiento === "number" && movimiento >= 0) {
        presupuesto = movimiento;
        return presupuesto;
    }
    else {
        console.log("El valor no puede ser negativo.")
        return -1;
    }
}

function mostrarPresupuesto() {
    let resultado = "";
    resultado = "Tu presupuesto actual es de " + presupuesto + "€";

    return resultado;
}

function CrearGasto() {
    // TODO
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
