// Matriz de caracteres
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
        const dropLength = Math.floor(window.innerHeight / 20);
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