//Btn para editar um chamado
const btnEditar = document.querySelector("#btn-editar");

//Recuperar id da url - Id do chamado
const urlParams = new URLSearchParams(window.location.search);
const chamadoId = urlParams.get('id');

//Recuperar o id do usuario
let userId = "";

//btn para baixar arquivo
const btnDownload = document.querySelector("#btn-download");


//Inputs
const titulo = document.querySelector("#inputTitulo");

let statusValor = "";
const statusSelecionado = document.querySelector("#select-status");
statusValor = statusSelecionado.options[statusSelecionado.selectedIndex].text;

statusSelecionado.addEventListener('change', function(){
    const indiceCaixa = statusSelecionado.selectedIndex;
    statusValor = statusSelecionado.options[indiceCaixa].text;
})

const descricao = document.querySelector("#txtDescricao");


//Caixa de dialogo:
const dialog = document.getElementById('box-dialog');
const btnFechar = document.getElementById('btn-fechar');
const checkIcon = document.getElementById('checkIcon');

btnFechar.addEventListener("click", function(){
    dialog.close();
})

//Fim da caixa de dialogo

//Conexão com o back-end - Busca de um chamado pelo seu id
function procurarChamadoPorId(){
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/chamado/${chamadoId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        method: "GET"
    })
    .then(res => {
        if(!res.ok){
            throw new Error(`Erro: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    })
    .then(data => {
        titulo.value = data.titulo;

        for(let i = 0; i < statusSelecionado.options.length; i++){
            if(statusSelecionado.options[i].text === data.status){
                statusSelecionado.selectedIndex = i;
                statusValor = statusSelecionado.options[i].text;
                break;
            }
        }
        userId = data.usuarioId;
        descricao.value = data.descricao;
    })
    .catch(error => {
        console.log("Erro ao carregar os dados do chamado: ", error);
    })
}

//Fim da busca por id

//Metodo para editar um chamado
function editarChamado(){
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/chamado/update/${userId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        method: "PUT",
        body: JSON.stringify({
            "id": chamadoId,
            "status": statusValor
        })
    })
    .then(response => {
        if(!response.ok){
            if(response.status === 403){
                alert("Erro! O chamado não pode ser editado se já estiver fechado !");
            }else if(response.status === 404){
                alert("Erro no preenchimento de algum campo!");
            }else{
                throw new Error("Erro ao tentar editar o chamado!");
            }
        }
        return response.json;
    })
    .catch(error => {
        console.log("Erro ao tentar editar o chamado ", error);
    })

}


//Comunicação com o back-end: Recuperando arquivo enviado

function baixarArquivo(){
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/chamado/download/${chamadoId}`, {
        headers: {
            'Authorization': 'Bearer '+ token,
        },
        method: "GET",
    })
    .then(response => {
        if(!response.ok){
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "anexo_chamado_" + chamadoId;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.log("Erro ao tentar baixar o arquivo ", error);
    });
}



btnDownload.addEventListener("click", function(event){
    event.preventDefault();
    baixarArquivo();
    

})



//Fim da recuperação e download de arquivo enviado



//Evento Quando o botão de editar for clicado
btnEditar.addEventListener("click", function(event){
    event.preventDefault();
    editarChamado();
    dialog.showModal();
    console.log(userId);
    console.log(statusValor);
    checkIcon.classList.add('animate-check');
    limparCampos();
})


function limparCampos(){
    titulo.value = "";
    descricao.value = "";
}



//Evento do dom ao carregar a página
window.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    procurarChamadoPorId();
})



 //Controle do logout
 let btnSair = document.querySelector("#logout");
 btnSair.addEventListener("click", function(event){
     event.preventDefault();
     window.location.href="/Sign in Sign Up/login.html";
     window.localStorage.clear();
 })





