const cardContainer = document.getElementById('cardContainer');
const numberOfCards = 15;

for (let i = 1; i <= numberOfCards; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3 class="titulo">Título ${i}</h3>
        <p>Conteúdo do card ${i}.</p>
        <div class="button-container">
            <button type="button" class="logs">Logs</button>
            <button type="button" class="detalhes">Detalhes</button>
        </div>
    `;
    cardContainer.appendChild(card);
}

const themeToggle = document.getElementById('themeToggle');

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

// Carregar o tema ao carregar a página
window.onload = () => {
    const theme = getCookie("theme");
    if (theme === "dark") {
        document.body.classList.add('dark-theme');
        themeToggle.classList.add('active');
    }
};

// Alternar tema e salvar em cookie
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.classList.toggle('active');
    const theme = document.body.classList.contains('dark-theme') ? "dark" : "light";
    setCookie("theme", theme, 7); // Salva o tema por 7 dias
});
