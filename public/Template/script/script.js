const cardContainer = document.getElementById('cardContainer');
const newCompanyModal = document.getElementById('newCompanyModal');
const newCompanyForm = document.getElementById('newCompanyForm');
const editButton = document.querySelector('.edit');
const confirmAddButton = document.querySelector('.confirm-add');
const confirmEditButton = document.querySelector('.confirm-edit');
const cancelButton = document.querySelector('.cancel');
const modalTitle = document.querySelector('#newCompanyModal .modal-content h2');
const mensagemAdd = document.getElementById('mensagemAdd');
const mensagemEdit = document.getElementById('mensagemEdit');

// Função para abrir o modal
function openModal(modal) {
    modal.style.display = 'block';
}

// Função para fechar o modal
function closeModal(modal) {
    modal.style.display = 'none';
}

// Função para mostrar mensagens de confirmação
function showConfirmationMessage(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

// Carregar dados do backend e criar cards
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/get-data');
    const data = await response.json();
    const container = document.getElementById('cardContainer');
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${item.companyName}</h3>
        <p>Quantidade de Carros: ${item.carCount}</p>
        <p>Eventos: ${item.Eventos}</p>
        <p>Ativo: ${item.Ativo ? 'Sim' : 'Não'}</p>
        <div class="button-container">
          <button type="button" class="logs">Logs</button>
          <button type="button" class="detalhes" data-id="${item.Codigo}">Detalhes</button>
        </div>`;
      container.appendChild(card);
    });

    // Adicionar eventos aos botões
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
          confirmEditButton.setAttribute('data-id', id);
          updateModalTitle(true);
          openModal(newCompanyModal);
        }
      });
    });

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
});

// Função para atualizar o título do modal
function updateModalTitle(isEditing) {
    if (isEditing) {
        modalTitle.textContent = 'Editar Empresa';
    } else {
        modalTitle.textContent = 'Cadastrar Nova Empresa';
    }
}

// Adiciona evento de submissão ao botão "Confirmar Adição"
confirmAddButton.addEventListener('click', async event => {
  event.preventDefault();
  const companyName = document.getElementById('companyName').value;
  const carCount = document.getElementById('carCount').value;
  
  // Enviar dados ao backend para salvar
  try {
    const response = await fetch('/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ companyName, carCount })
    });
    const result = await response.text();
    console.log(result); // Exibe a resposta do servidor
    closeModal(newCompanyModal);
    showConfirmationMessage(mensagemAdd, 'Dados salvos com sucesso.');
    document.dispatchEvent(new Event('DOMContentLoaded')); // Recarrega os dados do backend
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
});

// Adiciona evento de submissão ao botão "Confirmar Edição"
confirmEditButton.addEventListener('click', async event => {
  event.preventDefault();
  const companyName = document.getElementById('companyName').value;
  const carCount = document.getElementById('carCount').value;
  const id = confirmEditButton.getAttribute('data-id'); // Certifique-se de que o ID está sendo capturado
  
  // Enviar dados editados ao backend para atualização
  try {
    const response = await fetch(`/update-data/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ companyName, carCount })
    });
    const result = await response.text();
    console.log(result);
    closeModal(newCompanyModal);
    showConfirmationMessage(mensagemEdit, 'Dados editados com sucesso.');
    document.dispatchEvent(new Event('DOMContentLoaded')); // Recarrega os dados do backend
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
  }
});

// Adiciona evento de clique ao botão "Editar"
editButton.addEventListener('click', () => {
    document.getElementById('companyName').disabled = false;
    document.getElementById('carCount').disabled = false;
    confirmAddButton.style.display = 'none';
    confirmEditButton.style.display = 'block';
    editButton.style.display = 'none';
});

// Adiciona evento de clique ao botão "Novo"
document.querySelector('.novo').addEventListener('click', () => {
    document.getElementById('companyName').value = '';
    document.getElementById('carCount').value = '';
    document.getElementById('companyName').disabled = false;
    document.getElementById('carCount').disabled = false;
    confirmAddButton.style.display = 'block';
    confirmEditButton.style.display = 'none';
    editButton.style.display = 'none';
    updateModalTitle(false);
    openModal(newCompanyModal);
});

// Inicializa o script quando a página carrega
window.onload = () => {
    document.querySelectorAll('.close, .cancel').forEach(button => {
        button.addEventListener('click', () => closeModal(newCompanyModal));
    });

    document.querySelector('.close').addEventListener('click', () => closeModal(document.getElementById('logModal')));
};
