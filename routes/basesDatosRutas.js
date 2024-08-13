const ruta = require("express").Router();
const BaseDatos = require("../clases/BaseDatosClase");
const BaseDatosBD = require("../bd/BaseDatosBD");

ruta.get("/", (req, res) => {
    res.render("bienvenida");
});

ruta.get("/mostrarBasesDeDatos", async (req, res) => {
    const baseDatosBD = new BaseDatosBD();
    try {
        const bases = await baseDatosBD.mostrarBasesDeDatos();
        const basesCorrectas = bases.map(base => new BaseDatos({ nombre: base.Database })).filter(base => base.nombre);
        console.log(bases);
        res.render("mostrarBasesDeDatos", { basesCorrectas });
    } catch (error) {
        res.render("Error", { message: "Error al mostrar las bases de datos" });
    }
});

ruta.get("/crearBaseDeDatos", (req, res) => {
    res.render("crearBaseDeDatos");
});

ruta.post("/crearBaseDeDatos", async (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.render("Error", { message: "Nombre y descripción son requeridos" });
    }

    const baseDatos = new BaseDatos({ nombre, descripcion });
    if (baseDatos.nombre) {
        const baseDatosBD = new BaseDatosBD();
        try {
            await baseDatosBD.crearBaseDeDatos(baseDatos.nombre, baseDatos.descripcion);
            res.redirect("/mostrarBasesDeDatos");
        } catch (error) {
            res.render("Error", { message: "Error al crear la base de datos" });
        }
    } else {
        res.render("Error", { message: "Nombre de base de datos no válido" });
    }
});

ruta.get("/agregarBaseDeDatos", (req, res) => {
    res.render("formularioBaseDeDatos");
});

ruta.post("/agregarBaseDeDatos", async (req, res) => {
    const baseDatos = new BaseDatos(req.body);
    if (baseDatos.nombre) {
        const baseDatosBD = new BaseDatosBD();
        try {
            await baseDatosBD.crearBaseDeDatos(baseDatos.nombre);
            res.redirect("/mostrarBasesDeDatos"); // Redirige a la lista de bases de datos
        } catch (error) {
            res.render("Error", { message: "Error al agregar la base de datos" });
        }
    } else {
        res.render("Error", { message: "Nombre de base de datos no válido" });
    }
});

ruta.post("/eliminarBaseDeDatos/:nombre", async (req, res) => {
    const baseDatosBD = new BaseDatosBD();
    try {
        await baseDatosBD.eliminarBaseDeDatos(req.params.nombre);
        res.redirect("/mostrarBasesDeDatos");
    } catch (error) {
        res.render("Error", { message: "Error al eliminar la base de datos" });
    }
});

ruta.get("/modificarBaseDeDatos/:nombre", async (req, res) => {
    const nombre = req.params.nombre;
    if (nombre && nombre.trim() !== '') {
        const baseDatosBD = new BaseDatosBD();
        try {
            const base = await baseDatosBD.obtenerBaseDeDatos(nombre); // Asume que hay un método para obtener los detalles
            if (base) {
                res.render("modificarBaseDeDatos", { base });
            } else {
                res.render("Error", { message: "Base de datos no encontrada" });
            }
        } catch (error) {
            res.render("Error", { message: "Error al obtener los detalles de la base de datos" });
        }
    } else {
        res.render("Error", { message: "Nombre de base de datos no válido" });
    }
});

ruta.post("/modificarBaseDeDatos/:nombre", async (req, res) => {
    const nombre = req.params.nombre;
    const nuevaDescripcion = req.body.descripcion;
    if (nombre && nombre.trim() !== '' && nuevaDescripcion) {
        const baseDatosBD = new BaseDatosBD();
        try {
            await baseDatosBD.modificarBaseDeDatos(nombre, nuevaDescripcion); // Asume que hay un método para modificar la base de datos
            res.redirect("/mostrarBasesDeDatos");
        } catch (error) {
            res.render("Error", { message: "Error al modificar la base de datos" });
        }
    } else {
        res.render("Error", { message: "Datos inválidos para modificar la base de datos" });
    }
});

module.exports = ruta;