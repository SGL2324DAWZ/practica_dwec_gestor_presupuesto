function mostrarDatoEnId(idElemento, valor){
    //el id es el elemento del html
    if(idElemento!=null){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML = valor;
    }
}

function mostrarGastoWeb(idElemento, gasto){
    if (idElemento != null) {
        //contenedor principal para el gasto
        let divGasto = document.createElement("div")

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

        //otiene el elemento HTML por su id y le agrega el gasto completo
        let elemento = document.getElementById(idElemento);
        elemento.appendChild(divGasto);
    }
}

function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento) {
    if (idElemento != null) {
        //elemento HTML donde se añadirá la estructura de gastos agrupados
        const elemento = document.getElementById(idElemento);
        
        elemento.innerHTML = "";

        //contenedor para la agrupación
        const divAgrupacion = document.createElement("div");
        divAgrupacion.classList = "agrupacion";
        
        //encabezado con el período de agrupación
        const h1 = document.createElement("h1");
        h1.innerHTML = "Gastos agrupados por" + periodo;

        divAgrupacion.appendChild(h1);

        //recorre las claves del objeto agrup y genera la estructura para cada dato
        const claves = Object.keys(agrup);

        claves.forEach(clave => {
            //crea el contenedor para cada dato individual
            const divDato = document.createElement("div");
            divDato.classList = "agrupacion-dato";
            
            //crea y añade el span para la clave del dato
            const spanClave = document.createElement("span");
            spanClave.classList = "agrupacion-dato-clave";
            spanClave.innerHTML = clave;

            divDato.appendChild(spanClave);

            //crea y añade el span para el valor del dato
            const spanValor = document.createElement("span");
            spanValor.classList = "agrupacion-dato-valor";
            spanValor.innerHTML = agrup[clave];

            divDato.appendChild(spanValor);

            //añadir el contenedor del dato al contenedor principal
            divAgrupacion.appendChild(divDato);
        });

        //agregar la estructura completa al elemento HTML
        elemento.appendChild(divAgrupacion);
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}