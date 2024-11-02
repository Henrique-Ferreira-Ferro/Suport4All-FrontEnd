//Botões
const btnCreate = document.querySelector("#btn-create");



/*Inputs*/
const inputNome = document.querySelector("#input-nome");
const txtDescricao = document.querySelector("#txtDescricao");

/*Containers dos inputs*/
const containerNome = document.querySelector(".container-input-name");


/*Spans gerados*/

let spanNome;


//Caixa de dialogo:

const dialog = document.getElementById('box-dialog');
const btnFechar = document.getElementById('btn-fechar');
const checkIcon = document.getElementById('checkIcon');

btnFechar.addEventListener("click", function(){
    dialog.close();
})


//Fim da caixa de dialogo


//Função que se conecta com o back-end 

function criarDepartamento(){
    const token = localStorage.getItem('token');

    fetch("http://localhost:8080/departamento/create", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        method: "POST",
        body: JSON.stringify({
            "nomeDepart": inputNome.value,
            "descricao": txtDescricao.value
        })
    })
    .then(response => {
        if(!response.ok){
            if(response.status === 403){
                //Preciso ajustar isso, pois o nome e a descrição precisam ser iguais para dar um 403
                alert("Seu demonio! Para de tentar criar um departamento com nome de outro!")
            }else if(response.status === 404){
                alert("Falha no preechimento dos campos!");
            }else{
                throw new Error("Erro ao tentar cadastrar departamento");
            }
        }
        return response.json;
    })
    .catch(error => {
        console.log("Erro ao tentar criar o departamento", error);
    })
}


//Fim da função que se conecta com o back-end


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

        criarDepartamento();
        dialog.showModal();
        checkIcon.classList.add('animate-check');
        limparCampos();
    }
    

})


function limparCampos(){
    inputNome.value = "";
    txtDescricao.value = "";
}

containerNome.addEventListener("input", function(){
    if(spanNome){
        spanNome.remove();
    }
})

 //Controle do logout
 let btnSair = document.querySelector("#logout");
 btnSair.addEventListener("click", function(event){
     event.preventDefault();
     window.location.href="/Sign in Sign Up/login.html";
     window.localStorage.clear();
 })




