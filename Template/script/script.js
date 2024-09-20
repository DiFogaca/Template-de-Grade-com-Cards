const cardContainer = document.getElementById('cardContainer');
const themeToggle = document.querySelector('.theme-toggle');
const sunIcon = document.querySelector('.material-symbols-outlined.day');
const moonIcon = document.querySelector('.material-symbols-outlined.night');
const newCompanyModal = document.getElementById('newCompanyModal');
const newCompanyForm = document.getElementById('newCompanyForm');

// Função para definir o cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Função para obter o cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Função para alternar o tema e salvar em cookie
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    themeToggle.classList.toggle('active');
    const theme = document.body.classList.contains('dark-theme') ? "dark" : "light";
    setCookie("theme", theme, 7); // Salva o tema por 7 dias

    // Alterna os ícones
    if (theme === "dark") {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

// Função para abrir o modal
function openModal(modal) {
    modal.style.display = 'block';
}

// Função para fechar o modal
function closeModal(modal) {
    modal.style.display = 'none';
}

// Função para carregar os dados das empresas e criar os cards
function loadEmpresas() {
    cardContainer.innerHTML = ''; // Limpa o contêiner de cards antes de adicionar novos
    const empresas = JSON.parse(localStorage.getItem('empresas')) || [];
    empresas.forEach((empresa, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3 class="titulo">${empresa.nome}</h3>
            <p>Quantidade de carros: ${empresa.carros}</p>
            <div class="button-container">
                <button type="button" class="logs">Logs</button>
                <button type="button" class="detalhes">Detalhes</button>
            </div>
        `;
        cardContainer.appendChild(card);
    });

    // Adiciona evento de clique aos botões de logs
    document.querySelectorAll('.logs').forEach(button => {
        button.addEventListener('click', () => openModal(document.getElementById('logModal')));
    });
}

// Função para inicializar o tema
function initializeTheme() {
    const theme = getCookie("theme");
    if (theme === "dark") {
        document.body.classList.add('dark-theme');
        themeToggle.classList.add('active');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

// Inicializa o script quando a página carrega
window.onload = () => {
    initializeTheme();
    loadEmpresas();

    // Adiciona evento de clique ao botão de alternância de tema
    themeToggle.addEventListener('click', toggleTheme);

    // Adiciona evento de clique ao botão "Novo"
    document.querySelector('.novo').addEventListener('click', () => {
        // Limpa os campos do formulário
        document.getElementById('companyName').value = '';
        document.getElementById('carCount').value = '';
        openModal(newCompanyModal);
    });

    // Fecha o modal quando o usuário clica no "x" ou no botão cancelar
    document.querySelectorAll('.close, .cancel').forEach(button => {
        button.addEventListener('click', () => closeModal(newCompanyModal));
    });

    // Fecha o modal quando o usuário clica fora do modal
    window.addEventListener('click', event => {
        if (event.target === newCompanyModal) {
            closeModal(newCompanyModal);
        }
    });

    // Adiciona evento de submissão ao formulário de nova empresa
    newCompanyForm.addEventListener('submit', event => {
        event.preventDefault();
        const companyName = document.getElementById('companyName').value;
        const carCount = document.getElementById('carCount').value;
        const empresas = JSON.parse(localStorage.getItem('empresas')) || [];
        empresas.push({ nome: companyName, carros: carCount });
        localStorage.setItem('empresas', JSON.stringify(empresas));
        closeModal(newCompanyModal);
        loadEmpresas();
    });

    // Fecha o modal quando o usuário clica no "x"
    document.querySelector('.close').addEventListener('click', () => closeModal(document.getElementById('logModal')));

    // Fecha o modal quando o usuário clica fora do modal
    window.addEventListener('click', event => {
        const modal = document.getElementById('logModal');
        if (event.target === modal) {
            closeModal(modal);
        }
    });
};