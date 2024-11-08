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

    let file = '';

    // Função para carregar imagem de um usuário
    document.getElementById('user_avatar').addEventListener('click', function () {
        document.querySelector('.file-input').click();
    });

    document.querySelector('.file-input').addEventListener('change', function (event) {
        file = event.target.files[0]; // Obtém o arquivo selecionado

        const maxSize = 1048576;
        if(file && file.size > maxSize){
            alert("A imagem selecionada é muito grande! Por favor, escolha uma imagem com menos de 1MB. ")
            return;
        }

        // Se o arquivo existir
        if (file) {
            const reader = new FileReader(); // Cria objeto do tipo FileReader para ler o arquivo
            reader.onload = function (e) {
                document.getElementById('user_avatar').src = e.target.result; // Altera o src da imagem
            };
            reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
        
            enviarImagem();
        }
    });

    // Envio da imagem para o back-end - Conexão com o back-end
    
    function enviarImagem(){
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append("anexo", file);

        fetch(`http://localhost:8080/usuario/upload/${idUserByToken}`, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer '+ token,
            },
            body: formData
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Falha ao enviar a imagem!");
            }
            return response.json();
        })
        .then(data => {
            alert("Imagem enviada com sucesso! ", data);
        })
        .catch(error => {
            console.log("Erro ao enviar a imagem: ", error);
        });
    }
    //Fim do envio da imagem e da conexão com o back-end

    //Recuperando a imagem do usuario a partir do back-end
    function recuperarImagem(){
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/usuario/find/photo/${idUserByToken}`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer '+ token,
            }
        })
        .then(response => {
            if(!response.ok){
                if(response.status === 403){
                    document.getElementById('user_avatar').src = "/Tela Principal/resources_principal/User-Profile-PNG.png"
                }else{
                    throw new Error("Erro ao carregar imagem !");
                }
            }
           return response.blob();
        })
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            document.getElementById('user_avatar').src = imageUrl;
        })
        .catch(error => {
            console.log("Erro ao carregar a imagem do usuario: ", error);
        });
    }




    //Fim da recuperação da imagem do usuario a partir do back-end



    //Carregamento dinamico da contagem dos chamados
    //Recuperar os ids das tag p

    const aberto = document.querySelector("#p-aberto");
    const andamento = document.querySelector("#p-andamento");
    const fechado = document.querySelector("#p-fechado");

    //Carregar chamados abertos - Conectando ao back-end 

    function carregarStatusAberto(){
        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/chamado/status/aberto", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            },
            method: "GET"
        })
        .then(res => {
            if(!res.ok){
                throw new Error(`Erro: ${res.status} - ${res.statusText}`)
            }
            return res.json();
        })
        .then(data => {
            aberto.innerHTML = data;
        })
        .catch(error => {
            console.log("Erro ao carregar o status aberto dinamicamente! ", error);
        })
    }
    //Fim do carregar chamados abertos

    //Inicio carregamento do status Em andamento
    function carregarStatusAndamento(){
        const token = localStorage.getItem("token");
        
        fetch("http://localhost:8080/chamado/status/andamento", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            },
            method: "GET"
        })
        .then(res => {
            if(!res.ok){
                throw new Error(`Erro: ${res.status} - ${res.statusText}`)
            }
            return res.json();
        })
        .then(data => {
            andamento.innerHTML = data;
        })
        .catch(error => {
            console.log("Erro ao carregar o status andamento dinamicamente!", error);
        })
    }
    //Fim do carregamento do status Em andamento

    //Inicio carregamento do status Fechado
    function carregarStatusFechado(){
        const token = localStorage.getItem("token");
        fetch("http://localhost:8080/chamado/status/fechado", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            },
            method: "GET"
        })
        .then(res => {
            if(!res.ok){
                throw new Error(`Erro: ${res.status} - ${res.statusText}`)
            }
            return res.json();
        })
        .then(data => {
            fechado.innerHTML = data;
        })
        .catch(error => {
            console.log("Erro ao carregar o status fechado dinamicamente! ", error);
        })
    }

    //Fim do carregamento do status fechado

    window.addEventListener("DOMContentLoaded", function(){
        carregarStatusAberto();
        carregarStatusAndamento();
        carregarStatusFechado();
        recuperarImagem();
    })

    //Levando o usuario para listagem de chamados ao clicar em um do botões
    let boardAberto = document.querySelector("#board-aberto");

    boardAberto.addEventListener("click", function(event){
        event.preventDefault();
        window.location.href="/Tela Principal/Telas Internas_Chamado/AcompanharChamado.html";
    })

    let boardAndamento = document.querySelector("#board-andamento");

    boardAndamento.addEventListener("click", function(event){
        event.preventDefault();
        window.location.href="/Tela Principal/Telas Internas_Chamado/AcompanharChamado.html";

    })

    let boardFechado = document.querySelector("#board-fechamento");
    boardFechado.addEventListener("click", function(event){
        event.preventDefault();
        window.location.href="/Tela Principal/Telas Internas_Chamado/AcompanharChamado.html";

    })

    //Fim do redirecionamento

    //Fim do carregamento dinâmico da contagem dos chamados


    //Controle do logout
    let btnSair = document.querySelector("#logout");
    btnSair.addEventListener("click", function(event){
        event.preventDefault();
        window.location.href="/Sign in Sign Up/login.html";
        window.localStorage.clear();
    })



});
