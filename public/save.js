const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Para analisar conteúdo JSON no corpo da requisição
app.use(express.static('public')); // Para servir arquivos estáticos

// Configuração da conexão com o banco de dados SQL Server
const sequelize = new Sequelize('if0_37590322_cards', 'if0_37590322', '2EQWCc3akLw65F', {
  host: 'sql301.infinityfree.com',
  port: 3306,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados SQL Server');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
})();

// Definindo o modelo da tabela Cadastro_Empresas
const Empresa = sequelize.define('Cadastro_Empresas', {
  Codigo: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Data_Cadastro: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  companyName: {
    type: Sequelize.STRING
  },
  carCount: {
    type: Sequelize.INTEGER
  },
  Eventos: {
    type: Sequelize.STRING
  },
  Ativo: {
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false,
  freezeTableName: true
});

// Função para salvar dados
async function saveData(companyName, carCount, eventos, ativo) {
  await Empresa.create({ companyName, carCount, Eventos: eventos, Ativo: ativo });
}

// Função para buscar dados
async function getData() {
  return await Empresa.findAll();
}

// Endpoint para salvar dados
app.post('/save-data', async (req, res) => {
  try {
    const { companyName, carCount, eventos, ativo } = req.body;
    await saveData(companyName, carCount, eventos, ativo);
    res.send('Dados salvos com sucesso.');
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar dados: ' + err.message });
  }
});

// Endpoint para buscar dados
app.get('/get-data', async (req, res) => {
  try {
    const data = await getData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados: ' + err.message });
  }
});

// Inicializa o servidor na porta 3000
app.listen(3000, () => {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  let address;

  for (let iface in interfaces) {
    for (let i of interfaces[iface]) {
      if (i.family === 'IPv4' && !i.internal) {
        address = i.address;
        break;
      }
    }
  }

  console.log(`Servidor iniciado na porta 3000: http://${address}:3000`);
});
