const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const app = express();
const cors = require('cors'); // Adiciona esta linha

app.use(cors()); // Adiciona esta linha
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Para analisar conteúdo JSON no corpo da requisição
app.use(express.static('public')); // Para servir arquivos estáticos


//Configuração da conexão com o banco de dados MySQL PROD
const sequelize = new Sequelize('freedb_DB_PROD', 'freedb_dlf123', 'qyqe2n$UFqfMjkc', {
  host: 'sql.freedb.tech',
  port: 3306,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: console.log
});

// // Configuração da conexão com o banco de dados MySQL HOM
// const sequelize = new Sequelize('freedb_DB_PROD', 'root', '12354', {
//   host: 'localhost',
//   port: 3306,
//   dialect: 'mysql',
//   dialectModule: require('mysql2'),
//   logging: console.log
// });

async function testConnection() { 
  try { 
    await sequelize.authenticate(); 
    console.log('Conexão com o banco de dados foi estabelecida com sucesso!'); 
  } catch (error) { 
    console.error('Não foi possível conectar ao banco de dados:', error); 
  } 
} testConnection(); 
module.exports = sequelize;

// Definindo o modelo da tabela Cadastro_Empresas
const Empresa = sequelize.define('cadastro_empresas', {
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


// Definindo o modelo da tabela cadastro_pacientes
const Paciente = sequelize.define('cadastro_pacientes', {
  senha: {
    type: Sequelize.STRING,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.NOW
  },
  hora_chegada: {
    type: Sequelize.TIME
  },
  tempo_espera: {
    type: Sequelize.TIME
  },

}, {
  timestamps: false,
  freezeTableName: true
});


// Definindo o modelo da tabela Logs
const Log = sequelize.define('logs', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  action: {
    type: Sequelize.STRING
  },
  table_name: {
    type: Sequelize.STRING
  },
  record_id: {
    type: Sequelize.INTEGER
  },
  old_value: {
    type: Sequelize.STRING
  }, new_value: {
    type: Sequelize.STRING
  },
  changed_at: {
    type: Sequelize.DATE, defaultValue: Sequelize.NOW
  },
  changed_by: {
    type: Sequelize.STRING
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

// Função para buscar logs
async function getLogs(recordId) {
  return await Log.findAll({ where: { record_id: recordId } });
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
    console.error('Erro ao recuperar dados: ', err);
    res.status(500).send('Erro ao recuperar dados');
  }
});

// Endpoint para atualizar dados
app.put('/update-data/:Codigo', async (req, res) => {
  const Codigo = req.params.Codigo;
  const { companyName, carCount, eventos, ativo } = req.body;

  console.log('Recebido para atualização:', { Codigo, companyName, carCount, eventos, ativo });

  try {
    const empresa = await Empresa.findByPk(Codigo);
    if (empresa) {
      empresa.companyName = companyName;
      empresa.carCount = carCount;
      empresa.Eventos = eventos;
      empresa.Ativo = ativo;
      await empresa.save();

      console.log('Dados atualizados com sucesso!');
      return res.status(200).send('Dados atualizados com sucesso!');
    } else {
      return res.status(404).send('Empresa não encontrada.');
    }
  } catch (err) {
    console.error('Erro ao atualizar dados:', err.message);
    return res.status(500).send('Erro ao atualizar dados: ' + err.message);
  }
});

// Endpoint para buscar logs
app.get('/logs/:record_id', async (req, res) => {
  try {
    const recordId = req.params.record_id;
    const logs = await getLogs(recordId);
    res.json(logs);
  } catch (err) {
    console.error('Erro ao recuperar logs: ', err);
    res.status(500).send('Erro ao recuperar logs');
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


