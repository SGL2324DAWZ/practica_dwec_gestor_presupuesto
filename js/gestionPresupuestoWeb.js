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

        let botonBorrarApi = document.createElement('button');
        botonBorrarApi.type="button";
        botonBorrarApi.textContent="Borrar (API)";
        botonBorrarApi.classList="gasto-borrar";

        let objetoBorrarApi = new BorrarApiHandle();
        objetoBorrarApi.gasto=gasto;

        botonBorrarApi.addEventListener("click", objetoBorrarApi);
        divGasto.appendChild(botonBorrarApi);

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

        this.divGasto.appendChild(formulario);

        this.botonEditar.setAttribute('disabled', "");

        let btnEditarGastoApi = document.createElement("button");
        btnEditarGastoApi.id="gasto-editar-api";
        btnEditarGastoApi.innerHTML="Editar (API)"
        formulario.appendChild(btnEditarGastoApi)
        var objetoEditarApi = new editarGastoApiHandle();
        objetoEditarApi.gasto = this.gasto;

        btnEditarGastoApi.addEventListener("click", objetoEditarApi);


        formulario.elements.descripcion.value=this.gasto.descripcion;
        formulario.elements.valor.value=this.gasto.valor;
        formulario.elements.fecha.value=this.gasto.fecha;
        formulario.elements.etiquetas.value=this.gasto.etiquetas;

        let form = new EditarGastoHandle();
        form.gasto = this.gasto;
        formulario.addEventListener("submit", form);

        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelarForm = new CancelarCrearGastoHandle(this.botonEditar);
        btnCancelar.addEventListener('click', cancelarForm);
    }
}

function editarGastoApiHandle(){
    this.handleEvent= function(event){
        event.preventDefault();
        var nombreUsuario = document.getElementById("nombre_usuario").value;

        let form = document.forms[1];

        var nuevoGasto = new gestionPresupuesto.CrearGasto(form.elements.descripcion.value, Number(form.elements.valor.value), new Date(form.elements.fecha.value), form.elements.etiquetas.value.split(","));
        
        fetch('https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/'+nombreUsuario+"/"+this.gasto.gastoId, {method: 'Put',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nuevoGasto)})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                cargarGastosApi();
            })
            .catch(err => console.log(err));

        
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

let BorrarApiHandle = function(){
    this.handleEvent= function(event){
        event.preventDefault();
        var nombreUsuario = document.getElementById("nombre_usuario").value;
        fetch('https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/'+nombreUsuario+"/"+this.gasto.gastoId, {method: 'Delete'})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                gestionPresupuesto.borrarGasto(this.gasto.gastoId);
                cargarGastosApi();
            })
            .catch(err => console.log(err));

            
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

var CancelarCrearGastoHandle = function(boton){
    this.handleEvent= function(event){
        document.forms[0].remove();

        boton.removeAttribute("disabled");
    }
}

function nuevoGastoWebFormulario() {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    let botonCancelar = formulario.querySelector("button.cancelar");

    botonCancelar.addEventListener("click", new cancelarNuevoGastoHandle())

    document.getElementById("controlesprincipales").appendChild(formulario)

    let botonAnyadirGasto = document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");

    formulario.addEventListener("submit", new nuevoGastoFormularioHandle());
    
    let btnNuevoGastoApi = document.createElement("button");
    btnNuevoGastoApi.id="gasto-enviar-api";
    formulario.appendChild(btnNuevoGastoApi);
    btnNuevoGastoApi.innerHTML="Enviar (API)"
    var objetoNuevoApi = new nuevoGastoApiHandle();

    btnNuevoGastoApi.addEventListener("click", objetoNuevoApi);

    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
    btnAnyadirGastoForm.setAttribute('disabled', "");

    let btnCancelar = formulario.querySelector("button.cancelar");
    let cancelarForm = new CancelarCrearGastoHandle(btnAnyadirGastoForm);
    btnCancelar.addEventListener('click', cancelarForm);
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

function nuevoGastoApiHandle(){
    this.handleEvent= function(event){
        event.preventDefault();
        var nombreUsuario = document.getElementById("nombre_usuario").value;

        let form = document.forms[0];

        var nuevoGasto = {
            descripcion :form.elements.descripcion.value, 
            valor:form.elements.valor.value, 
            fecha:form.elements.fecha.value, 
            etiquetas: form.elements.etiquetas.value.split(","),
            usuario:nombreUsuario
        }
        
        fetch('https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/'+nombreUsuario, {method: 'Post',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nuevoGasto)})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                //gestionPresupuesto.anyadirGasto(nuevoGasto);
                cargarGastosApi();
            })
            .catch(err => console.log(err));

        
    }
}

//practica regex

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

//practica almacenamiento

let formulario = document.getElementById("formulario-filtrado");
let filtrarResultados = new filtrarGastoWeb();
filtrarResultados.formulario = formulario;
formulario.addEventListener('submit', filtrarResultados);

function guardarGastosWeb(){
    this.handleEvent= function(event){
        
        localStorage.setItem("GestorGastosDWEC", JSON.stringify(libreriaGestion.listarGastos()));
    }
}

let btnGuardarGastos = document.getElementById("guardar-gastos");
btnGuardarGastos.addEventListener('click', new guardarGastosWeb());

function cargarGastosWeb(){
    this.handleEvent= function(event){
        event.preventDefault();

        if(localStorage.getItem("GestorGastosDWEC")){
            libreriaGestion.cargarGastos(JSON.parse(localStorage.getItem("GestorGastosDWEC")));
        }
        else{
            libreriaGestion.cargarGastos([]);
        }

        repintar();
    }   
}

let btnCargarGastos = document.getElementById("cargar-gastos");
btnCargarGastos.addEventListener('click', new cargarGastosWeb());

//practica comunicación asíncrona

function cargarGastosApiHandle(){
    this.handleEvent= function(event){
        event.preventDefault();
        cargarGastosApi()

        
    }
}

function cargarGastosApi(){
    let nombreUsuario = document.getElementById("input#nombre_usuario").value;
        fetch('https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest'+nombreUsuario, {method: 'Get'})
            .then(response => response.json())
            .then(data => {
                console.log(libreriaGestion.listarGastos());
                console.log(data);
                libreriaGestion.limpiarGastos();
                console.log(libreriaGestion.listarGastos());
                libreriaGestion.cargarGastos(data);

                let elemento = document.getElementById("listado-gastos-filtrado-1");
                elemento.innerHTML="";

                elemento = document.getElementById("listado-gastos-filtrado-2");
                elemento.innerHTML="";

                elemento = document.getElementById("listado-gastos-filtrado-3");
                elemento.innerHTML="";
                
                elemento = document.getElementById("listado-gastos-filtrado-4");
                elemento.innerHTML="";

                repintar();
            })
            .catch(err => console.log(err));
}

let btnCargarGastosApi = document.getElementById("cargar-gastos-api");
btnCargarGastosApi.addEventListener('click', new cargarGastosApiHandle());

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}