const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  // Criar um novo pedido
  criarPedido: async (req, res) => {
    try {
      const { cliente_id, status, itens } = req.body;
  
      // Verificar se "itens" está definido e é um array
      if (!Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({
          error: "A lista de itens do pedido é obrigatória e deve ser um array.",
        });
      }
  
      // Calcular o valor total do pedido com base nos itens
      const valor_total = itens.reduce((total, item) => {
        if (!item.preco_total || typeof item.preco_total !== "number") {
          throw new Error("Cada item deve ter um campo 'preco_total' válido.");
        }
        return total + item.preco_total;
      }, 0);
  
      // Criar o pedido no banco de dados
      const novoPedido = await prisma.pedido.create({
        data: {
          cliente_id,
          status,
          valor_total,
          itens_pedido: {
            create: itens.map((item) => ({
              quantidade: item.quantidade || 1, // Quantidade padrão é 1
              preco_total: item.preco_total,
              produto_id: item.produto_id,
              imagem_id: item.imagem_id || null,
              personalizacao_id: item.personalizacao_id || null,
            })),
          },
        },
        include: {
          cliente: true, // Inclui informações do cliente
          itens_pedido: {
            include: {
              produto: true, // Inclui informações do produto
              imagem: true, // Inclui informações da imagem
              personalizacao: true, // Inclui informações de personalização
            },
          },
        },
      });
  
      return res.status(201).json(novoPedido);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      return res.status(500).json({ error: error.message || "Erro interno do servidor." });
    }
  },

  // Buscar todos os pedidos com paginação
  buscarPedidos: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      const pedidos = await prisma.pedido.findMany({
        skip: parseInt(skip, 10),
        take: parseInt(limit, 10),
        include: {
          cliente: true,
          itens_pedido: {
            include: {
              produto: true,
              imagem: true,
              personalizacao: true,
            },
          },
        },
      });

      if (pedidos.length === 0) {
        return res.status(404).json({ message: "Nenhum pedido encontrado." });
      }

      return res.status(200).json(pedidos);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  // Buscar um pedido específico por ID
  buscarPedido: async (req, res) => {
    try {
      const { id } = req.params;

      const pedido = await prisma.pedido.findUnique({
        where: { id_pedido: parseInt(id, 10) },
        include: {
          cliente: true,
          itens_pedido: {
            include: {
              produto: true,
              imagem: true,
              personalizacao: true,
            },
          },
        },
      });

      if (!pedido) {
        return res.status(404).json({ message: "Pedido não encontrado." });
      }

      return res.status(200).json(pedido);
    } catch (error) {
      console.error("Erro ao buscar pedido:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  // Buscar itens de um pedido específico
  buscarItensPorPedido: async (req, res) => {
    try {
      const { id } = req.params;

      const pedido = await prisma.pedido.findUnique({
        where: { id_pedido: parseInt(id, 10) },
        include: {
          itens_pedido: {
            include: {
              produto: true,
              imagem: true,
              personalizacao: true,
            },
          },
        },
      });

      if (!pedido) {
        return res.status(404).json({ message: "Pedido não encontrado." });
      }

      const itens = pedido.itens_pedido;

      if (itens.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum item encontrado para este pedido." });
      }

      return res.status(200).json(itens);
    } catch (error) {
      console.error("Erro ao buscar itens do pedido:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  // Atualizar um pedido existente
  atualizarPedido: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, itens } = req.body;

      // Recalcular o valor total com base nos itens atualizados
      const valor_total = itens.reduce((total, item) => {
        return total + item.preco_total;
      }, 0);

      const pedidoAtualizado = await prisma.pedido.update({
        where: { id_pedido: parseInt(id, 10) },
        data: {
          status,
          valor_total,
          itens_pedido: {
            deleteMany: {}, // Remove todos os itens relacionados ao pedido
            create: itens.map((item) => ({
              quantidade: item.quantidade,
              preco_total: item.preco_total,
              produto_id: item.produto_id,
              imagem_id: item.imagem_id || null,
              personalizacao_id: item.personalizacao_id || null,
            })),
          },
        },
        include: {
          cliente: true,
          itens_pedido: {
            include: {
              produto: true,
              imagem: true,
              personalizacao: true,
            },
          },
        },
      });

      return res.status(200).json(pedidoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  // Deletar um pedido
  deletarPedido: async (req, res) => {
    try {
      const { id } = req.params;

      // Verificar se o pedido existe antes de excluir
      const pedido = await prisma.pedido.findUnique({
        where: { id_pedido: parseInt(id, 10) },
      });

      if (!pedido) {
        return res.status(404).json({ message: "Pedido não encontrado." });
      }

      await prisma.pedido.delete({
        where: { id_pedido: parseInt(id, 10) },
      });

      return res.status(200).json({ message: "Pedido deletado com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar pedido:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },
};