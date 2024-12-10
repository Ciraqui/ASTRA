const express = require("express");
const userController = require('../controller/usuario');
const authController = require('../controller/auth');
const checkRole = require('../middleware/roleMiddleware');
const router = express.Router();

router.post("/", userController.criarUsuario);
router.get("/", authController.autenticarToken, userController.buscarUsuarios);
router.get("/:id", authController.autenticarToken, checkRole('user'), userController.buscarUsuario);
router.patch("/:id", authController.autenticarToken, userController.atualizarUsuario);
router.delete("/:id", authController.autenticarToken, userController.deletarUsuario);

module.exports = router;