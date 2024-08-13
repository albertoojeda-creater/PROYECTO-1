const express = require("express");
const path = require("path");
const rutasBD = require("./routes/basesDatosRutas"); // Asegúrate de que la ruta sea correcta
const app = express();

app.set("view engine", "ejs");
app.use("/", express.static(path.join(__dirname, "/web")));
app.use(express.urlencoded({ extended: true }));
app.use("/", rutasBD); // Usa las rutas definidas en rutasBD.js

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Sitio en http://localhost:" + port);
});