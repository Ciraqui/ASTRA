const express = require('express');
const historicoController = require('../controller/historico');
const authController = require('../controller/auth');
const router = express.Router();

/** 
 * @swagger
 * /api/historico:
 *  post: 
 *    summary: Cria um novo histórico
 *    description: Adiciona um novo histórico ao sistema com base nas informações fornecidas.
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id_prescricao:
 *                type: string
 *                description: Id da prescrição do novo histórico
 *              dt_atual:
 *                type: date
 *                description: Data atual do novo histórico
 *    responses:
 *      201:
 *        description: Histórico criado com sucesso
 *      400:
 *        description: Falha ao criar o usuáro
*/
router.post('/', authController.autenticarToken, historicoController.criarHistorico);

/** 
 * @swagger
 * /api/historico:
 *  get: 
 *    summary: Busca todos os históricos
 *    description: Busca todos os históricos cadastrados.
 *    responses:
 *      200:
 *        description: Sucesso ao buscar os históricos
 *      404:
 *        description: Históricos não encontrados
*/
router.get('/', authController.autenticarToken, historicoController.buscarHistoricos);


/** 
 * @swagger
 * /api/historico/{id}:
 *  get: 
 *    summary: Busca um histórico
 *    description: Busca um histórico pelo id.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id do histórico
 *    responses:
 *      200:
 *        description: Histórico encontrado com sucesso
 *      404:
 *        description: Histórico não encontrado
*/
router.get('/:id', authController.autenticarToken, historicoController.buscarHistorico);


/** 
 * @swagger
 * /api/historico/{id}:
 *  patch: 
 *    summary: Atualiza os dados do histórico
 *    description: Atualiza uma ou todas as informações do histórico.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id do histórico
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id_prescricao:
 *                type: number
 *                description: Id da prescrição
 *              dt_atual:
 *                type: date
 *                description: Data atual
 *              status:
 *                type: boolean
 *                description: Status
 *    responses:
 *      200:
 *        description: Histórico atualizado com sucesso
 *      400:
 *        description: Falha ao atualizar o usuáro
 *      404:
 *        description: Histórico não encontrado
*/
router.patch('/:id', authController.autenticarToken, historicoController.atualizarHistorico);

/** 
 * @swagger
 * /api/historico/{id}:
 *  delete: 
 *    summary: Deleta um histórico
 *    description: Deleta um histórico a partir de um id.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id do histórico
 *    responses:
 *      200:
 *        description: Histórico deletado com sucesso
 *      404:
 *        description: Histórico não encontrado
*/
router.delete('/:id', authController.autenticarToken, historicoController.deletarHistorico);

module.exports = router;