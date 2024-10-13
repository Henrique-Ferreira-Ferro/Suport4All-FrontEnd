
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

const logarNaApp = document.querySelector("#logar");


registerBtn.addEventListener('click', () => {
    container.classList.add("active");
})

loginBtn.addEventListener('click', () =>{
    container.classList.remove("active");
})

/*Código voltado para dialogo escondido*/

const icons = document.querySelectorAll('.icon');
const boxDialog = document.querySelector('#box-dialog');
const btnFechar = document.querySelector('#btn-fechar');


icons.forEach(function(icon){
    icon.addEventListener('click', function(event){
        event.preventDefault();
        console.log('icone Clicado: '+ icon.querySelector('i').className)
        boxDialog.showModal();
        
  
    })
})

btnFechar.addEventListener("click",function(){
    boxDialog.close();
;})


/*Fim do código do dialogo escondigo*/


//Validações no campo de login inicial

const emailInput = document.querySelector("#input-email");
const senhaInput = document.querySelector("#input-senha");
const containerEmail = document.querySelector(".container-div");
const containerSenha = document.querySelector(".container-div-pass");
let spanCreate;
let spanPass;

logarNaApp.addEventListener("click", function(event){
    event.preventDefault();

    let email = emailInput.value;
    let senha = senhaInput.value;

    if (spanCreate) {
        spanCreate.remove();
    }
    if (spanPass) {
        spanPass.remove();
    }
    
    if(validarEmail(email) == false){
        spanCreate = document.createElement("span");
        spanCreate.innerHTML = "Email inválido";
        containerEmail.appendChild(spanCreate);
        spanCreate.classList.add("aviso");
    }else if(senha.trim() === ""){
        spanPass = document.createElement("span");
        spanPass.innerHTML = "Senha não pode ser vazia";
        containerSenha.appendChild(spanPass);
        spanPass.classList.add("aviso");
    }else{
        window.location.href="/Tela Principal/telaPrincipal.html"
    }

    emailInput.addEventListener("input", function(){
        if(spanCreate){
            spanCreate.remove();
        }
    })

    senhaInput.addEventListener("input", function(){
        if(spanPass){
            spanPass.remove();
        }
    })

   
})


//validar email

function validarEmail(email){
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;

    return regex.test(email);
}


//Fim das validações no campo de login inicial 




