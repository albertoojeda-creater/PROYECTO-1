class Tabla {
    constructor(tabla) {
        this.nombre = tabla.nombre;
        //this.descripcion = tabla.descripcion;
        this.campos = tabla.campos || []; // Asume que tabla tiene un atributo 'campos' que es un array de objetos
    }

    set nombre(nombre) {
        if (typeof nombre === 'string' && nombre.trim() !== '') {
            this._nombre = nombre;
        }
    }

    get nombre() {
        return this._nombre;
    }

    /*set descripcion(descripcion) {
        if (typeof descripcion === 'string') {
            this._descripcion = descripcion;
        }
    }

    get descripcion() {
        return this._descripcion;
    }*/

    set campos(campos) {
        if (Array.isArray(campos)) {
            // Valida cada campo para asegurarse de que tiene los atributos correctos
            this._campos = campos.map(campo => {
                if (typeof campo === 'object' && campo !== null) {
                    return {
                        nombre: campo.nombre || '',
                        tipoDato: campo.tipoDato || '',
                        PK: campo.PK || false,
                        NN: campo.NN || false,
                        UQ: campo.UQ || false,
                        B: campo.B || false,
                        UN: campo.UN || false,
                        ZF: campo.ZF || false,
                        AI: campo.AI || false,
                        G: campo.G || false,
                        defaultExp: campo.defaultExp || ''
                    };
                }
                return {}; // Retorna un objeto vacío si el campo no es válido
            });
        }
    }

    get campos() {
        return this._campos;
    }

    get obtenerDatos() {
        return {
            nombre: this.nombre,
            //descripcion: this.descripcion,
            campos: this.campos
        };
    }
}

module.exports = Tabla;