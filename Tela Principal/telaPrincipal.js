document.addEventListener("DOMContentLoaded", function() {

    // Controle da Sidebar
    document.getElementById('open_btn').addEventListener('click', function(){
        document.getElementById('sidebar').classList.toggle('open-sidebar');
    });

    // Controle dos Dropdowns
    let dropdownBtns = document.querySelectorAll('.dropdown-btn');
    dropdownBtns.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            let dropdown = this.parentElement;  // Seleciona o item pai do botão (o <li>)
            dropdown.classList.toggle('open');  // Alterna a classe 'open' no item pai
        });
    });

    // Função para carregar imagem de um usuario
    document.getElementById('user_avatar').addEventListener('click', function(){
        document.querySelector('.file-input').click();
    })

    document.querySelector('.file-input').addEventListener('change',function(event){
        const file = event.target.files[0]; // Obtem o arquivo selecionado

        // Se o arquivo existir
        if(file){
            const reader = new FileReader(); // Cria objeto do tipo FileReader para ler o arquivo
            // Quando conclui a leitura, o src da imagem é alterado para a url da imagem
            reader.onload = function(e){
                document.getElementById('user_avatar').src = e.target.result;
            };
            reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
        }

    });

    // Função para carregar conteúdo na área principal
    function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar a página: ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('main-content').innerHTML = data;
                // Reaplicar os event listeners após o carregamento de nova página
                applyLinkListeners();
            })
            .catch(error => {
                console.error('Erro:', error);
                document.getElementById('main-content').innerHTML = `<p>Desculpe, ocorreu um erro ao carregar o conteúdo.</p>`;
            });
    }

    // Função para adicionar event listeners aos links com data-url
    function applyLinkListeners() {
        document.querySelectorAll('a[data-url]').forEach(function(link) {
            link.addEventListener('click', function(event) {
                event.preventDefault(); 
                const url = this.getAttribute('data-url');
                loadContent(url);  // Carrega o conteúdo na área principal
            });
        });

        // Adiciona o event listener para o botão "Abrir Chamado"
        const titulo = document.querySelector("#titulo-input");
        const btnAbrir = document.querySelector("#btn-abrir");
        if (btnAbrir) {
            btnAbrir.addEventListener("click", function(){
                console.log(titulo.value);  // Agora imprime o valor inserido no input
                alert("Chamado aberto com o título: " + titulo.value);
            });
        }
    }

    // Aplicar event listeners inicialmente
    applyLinkListeners();
});
