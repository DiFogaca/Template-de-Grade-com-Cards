const express = require('express');
const bodyParser = require('body-parser');
const odbc = require('odbc');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Para servir arquivos estáticos

const connectionString = 'DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=D:\\Projetos\\Source\\Database1_be.accdb';

async function saveData(companyName, carCount, eventos, ativo) {
  const connection = await odbc.connect(connectionString);
  
  const query = `INSERT INTO Cadastro_Empresas (companyName, carCount, Eventos, Ativo) VALUES ('${companyName}', ${carCount}, '${eventos}', ${ativo})`;
  
  await connection.query(query);
  
  await connection.close();
}

async function getData() {
  const connection = await odbc.connect(connectionString);
  
  const query = 'SELECT Codigo, Data_Cadastro, companyName, carCount, Eventos, Ativo FROM Cadastro_Empresas';
  try {
    const result = await connection.query(query);
    await connection.close();
    return result;
  } catch (error) {
    console.error('Erro ao executar consulta SQL:', error);
    await connection.close();
    throw error;
  }
}

app.post('/save-data', async (req, res) => {
  try {
    const { companyName, carCount, eventos, ativo } = req.body;
    const connection = await odbc.connect(connectionString);
    const query = `INSERT INTO Cadastro_Empresas (companyName, carCount, Eventos, Ativo) VALUES ('${companyName}', ${carCount}, '${eventos}', ${ativo})`;
    await connection.query(query);
    await connection.close();
    res.send('Dados salvos com sucesso.');
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar dados: ' + err.message });
  }
});


app.get('/get-data', async (req, res) => {
    try {
      const data = await getData();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar dados: ' + err.message }); // Retorna o erro como JSON
    }
  });

  app.put('/update-data/:id', async (req, res) => {
    try {
      const { companyName, carCount, eventos, ativo } = req.body;
      const id = req.params.id;
      const connection = await odbc.connect(connectionString);
      const query = `UPDATE Cadastro_Empresas SET companyName = '${companyName}', carCount = ${carCount}, Eventos = '${eventos}', Ativo = ${ativo} WHERE Codigo = ${id}`;
      await connection.query(query);
      await connection.close();
      res.send('Dados atualizados com sucesso.');
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar dados: ' + err.message });
    }
  });
  

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});




