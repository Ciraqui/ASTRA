const express = require('express');
const authController = require('./../controller/auth');
const router = express.Router();

/** 
 * @swagger
 * /api/auth:
 *  post: 
 *    summary: Login
 *    description: Cria uma sessão de login.
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: E-mail do usuário
 *              senha:
 *                type: string
 *                description: Senha do usuário
 *    responses:
 *      200:
 *        description: Usuário logado com sucesso
 *      401:
 *        description: Usuário não autorizado
 *      404:
 *        description: Login não encontrado
*/
router.post('/login', authController.login);


/** 
 * @swagger
 * /api/auth:
 *  get: 
 *    summary: Logout
 *    description: Desloga o usuário da sessão.
 *    responses:
 *      200:
 *        description: Usuário deslogado com sucesso
 *      401:
 *        description: Usuário não autorizado
*/
router.post('/logout', authController.autenticarToken, authController.logout);

module.exports = router;