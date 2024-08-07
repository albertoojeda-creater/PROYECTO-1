// Expresiones regulares para validar nombre, descripción y costo
var regexNombre = /^[A-ZÁÉÍÓÚÑ0-9][a-záéíóúñ0-9]*( [A-ZÁÉÍÓÚÑ0-9][a-záéíóúñ0-9]*)*$/;
var regexDesc = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ'’-]*( [A-ZÁÉÍÓÚÑ][a-záéíóúñ'’-]*)*$/;
var regexCosto = /^[0-9]+(\.[0-9]+)?$/;

// Contador para verificar cuándo enviar los datos
var enviarDatos = 0;

// Función para validar el nombre
var nombre = document.getElementById("nombre");
nombre.addEventListener("blur", () => {
    var mensajeNom = document.getElementsByClassName("errorNom")[0];
    var xmarkErrorNom = document.getElementsByClassName("xmarkErrorNom")[0];
    var checkMarkNom = document.getElementsByClassName("checkMarkNom")[0];

    if (!regexNombre.test(nombre.value)) {
        mensajeNom.classList.remove("ocultar");
        nombre.classList.add("errorInput");
        xmarkErrorNom.classList.remove("ocultar");
        checkMarkNom.classList.add("ocultar");
    } else {
        mensajeNom.classList.add("ocultar");
        nombre.classList.remove("errorInput");
        nombre.classList.add("correctInput");
        xmarkErrorNom.classList.add("ocultar");
        checkMarkNom.classList.remove("ocultar");
        enviarDatos++;
    }
});

// Función para validar la descripción
var descripcion = document.getElementById("descripcion");
descripcion.addEventListener("blur", () => {
    var mensajeDes = document.getElementsByClassName("errorDes")[0];
    var xmarkErrorDes = document.getElementsByClassName("xmarkErrorDes")[0];
    var checkMarkDes = document.getElementsByClassName("checkMarkDes")[0];

    if (!regexDesc.test(descripcion.value)) {
        mensajeDes.classList.remove("ocultar");
        descripcion.classList.add("errorInput");
        xmarkErrorDes.classList.remove("ocultar");
        checkMarkDes.classList.add("ocultar");
    } else {
        mensajeDes.classList.add("ocultar");
        descripcion.classList.remove("errorInput");
        descripcion.classList.add("correctInput");
        xmarkErrorDes.classList.add("ocultar");
        checkMarkDes.classList.remove("ocultar");
        enviarDatos++;
    }
});

// Función para validar el costo
var costo = document.getElementById("costo");
costo.addEventListener("blur", () => {
    var mensajeCo = document.getElementsByClassName("errorCo")[0];
    var xmarkErrorCo = document.getElementsByClassName("xmarkErrorCo")[0];
    var checkMarkCo = document.getElementsByClassName("checkMarkCo")[0];

    if (!regexCosto.test(costo.value)) {
        mensajeCo.classList.remove("ocultar");
        costo.classList.add("errorInput");
        xmarkErrorCo.classList.remove("ocultar");
        checkMarkCo.classList.add("ocultar");
    } else {
        mensajeCo.classList.add("ocultar");
        costo.classList.remove("errorInput");
        costo.classList.add("correctInput");
        xmarkErrorCo.classList.add("ocultar");
        checkMarkCo.classList.remove("ocultar");
        enviarDatos++;
    }
});