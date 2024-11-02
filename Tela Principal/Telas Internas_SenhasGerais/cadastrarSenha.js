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
const containerEmail = document.querySelector(".container-input-email");

//Caixa de dialogo:

const dialog = document.getElementById('box-dialog');
const btnFechar = document.getElementById('btn-fechar');
const checkIcon = document.getElementById('checkIcon');

btnFechar.addEventListener("click", function(){
    dialog.close();
})


//Fim da caixa de dialogo

/*Spans gerados*/

let spanOrigem;
let spanSenha;
let spanEmail;

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

//Função para validar email

function validarEmail(email){
    let regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

btnCreate.addEventListener("click", function(event){
    valueOrigem = inputOrigem.value;
    valueSenha =  inputSenha.value;
    valueEmail = inputEmail.value;
    if(spanSenha){
        spanSenha.remove();
    }

    if(spanOrigem){
        spanOrigem.remove();
    }

    if(spanEmail){
        spanEmail.remove();
    }

    if(valueOrigem.trim() === ""){
        spanOrigem = document.createElement("span");
        spanOrigem.innerHTML = "A Origem não pode ser vazia!";
        spanOrigem.setAttribute("class", "error");
        containerOrigem.appendChild(spanOrigem);
    }else if(validarEmail(valueEmail) != true){
        spanEmail = document.createElement("span");
        spanEmail.innerHTML = "E-mail fora do padrão!"
        spanEmail.setAttribute("class", "error");
        containerEmail.appendChild(spanEmail);
    }else if(valueSenha.trim() === ""){
        spanSenha = document.createElement("span");
        spanSenha.innerHTML = "A senha não pode estar vazia";
        spanSenha.setAttribute("class", "error");
        containerSenha.appendChild(spanSenha);
    }else{

        cadastrarSenha();
        dialog.showModal();
        checkIcon.classList.add('animate-check');
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

containerEmail.addEventListener("input", function(){
    if(spanEmail){
        spanEmail.remove();
    }
})



 //Controle do logout
 let btnSair = document.querySelector("#logout");
 btnSair.addEventListener("click", function(event){
     event.preventDefault();
     window.location.href="/Sign in Sign Up/login.html";
     window.localStorage.clear();
 })


