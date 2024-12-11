const express = require("express");
const imagemController = require("../controller/imagem");
const authController = require("../controller/auth");
const router = express.Router();

/**
 * @swagger
 * /api/imagens:
 *  post:
 *    summary: Fazer upload de imagem
 *    description: Faz o upload de uma nova imagem associada a um produto.
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              produto_id:
 *                type: integer
 *                description: ID do produto associado à imagem
 *              imagem:
 *                type: string
 *                format: binary
 *                description: Arquivo de imagem
 *    responses:
 *      201:
 *        description: Imagem enviada com sucesso
 *      400:
 *        description: Dados inválidos
 *      404:
 *        description: Produto não encontrado
 */
router.post("/", authController.autenticarToken, imagemController.criarImagem);

/**
 * @swagger
 * /api/imagens:
 *  get:
 *    summary: Buscar imagens
 *    description: Retorna a lista de todas as imagens.
 *    responses:
 *      200:
 *        description: Lista de imagens retornada com sucesso
 *      401:
 *        description: Não autorizado
 */
router.get("/", authController.autenticarToken, imagemController.buscarImagens);

/**
 * @swagger
 * /api/imagens/{id}:
 *  get:
 *    summary: Buscar imagem por ID
 *    description: Retorna os detalhes de uma imagem específica.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID da imagem
 *    responses:
 *      200:
 *        description: Imagem encontrada
 *      404:
 *        description: Imagem não encontrada
 */
router.get("/:id", authController.autenticarToken, imagemController.buscarImagem);

/**
 * @swagger
 * /api/imagens/{id}:
 *  patch:
 *    summary: Atualizar imagem
 *    description: Atualiza os dados de uma imagem existente.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID da imagem a ser atualizada
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              origem:
 *                type: string
 *                description: Nova origem da imagem
 *              custo_adicional:
 *                type: number
 *                description: Novo custo adicional da imagem
 *    responses:
 *      200:
 *        description: Imagem atualizada com sucesso
 *      400:
 *        description: Dados inválidos
 *      404:
 *        description: Imagem não encontrada
 */
router.patch("/:id", authController.autenticarToken, imagemController.atualizarImagem);

/**
 * @swagger
 * /api/imagens/{id}:
 *  delete:
 *    summary: Deletar imagem
 *    description: Remove uma imagem específica.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID da imagem
 *    responses:
 *      200:
 *        description: Imagem deletada com sucesso
 *      404:
 *        description: Imagem não encontrada
 */
router.delete("/:id", authController.autenticarToken, imagemController.deletarImagem);

module.exports = router;