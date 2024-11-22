// db.js
const { Sequelize } = require('sequelize');

// Carrega as variáveis de ambiente
require('dotenv').config();

// Configuração da conexão com o banco de dados MySQL
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    logging: console.log
  }
);

// Teste da conexão com o banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  }
})();

module.exports = sequelize;  // Exporta a conexão para outros módulos
