import * as gestionPresupuesto from './gestionPresupuesto.js';


function mostrarDatoEnId(idElemento, valor){
    //el id es el elemento del html
    if(idElemento!=null){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML = valor;
    }
}


export{
    mostrarDatoEnId
}