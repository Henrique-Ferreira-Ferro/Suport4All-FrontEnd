//Botões
const btnCreate = document.querySelector("#btn-create");


/*Inputs*/
const inputOrigem = document.querySelector("#input-origem");
const inputSenha = document.querySelector("#input-senha");

/*Containers dos inputs*/
const containerOrigem = document.querySelector(".container-input-origem");
const containerSenha = document.querySelector(".container-input-senha");


/*Spans gerados*/

let spanOrigem;
let spanSenha;


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
        limparCampos();
    }

})


function limparCampos(){
    inputOrigem.value = "";
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





