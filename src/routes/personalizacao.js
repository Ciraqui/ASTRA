const express = require("express");
const personalizacaoController = require("../controller/personalizacao");
const authController = require("../controller/auth");
const router = express.Router();

/**
 * @swagger
 * /api/personalizacoes:
 *  post:
 *    summary: Criar personalização
 *    description: Cria uma nova personalização para um produto.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              tipo:
 *                type: string
 *                description: Tipo da personalização
 *              descricao:
 *                type: string
 *                description: Descrição da personalização
 *              custo_adicional:
 *                type: number
 *                description: Custo adicional da personalização
 *              produto_id:
 *                type: integer
 *                description: ID do produto associado à personalização
 *    responses:
 *      201:
 *        description: Personalização criada com sucesso
 *      400:
 *        description: Dados inválidos
 *      404:
 *        description: Produto não encontrado
 */
router.post("/", authController.autenticarToken, personalizacaoController.criarPersonalizacao);

/**
 * @swagger
 * /api/personalizacoes:
 *  get:
 *    summary: Listar personalizações
 *    description: Retorna uma lista de personalizações cadastradas.
 *    responses:
 *      200:
 *        description: Lista de personalizações
 *      404:
 *        description: Nenhuma personalização encontrada
 */
router.get("/", authController.autenticarToken, personalizacaoController.buscarPersonalizacoes);

/**
 * @swagger
 * /api/personalizacoes/{id}:
 *  get:
 *    summary: Buscar personalização por ID
 *    description: Retorna os detalhes de uma personalização específica.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID da personalização
 *    responses:
 *      200:
 *        description: Personalização encontrada
 *      404:
 *        description: Personalização não encontrada
 */
router.get("/:id", authController.autenticarToken, personalizacaoController.buscarPersonalizacao);

/**
 * @swagger
 * /api/personalizacoes/{id}:
 *  patch:
 *    summary: Atualizar personalização
 *    description: Atualiza os dados de uma personalização específica.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID da personalização
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              tipo:
 *                type: string
 *              descricao:
 *                type: string
 *              custo_adicional:
 *                type: number
 *    responses:
 *      200:
 *        description: Personalização atualizada com sucesso
 *      404:
 *        description: Personalização não encontrada
 */
router.patch("/:id", authController.autenticarToken, personalizacaoController.atualizarPersonalizacao);

/**
 * @swagger
 * /api/personalizacoes/{id}:
 *  delete:
 *    summary: Deletar personalização
 *    description: Remove uma personalização específica.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID da personalização
 *    responses:
 *      200:
 *        description: Personalização deletada com sucesso
 *      404:
 *        description: Personalização não encontrada
 */
router.delete("/:id", authController.autenticarToken, personalizacaoController.deletarPersonalizacao);

module.exports = router;