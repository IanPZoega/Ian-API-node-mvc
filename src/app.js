// Ponto de entrada: middlewares, registro das rotas e subida do servidor.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: 'rota não encontrada' });
});

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
  console.log('Servidor rodando na porta ' + porta);
});
