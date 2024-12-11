const express = require("express");
const clienteController = require("../controller/cliente");
const authController = require("../controller/auth");
const router = express.Router();

/**
 * @swagger
 * /api/clientes:
 *  post:
 *    summary: Criar cliente
 *    description: Cria um novo cliente.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nome:
 *                type: string
 *                description: Nome do cliente
 *              contato:
 *                type: string
 *                description: Contato do cliente (telefone ou email)
 *              endereco:
 *                type: string
 *                description: Endereço do cliente
 *    responses:
 *      201:
 *        description: Cliente criado com sucesso
 *      400:
 *        description: Dados inválidos
 */
router.post("/", authController.autenticarToken, clienteController.criarCliente);

/**
 * @swagger
 * /api/clientes:
 *  get:
 *    summary: Listar clientes
 *    description: Retorna uma lista de clientes cadastrados (com paginação).
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        description: Número da página
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: Quantidade de registros por página
 *    responses:
 *      200:
 *        description: Lista de clientes
 *      404:
 *        description: Nenhum cliente encontrado
 */
router.get("/", authController.autenticarToken, clienteController.buscarClientes);

/**
 * @swagger
 * /api/clientes/{id}:
 *  get:
 *    summary: Buscar cliente por ID
 *    description: Retorna os detalhes de um cliente específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do cliente
 *    responses:
 *      200:
 *        description: Cliente encontrado
 *      404:
 *        description: Cliente não encontrado
 */
router.get("/:id", authController.autenticarToken, clienteController.buscarCliente);

/**
 * @swagger
 * /api/clientes/{id}/pedidos:
 *  get:
 *    summary: Listar pedidos de um cliente
 *    description: Retorna todos os pedidos feitos por um cliente específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do cliente
 *    responses:
 *      200:
 *        description: Lista de pedidos do cliente
 *      404:
 *        description: Cliente ou pedidos não encontrados
 */
router.get("/:id/pedidos", authController.autenticarToken, clienteController.buscarPedidosPorCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *  patch:
 *    summary: Atualizar cliente
 *    description: Atualiza os dados de um cliente específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do cliente
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nome:
 *                type: string
 *                description: Nome do cliente
 *              contato:
 *                type: string
 *                description: Contato do cliente
 *              endereco:
 *                type: string
 *                description: Endereço do cliente
 *    responses:
 *      200:
 *        description: Cliente atualizado com sucesso
 *      404:
 *        description: Cliente não encontrado
 */
router.patch("/:id", authController.autenticarToken, clienteController.atualizarCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *  delete:
 *    summary: Deletar cliente
 *    description: Remove um cliente específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do cliente
 *    responses:
 *      200:
 *        description: Cliente deletado com sucesso
 *      404:
 *        description: Cliente não encontrado
 */
router.delete("/:id", authController.autenticarToken, clienteController.deletarCliente);

module.exports = router;