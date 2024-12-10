const prisma = require('../../prisma/prismaClient')

const historicoController = {
  criarHistorico: async (req, res) => {
    try {
      const {
        id_prescricao,
        dt_atual,
      } = req.body;

      if (!id_prescricao || !dt_atual) {
        return res.status(400).json({ error: 'Id da prescrição e data atual são obrigatórios!' });
      }

      const historico = await prisma.historico.create({
        data: {
          id_prescricao,
          dt_atual: new Date(dt_atual),
          status: true,
        }
      });

      return res.status(201).json(historico);
    } catch (e) {
      console.error('Erro ao cadastrar o histórico!');
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },
  buscarHistoricos: async (_, res) => {
    try {
      const historicos = await prisma.historico.findMany({
        include: {
          prescricao: {
              include: {
                  remedio: true
              }
          }
      }
      });

      if (!historicos.length) {
        res.status(404).json({ error: "Lista de historicos vazia!" });
        return;
      }

      return res.status(200).json(historicos);
    } catch (e) {
      console.error('Erro ao buscar os historicos');
      return res.status(500).json({ error: 'Erro interno do servidor!' })
    }
  },
  buscarHistorico: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'Parametro inválido!' });
      }

      const historico = await prisma.historico.findFirst({
        where: { id }
      });

      if (!historico) {
        return res.status(404).json({ error: 'Histórico não encontrado!' });
      }

      return res.status(200).json(historico);
    } catch (e) {
      console.error("Erro ao buscar histórico!")
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },
  atualizarHistorico: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { id_prescricao, dt_atual, status } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ error: 'Parâmetro inválido!' });
      }

      const historico = await prisma.historico.findFirst({
        where: { id }
      });

      if (!historico) {
        return res.status(404).json({ error: 'Histórico não encontrado!' });
      }

      const historicoAtualizado = await prisma.historico.update({
        data: {
          id_prescricao: id_prescricao ?? historico.id_prescricao,
          dt_atual: dt_atual ? new Date(dt_atual) : historico.dt_atual,
          status: status ?? historico.status,
        },
        where: {
          id
        }
      });

      return res.status(200).json(historicoAtualizado);
    } catch (e) {
      console.error('Erro ao atualizar os dados do histórico!');
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },
  deletarHistorico: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'Parâmetro inválido!' });
      }

      const historico = await prisma.historico.findFirst({
        where: { id }
      });

      if (!historico) {
        return res.status(404).json({ error: 'Histórico não encontrado!' });
      }

      const historicoDeletado = await prisma.historico.delete({
        where: { id }
      })

      return res.status(200).json(historicoDeletado.id);
    } catch (e) {
      console.error('Erro ao deletar o histórico!');
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  }
}

module.exports = historicoController;