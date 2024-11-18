import {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
} from './gestionPresupuestoWeb.js';

import {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
} from './gestionPresupuesto.js';

// actualizar el presupuesto a 1500€
actualizarPresupuesto(1500);

//mostrar el presupuesto actualizado en el div#presupuesto
mostrarDatoEnId(mostrarPresupuesto(), "presupuesto");

// Crear los gastos indicados
const gastos = [
    new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"),
    new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"),
    new CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"),
    new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"),
    new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"),
    new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")
];

// añadir los gastos creados
gastos.forEach(gasto => anyadirGasto(gasto));

//mostrar el total de los gastos en el div#gastos-totales
mostrarDatoEnId(calcularTotalGastos(), "gastos-totales");

//mostrar el balance total en el div#balance-total
mostrarDatoEnId(calcularBalance(), "balance-total");

//mostrar el listado completo de gastos en el div#listado-gastos-completo
listarGastos().forEach(gasto => {
    mostrarGastoWeb(gasto, "listado-gastos-completo");
});

//mostrar el listado de gastos realizados en septiembre de 2021 en el div listado-gastos-filtrado-1
filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" }).forEach(gasto => {
    mostrarGastoWeb(gasto, "listado-gastos-filtrado-1");
});

//mostrar el listado de gastos de más de 50€ en el div
filtrarGastos({ valorMinimo: 50 }).forEach(gasto => {
    mostrarGastoWeb(gasto, "listado-gastos-filtrado-2");
});

//mostrar el listado de gastos de más de 200€ con la etiqueta 'seguros' en el div
filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] }).forEach(gasto => {
    mostrarGastoWeb(gasto, "listado-gastos-filtrado-3");
});

//mostrar el listado de gastos que tengan las etiquetas 'comida' o 'transporte' de menos de 50€ en el div
filtrarGastos({ valorMaximo: 50, etiquetasTiene: ["comida", "transporte"] }).forEach(gasto => {
    mostrarGastoWeb(gasto, "listado-gastos-filtrado-4");
});

//mostrar el total de gastos agrupados por día en el div #agrupacion-dia
mostrarGastosAgrupadosWeb(agruparGastos("dia"), "día", "agrupacion-dia");

//mostrar el total de gastos agrupados por mes en el div #agrupacion-mes
mostrarGastosAgrupadosWeb(agruparGastos("mes"), "mes", "agrupacion-mes");

//mostrar el total de gastos agrupados por año en el div #agrupacion-anyo
mostrarGastosAgrupadosWeb(agruparGastos("anyo"), "año", "agrupacion-anyo");