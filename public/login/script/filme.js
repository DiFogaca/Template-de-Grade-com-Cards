// filme.js

// Configuração da cena do Three.js
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('login-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Criação de um material que exibe a div de login na face frontal do cubo
let loginFaceDiv = document.querySelector('.login-face.front');
let loginFaceTexture = new THREE.CanvasTexture(document.createElement('canvas'));
loginFaceTexture.image.width = loginFaceDiv.offsetWidth;
loginFaceTexture.image.height = loginFaceDiv.offsetHeight;
loginFaceTexture.needsUpdate = true;

// Desenhando a div de login na textura do cubo
let loginFaceContext = loginFaceTexture.image.getContext('2d');
loginFaceContext.drawImage(loginFaceDiv, 0, 0);

// Configuração do material do cubo com a textura da face de login
let loginFaceMaterial = new THREE.MeshBasicMaterial({ map: loginFaceTexture });
let materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Esquerda
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Direita
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Cima
    new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Baixo
    loginFaceMaterial, // Frente
    new THREE.MeshBasicMaterial({ color: 0xff00ff }) // Trás
];

let geometry = new THREE.BoxGeometry();
let cube = new THREE.Mesh(geometry, materials);
scene.add(cube);
camera.position.z = 5;

// Variáveis para controle de rotação
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Funções de eventos do mouse
document.addEventListener('mousedown', function(e) {
    isDragging = true;
});

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        let deltaMove = { x: e.movementX, y: e.movementY };
        cube.rotation.y += deltaMove.x * 0.01;
        cube.rotation.x += deltaMove.y * 0.01;
    }
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener('mouseup', function(e) {
    isDragging = false;
});

// Manter o input ativo para digitação
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
