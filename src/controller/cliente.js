const prisma = require('../../prisma/prismaClient');

const clienteController = {
  // Criar novo cliente
  criarCliente: async (req, res) => {
    try {
      const { nome, contato, endereco } = req.body;

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

  // Buscar todos os clientes
  buscarClientes: async (_, res) => {
    try {
      const clientes = await prisma.cliente.findMany();

      if (!clientes.length) {
        return res.status(404).json({ error: 'Ainda não há nenhum cliente cadastrado!' });
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

  // Atualizar informações do cliente
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
  }
};

module.exports = clienteController;
