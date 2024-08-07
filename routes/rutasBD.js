const express = require('express');
const ruta = express.Router();

const BaseDatosBD = require('../bd/BDtabBD');
const TabBdBD = require('../bd/TablasBD');
const ColumnasBD = require('../bd/Columnas');
const ConsultasBD = require('../bd/ConsultasBD');
const { crearBaseDeDatos, obtenerBasesDeDatos } = require('../bd/ConexionBD');
// Página de bienvenida
ruta.get("/", (req, res) => {
    res.render("bienvenida");
});

// Crear base de datos
ruta.get("/CrearBD", (req, res) => {
    res.render("crearbd");
});

ruta.post("/CrearBD", async (req, res) => {
    const { nombreBD } = req.body;
    const baseDatosBD = new BaseDatosBD();
    try {
        await baseDatosBD.crearBaseDeDatos(nombreBD);
        res.redirect("/BaseDatos");
    } catch (error) {
        console.error("Error al crear base de datos: " + error);
        res.status(500).send("Error interno del servidor");
    }
});

// Mostrar bases de datos
ruta.get("/BaseDatos", async (req, res) => {
    const baseDatosBD = new BaseDatosBD();
    try {
        const basesDatos = await baseDatosBD.mostrarBaseDatos();
        res.render("datos", { basesDatos });
    } catch (error) {
        console.error("Error al obtener bases de datos: " + error);
        res.status(500).send("Error interno del servidor");
    }
});

// Eliminar base de datos
ruta.get("/borrarBD/:nombreBD", async (req, res) => {
    const { nombreBD } = req.params;
    const baseDatosBD = new BaseDatosBD();
    try {
        await baseDatosBD.eliminarBaseDeDatos(nombreBD);
        res.redirect("/BaseDatos");
    } catch (error) {
        console.error("Error al eliminar base de datos: " + error);
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
ruta.get("/borrarTabla/:nombreTabla", async (req, res) => {
    const { nombreTabla } = req.params;
    const { db } = req.query;
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

// Ruta para mostrar el formulario de creación de base de datos
ruta.get('/agregaBD', (req, res) => {
    res.render('agregaBD');
});

// Ruta para manejar el envío del formulario de creación de base de datos
ruta.post('/creaBD', (req, res) => {
    const { nombre, descripcion } = req.body;
    // Lógica para crear la base de datos usando nombre y descripcion
    res.redirect('/');
});
ruta.post('/creaBD', (req, res) => {
    const { nombre, descripcion } = req.body;
    crearBaseDeDatos(nombre, descripcion);
    res.redirect('/');
});
// Ruta para mostrar el formulario de creación de base de datos
ruta.get('/agregarBD', (req, res) => {
    res.render('agregarBD');
});

// Ruta para manejar el envío del formulario de creación de base de datos
ruta.post('/creaBD', (req, res) => {
    const { nombre, descripcion } = req.body;
    crearBaseDeDatos(nombre, descripcion);
    res.redirect('/consultas');
});

// Ruta para mostrar la consulta de bases de datos
ruta.get('/consultas', (req, res) => {
    const basesDeDatos = obtenerBasesDeDatos();
    res.render('consultas', { basesDeDatos });
});

// Ruta para mostrar el formulario de creación de tablas
ruta.get('/creartab/:nombreBD', (req, res) => {
    const nombreBD = req.params.nombreBD;
    res.render('creartab', { nombreBD });
});
ruta.post('/creartab', (req, res) => {
    const { nombreBD, nombreTabla } = req.body;
    crearTabla(nombreBD, nombreTabla);
    res.redirect('/consultas');
});
// rutasBD.js
ruta.get('/mostrartablas', (req, res) => {
    const query = 'Show tables';
        res.render('mostrartablas');
    });




/*router.get('/api/basesDatos', async (req, res) => {
    let baseDatosBD; // Definido fuera del bloque try
    try {
        baseDatosBD = new BaseDatosBD();
        await baseDatosBD.conectarMysql(); // Conectar a MySQL
        const basesDatos = await baseDatosBD.mostrarBaseDatos();
        res.json(basesDatos); // Devuelve los datos en formato JSON
    } catch (error) {
        console.error("Error al obtener las bases de datos: " + error);
        res.status(500).json({ error: "Error interno del servidor" });
    } finally {
        if (baseDatosBD) { // Verifica si baseDatosBD está definido
            await baseDatosBD.cerrarConexion(); // Cerrar la conexión
        }
    }
});*/

module.exports = ruta;