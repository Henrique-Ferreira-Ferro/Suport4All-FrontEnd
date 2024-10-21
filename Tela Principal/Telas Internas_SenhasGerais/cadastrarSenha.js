//Botões
const btnCreate = document.querySelector("#btn-create");


/*Inputs*/
const inputOrigem = document.querySelector("#input-origem");
const inputLogin = document.querySelector("#input-login");
const inputEmail = document.querySelector("#input-email");
const txtDescricao = document.querySelector("#txtDescricao");
const inputSenha = document.querySelector("#input-senha");



/*Containers dos inputs*/
const containerOrigem = document.querySelector(".container-input-origem");
const containerSenha = document.querySelector(".container-input-senha");


/*Spans gerados*/

let spanOrigem;
let spanSenha;

// Conectando ao back-end da aplicação
function cadastrarSenha(){
    const token = localStorage.getItem('token');

    fetch("http://localhost:8080/senhas/create", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: "POST",
        body: JSON.stringify({
            "origem": inputOrigem.value,
            "login": inputLogin.value,
            "email": inputEmail.value,
            "senha": inputSenha.value,
            "descricao": txtDescricao.value
        })
    })
    .then(response => {
        if(!response.ok){
            if(response.status === 403){
                alert("Usuario não possui autorização para criação de senha!");
            }else if(response.status === 404){
                alert("Falha no preenchimento dos campos!");
            }else{
                throw new Error("Erro ao tentar cadastrar senha!");
            }
        }
        return response.json;
    })
    .catch(error => {
        console.log("Erro ao tentar cadastrar a senha: ", error);
    })
}


//Fim da conexão com o back-end da aplicação!

btnCreate.addEventListener("click", function(event){
    valueOrigem = inputOrigem.value;
    valueSenha =  inputSenha.value;

    if(spanSenha){
        spanSenha.remove();
    }

    if(spanOrigem){
        spanOrigem.remove();
    }

    if(valueOrigem.trim() === ""){
        spanOrigem = document.createElement("span");
        spanOrigem.innerHTML = "A Origem não pode ser vazia!";
        spanOrigem.setAttribute("class", "error");
        containerOrigem.appendChild(spanOrigem);
    }else if(valueSenha.trim() === ""){
        spanSenha = document.createElement("span");
        spanSenha.innerHTML = "A senha não pode estar vazia";
        spanSenha.setAttribute("class", "error");
        containerSenha.appendChild(spanSenha);
    }else{

        cadastrarSenha();

        limparCampos();
    }

})


function limparCampos(){
    inputOrigem.value = "";
    inputLogin.value = "";
    inputEmail.value = "";
    txtDescricao.value =  "";
    inputSenha.value = "";
}

containerOrigem.addEventListener("input", function(){
    if(spanOrigem){
        spanOrigem.remove();
    }
})

containerSenha.addEventListener("input", function(){
    if(spanSenha){
        spanSenha.remove();
    }
})



