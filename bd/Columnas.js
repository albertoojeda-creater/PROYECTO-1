const ConectarBD = require("./ConexionBD");

class ColumnasBD extends ConectarBD {
    constructor() {
        super();
    }

    async nuevaColumna(columna) {
        const sql = "INSERT INTO columnas (nombre, tipo_dato, es_pk, es_nn, es_uq, es_b, es_un, es_zf, es_ai, es_g, valor_defecto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try {
            await this.conectarMysql();
            await this.conexion.execute(sql, [columna.nombre, columna.tipo_dato, columna.es_pk, columna.es_nn, columna.es_uq, columna.es_b, columna.es_un, columna.es_zf, columna.es_ai, columna.es_g, columna.valor_defecto]);
            await this.cerrarConexion();
            console.log("Columna insertada correctamente");
        } catch (error) {
            console.error("Error al ingresar la columna: " + error);
        }
    }

    async mostrarColumnas() {
        const sql = "SELECT * FROM columnas";
        try {
            await this.conectarMysql();
            const [columnas] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            return columnas;
        } catch (error) {
            console.error("Error al recuperar las columnas: " + error);
        }
    }

    async buscarColumnaPorId(idColumna) {
        const sql = "SELECT * FROM columnas WHERE idcolumna = ?";
        try {
            await this.conectarMysql();
            const [columna] = await this.conexion.execute(sql, [idColumna]);
            await this.cerrarConexion();
            return columna;
        } catch (error) {
            console.error("Error al recuperar la columna: " + error);
        }
    }

    async editarColumna(columna) {
        const sql = "UPDATE columnas SET nombre = ?, tipo_dato = ?, es_pk = ?, es_nn = ?, es_uq = ?, es_b = ?, es_un = ?, es_zf = ?, es_ai = ?, es_g = ?, valor_defecto = ? WHERE idcolumna = ?";
        try {
            await this.conectarMysql();
            await this.conexion.execute(sql, [columna.nombre, columna.tipo_dato, columna.es_pk, columna.es_nn, columna.es_uq, columna.es_b, columna.es_un, columna.es_zf, columna.es_ai, columna.es_g, columna.valor_defecto, columna.idcolumna]);
            await this.cerrarConexion();
            console.log("Columna editada correctamente");
        } catch (error) {
            console.error("Error al editar la columna: " + error);
        }
    }

    async borrarColumna(idColumna) {
        const sql = "DELETE FROM columnas WHERE idcolumna = ?";
        try {
            await this.conectarMysql();
            await this.conexion.execute(sql, [idColumna]);
            await this.cerrarConexion();
            console.log("Columna borrada correctamente");
        } catch (error) {
            console.error("Error al borrar la columna: " + error);
        }
    }
}

module.exports = ColumnasBD;