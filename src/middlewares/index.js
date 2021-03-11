// MODIFICAR ...
const { verificaDatosLogin, verificaToken, verificaPermisoAdmin, verificaPermisoUser, verificaPermisoGuest} = require('./verificaAuth');
const { verificaDatosRegistroMascota, verificaDatosUpdateMascota, verificaParametrosPaginacion } = require('./verificaMascota');

module.exports = {
    verificaDatosLogin,
    verificaToken,
    verificaPermisoAdmin, 
    verificaPermisoUser,
    verificaPermisoGuest,
    verificaDatosRegistroMascota, 
    verificaDatosUpdateMascota,    
    verificaParametrosPaginacion    
};