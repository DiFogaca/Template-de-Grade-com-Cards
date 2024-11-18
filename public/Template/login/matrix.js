// Matriz de caracteres
const matrix = document.querySelector('.matrix');
const columns = Math.floor(window.innerWidth / 20);
const drops = Array(columns).fill(0);

// Lista de caracteres para o efeito Matrix
const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%&*+-/=<>";

// Função para criar uma gota
function createDrop(i) {
    const drop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = `${i * 20}px`;
    drop.style.animationDelay = `${Math.random() * 5}s`;
    matrix.appendChild(drop);

    // Função para desenhar a gota
    function draw() {
        // Adicionar a classe 'faded' aos caracteres antigos
        Array.from(drop.children).forEach(child => {
            child.className = 'faded';
        });

        drop.innerHTML = '';
        const dropLength = columns; // Comprimento aleatório da gota
        for (let j = 0; j < dropLength; j++) {
            const text = caracteres[Math.floor(Math.random() * caracteres.length)];
            const span = document.createElement('span');
            span.innerHTML = `${text}<br>`;
            drop.appendChild(span);
        }
        drop.lastChild.className = 'bright';
    }

    // Função para animar a gota com um intervalo ajustável
    function animate() {
        draw();
        setTimeout(animate, 500); // Aumente o valor (em milissegundos) para diminuir a velocidade
    }

    requestAnimationFrame(animate);
}

// Crie as gotas
drops.forEach((_, i) => createDrop(i));



/* Matriz de caracteres Katakana
const matrix = document.querySelector('.matrix');
const columns = Math.floor(window.innerWidth / 20);
const drops = Array(columns).fill(0);

function createDrop(i) {
    const drop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = `${i * 20}px`;
    drop.style.animationDelay = `${Math.random() * 5}s`;
    matrix.appendChild(drop);

    function draw() {
        drop.innerHTML = '';
        const dropLength = columns;
        for (let j = 0; j < dropLength; j++) {
            const text = String.fromCharCode(0x30A0 + Math.random() * 160);
            const span = document.createElement('span');
            span.innerHTML = `${text}<br>`;
            drop.appendChild(span);
        }
        drop.lastChild.className = 'bright';
    }

    function animate() {
        draw();
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}
drops.forEach((_, i) => createDrop(i));
*/