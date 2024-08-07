class BaseDatos {
    constructor(baseDatos) {
        this.nombre = baseDatos.nombre; // Asume que baseDatos es un objeto con un atributo 'nombre'
    }

    set nombre(nombre) {
        if (typeof nombre === 'string' && nombre.trim() !== '') {
            this._nombre = nombre;
        }
    }

    get nombre() {
        return this._nombre;
    }

    get obtenerDatos() {
        return {
            nombre: this.nombre
        };
    }
}

module.exports = BaseDatos;