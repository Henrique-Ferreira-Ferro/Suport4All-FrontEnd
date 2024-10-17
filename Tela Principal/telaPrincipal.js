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

    // Função para carregar conteúdo na área principal
    function loadContent(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar a página: ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('main-content').innerHTML = data;
                applyLinkListeners(); // Reaplica os event listeners após o carregamento de nova página
            })
            .catch(error => {
                console.error('Erro:', error);
                document.getElementById('main-content').innerHTML = `<p>Desculpe, ocorreu um erro ao carregar o conteúdo.</p>`;
            });
    }

    // Função para adicionar event listeners aos links com data-url
    function applyLinkListeners() {
        document.querySelectorAll('a[data-url]').forEach(function (link) {
            link.removeEventListener('click', handleLinkClick); // Remove event listener anterior
            link.addEventListener('click', handleLinkClick); // Adiciona novo event listener
        });

        function handleLinkClick(event) {
            event.preventDefault();
            const url = this.getAttribute('data-url');
            loadContent(url).then(() => {
                // Se o conteúdo carregado for o de 'criarChamado.html', chama a função de eventos de chamado
                if (url.includes("criarChamado.html")) {
                    initializeFormValidation(); // Inicializa a validação do formulário
                    initializeChamadoEvents();  // Chama as funções específicas de criar chamado
                }
            });
        }
    }

    applyLinkListeners();

    // Recarrega a página automaticamente após 5 minutos (300000 milissegundos)
    setTimeout(() => {
        location.reload(); // Recarrega a página automaticamente
    }, 300000); // 5 minutos = 300000 milissegundos

    // ===========================================
    // === Funções voltadas para chamado (chamado.js) ===
    // ===========================================

    function initializeChamadoEvents() {
        const titulo = document.querySelector("#titulo-input");
        const btnAbrir = document.querySelector("#btn-abrir");
        const containerTituloInsert = document.querySelector(".container-div-input-titulo");
        let errorSpan;

        if (btnAbrir) {
            btnAbrir.addEventListener("click", function () {
                if (errorSpan) {
                    errorSpan.remove();
                }

                let tituloValue = titulo.value;
                if (tituloValue.trim() === "") {
                    errorSpan = document.createElement("span");
                    errorSpan.innerHTML = "Não deixe o título vazio!";
                    containerTituloInsert.appendChild(errorSpan);
                    errorSpan.setAttribute("class", "error");
                }
            });
        }
    }

    // Função para inicializar a validação do formulário
    function initializeFormValidation() {
        const titulo = document.querySelector("#titulo-input");
        let errorSpan;

        if (titulo) {
            titulo.addEventListener("input", function () {
                if (errorSpan) {
                    errorSpan.remove();
                    errorSpan = null; // Limpa a referência ao elemento de erro
                }
            });
        }
    }

    // ===========================================
    // === Fim das funções de chamado (chamado.js) ===
    // ===========================================

});
