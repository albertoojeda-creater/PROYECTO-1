require('dotenv').config();
class ConexionBD{
    constructor(){
        this.conexion=null;
        this.mysql=require("mysql2/promise");
    }
    async conectarMySql(){
        try {
            this.conexion=await this.mysql.createConnection({
                host:process.env.HOSTMYSQL,
                user:process.env.USERMYSQL,
                password:process.env.PASSWORSMYSQL,
                database:process.env.DATABASEMYSQL,
                port:process.env.PORTMYSQL
            });
            console.log("conexion creada a mysql ");
        } catch (error) {
            console.error("Error al crear la conexion "+error);
        }
    }
    async cerrarConexion(){
        if(this.conexion!=null){
            try {
                await this.conexion.end();
                console.log("Conexion cerrada ");
            } catch (error) {
                console.error("Error al cerar conexion "+error);
            }
        }
    }
}
const crearBaseDeDatos = (nombre, descripcion) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO bases_de_datos (nombre, descripcion) VALUES (?, ?)';
        connection.query(query, [nombre, descripcion], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const obtenerBasesDeDatos = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM bases_de_datos';
        connection.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = ConexionBD;