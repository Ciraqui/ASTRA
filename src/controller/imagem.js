const prisma = require('../../prisma/prismaClient');

const imagemController = {
  // Criar nova imagem
  criarImagem: async (req, res) => {
    try {
      const { origem, custo_adicional } = req.body;

      const novaImagem = await prisma.imagem.create({
        data: {
          origem,
          custo_adicional
        }
      });

      return res.status(201).json(novaImagem);
    } catch (e) {
      console.error('Erro ao criar a imagem!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar todas as imagens
  buscarImagens: async (_, res) => {
    try {
      const imagens = await prisma.imagem.findMany();

      if (!imagens.length) {
        return res.status(200).json([]);
      }

      return res.status(200).json(imagens);
    } catch (e) {
      console.error('Erro ao buscar as imagens!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar imagem por ID
  buscarImagem: async (req, res) => {
    try {
      const id_imagem = parseInt(req.params.id, 10);

      const imagem = await prisma.imagem.findUnique({
        where: { id_imagem }
      });

      if (!imagem) {
        return res.status(404).json({ error: 'Imagem não encontrada!' });
      }

      return res.status(200).json(imagem);
    } catch (e) {
      console.error('Erro ao buscar a imagem!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Atualizar imagem
  atualizarImagem: async (req, res) => {
    try {
      const id_imagem = parseInt(req.params.id, 10);
      const { origem, custo_adicional } = req.body;

      const imagem = await prisma.imagem.findUnique({
        where: { id_imagem }
      });

      if (!imagem) {
        return res.status(404).json({ error: 'Imagem não encontrada!' });
      }

      const imagemAtualizada = await prisma.imagem.update({
        data: {
          origem: origem ?? imagem.origem,
          custo_adicional: custo_adicional ?? imagem.custo_adicional
        },
        where: { id_imagem }
      });

      return res.status(200).json(imagemAtualizada);
    } catch (e) {
      console.error('Erro ao atualizar a imagem!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Deletar imagem
  deletarImagem: async (req, res) => {
    try {
      const id_imagem = parseInt(req.params.id, 10);

      const imagem = await prisma.imagem.findUnique({
        where: { id_imagem }
      });

      if (!imagem) {
        return res.status(404).json({ error: 'Imagem não encontrada!' });
      }

      await prisma.imagem.delete({
        where: { id_imagem }
      });

      return res.status(200).json({ message: 'Imagem deletada com sucesso!' });
    } catch (e) {
      console.error('Erro ao deletar a imagem!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  }
};

module.exports = imagemController;