class Tabla {
    constructor(tabla) {
        this.nombre = tabla.nombre; // Asume que tabla es un objeto con un atributo 'nombre'
        this.baseDatos = tabla.baseDatos; // Asume que tabla también tiene el nombre de la base de datos
    }

    set nombre(nombre) {
        if (typeof nombre === 'string' && nombre.trim() !== '') {
            this._nombre = nombre;
        }
    }

    set baseDatos(baseDatos) {
        if (typeof baseDatos === 'string' && baseDatos.trim() !== '') {
            this._baseDatos = baseDatos;
        }
    }

    get nombre() {
        return this._nombre;
    }

    get baseDatos() {
        return this._baseDatos;
    }

    get obtenerDatos() {
        return {
            nombre: this.nombre,
            baseDatos: this.baseDatos
        };
    }
}

module.exports = Tabla;