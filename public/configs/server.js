// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');  // Importa a conexão com o banco de dados

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));  // Para servir arquivos estáticos

// Exemplo de rota de teste
app.get('/teste', (req, res) => {
  res.send('Servidor está funcionando corretamente!');
});

// Inicia o servidor na porta configurada
app.listen(PORT, () => {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  let address = 'localhost'; // Valor padrão

  for (let iface in interfaces) {
    for (let i of interfaces[iface]) {
      if (i.family === 'IPv4' && !i.internal) {
        address = i.address;
        break;
      }
    }
  }

  console.log(`Servidor iniciado na porta ${PORT}: http://${address}:${PORT}`);
});
