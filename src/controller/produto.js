const prisma = require('../../prisma/prismaClient');

const produtoController = {
  // Criar novo produto
  criarProduto: async (req, res) => {
    try {
      const { nome, tipo, base_custo, margem_lucro, material_principal } = req.body;

      // Criar o novo produto
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

  // Buscar todos os produtos
  buscarProdutos: async (_, res) => {
    try {
      const produtos = await prisma.produto.findMany();

      if (!produtos.length) {
        return res.status(404).json({ error: 'Ainda não há nenhum produto cadastrado!' });
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

  // Atualizar informações do produto
  atualizarProduto: async (req, res) => {
    try {
      const id_produto = parseInt(req.params.id, 10);
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
