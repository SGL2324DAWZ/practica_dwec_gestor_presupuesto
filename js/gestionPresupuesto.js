// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

var a = 4;
var b = 5;
var c = a + b;

console.log(c);

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

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

function CrearGasto(descripcionGasto, valorGasto, fechaGasto, etiquetaGasto) {
    //asigna a la descripcion del objeto la pasada por parametro
    this.descripcion = descripcionGasto;

    //comprueba si es un numero positivo y despues le asigna el valor pasado por parametro
    if (typeof valorGasto === "number" && valorGasto >= 0) {
        this.valor = valorGasto;
    }
    else{
        this.valor = 0;
    }

}

function mostrarGasto() {
    console.log("Gasto correspondiente a: " + this.descripcion + "con valor de: " + this.valor + "€.");
}

function actualizarDescripcion(descripcionNueva){
    this.descripcion = descripcionNueva;
}

function actualizarValor(valorNuevo) {
    if (typeof valorNuevo === "number" && valor >= 0) {
        this.valor = valorNuevo;
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(){
}

function borrarGasto(){

}

function calcularTotalGastos(){

}

function calcularBalance() {

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos, 
    anyadirGasto, 
    borrarGasto, 
    calcularTotalGastos,
    calcularBalance
}
