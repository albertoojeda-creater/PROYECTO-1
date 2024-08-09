const ConectarBD = require('./ConexionBD');

class TabBdBD extends ConectarBD {
    constructor(nombreBD) {
        super();
        this.nombreBD = nombreBD;
    }

    async conectarMysql() {
        this.conexion = await mysql.createConnection({
            host: 'localhost', // Cambia esto según tu configuración
            user: 'root', // Cambia esto según tu configuración
            password: '', // Cambia esto según tu configuración
            database: this.nombreBD // Conéctate a la base de datos específica
        });
    }

    async mostrarTablas() {
        const sql = "SHOW TABLES";
        try {
            await this.conectarMysql();
            const [result] = await this.conexion.execute(sql);
            return result; // Retorna la lista de tablas
        } catch (error) {
            console.error("Error al mostrar tablas: " + error);
            throw error;
        } finally {
            await this.cerrarConexion(); // Asegúrate de cerrar la conexión aquí
        }
    }

    // Métodos para agregar y eliminar tablas
    async crearTabla(tabla) {
        const sql = `CREATE TABLE ${tabla} (id INT AUTO_INCREMENT PRIMARY KEY)`;
        try {
            await this.conectarMysql();
            await this.conexion.execute(sql);
        } catch (error) {
            console.error("Error al crear tabla: " + error);
            throw error;
        } finally {
            await this.cerrarConexion(); // Asegúrate de cerrar la conexión aquí
        }
    }

    async eliminarTabla(nombreTabla) {
        const sql = `DROP TABLE ${nombreTabla}`;
        try {
            await this.conectarMysql();
            await this.conexion.execute(sql);
        } catch (error) {
            console.error("Error al eliminar tabla: " + error);
            throw error;
        } finally {
            await this.cerrarConexion(); // Asegúrate de cerrar la conexión aquí
        }
    }
}


module.exports = TabBdBD;