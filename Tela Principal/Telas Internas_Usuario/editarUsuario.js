//Recuperar o id da url

// Recuperar o ID da URL
const urlParams = new URLSearchParams(window.location.search);
const usuarioId = urlParams.get('id');



const btnCreate = document.querySelector("#btn-create");

/*Inputs*/
const inputName = document.querySelector("#input-nome");
const inputEmail = document.querySelector("#input-email");
const inputSenha = document.querySelector("#input-senha");

/*Containers dos inputs*/
const containerName = document.querySelector(".container-input-name");
const containerEmail = document.querySelector(".container-input-email");
const containerSenha = document.querySelector(".container-input-senha");


//Seleção de departamentos, Papeis e Status
//Departamento
let departamentoValor = ""

const departamentoSelecionado = document.querySelector("#depart-select");
departamentoValor = departamentoSelecionado.options[departamentoSelecionado.selectedIndex].text;

departamentoSelecionado.addEventListener('change', function() {
    const indiceCaixa = departamentoSelecionado.selectedIndex;
    departamentoValor = departamentoSelecionado.options[indiceCaixa].text;

});

//Papel
let papelValor = "";
const papelSelecionado = document.querySelector("#role-select");
papelValor = papelSelecionado.options[papelSelecionado.selectedIndex].text;

papelSelecionado.addEventListener('change', function(){
    const indiceCaixa = papelSelecionado.selectedIndex;
    papelValor = papelSelecionado.options[indiceCaixa].text;
})

//Status

let statusValor = "";
const statusSelecionado = document.querySelector("#UserStatus");
statusValor = statusSelecionado.options[statusSelecionado.selectedIndex].text;

statusSelecionado.addEventListener('change', function(){
    const indiceCaixa = statusSelecionado.selectedIndex;
    statusValor = statusSelecionado.options[indiceCaixa].text;
})


/*Spans gerados*/

let spanName;
let spanEmail;
let spanSenha;

//Conectando com o back-end 

//Função para conectar com o back-end, buscar o id

function procurarUsuarioPorId(){
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/usuario/${usuarioId}`, {
        headers: {
            'Authorization': 'Bearer '+ token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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
        inputName.value = data.nome,
        inputEmail.value = data.email,
        //Preciso pegar a senha e descriptografar
        inputSenha.value = data.senha,
        papelValor = data.role,
        departamentoValor = data.departamentoNome;
        statusValor = data.status
    })
    .catch(error => {
        console.log("Erro ao carregar os dados da senha: ", error);
    })
}


//Fim da função que busca por id


//Função para editar um usuario
function editarUsuario(){
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/usuario/update/${usuarioId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        method: "PUT",
        body: JSON.stringify({
            "nome": inputName.value,
            "email": inputEmail.value,
            "senha": inputSenha.value,
            "role": papelValor,
            "departamentoNome": departamentoValor,
            "status": statusValor
        })
    })
    .then(response => {
        if(!response.ok){
            if(response.status === 403){
                alert("Usuario não possui autorização para editar usuarios!");
            }else if(response.status === 404){
                alert("Erro no preenchimento dos campos!");
            }else{
                throw new Error("Erro ao tentar editar o usuario!");
            }
        }
        return response.json;
    })
    .catch(error => {
        console.log("Erro ao tentar cadastrar a senha: ", error);
    })
}





//Fim da função de editar um usuario


//Função para validar email

function validarEmail(email){
    let regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

btnCreate.addEventListener("click", function(event){
    event.preventDefault();

    let valueName = inputName.value;
    let valueEmail = inputEmail.value;
    let valueSenha = inputSenha.value;


    if(spanName){
        spanName.remove();
    }

    if(spanEmail){
        spanEmail.remove();
    }

    if(spanSenha){
        spanSenha.remove();
    }

    if(valueName.trim() === ""){
        spanName = document.createElement("span");
        spanName.innerHTML = "O nome não pode estar vaziu!"
        spanName.setAttribute("class","error");
        containerName.appendChild(spanName);
    }else if(valueEmail.trim() === "" || validarEmail(valueEmail) != true){
        spanEmail = document.createElement("span");
        spanEmail.innerHTML = "Email invalido!"
        spanEmail.setAttribute("class", "error");
        containerEmail.appendChild(spanEmail);
    }else if(valueSenha.trim() === ""){
        spanSenha = document.createElement("span");
        spanSenha.innerHTML = "A senha não pode ser vazia!";
        spanSenha.setAttribute("class", "error");
        containerSenha.appendChild(spanSenha);
    }else{
        //Conexão com o back-end aqui!
        editarUsuario();
        alert("Usuario editado com sucesso!")
        limparCampos();
    }

})

function limparCampos(){
        inputName.value = "";
        inputEmail.value = "";
        inputSenha.value = "";
}

// Remoção do span name ao digitar

containerName.addEventListener("input", function(){
    if(spanName){
        spanName.remove();
    }
})

containerEmail.addEventListener("input", function(){
    if(spanEmail){
        spanEmail.remove();
    }
})

containerSenha.addEventListener("input", function(){
    if(spanSenha){
        spanSenha.remove();
    }
})


//Fim da remoção de conteudo

//Evento ao carregamento do DOM

window.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    procurarUsuarioPorId();
})


