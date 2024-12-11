require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./configs/swaggerConfig');
const cors = require('cors');
const path = require('path');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

// Importando rotas
const usuarioRoutes = require("./src/routes/usuario");
const authRoutes = require('./src/routes/auth');
const produtoRoutes = require('./src/routes/produto');
const clienteRoutes = require('./src/routes/cliente');
const pedidoRoutes = require('./src/routes/pedido');
const itemPedidoRoutes = require('./src/routes/itempedido');
const personalizacaoRoutes = require('./src/routes/personalizacao');
const imagemRoutes = require('./src/routes/imagem');

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Definindo rotas
app.use("/api/usuario", usuarioRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/itenspedido", itemPedidoRoutes);
app.use("/api/personalizacoes", personalizacaoRoutes);
app.use("/api/imagens", imagemRoutes);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Rota padrão para qualquer outra rota não definida
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicializando o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});