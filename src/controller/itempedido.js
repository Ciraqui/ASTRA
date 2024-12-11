const prisma = require('../../prisma/prismaClient');

const itemPedidoController = {
  // Criar novo item do pedido
  criarItemPedido: async (req, res) => {
    try {
      const { pedido_id, produto_id, quantidade, preco_unitario } = req.body;

      // Validação: Verifica se o pedido existe
      const pedido = await prisma.pedido.findUnique({
        where: { id_pedido: pedido_id }
      });

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado!' });
      }

      // Validação: Verifica se o produto existe
      const produto = await prisma.produto.findUnique({
        where: { id_produto: produto_id }
      });

      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado!' });
      }

      const novoItemPedido = await prisma.item_pedido.create({
        data: {
          pedido_id,
          produto_id,
          quantidade,
          preco_unitario
        }
      });

      return res.status(201).json(novoItemPedido);
    } catch (e) {
      console.error('Erro ao criar o item do pedido!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar todos os itens de pedido
  buscarItensPedido: async (req, res) => {
    try {
      const itensPedido = await prisma.item_pedido.findMany({
        include: {
          pedido: true,
          produto: true
        }
      });

      if (!itensPedido.length) {
        return res.status(404).json({ error: 'Nenhum item de pedido encontrado!' });
      }

      return res.status(200).json(itensPedido);
    } catch (e) {
      console.error('Erro ao buscar os itens de pedido!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar item do pedido por ID
  buscarItemPedido: async (req, res) => {
    try {
      const id_item_pedido = parseInt(req.params.id, 10);

      const itemPedido = await prisma.item_pedido.findUnique({
        where: { id_item_pedido },
        include: {
          pedido: true,
          produto: true
        }
      });

      if (!itemPedido) {
        return res.status(404).json({ error: 'Item do pedido não encontrado!' });
      }

      return res.status(200).json(itemPedido);
    } catch (e) {
      console.error('Erro ao buscar o item do pedido!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Atualizar item do pedido
  atualizarItemPedido: async (req, res) => {
    try {
      const id_item_pedido = parseInt(req.params.id, 10);
      const { pedido_id, produto_id, quantidade, preco_unitario } = req.body;

      const itemPedido = await prisma.item_pedido.findUnique({
        where: { id_item_pedido }
      });

      if (!itemPedido) {
        return res.status(404).json({ error: 'Item do pedido não encontrado!' });
      }

      const itemPedidoAtualizado = await prisma.item_pedido.update({
        where: { id_item_pedido },
        data: {
          pedido_id: pedido_id ?? itemPedido.pedido_id,
          produto_id: produto_id ?? itemPedido.produto_id,
          quantidade: quantidade ?? itemPedido.quantidade,
          preco_unitario: preco_unitario ?? itemPedido.preco_unitario
        }
      });

      return res.status(200).json(itemPedidoAtualizado);
    } catch (e) {
      console.error('Erro ao atualizar o item do pedido!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Deletar item do pedido
  deletarItemPedido: async (req, res) => {
    try {
      const id_item_pedido = parseInt(req.params.id, 10);

      const itemPedido = await prisma.item_pedido.findUnique({
        where: { id_item_pedido }
      });

      if (!itemPedido) {
        return res.status(404).json({ error: 'Item do pedido não encontrado!' });
      }

      await prisma.item_pedido.delete({
        where: { id_item_pedido }
      });

      return res.status(200).json({ message: 'Item do pedido deletado com sucesso!' });
    } catch (e) {
      console.error('Erro ao deletar o item do pedido!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  }
};

module.exports = itemPedidoController;