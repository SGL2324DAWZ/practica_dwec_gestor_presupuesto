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
    if (typeof valorGasto === 'number' && valorGasto >= 0) {
        this.valor = valorGasto;
    }
    else {
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

    this.mostrarGasto = function () {
        return "Gasto correspondiente a: " + this.descripcion + "con valor de: " + this.valor + "€.";
    }

    this.mostrarGastoCompleto = function () {
        let resultado = "";

        resultado = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\n";

        resultado += "Fecha: " + new Date(this.fecha).toLocaleString();

        resultado += "\nEtiquetas:\n"

        this.etiquetas.forEach(etiqueta => {
            resultado += "- " + etiqueta + "\n"
        })
        return resultado;
    }

    this.actualizarDescripcion = function (descripcionNueva) {
        this.descripcion = descripcionNueva;
    }

    this.actualizarValor = function (valorNuevo) {
        if (typeof valorNuevo === "number" && valorNuevo >= 0) {
            this.valor = valorNuevo;
        }
    }

    this.actualizarFecha = function (fecha) {
        if (Date.parse(fecha)) {
            this.fecha = Date.parse(fecha);
        }
    }

    this.anyadirEtiquetas = function (...etiquetasNuevas) {
        etiquetasNuevas.forEach(etiqueta => {
            //comprueba si la nueva ya esta en la lista de etiquetas del objeto
            if (!this.etiquetas.includes(etiqueta)) {
                //si no esta la añade
                this.etiquetas.push(etiqueta)
            }
        })
    }

    this.borrarEtiquetas = function (...etiquetasBorrar) {
        for (let i = 0; i < etiquetasBorrar.length; i++) {
            let posicion = this.etiquetas.indexOf(etiquetasBorrar[i])

            if (posicion > -1) {
                this.etiquetas.splice(posicion, 1)
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        let resultado = new Date(this.fecha).getFullYear();

        if(periodo === "mes" || periodo === "dia"){
            let mes = new Date(this.fecha).getMonth() + 1; 
            
            if(mes < 10){
                resultado += "-0" + mes;
            }
            else {
                resultado += "-" + mes;
            }
            
            if(periodo === "dia"){
                let dia = new Date(this.fecha).getDate();
                
                if(dia < 10){
                    resultado += "-0" + dia;
                }
                else {
                    resultado += "-" + dia;
                }
            }
        }
        return resultado;
    }
}

function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){
    return gastos.filter(function(gasto) {
        let filtrado = true;

        if(fechaDesde && gasto.fecha < Date.parse(fechaDesde)){
            filtrado = false;
        }

        if(fechaHasta && gasto.fecha > Date.parse(fechaHasta)){
            filtrado = false;
        }
        
        if(valorMinimo && gasto.valor < valorMinimo){
            filtrado = false;
        }

        if(valorMaximo && gasto.valor > valorMaximo) {
            filtrado = false;
        }

        if(descripcionContiene && !gasto.descripcion.toLowerCase().includes(descripcionContiene.toLowerCase()) ) {
            filtrado = false;
        }

        if(etiquetasTiene ){
            let encontrado = false;

            etiquetasTiene.forEach(etiqueta => {
                if (gasto.etiquetas.includes(etiqueta)){
                    encontrado = true;
                }
            })

            if (!encontrado){
                filtrado = false;
            }
        }

        return filtrado;
    })
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta = Date.now()) {
    //llama a filtrarGastos y devuelve una lista filtrada
    let gastosAgrupados = filtrarGastos({etiquetasTiene:etiquetas, fechaDesde:fechaDesde, fechaHasta:fechaHasta});

    //variable objeto q acumula la suma de los gastos previamente filtrados
    let objeto = gastosAgrupados.reduce(function (objetoAcumulador, gasto){

        if(typeof objetoAcumulador[gasto.obtenerPeriodoAgrupacion(periodo)] != "number"){
            objetoAcumulador[gasto.obtenerPeriodoAgrupacion(periodo)] = 0;
        }

        //convierte el valor del gasto a un número
        objetoAcumulador[gasto.obtenerPeriodoAgrupacion(periodo)] += parseFloat(gasto.valor);

        return objetoAcumulador;
    },{});

    return objeto;
}

/*
let gasto1 = new CrearGasto("Gasto 1");
let gasto2 = new CrearGasto("Gasto 2", 23.55);
let gasto3 = new CrearGasto("Gasto 3", 23.55, "2021-10-06T13:10" );
let gasto4 = new CrearGasto("Gasto 4", 23.55, "2021-10-06T13:10", "casa" );
let gasto5 = new CrearGasto("Gasto 5", 23.55, "2021-10-06T13:10", "casa", "supermercado" );
let gasto6 = new CrearGasto("Gasto 6", 23.55, "2021-10-06T13:10", "casa", "supermercado", "comida" );
*/

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    //lo añade a la lista de gastos
    gastos.push(gasto);
}

function borrarGasto(idGasto) {
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === idGasto) {
            //borro desde la posicion i 1
            gastos.splice(i, 1);
            break;
        }
    }
}

function calcularTotalGastos() {
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
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}