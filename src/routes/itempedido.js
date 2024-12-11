const express = require("express");
const itemPedidoController = require("../controller/itempedido");
const authController = require("../controller/auth");
const router = express.Router();

/**
 * @swagger
 * /api/itens_pedido:
 *  post:
 *    summary: Criar item de pedido
 *    description: Cria um novo item associado a um pedido.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              pedido_id:
 *                type: integer
 *                description: ID do pedido associado ao item
 *              produto_id:
 *                type: integer
 *                description: ID do produto associado ao item
 *              quantidade:
 *                type: integer
 *                description: Quantidade do produto no item
 *              preco_unitario:
 *                type: number
 *                description: Preço unitário do produto no item
 *    responses:
 *      201:
 *        description: Item criado com sucesso
 *      404:
 *        description: Pedido ou produto não encontrado
 *      400:
 *        description: Dados inválidos
 */
router.post("/", authController.autenticarToken, itemPedidoController.criarItemPedido);

/**
 * @swagger
 * /api/itens_pedido:
 *  get:
 *    summary: Listar itens de pedido
 *    description: Retorna uma lista de todos os itens de pedido cadastrados.
 *    responses:
 *      200:
 *        description: Lista de itens de pedido
 *      404:
 *        description: Nenhum item de pedido encontrado
 */
router.get("/", authController.autenticarToken, itemPedidoController.buscarItensPedido);

/**
 * @swagger
 * /api/itens_pedido/{id}:
 *  get:
 *    summary: Buscar item de pedido por ID
 *    description: Retorna os detalhes de um item de pedido específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do item de pedido
 *    responses:
 *      200:
 *        description: Item de pedido encontrado
 *      404:
 *        description: Item de pedido não encontrado
 */
router.get("/:id", authController.autenticarToken, itemPedidoController.buscarItemPedido);

/**
 * @swagger
 * /api/itens_pedido/{id}:
 *  patch:
 *    summary: Atualizar item de pedido
 *    description: Atualiza os dados de um item de pedido específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do item de pedido
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              pedido_id:
 *                type: integer
 *                description: ID do pedido associado ao item
 *              produto_id:
 *                type: integer
 *                description: ID do produto associado ao item
 *              quantidade:
 *                type: integer
 *                description: Quantidade do produto no item
 *              preco_unitario:
 *                type: number
 *                description: Preço unitário do produto no item
 *    responses:
 *      200:
 *        description: Item de pedido atualizado com sucesso
 *      404:
 *        description: Item de pedido não encontrado
 */
router.patch("/:id", authController.autenticarToken, itemPedidoController.atualizarItemPedido);

/**
 * @swagger
 * /api/itens_pedido/{id}:
 *  delete:
 *    summary: Deletar item de pedido
 *    description: Remove um item de pedido específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do item de pedido
 *    responses:
 *      200:
 *        description: Item de pedido deletado com sucesso
 *      404:
 *        description: Item de pedido não encontrado
 */
router.delete("/:id", authController.autenticarToken, itemPedidoController.deletarItemPedido);

module.exports = router;