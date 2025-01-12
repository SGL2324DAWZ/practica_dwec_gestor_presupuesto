import * as libreriaGestion from './gestionPresupuesto.js';

function mostrarDatoEnId(valor, idElemento) {
    //el id es el elemento del html
    if (idElemento != null) {
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML = valor;
    }
}

function mostrarGastoWeb(gasto, idElemento) {
    if (idElemento != null) {
        //contenedor principal para el gasto
        let divGasto = document.createElement("div")

        divGasto.classList = "gasto"

        //crear y agregar la descripción del gasto
        let divDescripcion = document.createElement("div");

        divDescripcion.classList = "gasto-descripcion";
        divDescripcion.innerHTML = gasto.descripcion;

        divGasto.appendChild(divDescripcion);

        //crear y agregar la fecha del gasto
        let divFecha = document.createElement("div");

        divFecha.classList = "gasto-fecha";
        divFecha.innerHTML = gasto.fecha;

        divGasto.appendChild(divFecha);

        //crear y agregar el valor del gasto
        let divValor = document.createElement("div");

        divValor.classList = "gasto-valor";
        divValor.innerHTML = gasto.valor;

        divGasto.appendChild(divValor);

        //contenedor para las etiquetas del gasto
        let divEtiquetas = document.createElement("div");
        divEtiquetas.classList = "gasto-etiquetas";

        //recorre todas las etiquetas del gasto y las agrega al contenedor
        gasto.etiquetas.forEach(etiqueta => {
            //crea un span para cada etiqueta
            let divEtiqueta1 = document.createElement("span");
            divEtiqueta1.classList = "gasto-etiquetas-etiqueta";
            divEtiqueta1.innerHTML = etiqueta;
            divEtiquetas.appendChild(divEtiqueta1);

            //crea un objeto para manejar la eliminación de la etiqueta
            let objetoBorrarEtiqueta = new BorrarEtiquetasHandle();
            objetoBorrarEtiqueta.gasto = gasto;
            objetoBorrarEtiqueta.etiqueta = etiqueta;

            //asigna un evento para eliminar la etiqueta cuando se haga clic
            divEtiqueta1.addEventListener("click", objetoBorrarEtiqueta);
        });

        //agrega las etiquetas al contenedor del gasto
        divGasto.appendChild(divEtiquetas);

        //boton editar gasto
        let botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.classList = "gasto-editar"
        botonEditar.type = "button";

        let objetoEditar = new EditarHandle();

        //le pasa al objeto el gasto del parametro
        objetoEditar.gasto = gasto;

        botonEditar.addEventListener("click", objetoEditar);

        divGasto.appendChild(botonEditar);

        //boton borrar gasto
        let botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Borrar";
        botonBorrar.classList = "gasto-borrar"
        botonBorrar.type = "button";

        let objetoBorrar = new BorrarHandle();
        objetoBorrar.gasto = gasto;

        botonBorrar.addEventListener("click", objetoBorrar);

        divGasto.appendChild(botonBorrar);

        let botonEditarForm = document.createElement("button");
        botonEditarForm.textContent = "Editar (formulario)";
        botonEditarForm.classList = "gasto-editar-formulario";
        botonEditarForm.type = "button";

        let objetoEditarForm = new editarHandleformulario();
        objetoEditarForm.gasto = gasto;
        objetoEditarForm.divGasto = divGasto;
        objetoEditarForm.botonEditarForm = botonEditarForm;

        botonEditarForm.addEventListener("click", objetoEditarForm);

        divGasto.appendChild(botonEditarForm);

        //otiene el elemento HTML por su id y le agrega el gasto completo
        let elemento = document.getElementById(idElemento);
        elemento.appendChild(divGasto);
    }
}

let editarHandleformulario = function () {
    this.handleEvent = function () {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().split("T")[0];
        formulario.elements.etiquetas.value = this.gasto.etiquetas.join(", ");

        let objetoEditarGastoHandle = new editarGastoFormularioHandle();
        objetoEditarGastoHandle.gasto = this.gasto;
        objetoEditarGastoHandle.divGasto = this.divGasto;
        formulario.addEventListener("submit", objetoEditarGastoHandle);

        let botonCancelar = formulario.querySelector("button.cancelar");
        let objetoBtnCancelar = new cancelarEditarGastoHandle();
        objetoBtnCancelar.divGasto = this.divGasto
        botonCancelar.addEventListener("click", objetoBtnCancelar);


        this.divGasto.appendChild(formulario)

        
        this.divGasto.querySelector("button.gasto-editar-formulario").setAttribute("disabled", "");
    }
}

let editarGastoFormularioHandle = function () {
    this.handleEvent = function (event) {
        event.preventDefault();
        let form = this.divGasto.querySelector("form")
        let descripcion = form.elements.descripcion.value;
        let valor = parseFloat(form.elements.valor.value);
        let fecha = new Date(form.elements.fecha.value);
        let etiquetas = form.elements.etiquetas.value.split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetas);

        repintar();
    }
}

let cancelarEditarGastoHandle = function () {
    this.handleEvent = function () {
        let form = this.divGasto.querySelector("form").remove()

        this.divGasto.querySelector("button.gasto-editar-formulario").removeAttribute("disabled");
    }
}

let EditarHandle = function () {
    this.handleEvent = function () {
        let descripcion = prompt("Introduce la descripcion del gasto: ", this.gasto.descripcion);
        let valor = prompt("Introduce el valor del gasto: ", this.gasto.valor);
        let fecha = prompt("Introduce la decha del gasto: ", this.gasto.fecha);
        let etiquetas = prompt("Introduce las etiquetas del gasto: ", this.gasto.etiquetas.join(','));

        if (valor != null) {
            valor = parseFloat(valor);
        }

        let arrayEtiquetas = etiquetas.split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(arrayEtiquetas);

        repintar();
    }
}

