class BaseDatos {
    constructor(baseDatos) {
        // Inicializa la instancia con un objeto que debe tener nombre y descripción
        this.nombre = baseDatos.nombre; 
        this.descripcion = baseDatos.descripcion || ''; // Proporciona un valor predeterminado vacío si no se proporciona descripción
    }

    set nombre(nombre) {
        if (typeof nombre === 'string' && nombre.trim() !== '') {
            this._nombre = nombre;
        }
    }

    get nombre() {
        return this._nombre;
    }

    set descripcion(descripcion) {
        if (typeof descripcion === 'string') {
            this._descripcion = descripcion;
        }
    }

    get descripcion() {
        return this._descripcion;
    }

    get obtenerDatos() {
        return {
            nombre: this.nombre,
            descripcion: this.descripcion
        };
    }
}

module.exports = BaseDatos;