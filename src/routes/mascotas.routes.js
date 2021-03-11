const router = require('express').Router();
const mascotasCtrl = require('../controllers/mascotas.controller');
const { verificaToken, verificaPermisoAdmin, verificaParametrosPaginacion, verificaDatosRegistroMascota, verificaDatosUpdateMascota } = require('../middlewares/index');

router.get('/', [verificaToken, verificaPermisoAdmin, verificaParametrosPaginacion ], mascotasCtrl.getMascotas);
router.get('/:id', [verificaToken, verificaPermisoAdmin ], mascotasCtrl.getMascotaId);
router.post('/', [verificaToken, verificaPermisoAdmin, verificaDatosRegistroMascota], mascotasCtrl.createMascota);
router.put('/:id', [verificaToken, verificaPermisoAdmin, verificaDatosUpdateMascota], mascotasCtrl.updateMascota);
router.delete('/:id', [verificaToken, verificaPermisoAdmin], mascotasCtrl.deleteMascota);

module.exports = router;