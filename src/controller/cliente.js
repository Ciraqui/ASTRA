const prisma = require('../../prisma/prismaClient');

const clienteController = {
  // Criar novo cliente
  criarCliente: async (req, res) => {
    try {
      const { nome, contato, endereco } = req.body;

      if (!nome || !contato) {
        return res.status(400).json({ error: 'Nome e contato são obrigatórios!' });
      }

      const novoCliente = await prisma.cliente.create({
        data: {
          nome,
          contato,
          endereco
        }
      });

      return res.status(201).json(novoCliente);
    } catch (e) {
      console.error('Erro ao criar o cliente!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar todos os clientes (com paginação)
  buscarClientes: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      const clientes = await prisma.cliente.findMany({
        skip: parseInt(skip, 10),
        take: parseInt(limit, 10)
      });

      if (!clientes.length) {
        return res.status(404).json({ error: 'Nenhum cliente encontrado!' });
      }

      return res.status(200).json(clientes);
    } catch (e) {
      console.error('Erro ao buscar os clientes!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar cliente por ID
  buscarCliente: async (req, res) => {
    try {
      const id_cliente = parseInt(req.params.id, 10);

      const cliente = await prisma.cliente.findUnique({
        where: { id_cliente }
      });

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado!' });
      }

      return res.status(200).json(cliente);
    } catch (e) {
      console.error('Erro ao buscar o cliente!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Atualizar cliente
  atualizarCliente: async (req, res) => {
    try {
      const id_cliente = parseInt(req.params.id, 10);
      const { nome, contato, endereco } = req.body;

      const cliente = await prisma.cliente.findUnique({
        where: { id_cliente }
      });

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado!' });
      }

      const clienteAtualizado = await prisma.cliente.update({
        data: {
          nome: nome ?? cliente.nome,
          contato: contato ?? cliente.contato,
          endereco: endereco ?? cliente.endereco
        },
        where: { id_cliente }
      });

      return res.status(200).json(clienteAtualizado);
    } catch (e) {
      console.error('Erro ao atualizar o cliente!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Deletar cliente
  deletarCliente: async (req, res) => {
    try {
      const id_cliente = parseInt(req.params.id, 10);

      const cliente = await prisma.cliente.findUnique({
        where: { id_cliente }
      });

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado!' });
      }

      await prisma.cliente.delete({
        where: { id_cliente }
      });

      return res.status(200).json({ message: 'Cliente deletado com sucesso!' });
    } catch (e) {
      console.error('Erro ao deletar o cliente!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar pedidos de um cliente
  buscarPedidosPorCliente: async (req, res) => {
    try {
      const id_cliente = parseInt(req.params.id, 10);

      const cliente = await prisma.cliente.findUnique({
        where: { id_cliente }
      });

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado!' });
      }

      const pedidos = await prisma.pedido.findMany({
        where: { cliente_id: id_cliente },
        include: { itens: true } // Inclui os itens de cada pedido
      });

      if (!pedidos.length) {
        return res.status(404).json({ error: 'Nenhum pedido encontrado para este cliente!' });
      }

      return res.status(200).json(pedidos);
    } catch (e) {
      console.error('Erro ao buscar pedidos do cliente!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  }
};

module.exports = clienteController;