const express = require("express");
const userController = require("../controller/usuario");
const authController = require("../controller/auth");
const checkRole = require("../middleware/roleMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/usuarios:
 *  post:
 *    summary: Criar usuário
 *    description: Cria um novo usuário.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nome:
 *                type: string
 *                description: Nome do usuário
 *              email:
 *                type: string
 *                description: Email do usuário
 *              senha:
 *                type: string
 *                description: Senha do usuário
 *    responses:
 *      201:
 *        description: Usuário criado com sucesso
 *      400:
 *        description: Dados inválidos
 */
router.post("/", userController.criarUsuario);

/**
 * @swagger
 * /api/usuarios:
 *  get:
 *    summary: Listar usuários
 *    description: Retorna uma lista de usuários cadastrados.
 *    responses:
 *      200:
 *        description: Lista de usuários
 *      404:
 *        description: Nenhum usuário encontrado
 */
router.get("/", authController.autenticarToken, userController.buscarUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *  get:
 *    summary: Buscar usuário por ID
 *    description: Retorna os detalhes de um usuário específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do usuário
 *    responses:
 *      200:
 *        description: Usuário encontrado
 *      404:
 *        description: Usuário não encontrado
 */
router.get("/:id", authController.autenticarToken, checkRole("user"), userController.buscarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *  patch:
 *    summary: Atualizar usuário
 *    description: Atualiza os dados de um usuário específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do usuário
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nome:
 *                type: string
 *                description: Nome do usuário
 *              email:
 *                type: string
 *                description: Email do usuário
 *              senha:
 *                type: string
 *                description: Senha do usuário
 *    responses:
 *      200:
 *        description: Usuário atualizado com sucesso
 *      404:
 *        description: Usuário não encontrado
 */
router.patch("/:id", authController.autenticarToken, userController.atualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *  delete:
 *    summary: Deletar usuário
 *    description: Remove um usuário específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do usuário
 *    responses:
 *      200:
 *        description: Usuário deletado com sucesso
 *      404:
 *        description: Usuário não encontrado
 */
router.delete("/:id", authController.autenticarToken, userController.deletarUsuario);

module.exports = router;