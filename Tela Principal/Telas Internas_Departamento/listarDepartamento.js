


const tableCont = document.querySelector(".table-senhas");
const tableBody = document.querySelector("#table-body");



//Geração automatica de tabela


function loadTable(departamento) {
    tableBody.innerHTML = '';

    departamento.forEach(departamentoB => {
        let tagTr = document.createElement("tr");

        let idTd = document.createElement("td");
        idTd.textContent = departamentoB.id;
        tagTr.appendChild(idTd);

        let nomeDepartTd = document.createElement("td");
        nomeDepartTd.textContent = departamentoB.nomeDepart;
        tagTr.appendChild(nomeDepartTd);


        let descricaoTd = document.createElement("td");
        descricaoTd.textContent = departamentoB.descricao;
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
            const departamentoId = departamentoB.id;
            // Redireciona para a página de edição passando o ID como parâmetro na URL
            window.location.href = `editarDepartamento.html?id=${departamentoId}`;
        });

       

        tableBody.appendChild(tagTr);
    });
}

//Função que carrega todos os departamentos
let departList = [];

function ListarTodosOsDepartamentos(){
    const token = localStorage.getItem('token');

    fetch("http://localhost:8080/departamento", {
        headers: {
            'Authorization': 'Bearer '+ token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET"
    })
    .then(res => {
        if(!res.ok){
            throw new Error(`Erro: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    })
    .then(function(departamentos){
        departList = departamentos;
        loadTable(departamentos);
    })
    .catch(function(error){
        console.log("Erro ao carregar os departamentos: ", error);
    })
}


//Pesquisas avançadas
//Por nome
const inputPNome = document.querySelector("#input-search-nome");

function pesquisarPorNome(){
    const termoPesquisado = inputPNome.value.trim().toLowerCase();

    const nomesFiltrados = departList.filter(departamentos =>
        departamentos.nomeDepart.toString().toLowerCase().startsWith(termoPesquisado)
    );

    tableBody.innerHTML = '';
    loadTable(nomesFiltrados);

}

//Fim da pesquisa por nome

//Pesquisa por id
const inputPId = document.querySelector("#input-search-id");

function pesquisarPorId(){
    const termoPesquisado = inputPId.value.trim().toLowerCase();

    const idFiltrados = departList.filter(departamentos => 
        departamentos.id.toString().toLowerCase().startsWith(termoPesquisado)
    );

    tableBody.innerHTML = '';
    loadTable(idFiltrados);

}


//Fim da pesquisa por id

//Eventos de clique no teclado
inputPNome.addEventListener("keyup", function(event){
    event.preventDefault();
    pesquisarPorNome();
})

inputPId.addEventListener("keyup", function(event){
    event.preventDefault();
    pesquisarPorId();
})




//Evento de abrir pagina

window.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    ListarTodosOsDepartamentos();
})





















