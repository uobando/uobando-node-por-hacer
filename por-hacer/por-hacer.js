const fs = require('fs');

let listadoPorHacer = [];

/**
 * Crea una tarea por hacer
 */
const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion: descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
};

/**
 * Muestra el listado de tareas por hacer
 */
const listar = () => {
    cargarDB();

    return listadoPorHacer;
}


/**
 * Actualiza una tarea por hacer
 */
const actualizar = (descripcion, completado = true) => {
    cargarDB();

    // Obtengo el índice (posición) del registro que estoy buscando en el arreglo
    // Si el valor es -1 quiere decir que no se encontró el índice
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

/**
 * Elimina una tarea por hacer
 */
const eliminar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

/**
 * Guarda las tareas por hacer en el archiv json
 */
const guardarDB = () => {
    // Convierte un objeto a formato json
    let data = JSON.stringify(listadoPorHacer);

    // Creo el archivo
    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error('No se pudo grabar', err);
        }
    });
}

/**
 * Lee el archivo json para cargar las tareas por hacer en el arreglo
 */
const cargarDB = () => {
    try {
        // Como es un archivo json, automáticamente lo seraliza 
        // y lo converte en un objeto json
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        // Para evitar error de json inválido en caso de que el archivo esté vacío
        listadoPorHacer = [];
    }
}


module.exports = {
    crear,
    listar,
    actualizar,
    eliminar
}