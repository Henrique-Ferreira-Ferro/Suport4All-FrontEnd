document.addEventListener("DOMContentLoaded", function () {
    // ===========================================
    // === Controle da interface principal (telaPrincipal.js) ===
    // ===========================================

    // Controle da Sidebar
    document.getElementById('open_btn').addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('open-sidebar');
    });

    // Controle dos Dropdowns
    let dropdownBtns = document.querySelectorAll('.dropdown-btn');
    dropdownBtns.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            let dropdown = this.parentElement;  // Seleciona o item pai do botão (o <li>)
            dropdown.classList.toggle('open');  // Alterna a classe 'open' no item pai
        });
    });

    // Função para carregar imagem de um usuário
    document.getElementById('user_avatar').addEventListener('click', function () {
        document.querySelector('.file-input').click();
    });

    document.querySelector('.file-input').addEventListener('change', function (event) {
        const file = event.target.files[0]; // Obtém o arquivo selecionado

        // Se o arquivo existir
        if (file) {
            const reader = new FileReader(); // Cria objeto do tipo FileReader para ler o arquivo
            reader.onload = function (e) {
                document.getElementById('user_avatar').src = e.target.result; // Altera o src da imagem
            };
            reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
        }
    });

    //Controle do logout
    let btnSair = document.querySelector("#logout");
    btnSair.addEventListener("click", function(event){
        event.preventDefault();
        window.location.href="/Sign in Sign Up/login.html";
        window.localStorage.clear
    })



});
