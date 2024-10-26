// cardActions.js

import { openModal } from './modal.js';

// Função para criar um card na interface
export function createCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h3>${item.companyName}</h3>
    <p>Quantidade de Carros: ${item.carCount}</p>
    <p>Eventos: ${item.Eventos}</p>
    <p>Ativo: ${item.Ativo ? 'Sim' : 'Não'}</p>
    <div class="button-container">
      <button type="button" class="logs" data-id="${item.Codigo}">Logs</button>
      <button type="button" class="detalhes" data-id="${item.Codigo}">Detalhes</button>
    </div>`;
  return card;
}

// Função para renderizar todos os cards
export function renderCards(container, data) {
  container.innerHTML = '';
  data.forEach(item => {
    const card = createCard(item);
    container.appendChild(card);
  });

  // Adicionar eventos aos botões de cada card
  document.querySelectorAll('.logs').forEach(button => {
    button.addEventListener('click', () => openModal(document.getElementById('logModal')));
  });

  document.querySelectorAll('.detalhes').forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      const empresa = data.find(item => item.Codigo == id);
      if (empresa) {
        document.getElementById('companyName').value = empresa.companyName;
        document.getElementById('carCount').value = empresa.carCount;
        openModal(document.getElementById('newCompanyModal'));
      }
    });
  });
}
