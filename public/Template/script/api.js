// api.js
import { serverIP } from './config.js';


// Carrega os dados da API para exibir os cards
async function fetchData(url) {
  try {
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return [];
  }
}
  
// Função para salvar novos dados na API
async function saveData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
      return await response.text();
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
};
  
// Função para atualizar dados existentes na API
async function updateData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

// Função para buscar os logs da API 
async function fetchLogs(recordId) { 
  try { 
    const response = await fetch(`http://${serverIP}/logs/${recordId}`, 
      { headers: { 'Accept': 'application/json' } 
    });
     
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); 
    return await response.json(); 
  } catch (error) { 
    console.error('Erro ao carregar logs:', error); 
    return []; 
  } 
}
export { fetchData, saveData, updateData, fetchLogs };