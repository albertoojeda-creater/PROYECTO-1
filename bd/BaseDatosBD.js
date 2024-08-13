const ConectarBD = require("./ConexionBD");

class BaseDatosBD extends ConectarBD {
    constructor() {
        super();
    }

    async crearBaseDeDatos(nombre) {
        if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
            throw new Error('Nombre de la base de datos no válido');
        }

        const sql = 'CREATE DATABASE ??';
        const valores = [nombre.trim()]; // Asegúrate de que el nombre sea una cadena de texto válida

        try {
            await this.conectarMysql();
            await this.conexion.query(sql, valores);
            await this.cerrarConexion();
            console.log('Base de datos creada correctamente');
        } catch (error) {
            console.error('Error al crear la base de datos:', error);
            await this.cerrarConexion();
            throw error;
        }
    }

    async eliminarBaseDeDatos(nombre) {
        if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
            throw new Error('Nombre de la base de datos no válido');
        }

        const sql = 'DROP DATABASE ??';
        const valores = [nombre.trim()]; // Asegúrate de que el nombre sea una cadena de texto válida

        try {
            await this.conectarMysql();
            await this.conexion.query(sql, valores);
            await this.cerrarConexion();
            console.log('Base de datos eliminada correctamente');
        } catch (error) {
            console.error('Error al eliminar la base de datos:', error);
            await this.cerrarConexion();
            throw error;
        }
    }

    async mostrarBasesDeDatos() {
        const sql = 'SHOW DATABASES';

        try {
            await this.conectarMysql();
            const [bases] = await this.conexion.query(sql);
            await this.cerrarConexion();
            return bases;
        } catch (error) {
            console.error('Error al mostrar las bases de datos:', error);
            await this.cerrarConexion();
            throw error;
        }
    }

    async obtenerBaseDeDatos(nombre) {
        if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
            throw new Error('Nombre de la base de datos no válido');
        }

        const sql = 'SHOW TABLES FROM ??';
        const valores = [nombre.trim()]; // Asegúrate de que el nombre sea una cadena de texto válida

        try {
            await this.conectarMysql();
            const [tables] = await this.conexion.query(sql, valores);
            await this.cerrarConexion();
            return { nombre, descripcion: 'Descripción de ejemplo' }; // Debes ajustar según tu implementación
        } catch (error) {
            console.error('Error al obtener los detalles de la base de datos:', error);
            await this.cerrarConexion();
            throw error;
        }
    }

    async modificarBaseDeDatos(nombre, nuevaDescripcion) {
        if (!nombre || typeof nombre !== 'string' || nombre.trim() === '' || !nuevaDescripcion) {
            throw new Error('Datos inválidos para modificar la base de datos');
        }

        const sql = 'UPDATE bases_de_datos SET descripcion = ? WHERE nombre = ?'; // Ajusta el nombre de la tabla
        const valores = [nuevaDescripcion, nombre.trim()];

        try {
            await this.conectarMysql();
            await this.conexion.query(sql, valores);
            await this.cerrarConexion();
            console.log('Base de datos modificada correctamente');
        } catch (error) {
            console.error('Error al modificar la base de datos:', error);
            await this.cerrarConexion();
            throw error;
        }
    }
}

module.exports = BaseDatosBD;