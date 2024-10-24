const btnCreate = document.querySelector("#btn-create");

/*Inputs*/
const inputName = document.querySelector("#input-nome");
const inputEmail = document.querySelector("#input-email");
const inputSenha = document.querySelector("#input-senha");

//Seleção dos departamentos

let departamentoValor = ""
const departamentoSelecionado = document.querySelector("#departamentoSelect");
departamentoValor = departamentoSelecionado.options[departamentoSelecionado.selectedIndex].text;

departamentoSelecionado.addEventListener('change', function() {
    const indiceCaixa = departamentoSelecionado.selectedIndex;
    departamentoValor = departamentoSelecionado.options[indiceCaixa].text;

});

//Fim da seleção dos departamentos

//Seleção das permissões do usuario
let papelValor = "";
const papelSelecionado = document.querySelector("#roleSelect");
papelValor = papelSelecionado.options[papelSelecionado.selectedIndex].text;

papelSelecionado.addEventListener('change',function(){
    const indiceCaixa = papelSelecionado.selectedIndex;
    papelValor = papelSelecionado.options[indiceCaixa].text;

})
//Fim da seleção das permissões

/*Containers dos inputs*/
const containerName = document.querySelector(".container-input-name");
const containerEmail = document.querySelector(".container-input-email");
const containerSenha = document.querySelector(".container-input-senha");




/*Spans gerados*/

let spanName;
let spanEmail;
let spanSenha;

//Caixa de dialogo:

const dialog = document.getElementById('box-dialog');
const btnFechar = document.getElementById('btn-fechar');
const checkIcon = document.getElementById('checkIcon');

btnFechar.addEventListener("click", function(){
    dialog.close();
})


//Fim da caixa de dialogo

//Conexão com o back-end

function criarUsuario(){
    const token = localStorage.getItem('token');

    fetch("http://localhost:8080/usuario/create", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: "POST",
        body: JSON.stringify({
            "nome": inputName.value,
            "email": inputEmail.value,
            "senha": inputSenha.value,
            "role": papelValor,
            "departamentoNome": departamentoValor
        })
    })
    .then(response => {
        if(!response.ok){
            if(response.status === 403){
                alert("Ops, parece que tivemos um problema com o token! Verifique se está logado e se os dados cadastrados estão corretos!");
            }else if(response.status === 404){
                alert("Falha no preenchimento dos campos!");
            }else{
                throw new Error("Erro ao tentar cadastrar Usuario!");
            }
        }
        return response.json;
    })
    .catch(error => {
        console.log("Erro ao tentar cadastrar um usuario: ", error);
    })
}

//Fim da conexão com o back-end

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
        criarUsuario();
        dialog.showModal();
        checkIcon.classList.add('animate-check');
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




