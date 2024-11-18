
let serverIP = '192.168.0.17' + ':3000';

async function getServerIP() {
  try {
    const response = await fetch(serverIP);
    const data = await response.json();
    serverIP = data.ip;
    console.log('IP do servidor:', serverIP);
  } catch (error) {
    console.error('Erro ao obter IP do servidor:', error);
  }
}

getServerIP();

export { serverIP };
