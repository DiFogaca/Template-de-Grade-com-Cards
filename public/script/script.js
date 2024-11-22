// script.js

import { fetchData, saveData, updateData, fetchLogs } from '../configs/api.js';
import { openModal, closeModal, updateModalTitle, setupDetailButton } from './modal.js';
import { renderCards } from './cardActions.js';
import { serverIP } from '../configs/config.js';

// Função para mostrar mensagens de confirmação
function showConfirmationMessage(element, message) {
  element.textContent = message;
  element.style.display = 'block';
  setTimeout(() => {
    element.style.display = 'none';
  }, 3000);
}

document.addEventListener('DOMContentLoaded', async () => {
  const cardContainer = document.getElementById('cardContainer');
  const data = await fetchData(`http://${serverIP}/get-data`);
  renderCards(cardContainer, data);
  
  // Configura o botão "Detalhes"
  setupDetailButton(data);
  
  // Seleciona o modal de empresa e os botões de fechar
  const newCompanyModal = document.getElementById('newCompanyModal');
  document.querySelectorAll('.close, .cancel').forEach(button => {
      button.addEventListener('click', () => closeModal(newCompanyModal));
  });

  // Adiciona evento de clique aos botões de log 
  const logButtons = document.querySelectorAll('.logs'); 
  logButtons.forEach(button => { 
    button.addEventListener('click', async () => { 
      const recordId = button.getAttribute('data-id'); 
      const logs = await fetchLogs(recordId); 
      displayLogs(logs); 
    }); 
  }); 
});

// Adiciona evento de clique ao botão "Novo"
document.querySelector('.novo').addEventListener('click', () => {
  document.getElementById('companyName').value = '';
  document.getElementById('carCount').value = '';
  document.getElementById('companyName').disabled = false;
  document.getElementById('carCount').disabled = false;
  updateModalTitle(false);
  openModal(document.getElementById('newCompanyModal'));
});

document.querySelector('.confirm-add').addEventListener('click', async (event) => {
  event.preventDefault();
  const companyName = document.getElementById('companyName').value;
  const carCount = document.getElementById('carCount').value;
  await saveData(`http://${serverIP}/save-data`, { companyName, carCount });
  closeModal(document.getElementById('newCompanyModal'));
  showConfirmationMessage(mensagemAdd, 'Nova empresa adicionada');
  document.dispatchEvent(new Event('DOMContentLoaded'));
});

document.querySelector('.confirm-edit').addEventListener('click', async (event) => {
  event.preventDefault();
  const companyName = document.getElementById('companyName').value;
  const carCount = document.getElementById('carCount').value;
  const codigo = document.querySelector('.confirm-edit').getAttribute('data-id');

  console.log('Enviando para atualização:', { codigo, companyName, carCount });

  try {
    const result = await updateData(`http://${serverIP}/update-data/${codigo}`, { companyName, carCount });
    console.log('Resultado da atualização:', result);
    closeModal(document.getElementById('newCompanyModal'));
    showConfirmationMessage(mensagemEdit, 'Cadastro editado com sucesso!');
    document.dispatchEvent(new Event('DOMContentLoaded'));
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
  }
});

// Função para exibir os logs no modal 
function displayLogs(logs) { 
  const logContent = document.getElementById('logContent'); 
  logContent.innerHTML = ''; // Limpa o conteúdo anterior 
  
  logs.forEach(log => { 
    const logEntry = document.createElement('div'); 
    logEntry.innerHTML = `
    <p>Ação: ${log.action}</p> 
    <p>Tabela: ${log.table_name}</p>
    <p>ID do Registro: ${log.record_id}</p> 
    <p>Valor Antigo: ${log.old_value}</p> 
    <p>Valor Novo: ${log.new_value}</p> 
    <p>Alterado em: ${log.changed_at}</p> 
    <p>Alterado por: ${log.changed_by}<hr><br>`;
    logContent.appendChild(logEntry); 
  }); 

  const logModal = document.getElementById('logModal'); 
  openModal(logModal);
} 

// Fecha o modal quando o usuário clica no botão de fechar 
const closeModalButtons = document.querySelectorAll('.close'); 
closeModalButtons.forEach(button => { 
  button.addEventListener('click', () => { 
    const modal = button.closest('.modal'); 
    modal.style.display = 'none'; 
  }); 
});