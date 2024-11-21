
let serverIP = '172.26.144.1' + ':3000';

// async function getServerIP() {
//   try {
//     const response = await fetch(serverIP);
//     const data = await response.json();
//     serverIP = data.ip;
//     console.log('IP do servidor:', serverIP);
//   } catch (error) {
//     console.error('Erro ao obter IP do servidor:', error);
//   }
// }

//getServerIP();

export { serverIP };
