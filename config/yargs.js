const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea'
}
const completado = {
    default: true,
    alias: 'c',
    descripcion: 'Estado de la tarea'
}

const argv = require('yargs')
    .command('crear', 'Crea una tarea por hacer', {
        descripcion // Esto sería lo mismo que escribir 'descripcion: descripcion'
    })
    .command('actualizar', 'Actualiza el estado de una tarea por hacer', {
        descripcion,
        completado
    })
    .command('eliminar', 'Elimina una tarea por hacer', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}