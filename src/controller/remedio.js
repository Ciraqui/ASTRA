const prisma = require('./../../prisma/prismaClient')

const remedioController = {
  criarRemedio: async (req, res) => {
    try {
      const {
        nome,
        funcao,
        dosagem,
      } = req.body;

      if (!nome || !funcao || !dosagem) {
        return res.status(400).json({ error: 'Nome, função e dosagem são obrigatórios!' });
      }

      const remedio = await prisma.remedio.create({
        data: {
          nome,
          funcao,
          dosagem: parseFloat(dosagem),
          status: true,
        }
      });

      return res.status(201).json(remedio);
    } catch (e) {
      console.error('Erro ao cadastrar o remédio!');
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },
  buscarRemedios: async (req, res) => {
    try {
      const remedios = await prisma.remedio.findMany({
        where: {
            status: true
        }
      });
        
      res.status(200).json(remedios);
    } catch (e) {
        console.error('Erro ao buscar os remedios:', e);
        res.status(500).json({ error: 'Erro interno do servidor' })
    }
  },
  buscarRemedio: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'Parametro inválido!' });
      }

      const remedio = await prisma.remedio.findFirst({
        where: { id }
      });

      if (!remedio) {
        return res.status(404).json({ error: 'Remédio não encontrado!' });
      }

      return res.status(200).json(remedio);
    } catch (e) {
      console.error("Erro ao buscar remédio!")
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },
  atualizarRemedio: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { nome, funcao, dosagem, status } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ error: 'Parâmetro inválido!' });
      }

      const remedio = await prisma.remedio.findFirst({
        where: { id }
      });

      if (!remedio) {
        return res.status(404).json({ error: 'Remédio não encontrado!' });
      }

      const remedioAtualizado = await prisma.remedio.update({
        data: {
          nome: nome ?? remedio.nome,
          funcao: funcao ?? remedio.funcao,
          dosagem: dosagem !== undefined ? parseFloat(dosagem) : remedio.dosagem,
          status: status !== undefined ? status : remedio.status,
        },
        where: {id}
      });

      return res.status(200).json(remedioAtualizado);
    } catch (e) {
      console.error('Erro ao atualizar os dados do remédio!');
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },
  deletarRemedio: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'Parâmetro inválido!' });
      }

      const remedio = await prisma.remedio.findFirst({
        where: { id }
      });

      if (!remedio) {
        return res.status(404).json({ error: 'Remédio não encontrado!' });
      }

      const remedioDeletado = await prisma.remedio.delete({
        where: { id }
      })

      return res.status(200).json(remedioDeletado.id);
    } catch (e) {
      console.error('Erro ao deletar o remédio!');
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  }
}

module.exports = remedioController;