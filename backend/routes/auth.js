const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
//const {check} = require('express-validator')

const authController = require('../controllers/authController')

//Crea un usuario
router.post('/',
    authController.autenticarUsuario
)

//obtener el usuario autenticado
router.get('/', 
    auth,
    authController.usuarioAutenticado
)
module.exports = router;