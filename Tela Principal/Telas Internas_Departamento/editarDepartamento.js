//Resgatando valor da url
const urlParams = new URLSearchParams(window.location.search);

//Recuperar o id da senha
const idParam = urlParams.get("id");


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


//Conexão com o back-end - Procurar departamento por id

function procurarDepartamentoPorId(){
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/departamento/${idParam}`,{
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
        inputNome.value = data.nomeDepart;
        txtDescricao.value = data.descricao;
    })
    .catch(error => {
        console.log("Erro ao carregar os dados da senha: ", error);
    })

}

//Fim da procura por departamento por id

//Função para editar um departamento - Ligado ao back-end

function editarDepartamento(){
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/departamento/update/${idParam}`,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        method: "PUT",
        body: JSON.stringify({
            "descricao": txtDescricao.value
        })
    })
    .then(response => {
        if(!response.ok){
            if(response.status === 403){
                alert("Usuario não possui permissão para editar o departamento!");
            }else if(response.status === 404){
                alert("Erro no preenchimento dos campos!");
            }else{
                throw new Error("Erro ao tentar editar o departamento!");
            }
        }
        return response.json;
    })
    .catch(error => {
        console.log("Erro ao tentar cadastrar o departamento: ", error);
    })

}





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
        editarDepartamento();
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

window.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    procurarDepartamentoPorId();
})

 //Controle do logout
 let btnSair = document.querySelector("#logout");
 btnSair.addEventListener("click", function(event){
     event.preventDefault();
     window.location.href="/Sign in Sign Up/login.html";
     window.localStorage.clear();
 })


