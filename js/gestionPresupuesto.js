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

function CrearGasto(descripcionGasto, valorGasto, fechaGasto, ...etiquetasGasto) {
    //asigna a la descripcion del objeto la pasada por parametro
    this.descripcion = descripcionGasto;

    //comprueba si es un numero positivo y despues le asigna el valor pasado por parametro
    if (typeof valorGasto === "number" && valorGasto >= 0) {
        this.valor = valorGasto;
    }
    else{
        this.valor = 0;
    }

    //comprueba si la fecha es valida si no hay ninguna asigna la de hoy
    if (Date.parse(fechaGasto)) {
        this.fecha = Date.parse(fechaGasto);
    } 
    else {
        this.fecha = Date.now();
    }

    this.etiquetas = etiquetasGasto;

    this.mostrarGasto = function() {
        return "Gasto correspondiente a: " + this.descripcion + "con valor de: " + this.valor + "€.";
    }

    
    this.actualizarDescripcion = function(descripcionNueva){
        this.descripcion = descripcionNueva;
    }
    
}

let gasto1 = new CrearGasto("Gasto 1");
let gasto2 = new CrearGasto("Gasto 2", 23.55);
let gasto3 = new CrearGasto("Gasto 3", 23.55, "2021-10-06T13:10" );
let gasto4 = new CrearGasto("Gasto 4", 23.55, "2021-10-06T13:10", "casa" );
let gasto5 = new CrearGasto("Gasto 5", 23.55, "2021-10-06T13:10", "casa", "supermercado" );
let gasto6 = new CrearGasto("Gasto 6", 23.55, "2021-10-06T13:10", "casa", "supermercado", "comida" );


function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    //lo añade a la lista de gastos
    gastos.push(gasto);
}

function borrarGasto(idGasto){
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === idGasto){
            //borro desde la posicion i 1
            gastos.splice(i, 1);
            break;
        }
    }
}

function calcularTotalGastos(){
    let totalGastos = 0;

    gastos.forEach(gasto => {
        totalGastos += gasto.valor;
    });

    return totalGastos;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
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