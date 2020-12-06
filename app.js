const colors = require('colors');

const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.listar();

        for (let tarea of listado) {
            console.log(colors.green('========== Por hacer =========='));
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log(colors.green('==============================='));
        }
        break;
    case 'actualizar':
        let tareaActualizada = porHacer.actualizar(argv.descripcion, argv.completado);
        if (tareaActualizada) {
            console.log('La tarea por hacer fue actualizada');
        } else {
            console.log('La tarea por hacer no fue actualizada');
        }
        break;
    case 'eliminar':
        let eliminado = porHacer.eliminar(argv.descripcion);
        if (eliminado) {
            console.log('La tarea por hacer fue eliminada');
        } else {
            console.log('La tarea por hacer no fue eliminada');
        }
        break;
    default:
        console.log('Comando no reconocido');
        break;
}

// console.log(argv);