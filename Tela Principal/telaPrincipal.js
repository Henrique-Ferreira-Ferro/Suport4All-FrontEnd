document.addEventListener("DOMContentLoaded", function () {
    // ===========================================
    // === Controle da interface principal (telaPrincipal.js) ===
    // ===========================================


    //Função para validar se o usuario está ativo

    function verificarUsuarioAtivo(token) {
        try {
            const decodedToken = jwt_decode(token);
            const statusArray = decodedToken.status || []; 
            const status = statusArray[0] || ""; // Pega o primeiro valor da lista, se existir
            return status === "ATIVO";
        } catch (error) {
            console.log("Erro na verificação do usuário: " + error);
            return false;
        }
    }
    

    // Função para verificar o papel do usuário

    function verificarRole(token){
        try{
            const decodedToken = jwt_decode(token);
            const roles = decodedToken.roles || [];
            return roles.includes('ADMIN');
        }catch(error){
            return false;
        }
    }

    const token = localStorage.getItem('token');

    if(!token || !verificarRole(token)){
        alert("Você não tem permissão para acessar esta página.");
        window.location.href = "/Sign in Sign Up/login.html";
        return;
    }

    if (!verificarUsuarioAtivo(token)) {
        alert("Seu usuário foi desativado e não pode mais acessar o sistema!");
        window.location.href = "/Sign in Sign Up/login.html";
        return;
    }
    //Fim das validações de papel do usuario!

    //Função para carregar nome e departamento do usuario ao logar na aplicação
    let idUserByToken = '';
    function recuperaId(token){
        try{
            const decodedToken = jwt_decode(token)
            idUserByToken = decodedToken.id || [];
        }catch(error){
            console.log("Erro ao tentar recuperar id do token: ", error);
        }
    }

    const spanLabelNome = document.querySelector("#span-user-label");
    const spanLabelDepartamento = document.querySelector("#span-depart-label");

    function carregarNomeAndDepartamento(id){
        const token = localStorage.getItem("token");
        fetch(`http://localhost:8080/usuario/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            },
            method: 'GET'
        })
        .then(res => {
            if(!res.ok){
                throw new Error(`Erro: ${res.status} - ${res.statusText}`);
            }
            return res.json();
        })
        .then(function(usuario){
            spanLabelNome.textContent = usuario.nome,
            spanLabelDepartamento.textContent = usuario.departamentoNome
        })
        .catch(function(error){
            console.log("Erro ao carregar as informações do usuario: ", error)
        })
    }

    //Função para recuperar o id e carregar o nome e o depart
    recuperaId(token);
    if(idUserByToken){
        carregarNomeAndDepartamento(idUserByToken);
    }

    //Fim da função que carrega nome e departamento 


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
        window.localStorage.clear();
    })



});
