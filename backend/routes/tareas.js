const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const tareaController = require('../controllers/tareaController');
const {check} = require('express-validator')

router.post('/', 
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El nombre es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
)   

//Obtener las tareas por proyecto
router.get('/', 
    auth,
    tareaController.obtenerTarea
)

//actualizar tarea
router.put('/:id', 
    auth,
    tareaController.actualizarTarea
)

//eliminar tarea
router.delete('/:id', 
    auth,
    tareaController.eliminarTarea
)
module.exports = router;