const ConectarBD = require("./ConexionBD");

class ConsultasBD extends ConectarBD {
    constructor() {
        super();
    }

    async nuevoConsulta(consulta) {
        const sql = "INSERT INTO consultas (nombre, descripcion) VALUES (?, ?)";
        try {
            await this.conectarMysql();
            await this.conexion.execute(sql, [consulta.nombre, consulta.descripcion]);
            await this.cerrarConexion();
            console.log("Consulta insertada correctamente");
        } catch (error) {
            console.error("Error al ingresar la consulta: " + error);
        }
    }

    async mostrarConsultas() {
        const sql = "SELECT * FROM consultas";
        try {
            await this.conectarMysql();
            const [consultas] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Consultas recuperadas");
            return consultas;
        } catch (error) {
            console.error("Error al recuperar las consultas: " + error);
        }
    }

    async buscarConsultaPorId(idConsulta) {
        const sql = "SELECT * FROM consultas WHERE idconsulta = ?";
        try {
            await this.conectarMysql();
            const [consulta] = await this.conexion.execute(sql, [idConsulta]);
            await this.cerrarConexion();
            console.log("Consulta recuperada");
            return consulta;
        } catch (error) {
            console.error("Error al recuperar la consulta: " + error);
        }
    }

    async actualizarConsulta(idConsulta, nuevosDatos) {
        const sql = "UPDATE consultas SET nombre = ?, descripcion = ? WHERE idconsulta = ?";
        try {
            await this.conectarMysql();
            await this.conexion.execute(sql, [nuevosDatos.nombre, nuevosDatos.descripcion, idConsulta]);
            await this.cerrarConexion();
            console.log("Consulta actualizada correctamente");
        } catch (error) {
            console.error("Error al actualizar la consulta: " + error);
        }
    }

    async borrarConsulta(idConsulta) {
        const sql = "DELETE FROM consultas WHERE idconsulta = ?";
        try {
            await this.conectarMysql();
            await this.conexion.execute(sql, [idConsulta]);
            await this.cerrarConexion();
            console.log("Consulta borrada correctamente");
        } catch (error) {
            console.error("Error al borrar la consulta: " + error);
        }
    }
}

module.exports = ConsultasBD;