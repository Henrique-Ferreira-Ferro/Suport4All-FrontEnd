
const tableBody = document.querySelector("#table-body");

let tagTr = "";
const token = localStorage.getItem('token');

//Recupera id do usuario
let idUserByToken = '';
    function recuperaId(token){
        try{
            const decodedToken = jwt_decode(token)
            idUserByToken = decodedToken.id || [];
        }catch(error){
            console.log("Erro ao tentar recuperar id do token: ", error);
        }
    }


function loadTable(chamados) {
    tableBody.innerHTML = '';

    chamados.forEach(chamadosB => {
        tagTr = document.createElement("tr");

        let idTd = document.createElement("td");
        idTd.textContent = chamadosB.id;
        tagTr.appendChild(idTd);

        let tituloTd = document.createElement("td");
        tituloTd.textContent = chamadosB.titulo;
        tagTr.appendChild(tituloTd);

        let dateTd = document.createElement("td");
        dateTd.textContent = chamadosB.date;
        tagTr.appendChild(dateTd);

        let statusTd = document.createElement("td");
        statusTd.textContent = chamadosB.status;
        tagTr.appendChild(statusTd);

        let descricaoTd = document.createElement("td");
        descricaoTd.textContent = chamadosB.descricao;
        tagTr.appendChild(descricaoTd);

        let extremidadeTd = document.createElement("td");
        extremidadeTd.textContent = chamadosB.extremidade;
        tagTr.appendChild(extremidadeTd);

        let anexoTd = document.createElement("td");
        if(chamadosB.anexo != null){
            anexoTd.textContent = "Arquivo presente"
        }else{
            anexoTd.textContent = chamadosB.anexo;
        }
        tagTr.appendChild(anexoTd);

        let usuarioIdTd = document.createElement("td");
        usuarioIdTd.textContent = chamadosB.usuarioId;
        tagTr.appendChild(usuarioIdTd);

       


        tableBody.appendChild(tagTr);
    });
}
//Fim do metodo de geração automatica


//Inicio da conexão com o back-end -- Listando todos usuarios

let chamadosList = [];
function listarTodosChamados(){

    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/chamado/user/list/${idUserByToken}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        method: "GET"
    })
    .then(res => {
        if(!res.ok){
            throw new Error(`Erro: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    })
    .then(function(chamados){
        chamadosList = chamados;
        loadTable(chamados);
    })
    .catch(function(error){
        console.log("Erro ao carregar os chamados: ", error);
    })

}

//Pesquisas avançadas
//Titulo
const inputPTitulo = document.querySelector("#input-search-titulo");

function pesquisaAvancadaTitulo(){
    const termoPesquisa = inputPTitulo.value.trim().toLowerCase();

    //Filtrar a lista de chamados 
    const chamadosFiltrados = chamadosList.filter(chamado => 
        chamado.titulo.toLowerCase().startsWith(termoPesquisa)
    );
    tableBody.innerHTML = '';
    loadTable(chamadosFiltrados);

}
//Fim da pesquisa avançada com base no titulo
//Id
const inputPId = document.querySelector("#input-search-id");
function pesquisaAvancadaId(){
    const termoPesquisa = inputPId.value.trim();

    //Filtrar a lista de chamados
    const chamadosFiltrados = chamadosList.filter(chamado => 
        chamado.id.toString().startsWith(termoPesquisa)
    );
    tableBody.innerHTML = '';
    loadTable(chamadosFiltrados);
}
//Fim da pesquisa avançada com base no id

//Pesquisa baseada em data

const inputPDate = document.querySelector("#input-search-date");

function pesquisaAvancadaData(){
    let dataPartes = inputPDate.value.split('-');
    let dataFormatada = dataPartes[2] + '/' + dataPartes[1] + "/"+ dataPartes[0];

    const termoPesquisa = dataFormatada;

    //Filtrar a lista
    const chamadosFiltrados = chamadosList.filter(chamado => 
        chamado.date.toString().includes(termoPesquisa)
    );
    tableBody.innerHTML = '';
    loadTable(chamadosFiltrados);
}

//Fim da pesquisa baseada em data

//Pesquisa baseada em status
let statusValor = '';
const statusSelecionado = document.querySelector("#selectStatus");
function pesquisaAvancadaStatus(){

    statusValor = statusSelecionado.options[statusSelecionado.selectedIndex].text;    

    const chamadosFiltrados = chamadosList.filter(chamado => 
        chamado.status === statusValor
    );
        
    tableBody.innerHTML = '';
    loadTable(chamadosFiltrados);
}



//Fim da pesquisa baseada em data


//Digitamento e carregamento automatico de tabela
inputPTitulo.addEventListener("keyup", function(event){
    event.preventDefault();
    pesquisaAvancadaTitulo();
})

inputPId.addEventListener("keyup", function(event){
    event.preventDefault();
    pesquisaAvancadaId();
})
inputPDate.addEventListener("change", function(event){
    event.preventDefault();
    pesquisaAvancadaData();
})
statusSelecionado.addEventListener("change", function(event){
    event.preventDefault();
    pesquisaAvancadaStatus();
})


//Carregamento do DOM 

window.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    recuperaId(token);
    console.log(idUserByToken);
    listarTodosChamados();
})



 //Controle do logout
 let btnSair = document.querySelector("#logout");
 btnSair.addEventListener("click", function(event){
     event.preventDefault();
     window.location.href="/Sign in Sign Up/login.html";
     window.localStorage.clear();
 })





