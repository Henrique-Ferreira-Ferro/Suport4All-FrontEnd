
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
const containerEmail = document.querySelector(".container-div-email");
const containerSenha = document.querySelector(".container-div-pass");
let spanCreateLogin;
let spanPassLogin;

logarNaApp.addEventListener("click", function(event){
    event.preventDefault();

    let email = emailInput.value;
    let senha = senhaInput.value;

    if (spanCreateLogin) {
        spanCreateLogin.remove();
    }
    if (spanPassLogin) {
        spanPassLogin.remove();
    }
    
    if(validarEmail(email) == false){
        spanCreateLogin = document.createElement("span");
        spanCreateLogin.innerHTML = "Email inválido";
        containerEmail.appendChild(spanCreateLogin);
        spanCreateLogin.classList.add("aviso");
    }else if(senha.trim() === ""){
        spanPassLogin = document.createElement("span");
        spanPassLogin.innerHTML = "Senha não pode ser vazia";
        containerSenha.appendChild(spanPassLogin);
        spanPassLogin.classList.add("aviso");
    }else{
        window.location.href="/Tela Principal/telaPrincipal.html"
    }

    //Assim que a pessoa começa a digitar o aviso some. Devo aplicar a registrar?

    emailInput.addEventListener("input", function(){
        if(spanCreateLogin){
            spanCreateLogin.remove();
        }
    })

    senhaInput.addEventListener("input", function(){
        if(spanPassLogin){
            spanPassLogin.remove();
        }
    })

   
})


//validar email

function validarEmail(email){
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;

    return regex.test(email);
}


//Fim das validações no campo de login inicial 



//Validações e conexões com o banco no campo de registro

const inputName = document.querySelector("#input-name");
const inputEmailRegist = document.querySelector("#input-email-register");
const inputPasswordRegist = document.querySelector("#input-password-register");
const btnCadastrar = document.querySelector("#btn-cadastrar");

//conteiners de registro

const conteinerName = document.querySelector(".conteiner-div-name");
const conteinerEmail = document.querySelector(".conteiner-div-email");
const conteinerSenha = document.querySelector(".conteiner-div-senha");

let spanCreateRegist; 
let spanPassRegist;


btnCadastrar.addEventListener("click", function(event){
    event.preventDefault();
    let email = inputEmailRegist.value;
    let senha = inputPasswordRegist.value;
    let nome = inputName.value;

    //Nota: Preciso separar essa parte em funções


    function limparAvisos() {
        const avisos = document.querySelectorAll(".aviso");
        avisos.forEach(aviso => aviso.remove());
    }

   // Limpa avisos anteriores
   limparAvisos();
    
   let erro = false;

   if (nome.trim() === "") {
        spanCreateRegist = document.createElement("span");
        spanCreateRegist.innerHTML = "Nome não pode ser vazio!";
        conteinerName.appendChild(spanCreateRegist);
        spanCreateRegist.classList.add("aviso");
        erro = true;
   }

   if (!erro && validarEmail(email) == false) {
        spanCreateRegist = document.createElement("span");
        spanCreateRegist.innerHTML = "Email inválido";
        conteinerEmail.appendChild(spanCreateRegist);
        spanCreateRegist.classList.add("aviso");
        erro = true;
   }

   if (!erro && senha.trim() === "") {
        spanPassRegist = document.createElement("span");
        spanPassRegist.innerHTML = "Senha não pode ser vazia";
        conteinerSenha.appendChild(spanPassRegist);
        spanPassRegist.classList.add("aviso");
        erro = true;
   }
   if(!erro){
    window.location.href="/Tela Principal/telaPrincipal.html"
   }
   

   inputEmailRegist.addEventListener("input", function(){
    if(spanCreateRegist){
        spanCreateRegist.remove();
    }
   })

   inputPasswordRegist.addEventListener("input", function(){
    if(spanPassRegist){
        spanPassRegist.remove();
       }
   })

   inputName.addEventListener("input", function(){
    if(spanCreateRegist){
        spanCreateRegist.remove();
       }
   })

   return !erro; // Retorna falso se houver erro

  

})




// Fim das validações no campo de registro




