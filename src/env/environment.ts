//* RUTA PARA CONEXION CON EL BACK
export enum endopoint {

    //*USUARIO:
    getUsuarios='/usuarios/getUsuarios',
    createUsuario='/usuarios/register',
    loginUsuario='/usuarios/login',
    logoutUsuario='/usuarios/logout',


    //*NOTAS:
    getNotasId='/notas/getNotas',
    postNotas='/notas/postNotas',
    updateNotas='/notas/patchNotas',
    deleteNotas='/notas/deleteNotas',

    //*TAREAS
    getTareasId='/tareas/getTareas',
    postTareas='/tareas/postTarea',
    updateTareas='/tareas/patchTarea',
    deletTareas='/tareas/deleteTarea',

    //* CALENDARIO
    getEvento='/calendario/getEventos',
    postEvento='/calendario/postEvento',
    updateEvento='/calendario/patchEvento',
    deleteEvento='/calendario/deleteEvento',

    //* GASTOS
    getGastos='/gastos/getGastos',
    postGasto='/gastos/postGastos',
    updateGasto='/gastos/patchGastos',
    deletGasto='/gastos/deleteGastos',
    deleteAllGastos='/gastos/deleteAllGastos',
};