const themeToggle = document.querySelector('.theme-toggle');
const sunIcon = document.querySelector('.day-icon');
const moonIcon = document.querySelector('.night-icon');

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

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    themeToggle.addEventListener('click', toggleTheme);
});
