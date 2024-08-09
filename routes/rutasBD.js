const express = require('express');
const ruta = express.Router();

const BaseDatosBD = require('../bd/BDtabBD');
const TabBdBD = require('../bd/TablasBD');
const ColumnasBD = require('../bd/Columnas');
const ConsultasBD = require('../bd/ConsultasBD');
const { crearBaseDeDatos, obtenerBasesDeDatos } = require('../bd/ConexionBD');

// Ruta para manejar la creación de la base de datos
ruta.post('/crearBD', async (req, res) => {
    const { nombreBD, descripcionBD } = req.body;

    if (!/^[a-zA-Z0-9_]+$/.test(nombreBD)) {
        return res.status(400).send('Nombre de la base de datos inválido');
    }

    console.log('Nombre de la BD recibido:', nombreBD);

    try {
        await db.crearBaseDeDatos(nombreBD, descripcionBD);
        console.log('Base de datos creada con éxito:', nombreBD);
        res.redirect('/datos');
    } catch (error) {
        console.error('Error al crear la base de datos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para mostrar el formulario de agregarBD.ejs
ruta.get('/agregarBD', (req, res) => {
    res.render('agregarBD'); // Asegúrate de que 'agregarBD' corresponde al nombre del archivo EJS
});

// Página de bienvenida
ruta.get("/", (req, res) => {
    res.render("bienvenida");
});

// Mostrar formulario para crear base de datos
ruta.get('/CrearBD', (req, res) => {
    res.render('crearbd');
});

// Crear base de datos y redirigir a la lista de bases de datos
ruta.post('/CrearBD', async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        await crearBaseDeDatos(nombre, descripcion);
        res.redirect('/BaseDatos');
    } catch (error) {
        console.error("Error al crear base de datos: " + error);
        res.status(500).send("Error interno del servidor");
    }
});

// Mostrar bases de datos
ruta.get('/BaseDatos', async (req, res) => {
    try {
        const basesDatos = await obtenerBasesDeDatos();
        res.render('datos', { basesDatos });
    } catch (error) {
        console.error("Error al obtener bases de datos: " + error);
        res.status(500).send("Error interno del servidor");
    }
});

// Eliminar base de datos
ruta.post("/borrarBD/:id", async (req, res) => {
    const { id } = req.params;
    const baseDatosBD = new BaseDatosBD();
    try {
        await baseDatosBD.eliminarBaseDeDatos(id);
        res.redirect("/BaseDatos");
    } catch (error) {
        console.error("Error al eliminar base de datos: " + error);
        res.status(500).send("Error interno del servidor");
    }
});

// Mostrar formulario para modificar base de datos
ruta.get('/modificarBD/:id', async (req, res) => {
    const { id } = req.params;
    const baseDatosBD = new BaseDatosBD();
    try {
        const baseDatos = await baseDatosBD.obtenerBaseDeDatosPorId(id);
        res.render('modificarbd', { baseDatos });
    } catch (error) {
        console.error("Error al obtener la base de datos: " + error);
        res.status(500).send("Error interno del servidor");
    }
});

// Modificar base de datos
ruta.post('/modificarBD/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const baseDatosBD = new BaseDatosBD();
    try {
        await baseDatosBD.modificarBaseDeDatos(id, nombre, descripcion);
        res.redirect('/BaseDatos');
    } catch (error) {
        console.error("Error al modificar la base de datos: " + error);
        res.status(500).send("Error interno del servidor");
    }
});

// Crear tabla
ruta.get("/CrearTabla", (req, res) => {
    res.render("creartab");
});

ruta.post("/CrearTabla", async (req, res) => {
    const { nombreBD, tabla } = req.body;
    const tabBdBD = new TabBdBD(nombreBD);
    try {
        await tabBdBD.crearTabla(tabla);
        res.redirect(`/Tablas?db=${nombreBD}`);
    } catch (error) {
        console.error("Error al crear tabla: " + error);
        res.status(500).send("Error interno del servidor");
    }
});

// Mostrar tablas
ruta.get("/Tablas", async (req, res) => {
    const { db } = req.query;
    const tabBdBD = new TabBdBD(db);
    try {
        const tablas = await tabBdBD.mostrarTablas();
        res.render("vertab", { tablas, baseDatos: db });
    } catch (error) {
        console.error("Error al mostrar tablas: " + error);
        res.status(500).send("Error interno del servidor");
    }
});

// Eliminar tabla
ruta.post("/borrarTabla/:nombreTabla", async (req, res) => {
    const { nombreTabla } = req.params;
    const { db } = req.body;
    const tabBdBD = new TabBdBD(db);
    try {
        await tabBdBD.eliminarTabla(nombreTabla);
        res.redirect(`/Tablas?db=${db}`);
    } catch (error) {
        console.error("Error al eliminar tabla: " + error);
        res.status(500).send("Error interno del servidor");
    }
});

// Registro de usuario
ruta.get("/Registro", (req, res) => {
    res.render("formulario");
});

ruta.post("/Registro", async (req, res) => {
    const { nombre, celular, correo } = req.body;
    if (nombre && celular && correo) {
        const usuarioBD = new ConsultasBD();
        try {
            await usuarioBD.nuevoUsuario({ nombre, celular, correo });
            res.redirect("/mostrarUsuario");
        } catch (error) {
            console.error("Error al registrar usuario: " + error);
            res.status(500).send("Error interno del servidor");
        }
    } else {
        res.render("Error");
    }
});

// Consultas
ruta.get("/Consultas", async (req, res) => {
    const { db, table } = req.query;
    const columnasBD = new ColumnasBD(db);
    try {
        const columnas = await columnasBD.mostrarColumnas(table);
        res.render("consultas", { columnas, tabla: table, baseDatos: db });
    } catch (error) {
        console.error("Error al mostrar columnas: " + error);
        res.status(500).send("Error interno del servidor");
    }
});

ruta.post("/alterTable", async (req, res) => {
    const { nombreTabla, accion, columna } = req.body;
    const tabBdBD = new TabBdBD(req.body.database);
    try {
        if (accion === 'agregar') {
            await tabBdBD.agregarColumna(nombreTabla, columna);
        } else if (accion === 'eliminar') {
            await tabBdBD.eliminarColumna(nombreTabla, columna.nombre);
        } else if (accion === 'modificar') {
            await tabBdBD.modificarColumna(nombreTabla, columna);
        }
        res.redirect(`/Consultas?db=${req.body.database}&table=${nombreTabla}`);
    } catch (error) {
        console.error("Error al modificar tabla: " + error);
        res.status(500).send("Error interno del servidor");
    }
});

// Mostrar formulario de creación de base de datos
ruta.get('/agregaBD', (req, res) => {
    res.render('agregaBD');
});

// Manejar el envío del formulario de creación de base de datos
ruta.post('/creaBD', async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        await crearBaseDeDatos(nombre, descripcion);
        res.redirect('/BaseDatos');
    } catch (error) {
        console.error("Error al crear base de datos: " + error);
        res.status(500).send("Error interno del servidor");
    }
});

// Mostrar formulario de creación de tablas
ruta.get('/creartab/:nombreBD', (req, res) => {
    const nombreBD = req.params.nombreBD;
    res.render('creartab', { nombreBD });
});

ruta.post('/creartab', async (req, res) => {
    const { nombreBD, nombreTabla } = req.body;
    const tabBdBD = new TabBdBD(nombreBD);
    try {
        await tabBdBD.crearTabla(nombreTabla);
        res.redirect(`/Tablas?db=${nombreBD}`);
    } catch (error) {
        console.error("Error al crear tabla: " + error);
        res.status(500).send("Error interno del servidor");
    }
});

// Mostrar tablas (modificación)
ruta.get('/mostrartablas', (req, res) => {
    res.render('mostrartablas');
});

module.exports = ruta;
