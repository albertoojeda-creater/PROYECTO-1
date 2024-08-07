class CrearTabla {
    constructor(datos) {
        this.nombreTabla = datos.nombreTabla;
        this.columnas = datos.columnas; // Suponiendo que columnas es un array de objetos
    }

    set nombreTabla(nombreTabla) {
        if (typeof nombreTabla === 'string' && nombreTabla.trim() !== '') {
            this._nombreTabla = nombreTabla;
        }
    }

    set columnas(columnas) {
        if (Array.isArray(columnas)) {
            this._columnas = columnas;
        }
    }

    get nombreTabla() {
        return this._nombreTabla;
    }

    get columnas() {
        return this._columnas;
    }

    get obtenerDatos() {
        return {
            nombreTabla: this.nombreTabla,
            columnas: this.columnas
        };
    }
}

module.exports = CrearTabla;