let BorrarHandle = function () {
    this.handleEvent = function () {

        libreriaGestion.borrarGasto(this.gasto.id);

        repintar();
    }
}

let BorrarEtiquetasHandle = function () {
    this.handleEvent = function () {

        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento) {
    if (idElemento != null) {
        var divAgrupacion = document.createElement("div");
        divAgrupacion.classList = "agrupacion";

        var h1 = document.createElement('h1');
        h1.innerHTML = "Gastos agrupados por " + periodo;
        divAgrupacion.appendChild(h1);

        var claves = Object.keys(agrup);
        let i = 0;

        for (let agrupActual in agrup) {
            var divAgr1 = document.createElement('div');
            divAgr1.classList = "agrupacion-dato";

            var spanClave = document.createElement('span');
            spanClave.classList = "agrupacion-dato-clave";
            spanClave.innerHTML = claves[i];
            i++;
            divAgr1.appendChild(spanClave);

            var spanValor = document.createElement('span');
            spanValor.classList = "agrupacion-dato-valor";
            spanValor.innerHTML = agrup[agrupActual];
            divAgr1.appendChild(spanValor);

            divAgrupacion.appendChild(divAgr1);
        }

        var elemento = document.getElementById(idElemento);
        elemento.appendChild(divAgrupacion);

    }
}

function repintar() {
    mostrarDatoEnId(libreriaGestion.mostrarPresupuesto(), "presupuesto");
    mostrarDatoEnId(libreriaGestion.calcularTotalGastos(), "gastos-totales");
    mostrarDatoEnId(libreriaGestion.calcularBalance(), "balance-total");

    let divGastos = document.getElementById("listado-gastos-completo");
    divGastos.innerHTML = "";

    libreriaGestion.listarGastos().forEach(gasto => {
        mostrarGastoWeb(gasto, "listado-gastos-completo")
    })

}

function actualizarPresupuestoWeb() {
    let nuevoPresupuesto = prompt("Introduce tu presupuesto: ", "100");

    if (nuevoPresupuesto != null) {
        nuevoPresupuesto = parseFloat(nuevoPresupuesto);
        libreriaGestion.actualizarPresupuesto(nuevoPresupuesto);

        repintar();
    }

}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion = prompt("Introduce la descripcion del gasto: ", "Comida");
    let valor = prompt("Introduce el valor del gasto: ", "100");
    let fecha = prompt("Introduce la decha del gasto: ", "yyyy-mm-dd");
    let etiquetas = prompt("Introduce las etiquetas del gasto: ", "Ocio,Casa");

    if (valor != null) {
        valor = parseFloat(valor);
    }

    let arrayEtiquetas = etiquetas.split(",");

    let nuevoGasto = new libreriaGestion.CrearGasto(descripcion, valor, fecha, arrayEtiquetas);
    libreriaGestion.anyadirGasto(nuevoGasto);

    repintar();
}

let btnanyadirGasto = document.getElementById("anyadirgasto");
btnanyadirGasto.addEventListener("click", nuevoGastoWeb);

//practica formularios

function nuevoGastoWebFormulario() {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    let botonCancelar = formulario.querySelector("button.cancelar");

    botonCancelar.addEventListener("click", new cancelarNuevoGastoHandle())

    document.getElementById("controlesprincipales").appendChild(formulario)

    let botonAnyadirGasto = document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");

    formulario.addEventListener("submit", new nuevoGastoFormularioHandle());
}

let botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirFormulario.addEventListener("click", nuevoGastoWebFormulario);

let nuevoGastoFormularioHandle = function () {
    this.handleEvent = function (event) {
        event.preventDefault();

        let form = document.forms[0];

        let descripcion = form.elements.descripcion.value;
        let valor = parseFloat(form.elements.valor.value);
        let fecha = new Date(form.elements.fecha.value);
        let etiquetas = form.elements.etiquetas.value.split(",");

        let nuevoGasto = new libreriaGestion.CrearGasto(descripcion, valor, fecha, etiquetas)

        libreriaGestion.anyadirGasto(nuevoGasto);

        repintar();

        let botonAnyadirGasto = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}

let cancelarNuevoGastoHandle = function () {
    this.handleEvent = function (event) {
        let form = document.forms[0];

        form.remove();

        let botonAnyadirGasto = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}


let filtrarGastoWeb = function(){
    this.handleEvent = function(event) {
        event.preventDefault();

        let fechaDesde = this.formulario.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHasta = this.formulario.elements["formulario-filtrado-fecha-hasta"].value;
        let valorMinimo = Number(this.formulario.elements["formulario-filtrado-valor-minimo"].value);
        let valorMaximo = this.formulario.elements["formulario-filtrado-valor-maximo"].value;
        let descripcionContiene = this.formulario.elements["formulario-filtrado-descripcion"].value;
        let etiquetasTiene = this.formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

        document.getElementById("listado-gastos-completo").innerHTML = "";

        //llamar a transformarListadoEtiquetas si hay etiquetas
        if(etiquetasTiene){
            etiquetasTiene = libreriaGestion.transformarListadoEtiquetas(etiquetasTiene);
        }

        //objeto para filtrarGastos
        let filtrados = libreriaGestion.filtrarGastos({ fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene });
        
        //actualizar la lista de gastos filtrados
        filtrados.forEach(gasto => {
            mostrarGastoWeb(gasto, "listado-gastos-completo");
        });
    }
}

    let formulario = document.getElementById("formulario-filtrado");
    let filtrarResultados = new filtrarGastoWeb();
    filtrarResultados.formulario = formulario;
    formulario.addEventListener('submit', filtrarResultados);



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}