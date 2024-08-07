const mysql = require('mysql2/promise');

class ConexionBD {
    constructor() {
        this.conexion = null;
    }

    async conectarMysql() {
        if (!this.conexion) {
            this.conexion = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                port: 3306
            });
        }
    }

    async cerrarConexion() {
        if (this.conexion) {
            await this.conexion.end();
            this.conexion = null;
        }
    }
}
const crearBaseDeDatos = (nombre, descripcion) => {
    // Lógica para crear la base de datos usando el nombre y la descripción
    console.log(`Base de datos creada: ${nombre} - ${descripcion}`);
};
module.exports = ConexionBD;