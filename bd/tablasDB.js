const ConectarBD = require("./ConexionBD");


class TablasDB extends ConectarBD {
    constructor() {
        super();
    }

    async crearTabla(baseDeDatos, nombre, campos) {
        let sql = `CREATE TABLE ${nombre} (`;
        sql += campos.map(campo => {
            let def = `${campo['Column Name']} ${campo['Datatype']}`;
            if (campo['PK']) def += ' PRIMARY KEY';
            if (campo['NN']) def += ' NOT NULL';
            if (campo['UQ']) def += ' UNIQUE';
            if (campo['AI']) def += ' AUTO_INCREMENT';
            if (campo['Default/Expression']) def += ` DEFAULT ${campo['Default/Expression']}`;
            return def;
        }).join(', ') + ');';
    
        try {
            await this.conectarBase(baseDeDatos);
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Tabla creada correctamente");
        } catch (error) {
            console.error("Error al crear la tabla: " + error);
        }
    }

    async eliminarTabla(baseDeDatos, nombre) {
        const sql = `DROP TABLE ${nombre};`;
        try {
            await this.conectarBase(baseDeDatos);
            //await this.conexion.execute(`USE ${baseDeDatos}`);
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Tabla eliminada correctamente");
        } catch (error) {
            console.error("Error al eliminar la tabla: " + error);
        }
    }

    async mostrarTablas(baseDeDatos) {
        const sql = `SHOW TABLES FROM ${baseDeDatos};`;
        try {
            await this.conectarBase(baseDeDatos);
            const [tablas] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            return tablas;
        } catch (error) {
            console.error("Error al mostrar las tablas: " + error);
        }
    }

    async mostrarCampos(nombreBD, nombreTabla) {
        const sql = `SHOW COLUMNS FROM \`${nombreTabla}\`;`;
        try {
            await this.conectarBase(nombreBD);
            //await this.conexion.execute(`USE \`${nombreBD}\``);
            const [campos] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            //console.log(campos);
            return campos;
        } catch (error) {
            console.error("Error al mostrar los campos: " + error);
            throw error; // Propaga el error para que pueda ser manejado por el controlador
        }
    }

    async editarTabla(baseDeDatos, nombre, campos) {
        try {
            await this.conectarBase(baseDeDatos);

            // Primero, eliminar las columnas existentes
            const columnasExistentes = await this.mostrarCampos(baseDeDatos, nombre);
            for (const columna of columnasExistentes) {
                const columnaNombre = columna.Field;
                const sqlDrop = `ALTER TABLE ${nombre} DROP COLUMN ${columnaNombre};`;
                await this.conexion.execute(sqlDrop);
            }

            // Luego, agregar las nuevas columnas
            for (const campo of campos) {
                let def = `${campo['Column Name']} ${campo['Datatype']}`;
                if (campo['PK']) def += ' PRIMARY KEY';
                if (campo['NN']) def += ' NOT NULL';
                if (campo['UQ']) def += ' UNIQUE';
                if (campo['AI']) def += ' AUTO_INCREMENT';
                if (campo['Default/Expression']) def += ` DEFAULT ${campo['Default/Expression']}`;
                const sqlAdd = `ALTER TABLE ${nombre} ADD ${def};`;
                await this.conexion.execute(sqlAdd);
            }

            await this.cerrarConexion();
            console.log("Tabla editada correctamente");
        } catch (error) {
            console.error("Error al editar la tabla: " + error);
            throw error; // Propaga el error para que pueda ser manejado por el controlador
        }
    }
}

module.exports = TablasDB;