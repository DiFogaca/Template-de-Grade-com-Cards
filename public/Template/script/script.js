// script.js

import { fetchData, saveData, updateData } from './api.js';
import { openModal, closeModal, updateModalTitle, setupDetailButton } from './modal.js';
import { renderCards } from './cardActions.js';

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
  const data = await fetchData('http://192.168.0.9:3000/get-data');
  renderCards(cardContainer, data);
  
  // Configura o botão "Detalhes"
  setupDetailButton(data);
  
  // Seleciona o modal de empresa e os botões de fechar
  const newCompanyModal = document.getElementById('newCompanyModal');
  document.querySelectorAll('.close, .cancel').forEach(button => {
      button.addEventListener('click', () => closeModal(newCompanyModal));
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
  await saveData('http://192.168.0.9:3000/save-data', { companyName, carCount });
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
    const result = await updateData(`http://192.168.0.9:3000/update-data/${codigo}`, { companyName, carCount });
    console.log('Resultado da atualização:', result);
    closeModal(document.getElementById('newCompanyModal'));
    showConfirmationMessage(mensagemEdit, 'Cadastro editado com sucesso!');
    document.dispatchEvent(new Event('DOMContentLoaded'));
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
  }
});

