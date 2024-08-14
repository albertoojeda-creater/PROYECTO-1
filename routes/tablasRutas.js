const express = require("express");
const ruta = express.Router();
const Tabla = require("../clases/tablasClase");
const TablasDB = require("../bd/tablasDB");

// Ruta principal (opcional)
ruta.get("/", (req, res) => {
    res.render("bienvenida");
});

// Ruta para mostrar las tablas de una base de datos
ruta.get("/mostrarTablas/:nombreBD", async (req, res) => {
    const nombreBD = req.params.nombreBD;
    const tablasDB = new TablasDB();
    try {
        const tablas = await tablasDB.mostrarTablas(nombreBD);
        const tablasCorrectas = tablas.map(tabla => new Tabla({ nombre: tabla[`Tables_in_${nombreBD}`] }));
        res.render("mostrarTablas", { tablasCorrectas, nombreBD });
    } catch (error) {
        res.render("Error", { mensaje: "Error al mostrar las tablas" });
    }
});

// Ruta para agregar una nueva tabla a una base de datos
ruta.get("/agregarTabla/:nombreBD", (req, res) => {
    const nombreBD = req.params.nombreBD;
    res.render("formularioTabla", { nombreBD });
});

ruta.post("/agregarTabla/:nombreBD", async (req, res) => {
    const nombreBD = req.params.nombreBD;
    const tabla = new Tabla(req.body);
    if (tabla.nombre && Array.isArray(tabla.campos)) {
        const tablasDB = new TablasDB();
        try {
            await tablasDB.crearTabla(nombreBD, tabla.nombre, tabla.campos);
            res.redirect(`/mostrarTablas/${nombreBD}`); // Redirige a la lista de tablas
        } catch (error) {
            res.render("Error", { mensaje: "Error al agregar la tabla" });
        }
    } else {
        res.render("Error", { mensaje: "Nombre de la tabla o campos no válidos" });
    }
});

// Ruta para eliminar una tabla de una base de datos
ruta.post("/eliminarTabla/:nombreBD/:nombre", async (req, res) => {
    const nombreBD = req.params.nombreBD;
    const nombre = req.params.nombre;
    const tablasDB = new TablasDB();
    try {
        await tablasDB.eliminarTabla(nombreBD, nombre);
        res.redirect(`/mostrarTablas/${nombreBD}`);
    } catch (error) {
        res.render("Error", { mensaje: "Error al eliminar la tabla" });
    }
});

// Ruta para mostrar los campos de una tabla
ruta.get("/mostrarCampos/:nombreBD/:nombreTabla", async (req, res) => {
    const { nombreBD, nombreTabla } = req.params;
    const tablasDB = new TablasDB();
    try {
        const campos = await tablasDB.mostrarCampos(nombreBD, nombreTabla);
        res.render("mostrarCampos", { campos, nombreBD, nombreTabla });
    } catch (error) {
        res.render("Error", { mensaje: "Error al mostrar los campos de la tabla" });
    }
});

ruta.post("/mostrarCampos/:nombreBD/:nombreTabla", async (req, res) => {
    const nombreBD = req.params.nombreBD;
    const nombreTabla = req.params.nombreTabla;
    const tablasDB = new TablasDB();
    try {
        const campos = await tablasDB.mostrarCampos(nombreBD, nombreTabla);
        res.render("mostrarCampos", { campos, nombreBD, nombreTabla });
    } catch (error) {
        res.render("Error", { mensaje: "Error al mostrar los campos de la tabla" });
    }
});

// Ruta para mostrar el formulario de edición de una tabla
ruta.get("/editarTabla/:nombreBD/:nombreTabla", async (req, res) => {
    const { nombreBD, nombreTabla } = req.params;
    const tablasDB = new TablasDB();
    try {
        const campos = await tablasDB.mostrarCampos(nombreBD, nombreTabla);
        res.render("editarTabla", { campos, nombreBD, nombreTabla });
    } catch (error) {
        res.render("Error", { mensaje: "Error al mostrar el formulario de edición" });
    }
});

// Ruta para procesar la edición de una tabla
ruta.post("/editarTabla/:nombreBD/:nombreTabla", async (req, res) => {
    const nombreBD = req.params.nombreBD;
    const nombreTabla = req.params.nombreTabla;
    const tablaDatos = req.body; // Aquí se espera que los datos de la tabla vengan en el cuerpo de la solicitud
    const tablasDB = new TablasDB();
    try {
        await tablasDB.editarTabla(nombreBD, nombreTabla, tablaDatos);
        res.redirect(`/mostrarTablas/${nombreBD}`);
    } catch (error) {
        res.render("Error", { mensaje: "Error al editar la tabla" });
    }
});

// Ruta para eliminar un campo de una tabla
ruta.post("/eliminarCampo/:nombreBD/:nombreTabla/:nombreCampo", async (req, res) => {
    const { nombreBD, nombreTabla, nombreCampo } = req.params;
    const tablasDB = new TablasDB();
    try {
        await tablasDB.eliminarCampo(nombreBD, nombreTabla, nombreCampo);
        res.redirect(`/mostrarCampos/${nombreBD}/${nombreTabla}`);
    } catch (error) {
        res.render("Error", { mensaje: "Error al eliminar el campo" });
    }
});

module.exports = ruta;