const prisma = require('../../prisma/prismaClient');

const produtoController = {
  // Criar novo produto
  criarProduto: async (req, res) => {
    try {
      const { nome, tipo, base_custo, margem_lucro, material_principal } = req.body;

      if (!nome || !tipo || !base_custo || !margem_lucro) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos!' });
      }

      const novoProduto = await prisma.produto.create({
        data: {
          nome,
          tipo,
          base_custo,
          margem_lucro,
          material_principal
        }
      });

      return res.status(201).json(novoProduto);
    } catch (e) {
      console.error('Erro ao criar o produto!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar todos os produtos (com paginação)
  buscarProdutos: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const skip = (page - 1) * limit;

      const produtos = await prisma.produto.findMany({
        skip: parseInt(skip, 10),
        take: parseInt(limit, 10)
      });

      if (!produtos.length) {
        return res.status(404).json({ error: 'Nenhum produto encontrado!' });
      }

      return res.status(200).json(produtos);
    } catch (e) {
      console.error('Erro ao buscar os produtos!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Buscar produto por ID
  buscarProduto: async (req, res) => {
    try {
      const id_produto = parseInt(req.params.id, 10);

      // Verifique se o ID é válido
      if (isNaN(id_produto)) {
        return res.status(400).json({ error: 'ID inválido!' });
      }

      const produto = await prisma.produto.findUnique({
        where: { id_produto }
      });

      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado!' });
      }

      return res.status(200).json(produto);
    } catch (e) {
      console.error('Erro ao buscar o produto!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Atualizar produto
  atualizarProduto: async (req, res) => {
    try {
      const id_produto = parseInt(req.params.id, 10);

      // Verifique se o ID é válido
      if (isNaN(id_produto)) {
        return res.status(400).json({ error: 'ID inválido!' });
      }

      const { nome, tipo, base_custo, margem_lucro, material_principal } = req.body;

      const produto = await prisma.produto.findUnique({
        where: { id_produto }
      });

      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado!' });
      }

      const produtoAtualizado = await prisma.produto.update({
        data: {
          nome: nome ?? produto.nome,
          tipo: tipo ?? produto.tipo,
          base_custo: base_custo ?? produto.base_custo,
          margem_lucro: margem_lucro ?? produto.margem_lucro,
          material_principal: material_principal ?? produto.material_principal
        },
        where: { id_produto }
      });

      return res.status(200).json(produtoAtualizado);
    } catch (e) {
      console.error('Erro ao atualizar o produto!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  },

  // Deletar produto
  deletarProduto: async (req, res) => {
    try {
      const id_produto = parseInt(req.params.id, 10);

      // Verifique se o ID é válido
      if (isNaN(id_produto)) {
        return res.status(400).json({ error: 'ID inválido!' });
      }

      const produto = await prisma.produto.findUnique({
        where: { id_produto }
      });

      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado!' });
      }

      await prisma.produto.delete({
        where: { id_produto }
      });

      return res.status(200).json({ message: 'Produto deletado com sucesso!' });
    } catch (e) {
      console.error('Erro ao deletar o produto!', e);
      return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  }
};

module.exports = produtoController;