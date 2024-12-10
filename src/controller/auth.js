const prisma = require('./../../prisma/prismaClient')
const bcrypt = require('bcrypt');
const jwtConfig = require('./../config/jwtConfig');

const authController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const usuario = await prisma.usuario.findUnique({ where: { email } });

      if (!usuario) {
          return res.status(401).json({ message: 'Credenciais inválidas!' });
      }

      const senhasConferem = await bcrypt.compare(senha, usuario.senha);

      if (!senhasConferem) {
          return res.status(401).json({ message: 'Credenciais inválidas!' });
      }

      const token = jwtConfig.generateToken(usuario.id, usuario.role);

      return res.status(200).json({ token });
  } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
  }
  },
  autenticarToken: async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: "Token não fornecido!" });
        }

        const decoded = jwtConfig.verifyToken(token);
        
        if (Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({ error: "Token expirado!" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido!" });
    }
  },
  logout: async (req, res) => {
    try {
      const token = req.headers['authorization'].split(' ')[1];

      jwtConfig.blackListToken(token);

      return res.status(200).json({ message: 'Logout realizado com sucesso!' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao realizar logout.' });
    }
  },
}

module.exports = authController;