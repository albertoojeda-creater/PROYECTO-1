const express = require("express");
const path = require("path");
const rutasBD = require("./routes/basesDatosRutas");
const tablasBD = require("./routes/tablasRutas");
const app = express();

app.set("view engine", "ejs");
app.use("/", express.static(path.join(__dirname, "/web")));
app.use(express.urlencoded({ extended: true }));
app.use("/", rutasBD); // Usa "/basesDatos" como prefijo para las rutas de bases de datos
app.use("/", tablasBD);    // Usa "/tablas" como prefijo para las rutas de tablas

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Sitio en http://localhost:" + port);
});