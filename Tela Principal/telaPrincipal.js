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

// Event listener do usuário
let user = document.querySelector("#user");
user.addEventListener("click", function(event){
    event.preventDefault();
    console.log("teste");
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
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('main-content').innerHTML = `<p>Desculpe, ocorreu um erro ao carregar o conteúdo.</p>`;
        });
}

// Adiciona event listeners aos links com data-url
document.querySelectorAll('a[data-url]').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault(); 
        const url = this.getAttribute('data-url');
        loadContent(url);  // Carrega o conteúdo na área principal
    });
});
