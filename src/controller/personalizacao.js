const prisma = require('../../prisma/prismaClient');

const personalizacaoController = {
  // Criar nova personalização
  criarPersonalizacao: async (req, res) => {
    try {
      const { tipo, valor_adicional, detalhes } = req.body;

      const novaPersonalizacao = await prisma.personalizacao.create({
        data: {
          tipo,
          valor_adicional,
          detalhes
        }
      });

      return res.status(201).json(novaPersonalizacao);
    } catch (e) {
      console.error('Erro ao criar a personalização!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar todas as personalizações
  buscarPersonalizacoes: async (_, res) => {
    try {
      const personalizacoes = await prisma.personalizacao.findMany();

      if (!personalizacoes.length) {
        return res.status(404).json({ error: 'Nenhuma personalização encontrada!' });
      }

      return res.status(200).json(personalizacoes);
    } catch (e) {
      console.error('Erro ao buscar as personalizações!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar personalização por ID
  buscarPersonalizacao: async (req, res) => {
    try {
      const id_personalizacao = parseInt(req.params.id, 10);

      const personalizacao = await prisma.personalizacao.findUnique({
        where: { id_personalizacao }
      });

      if (!personalizacao) {
        return res.status(404).json({ error: 'Personalização não encontrada!' });
      }

      return res.status(200).json(personalizacao);
    } catch (e) {
      console.error('Erro ao buscar a personalização!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Atualizar personalização
  atualizarPersonalizacao: async (req, res) => {
    try {
      const id_personalizacao = parseInt(req.params.id, 10);
      const { tipo, valor_adicional, detalhes } = req.body;

      const personalizacao = await prisma.personalizacao.findUnique({
        where: { id_personalizacao }
      });

      if (!personalizacao) {
        return res.status(404).json({ error: 'Personalização não encontrada!' });
      }

      const personalizacaoAtualizada = await prisma.personalizacao.update({
        data: {
          tipo: tipo ?? personalizacao.tipo,
          valor_adicional: valor_adicional ?? personalizacao.valor_adicional,
          detalhes: detalhes ?? personalizacao.detalhes
        },
        where: { id_personalizacao }
      });

      return res.status(200).json(personalizacaoAtualizada);
    } catch (e) {
      console.error('Erro ao atualizar a personalização!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Deletar personalização
  deletarPersonalizacao: async (req, res) => {
    try {
      const id_personalizacao = parseInt(req.params.id, 10);

      const personalizacao = await prisma.personalizacao.findUnique({
        where: { id_personalizacao }
      });

      if (!personalizacao) {
        return res.status(404).json({ error: 'Personalização não encontrada!' });
      }

      await prisma.personalizacao.delete({
        where: { id_personalizacao }
      });

      return res.status(200).json({ message: 'Personalização deletada com sucesso!' });
    } catch (e) {
      console.error('Erro ao deletar a personalização!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  }
};

module.exports = personalizacaoController;