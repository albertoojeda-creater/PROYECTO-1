const ConectarBD = require('./ConexionBD');

class BaseDatosBD extends ConectarBD {
    constructor() {
        super(); // Llama al constructor de ConectarBD
    }

    async mostrarBaseDatos() {
        await this.conectarMysql(); // Asegúrate de conectar antes de ejecutar consultas
        try {
            const [rows] = await this.conexion.query('SHOW DATABASES');
            return rows.map(row => row.Database); // Ajusta el mapeo según el formato de la respuesta
        } catch (error) {
            console.error("Error al obtener las bases de datos: " + error);
            throw error; // Re-lanza el error para que pueda ser manejado en la ruta
        } finally {
            await this.cerrarConexion(); // Asegúrate de cerrar la conexión
        }
    }

    async crearBaseDeDatos(nombreBD) {
        await this.conectarMysql();
        try {
            await this.conexion.query(`CREATE DATABASE ${nombreBD}`);
        } catch (error) {
            console.error("Error al crear la base de datos: " + error);
            throw error;
        } finally {
            await this.cerrarConexion();
        }
    }

    async eliminarBaseDeDatos(nombreBD) {
        await this.conectarMysql();
        try {
            await this.conexion.query(`DROP DATABASE ${nombreBD}`);
        } catch (error) {
            console.error("Error al eliminar la base de datos: " + error);
            throw error;
        } finally {
            await this.cerrarConexion();
        }
    }
}

module.exports = BaseDatosBD;
