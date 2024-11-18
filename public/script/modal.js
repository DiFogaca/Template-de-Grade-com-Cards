const newCompanyModal = document.getElementById('newCompanyModal');
const confirmAddButton = document.querySelector('.confirm-add');
const confirmEditButton = document.querySelector('.confirm-edit');
const editButton = document.querySelector('.edit');
const modalTitle = document.querySelector('#newCompanyModal .modal-content h2');

// Função para abrir o modal
function openModal(modal) {
    modal.style.display = 'block';
}

// Função para fechar o modal
function closeModal(modal) {
    modal.style.display = 'none';
}

// Função para atualizar o título do modal
function updateModalTitle(isEditing) {
    if (isEditing) {
        modalTitle.textContent = 'Editar Empresa';
        confirmAddButton.style.display = 'none';
        confirmEditButton.style.display = 'block';
    } else {
        modalTitle.textContent = 'Cadastrar Nova Empresa';
        confirmAddButton.style.display = 'block';
        confirmEditButton.style.display = 'none';
    }
}

// Evento para o botão "Detalhes"
function setupDetailButton(data) {
    document.querySelectorAll('.detalhes').forEach(button => {
        button.addEventListener('click', (event) => {
            const codigo = event.target.getAttribute('data-id');
            const empresa = data.find(item => item.Codigo == codigo);
            if (empresa) {
                document.getElementById('companyName').value = empresa.companyName;
                document.getElementById('carCount').value = empresa.carCount;
                confirmEditButton.setAttribute('data-id', codigo);
                updateModalTitle(true); // Altera o título para 'Editar Empresa'
                openModal(newCompanyModal); // Abre o modal

                // Oculta o botão de adicionar e mostra o botão de editar
                confirmAddButton.style.display = 'none';
                confirmEditButton.style.display = 'none'; // Mostra o botão de edição
                editButton.style.display = 'block'; // Esconde o botão de editar

                // Desabilita os campos de entrada
                document.getElementById('companyName').disabled = true;
                document.getElementById('carCount').disabled = true;
            }
        });
    });
}

// Evento para o botão "Editar"
function setupEditButton() {
    editButton.addEventListener('click', () => {
        document.getElementById('companyName').disabled = false;
        document.getElementById('carCount').disabled = false;
        confirmAddButton.style.display = 'none'; // Oculta o botão "Confirmar"
        confirmEditButton.style.display = 'block'; // Mostra o botão "Confirmar Edição"
        editButton.style.display = 'none'; // Esconde o botão "Editar"
    });
}

// Função para configurar o modal de logs
export function setupLogModal() {
    const logModal = document.getElementById('logModal');
    const closeButton = logModal.querySelector('.close');
    closeButton.addEventListener('click', () => closeModal(logModal));
}

// Inicialização do modal
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.close, .cancel').forEach(button => {
        button.addEventListener('click', () => closeModal(newCompanyModal));
    });

    setupEditButton();
    setupLogModal(); // Configura o evento do botão "Logs"
});

export { openModal, closeModal, updateModalTitle, setupDetailButton };
