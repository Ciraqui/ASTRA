require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./configs/swaggerConfig')
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

const usuarioRoutes = require("./src/routes/usuario")
const remedioRoutes = require("./src/routes/remedio")
const historicoRoutes = require("./src/routes/historico")
const prescricaoRoutes = require("./src/routes/prescricao")
const authRoutes = require('./src/routes/auth');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/usuario", usuarioRoutes);

app.use("/api/remedio", remedioRoutes);

app.use("/api/historico", historicoRoutes);

app.use("/api/prescricao", prescricaoRoutes);

app.use('/api/auth', authRoutes);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});