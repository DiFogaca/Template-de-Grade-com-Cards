document.addEventListener('DOMContentLoaded', function() {
    const newCompanyForm = document.getElementById('newCompanyForm');
    const mensagemAdd = document.getElementById('mensagemAdd');
    const mensagemEdit = document.getElementById('mensagemEdit');
    const confirmAddButton = document.querySelector('.confirm-add');
    const confirmEditButton = document.querySelector('.confirm-edit');

    // Adiciona evento de submissão ao botão "Confirmar Adição"
    confirmAddButton.addEventListener('click', event => {
        event.preventDefault();
        if (newCompanyForm.checkValidity()) {
            const companyName = document.getElementById('companyName').value;
            const carCount = document.getElementById('carCount').value;
            const empresas = JSON.parse(localStorage.getItem('empresas')) || [];
            
            // Adiciona nova empresa
            empresas.push({ nome: companyName, carros: carCount });

            localStorage.setItem('empresas', JSON.stringify(empresas));
            closeModal(newCompanyModal);
            loadEmpresas();
            // Exibe a mensagem na tela com efeito de fade-in
            mensagemAdd.textContent = 'Nova empresa adicionada';
            mensagemAdd.style.display = 'block';
            mensagemAdd.style.opacity = 0;
            setTimeout(() => {
                mensagemAdd.style.transition = 'opacity 0.5s';
                mensagemAdd.style.opacity = 1;
            }, 10);

            // Remove a mensagem após 5 segundos
            setTimeout(() => {
                mensagemAdd.style.transition = 'opacity 0.5s';
                mensagemAdd.style.opacity = 0;
                setTimeout(() => {
                    mensagemAdd.style.display = 'none';
                }, 500);
            }, 5000);
            console.log('Nova empresa adicionada');
        } else {
            newCompanyForm.reportValidity();
        }
    });

    // Adiciona evento de submissão ao botão "Confirmar Edição"
    confirmEditButton.addEventListener('click', event => {
        event.preventDefault();
        if (newCompanyForm.checkValidity()) {
            const companyName = document.getElementById('companyName').value;
            const carCount = document.getElementById('carCount').value;
            const empresas = JSON.parse(localStorage.getItem('empresas')) || [];
            const index = newCompanyForm.getAttribute('data-index');

            if (index !== null) {
                // Edita empresa existente
                empresas[index] = { nome: companyName, carros: carCount };
            }

            localStorage.setItem('empresas', JSON.stringify(empresas));
            closeModal(newCompanyModal);
            loadEmpresas();

            // Exibe a mensagem na tela com efeito de fade-in
            mensagemEdit.textContent = 'Cadastro editado com sucesso!';
            mensagemEdit.style.display = 'block';
            mensagemEdit.style.opacity = 0;
            setTimeout(() => {
                mensagemEdit.style.transition = 'opacity 0.5s';
                mensagemEdit.style.opacity = 1;
            }, 10);

            // Remove a mensagem após 5 segundos
            setTimeout(() => {
                mensagemEdit.style.transition = 'opacity 0.5s';
                mensagemEdit.style.opacity = 0;
                setTimeout(() => {
                    mensagemEdit.style.display = 'none';
                }, 500);
            }, 5000);
            console.log('Cadastro editado com sucesso!');
        } else {
            newCompanyForm.reportValidity();
        }
    });
});
