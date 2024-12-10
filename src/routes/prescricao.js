const express = require('express');
const prescricaoController = require('../controller/prescricao');
const authController = require('../controller/auth');
const router = express.Router();
/** 
 * @swagger
 * /api/prescricao:
 *  post: 
 *    summary: Cria uma nova prescrição
 *    description: Adiciona uma nova prescrição ao sistema com base nas informações fornecidas.
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id_usuario:
 *                type: number
 *                description: Id do usuario dono da prescrição
 *              observacao:
 *                type: string
 *                description: Obervação da prescrição
 *              id_remedio:
 *                type: string
 *                description: Id do remédio prescrição
 *              frequencia:
 *                  type: int
 *                  description: Frequência para tomar remédio
 *              dt_inicio:
 *                  type: date
 *                  description: Data de inicio da prescrição
 *              dt_fim:
 *                  type: date
 *                  description: Data final da prescrição
 *    responses:
 *      201:
 *        description: Prescrição criado com sucesso
 *      400:
 *        description: Falha ao criar o usuáro
*/
router.post('/', authController.autenticarToken, prescricaoController.criarPrescricao);

/** 
 * @swagger
 * /api/prescricao:
 *  get: 
 *    summary: Busca todas as prescrições
 *    description: Busca todas as prescrições cadastradas.
 *    responses:
 *      200:
 *        description: Sucesso ao buscar as prescrições
 *      404:
 *        description: prescrições não encontradas
*/
router.get('/', authController.autenticarToken, prescricaoController.buscarPrescricoes);

/** 
 * @swagger
 * /api/prescricao/{id}:
 *  get: 
 *    summary: Busca uma prescrição
 *    description: Busca uma prescrição pelo id.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id da prescrição
 *    responses:
 *      200:
 *        description: Prescrição encontrada com sucesso
 *      404:
 *        description: Prescrição não encontrada
*/
router.get('/:id', authController.autenticarToken, prescricaoController.buscarPrescricao);


/** 
 * @swagger
 * /api/prescricao/{id}:
 *  patch: 
 *    summary: Atualiza os dados da prescrição
 *    description: Atualiza uma ou todas as informações da prescrição.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id do prescrição
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id_usuario:
 *                type: number
 *                description: Id do usuario dono da prescrição
 *              observacao:
 *                type: string
 *                description: Obervação da prescrição
 *              id_remedio:
 *                type: string
 *                description: Id do remédio prescrição
 *              frequencia:
 *                  type: int
 *                  description: Frequência para tomar remédio
 *              dt_inicio:
 *                  type: date
 *                  description: Data de inicio da prescrição
 *              dt_fim:
 *                  type: date
 *                  description: Data final da prescrição
 *              status:
 *                  type: boolean
 *                  description: Status da prescrição
 *    responses:
 *      200:
 *        description: Prescrição atualizada com sucesso
 *      400:
 *        description: Falha ao atualizar o usuáro
 *      404:
 *        description: Prescrição não encontrada
*/
router.patch('/:id', authController.autenticarToken, prescricaoController.atualizarPrescricao);

/** 
 * @swagger
 * /api/prescricao/{id}:
 *  delete: 
 *    summary: Deleta uma prescrição
 *    description: Deleta uma prescrição a partir de um id.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id da prescrição
 *    responses:
 *      200:
 *        description: Prescrição deletada com sucesso
 *      404:
 *        description: Prescrição não encontrada
*/
router.delete('/:id', authController.autenticarToken, prescricaoController.deletarPrescricao);

module.exports = router;