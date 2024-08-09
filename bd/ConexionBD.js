require('dotenv').config();

class ConectarBD {
    constructor() {
        this.conexion = null;
        this.mysql = require("mysql2/promise");
    }

    async conectarMysql() {
        try {
            this.conexion = await this.mysql.createConnection({
                host: process.env.HOSTMYSQL,
                user: process.env.USERMYSQL,
                password: process.env.PASSWORSMYSQL,
                port: process.env.PORTMYSQL
            });
            console.log("Conexión creada a MySQL");
        } catch (error) {
            console.error("Error al crear la conexión: " + error);
        }
    }

    async cerrarConexion() {
        if (this.conexion) {
            try {
                await this.conexion.end();
                console.log("Conexión cerrada");
            } catch (error) {
                console.error("Error al cerrar la conexión: " + error);
            }
        }
    }


    // Método para crear una base de datos
    async crearBaseDeDatos(nombre, descripcion) {
        if (!this.conexion) {
            await this.conectarMySql();
        }

        try {
            const query = 'INSERT INTO bases_de_datos (nombre, descripcion) VALUES (?, ?)';
            const [results] = await this.conexion.execute(query, [nombre, descripcion]);
            return results;
        } catch (error) {
            console.error("Error al crear la base de datos: " + error);
            throw error;
        }
    }

    // Método para obtener todas las bases de datos
    async obtenerBasesDeDatos() {
        if (!this.conexion) {
            await this.conectarMySql();
        }

        try {
            const query = 'SELECT * FROM bases_de_datos';
            const [results] = await this.conexion.execute(query);
            return results;
        } catch (error) {
            console.error("Error al obtener las bases de datos: " + error);
            throw error;
        }
    }
}

module.exports = ConectarBD;
