//Resgatando parametros da url

const urlParams = new URLSearchParams(window.location.search);

//Recuperação do id da senha
const idParam = urlParams.get("id");



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


//Caixa de dialogo
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

//Função que se liga ao backend e procura a senha pelo id
function procurarSenhaPorId(){
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/senhas/${idParam}`,{
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
    .then(data => {
        inputOrigem.value = data.origem;
        inputLogin.value = data.login;
        inputEmail.value = data.email;
        inputSenha.value = data.senha;
        txtDescricao.value = data.descricao;
    })
    .catch(error => {
        console.log("Erro ao carregar os dados da senha: ", error);
    })
}

//Fim da função que encontra a senha por id


//Função para editar uma senha - Ligada ao back-end
function editarSenha(){
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/senhas/update/${idParam}`,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: "PUT",
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
                alert("Usuario não possui autorização para editar senha!");
            }else if(response.status === 404){
                alert("Erro no preenchimento dos campos!");
            }else{
                throw new Error("Erro ao tentar editar senha!");
            }
        }
        return response.json;
    })
    .catch(error => {
        console.log("Erro ao tentar cadastrar a senha: ", error);
    })
}


//Fim da função que edita a senha



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

        editarSenha();
        dialog.showModal();
        checkIcon.classList.add('animate-check');
        limparCampos();
    }

})


function limparCampos(){
    inputOrigem.value = "";
    inputSenha.value = "";
    inputEmail.value = "";
    inputLogin.value = "";
    txtDescricao.value = "";

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

//Evento do carregamento do DOM

window.addEventListener("DOMContentLoaded", function(event) {
    event.preventDefault();
    procurarSenhaPorId();
});



