const express = require("express");
const produtoController = require("../controller/produto");
const authController = require("../controller/auth");
const router = express.Router();

/**
 * @swagger
 * /api/produtos:
 *  post:
 *    summary: Criar produto
 *    description: Cria um novo produto.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nome:
 *                type: string
 *                description: Nome do produto
 *              tipo:
 *                type: string
 *                description: Tipo do produto
 *              base_custo:
 *                type: number
 *                description: Custo base do produto
 *              margem_lucro:
 *                type: number
 *                description: Margem de lucro do produto
 *              material_principal:
 *                type: string
 *                description: Material principal do produto
 *    responses:
 *      201:
 *        description: Produto criado com sucesso
 *      400:
 *        description: Dados inválidos
 */
router.post("/", authController.autenticarToken, produtoController.criarProduto);

/**
 * @swagger
 * /api/produtos:
 *  get:
 *    summary: Listar produtos
 *    description: Retorna uma lista de produtos cadastrados (com paginação).
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
 *        description: Lista de produtos
 *      404:
 *        description: Nenhum produto encontrado
 */
router.get("/", authController.autenticarToken, produtoController.buscarProdutos);

/**
 * @swagger
 * /api/produtos/{id}:
 *  get:
 *    summary: Buscar produto por ID
 *    description: Retorna os detalhes de um produto específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do produto
 *    responses:
 *      200:
 *        description: Produto encontrado
 *      404:
 *        description: Produto não encontrado
 */
router.get("/:id", authController.autenticarToken, produtoController.buscarProduto);

/**
 * @swagger
 * /api/produtos/{id}:
 *  patch:
 *    summary: Atualizar produto
 *    description: Atualiza os dados de um produto específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do produto
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nome:
 *                type: string
 *                description: Nome do produto
 *              tipo:
 *                type: string
 *                description: Tipo do produto
 *              base_custo:
 *                type: number
 *                description: Custo base do produto
 *              margem_lucro:
 *                type: number
 *                description: Margem de lucro do produto
 *              material_principal:
 *                type: string
 *                description: Material principal do produto
 *    responses:
 *      200:
 *        description: Produto atualizado com sucesso
 *      404:
 *        description: Produto não encontrado
 */
router.patch("/:id", authController.autenticarToken, produtoController.atualizarProduto);

/**
 * @swagger
 * /api/produtos/{id}:
 *  delete:
 *    summary: Deletar produto
 *    description: Remove um produto específico.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do produto
 *    responses:
 *      200:
 *        description: Produto deletado com sucesso
 *      404:
 *        description: Produto não encontrado
 */
router.delete("/:id", authController.autenticarToken, produtoController.deletarProduto);

module.exports = router;