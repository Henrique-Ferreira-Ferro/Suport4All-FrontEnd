const btnCreate = document.querySelector("#btn-create");

/*Inputs*/
const inputName = document.querySelector("#input-nome");
const inputEmail = document.querySelector("#input-email");
const inputSenha = document.querySelector("#input-senha");

/*Containers dos inputs*/
const containerName = document.querySelector(".container-input-name");
const containerEmail = document.querySelector(".container-input-email");
const containerSenha = document.querySelector(".container-input-senha");

/*Spans gerados*/

let spanName;
let spanEmail;
let spanSenha;

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
    }

})


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




