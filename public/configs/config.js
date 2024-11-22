const PORT = process.env.PORT || 3000;
let serverIP = '172.26.144.1' + ':' + PORT;
export { serverIP };

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

// getServerIP();


