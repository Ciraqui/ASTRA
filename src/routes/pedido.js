const express = require("express");
const pedidoController = require("../controller/pedido");
const authController = require("../controller/auth");
const router = express.Router();

/**
 * @swagger
 * /api/pedidos:
 *  post:
 *    summary: Criar pedido
 *    description: Cria um novo pedido.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              data:
 *                type: string
 *                format: date
 *                description: Data do pedido
 *              valor_total:
 *                type: number
 *                description: Valor total do pedido
 *              status:
 *                type: string
 *                description: Status do pedido
 *              cliente_id:
 *                type: integer
 *                description: ID do cliente associado ao pedido
 *    responses:
 *      201:
 *        description: Pedido criado com sucesso
 *      404:
 *        description: Cliente não encontrado
 *      400:
 *        description: Dados inválidos
 */
router.post("/", authController.autenticarToken, pedidoController.criarPedido);

/**
 * @swagger
 * /api/pedidos:
 *  get:
 *    summary: Listar pedidos
 *    description: Retorna uma lista de pedidos cadastrados (com paginação).
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
 *        description: Lista de pedidos
 *      404:
 *        description: Nenhum pedido encontrado
 */
router.get("/", authController.autenticarToken, pedidoController.buscarPedidos);

/**
 * @swagger
 * /api/pedidos/{id}:
 *  get:
 *    summary: Buscar pedido por ID
 *    description: Retorna os detalhes de um pedido específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do pedido
 *    responses:
 *      200:
 *        description: Pedido encontrado
 *      404:
 *        description: Pedido não encontrado
 */
router.get("/:id", authController.autenticarToken, pedidoController.buscarPedido);

/**
 * @swagger
 * /api/pedidos/{id}/itens:
 *  get:
 *    summary: Listar itens de um pedido
 *    description: Retorna todos os itens associados a um pedido específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do pedido
 *    responses:
 *      200:
 *        description: Lista de itens do pedido
 *      404:
 *        description: Pedido ou itens não encontrados
 */
router.get("/:id/itens", authController.autenticarToken, pedidoController.buscarItensPorPedido);

/**
 * @swagger
 * /api/pedidos/{id}:
 *  patch:
 *    summary: Atualizar pedido
 *    description: Atualiza os dados de um pedido específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do pedido
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              data:
 *                type: string
 *                format: date
 *                description: Data do pedido
 *              valor_total:
 *                type: number
 *                description: Valor total do pedido
 *              status:
 *                type: string
 *                description: Status do pedido
 *              cliente_id:
 *                type: integer
 *                description: ID do cliente associado ao pedido
 *    responses:
 *      200:
 *        description: Pedido atualizado com sucesso
 *      404:
 *        description: Pedido não encontrado
 */
router.patch("/:id", authController.autenticarToken, pedidoController.atualizarPedido);

/**
 * @swagger
 * /api/pedidos/{id}:
 *  delete:
 *    summary: Deletar pedido
 *    description: Remove um pedido específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do pedido
 *    responses:
 *      200:
 *        description: Pedido deletado com sucesso
 *      404:
 *        description: Pedido não encontrado
 */
router.delete("/:id", authController.autenticarToken, pedidoController.deletarPedido);

module.exports = router;