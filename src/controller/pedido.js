const prisma = require('../../prisma/prismaClient');

const pedidoController = {
  // Criar novo pedido
  criarPedido: async (req, res) => {
    try {
      const { cliente_id, valor_total, status, itens_pedido } = req.body;

      const novoPedido = await prisma.pedido.create({
        data: {
          cliente_id,
          valor_total,
          status,
          itens_pedido: {
            create: itens_pedido
          }
        }
      });

      return res.status(201).json(novoPedido);
    } catch (e) {
      console.error('Erro ao criar o pedido!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar todos os pedidos
  buscarPedidos: async (_, res) => {
    try {
      const pedidos = await prisma.pedido.findMany();

      if (!pedidos.length) {
        return res.status(404).json({ error: 'Ainda não há nenhum pedido cadastrado!' });
      }

      return res.status(200).json(pedidos);
    } catch (e) {
      console.error('Erro ao buscar os pedidos!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar pedido por ID
  buscarPedido: async (req, res) => {
    try {
      const id_pedido = parseInt(req.params.id, 10);

      const pedido = await prisma.pedido.findUnique({
        where: { id_pedido }
      });

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado!' });
      }

      return res.status(200).json(pedido);
    } catch (e) {
      console.error('Erro ao buscar o pedido!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Atualizar informações do pedido
  atualizarPedido: async (req, res) => {
    try {
      const id_pedido = parseInt(req.params.id, 10);
      const { cliente_id, valor_total, status, itens_pedido } = req.body;

      const pedido = await prisma.pedido.findUnique({
        where: { id_pedido }
      });

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado!' });
      }

      const pedidoAtualizado = await prisma.pedido.update({
        data: {
          cliente_id: cliente_id ?? pedido.cliente_id,
          valor_total: valor_total ?? pedido.valor_total,
          status: status ?? pedido.status,
          itens_pedido: {
            update: itens_pedido
          }
        },
        where: { id_pedido }
      });

      return res.status(200).json(pedidoAtualizado);
    } catch (e) {
      console.error('Erro ao atualizar o pedido!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Deletar pedido
  deletarPedido: async (req, res) => {
    try {
      const id_pedido = parseInt(req.params.id, 10);

      const pedido = await prisma.pedido.findUnique({
        where: { id_pedido }
      });

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado!' });
      }

      await prisma.pedido.delete({
        where: { id_pedido }
      });

      return res.status(200).json({ message: 'Pedido deletado com sucesso!' });
    } catch (e) {
      console.error('Erro ao deletar o pedido!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  }
};

module.exports = pedidoController;
