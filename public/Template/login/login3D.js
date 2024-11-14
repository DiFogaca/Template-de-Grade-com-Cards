const canvas = document.getElementById('login-canvas');
const gl = canvas.getContext('webgl', { alpha: true });

if (!gl) {
    console.error('WebGL não está disponível em seu navegador.');
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseDown = false;
let startX, startY;
let currentX = 0;
let currentY = 0;

const container = document.querySelector('.container');

document.getElementById('forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    container.classList.remove('rotated-right');
    container.classList.add('rotated-left');
});

document.getElementById('back-to-login').addEventListener('click', function(e) {
    e.preventDefault();
    container.classList.remove('rotated-left');
    container.classList.add('rotated-right');
});

// Adicionar evento de click
document.querySelectorAll('.input-container input').forEach(input => {
    input.addEventListener('focus', function() {
        mouseDown = false; // Desativa a rotação enquanto os inputs estão focados
    });

    input.addEventListener('click', function(e) {
        e.stopPropagation(); // Impede que o clique nos inputs propague e interfira na rotação
    });

    input.addEventListener('blur', function() {
        mouseDown = false; // Reativa a rotação quando os inputs perdem o foco
    });
});

container.addEventListener('mousedown', function(e) {
    if (e.target.closest('.input-container')) {
        // Se for um input, não previne o default e mantém o foco para digitação
        mouseDown = false; 
    } else {
        // Caso contrário, previne o default, ativa a rotação e remove o foco dos inputs
        document.activeElement.blur(); // Remove o foco do input
        e.preventDefault(); 
        e.stopPropagation(); 
        mouseDown = true; 
        startX = e.clientX; 
        startY = e.clientY; 
    }
});


document.addEventListener('mousemove', function(e) {
    if (!mouseDown) return;

    e.preventDefault();
    e.stopPropagation();

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    currentX += deltaX * 0.2;
    currentY += deltaY * 0.2;

    container.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;

    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener('mouseup', function(e) {
    e.preventDefault();
    e.stopPropagation();
    mouseDown = false;
});

function initWebGL() {
    // Configuração do WebGL
}

initWebGL();
