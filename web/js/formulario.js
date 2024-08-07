var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
var regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var regexTelefonoNacional = /^\d{10}$/;
var enviarDatos=0;

var mensajeNom=document.getElementsByClassName("errorNom")[0];
var xmarkErrorNom=document.getElementsByClassName("xmarkErrorNom")[0];

var mensajeCel=document.getElementsByClassName("errorCel")[0];
var xmarkErrorCel=document.getElementsByClassName("xmarkErrorCel")[0];

var mensajeCo=document.getElementsByClassName("errorCo")[0];
var xmarkErrorCorreo=document.getElementsByClassName("xmarkErrorCorreo")[0];

var checkMarkNom=document.getElementsByClassName("checkMarkNom")[0];
var checkMarkCel=document.getElementsByClassName("checkMarkCel")[0];
var checkMarkCorreo=document.getElementsByClassName("checkMarkCorreo")[0];

var nombre=document.getElementById("nombre");
nombre.addEventListener("blur",()=>{
    if(!regexNombre.test(nombre.value)){
        mensajeNom.classList.remove("ocultar");
        document.getElementById("nombre").classList.add("errorInput");
        xmarkErrorNom.classList.remove("ocultar");
        checkMarkNom.classList.add("ocultar");
    }
    else{
        mensajeNom.classList.add("ocultar");
        document.getElementById("nombre").classList.add("correctInput");
        xmarkErrorNom.classList.add("ocultar");
        checkMarkNom.classList.remove("ocultar");
        enviarDatos++;
    }
});

var celular=document.getElementById("celular");
celular.addEventListener("blur",()=>{
    if(!regexTelefonoNacional.test(celular.value)){
        mensajeCel.classList.remove("ocultar");
        document.getElementById("celular").classList.add("errorInput");
        xmarkErrorCel.classList.remove("ocultar");
        checkMarkCel.classList.add("ocultar");
    }
    else{
        mensajeCel.classList.add("ocultar");
        document.getElementById("celular").classList.add("correctInput");
        xmarkErrorCel.classList.add("ocultar");
        checkMarkCel.classList.remove("ocultar");
        enviarDatos++;
    }
});

var correo=document.getElementById("correo");
correo.addEventListener("blur",()=>{
    if(!regexCorreo.test(correo.value)){
        mensajeCo.classList.remove("ocultar");
        document.getElementById("correo").classList.add("errorInput");
        xmarkErrorCorreo.classList.remove("ocultar");
        checkMarkCorreo.classList.add("ocultar");
    }else{
        mensajeCo.classList.add("ocultar");
        document.getElementById("correo").classList.add("correctInput");
        xmarkErrorCorreo.classList.add("ocultar");
        checkMarkCorreo.classList.remove("ocultar");
        enviarDatos++;
    }
});
