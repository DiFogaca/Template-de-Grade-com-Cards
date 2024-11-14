document.addEventListener('DOMContentLoaded', (event) => { 
    console.log('DOM carregado');
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => { 
        if (!input.placeholder) { 
            input.placeholder = ' '; 
        } 
    });
    const submitButton = document.querySelector('button');

    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        console.log('Botão clicado');
        const inputs = document.querySelectorAll('input[required]');
        let allFilled = true;
        
        inputs.forEach(input => {
            if (!input.value) {
                allFilled = false;
                console.log(`Campo vazio: ${input.id}`);
            }
        });

        const container = document.querySelector('form');
        container.classList.remove('shake'); // Remove a classe antes de adicionar de novo
        void container.offsetWidth; // Trigger reflow para reiniciar a animação
        container.classList.add('shake');
        
        if (!allFilled) {
            console.log('Campos obrigatórios não preenchidos');
            setTimeout(() => container.classList.remove('shake'), 500); // Remove a classe após a animação terminar
            return; // Impede a submissão do formulário
        }

        console.log('Login bem-sucedido');
        // Se necessário, você pode submeter o formulário aqui manualmente.
        // loginForm.submit();
    });
});



//document.addEventListener('DOMContentLoaded', (_event) => {
    console.log('DOM carregado');
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (!input.placeholder) {
            input.placeholder = ' ';
        }
    });

    document.querySelector("button").addEventListener("click", event => {
        event.preventDefault()
        document.querySelector(".container").classList.add("shake")
    });
//});