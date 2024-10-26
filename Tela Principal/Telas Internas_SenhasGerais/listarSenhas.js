const btnDeletar = document.querySelector(".btnDeleteAction");

//Variavel global para pegar o id da senha
let senhaIdParaDeletar = null;

const boxDialog = document.querySelector('#box-dialog');
const btnSim = document.querySelector("#btnSim");
const btnNao = document.querySelector("#btnNao");


const tableCont = document.querySelector(".table-senhas");

const tableBody = document.querySelector("#table-body");
//Geração automatica de tabela


function loadTable(senhas) {
    tableBody.innerHTML = '';
    senhas.forEach(senhaB => {
        let tagTr = document.createElement("tr");

        let idTd = document.createElement("td");
        idTd.textContent = senhaB.id;
        tagTr.appendChild(idTd);

        let origemTd = document.createElement("td");
        origemTd.textContent = senhaB.origem;
        tagTr.appendChild(origemTd);

        let loginTd = document.createElement("td");
        loginTd.textContent = senhaB.login;
        tagTr.appendChild(loginTd);

        let emailTd = document.createElement("td");
        emailTd.textContent = senhaB.email;
        tagTr.appendChild(emailTd);

        let senhaTd = document.createElement("td");
        senhaTd.textContent = senhaB.senha;
        tagTr.appendChild(senhaTd);

        let descricaoTd = document.createElement("td");
        descricaoTd.textContent = senhaB.descricao;
        tagTr.appendChild(descricaoTd);

        // Botão Editar
        let editTd = document.createElement("td");
        let buttonEdit = document.createElement("button");
        buttonEdit.textContent = "Editar";
        buttonEdit.classList.add("btn-edit");
        editTd.appendChild(buttonEdit);
        tagTr.appendChild(editTd);

        buttonEdit.addEventListener("click", function() {
            // Pegue o ID da senha da linha correspondente
            const senhaId = senhaB.id;
            // Redireciona para a página de edição passando o ID como parâmetro na URL
            window.location.href = `editarSenha.html?id=${senhaId}`;
        });

        // Botão Deletar
        let deleteTd = document.createElement("td");
        let buttonDelete = document.createElement("button");
        buttonDelete.textContent = "Deletar";
        buttonDelete.classList.add("btn-delete");
        // Adicionar o evento de clique para abrir o dialog
        buttonDelete.addEventListener("click", function() {
            senhaIdParaDeletar = senhaB.id;
            boxDialog.showModal(); // Mostrar o dialog de confirmação
        });

        deleteTd.appendChild(buttonDelete);
        tagTr.appendChild(deleteTd);

        tableBody.appendChild(tagTr);
    });
}
//Fim do metodo de geração automatica


//Inicio do metodo para listar todas as senhas 
//Conexões com o back-end
let senhasList = [];
function ListarTodasAsSenhas(){
    const token = localStorage.getItem('token'); // Obtém o token armazenado

    fetch("http://localhost:8080/senhas", {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Erro: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    })
    .then(function(senhas) {
        senhasList = senhas;
        loadTable(senhas);
    })
    .catch(function(error) {
        console.error("Erro ao carregar as senhas:", error);
    });
    
}

//Fim das conexões com o back-end

//Função para deletar uma senha 
function deletarSenhaPorId(id){
    const token = localStorage.getItem('token');
    
    fetch(`http://localhost:8080/senhas/${id}`,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        method: "DELETE"
    })
    .then(response => {
        if(!response.ok){
            if(response.status === 403){
                alert("Usuario não possui permissão para deletar a senha!");
            }else if(response.status === 404){
                alert("Erro do lado do cliente. Não foi possivel encontrar a senha");
            }else{
                throw new Error("Erro ao tentar deletar a senha")
            }
        }else{
            alert("Senha deletada com sucesso!");
            window.location.reload(); 
        }
    })
    .catch(error => {
        console.log("Erro ao tentar deletar a senha: ", error);
    })
}


//Fim da função que deleta uma senha!

//Pesquisas avançadas! Pesquiça avançada para origem de senha
const inputPOrigem = document.querySelector("#input-search-titulo");

function pesquisaAvancadaOrigem() {
    const termoPesquisa = inputPOrigem.value.trim().toLowerCase();

    // Filtra a lista de senhas com base nas iniciais da origem
    const senhasFiltradas = senhasList.filter(senha => 
        senha.origem.toLowerCase().startsWith(termoPesquisa)
    );

    // Limpa a tabela e carrega apenas as senhas filtradas
    tableBody.innerHTML = '';
    loadTable(senhasFiltradas);
}
//Fim da pesquisa avançada por origem

//Pesquisa avançada para id!

const inputPId = document.querySelector("#input-search-id");

function pesquisaAvancadaId(){
    const termoPesquisa = inputPId.value.trim();

    // Filtra a lista de senhas com base nas iniciais do ID
    const senhasFiltradas = senhasList.filter(senha => 
        senha.id.toString().startsWith(termoPesquisa)
    );

    // Limpa a tabela e carrega apenas as senhas filtradas
    tableBody.innerHTML = '';
    loadTable(senhasFiltradas);
}

//Fim da pesquisa avançada por id

//AO digitar irá carregar automaticamente a tabela
inputPOrigem.addEventListener("keyup", function(event){
    event.preventDefault();
    pesquisaAvancadaOrigem();
})

inputPId.addEventListener("keyup", function(event){
    event.preventDefault();
    pesquisaAvancadaId();
})


//Evento de abrir pagina

window.addEventListener("DOMContentLoaded", function(event) {
    event.preventDefault();
    ListarTodasAsSenhas();
});


//Fim do evento de abertura da página

btnSim.addEventListener("click", function(){
    if(senhaIdParaDeletar){
        deletarSenhaPorId(senhaIdParaDeletar);
        boxDialog.close();
    }
})

btnNao.addEventListener("click", function(){
    boxDialog.close();
})

