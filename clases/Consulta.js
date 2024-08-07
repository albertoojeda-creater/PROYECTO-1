class Consulta {
    constructor(contenido) {
        this.tabla = contenido.tabla;
        this.baseDatos = contenido.baseDatos;
        this.datos = contenido.datos; // Asume que datos es un array de objetos o una estructura similar
    }

    set tabla(tabla) {
        if (typeof tabla === 'string' && tabla.trim() !== '') {
            this._tabla = tabla;
        }
    }

    set baseDatos(baseDatos) {
        if (typeof baseDatos === 'string' && baseDatos.trim() !== '') {
            this._baseDatos = baseDatos;
        }
    }

    set datos(datos) {
        if (Array.isArray(datos)) {
            this._datos = datos;
        }
    }

    get tabla() {
        return this._tabla;
    }

    get baseDatos() {
        return this._baseDatos;
    }

    get datos() {
        return this._datos;
    }

    get obtenerDatos() {
        return {
            tabla: this.tabla,
            baseDatos: this.baseDatos,
            datos: this.datos
        };
    }
}

module.exports = Consulta;