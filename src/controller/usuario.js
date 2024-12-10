const prisma = require('../../prisma/prismaClient');
const bcrypt = require('bcrypt');

const usuarioController = {
  // Criar novo usuário
  criarUsuario: async (req, res) => {
    try {
      const { nome, email, senha, permissao } = req.body;

      console.log(nome);
      // Verificar se o e-mail já está cadastrado
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email }
      });

      console.log(nome);
      if (usuarioExistente) {
        return res.status(400).json({ error: 'Email já cadastrado!' });
      }

      // Criptografar a senha
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      // Criar o novo usuário
      const novoUsuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: senhaCriptografada,
          permissao: permissao || 'USUARIO', // Valor padrão para permissão
          data_criacao: new Date(),
          ultimo_login: null // Último login inicializado como null
        }
      });

      return res.status(201).json(novoUsuario);
    } catch (e) {
      console.error('Erro ao criar o usuário!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar todos os usuários
  buscarUsuarios: async (_, res) => {
    try {
      const usuarios = await prisma.usuario.findMany();

      if (!usuarios.length) {
        return res.status(404).json({ error: 'Ainda não há nenhum usuário cadastrado!' });
      }

      return res.status(200).json(usuarios);
    } catch (e) {
      console.error('Erro ao buscar os usuários!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar usuário por ID
  buscarUsuario: async (req, res) => {
    try {
      const id_usuario = parseInt(req.params.id, 10);

      const usuario = await prisma.usuario.findUnique({
        where: { id_usuario }
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado!' });
      }

      return res.status(200).json(usuario);
    } catch (e) {
      console.error('Erro ao buscar o usuário!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Atualizar informações do usuário
  atualizarUsuario: async (req, res) => {
    try {
      const id_usuario = parseInt(req.params.id, 10);
      const { nome, senha, permissao } = req.body;

      if (isNaN(id_usuario)) {
        return res.status(400).json({ error: 'Parâmetro inválido!' });
      }

      const usuario = await prisma.usuario.findUnique({
        where: { id_usuario }
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado!' });
      }

      // Criptografar a nova senha, se fornecida
      const senhaAtualizada = senha ? await bcrypt.hash(senha, 10) : usuario.senha;

      const usuarioAtualizado = await prisma.usuario.update({
        data: {
          nome: nome ?? usuario.nome,
          senha: senhaAtualizada,
          permissao: permissao ?? usuario.permissao,
          ultimo_login: usuario.ultimo_login // Não alterar último login aqui
        },
        where: { id_usuario }
      });

      return res.status(200).json(usuarioAtualizado);
    } catch (e) {
      console.error('Erro ao atualizar o usuário!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Deletar usuário
  deletarUsuario: async (req, res) => {
    try {
      const id_usuario = parseInt(req.params.id, 10);

      if (isNaN(id_usuario)) {
        return res.status(400).json({ error: 'Parâmetro inválido!' });
      }

      const usuario = await prisma.usuario.findUnique({
        where: { id_usuario }
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado!' });
      }

      await prisma.usuario.delete({
        where: { id_usuario }
      });

      return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (e) {
      console.error('Erro ao deletar o usuário!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  }
};

module.exports = usuarioController;
