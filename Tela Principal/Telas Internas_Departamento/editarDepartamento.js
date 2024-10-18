//Botões
const btnCreate = document.querySelector("#btn-create");



/*Inputs*/
const inputNome = document.querySelector("#input-nome");


/*Containers dos inputs*/
const containerNome = document.querySelector(".container-input-name");


/*Spans gerados*/

let spanNome;


btnCreate.addEventListener("click", function(){

    let valueNome = inputNome.value;

    if(spanNome){
        spanNome.remove();
    }

    if(valueNome.trim() === ""){
        spanNome = document.createElement("span");
        spanNome.innerHTML = "O departamento não pode estar vazio!";
        spanNome.setAttribute("class", "error");
        containerNome.appendChild(spanNome);
    }else{

        //Conexão com o back-end


        limparCampos();
    }
    

})


function limparCampos(){
    inputNome.value = "";
}

containerNome.addEventListener("input", function(){
    if(spanNome){
        spanNome.remove();
    }
})





