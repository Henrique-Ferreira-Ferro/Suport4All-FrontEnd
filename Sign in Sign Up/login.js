
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

const formularioLogin = document.querySelector("#forms-login");

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
const boxDialogForbidden = document.querySelector('#box-dialog-forbidden');
const btnFecharForbidden = document.querySelector("#btn-fechar-forbidden");

btnFecharForbidden.addEventListener('click', function(){
    boxDialogForbidden.close();
})


// Função para verificar o papel do usuario:

function verificarRole(token){
    const decodedToken = jwt_decode(token);
    const roles = decodedToken.roles || [];

    if(roles.includes('ADMIN')){
        return true;
    }
    return false;

}



//Validações no campo de login inicial

const emailInput = document.querySelector("#input-email");
const senhaInput = document.querySelector("#input-senha");
const containerEmail = document.querySelector(".container-div-email");
const containerSenha = document.querySelector(".container-div-pass");
let spanCreateLogin;
let spanPassLogin;


// Função para logar na aplicação

function logar(){
    fetch("http://localhost:8080/auth/login",{
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            "email": emailInput.value,
            "senha": senhaInput.value
        })
    })
    .then(response => {
        if(!response.ok){
            if(response.status === 403){
                boxDialogForbidden.showModal();
            }else if(response.status === 404){
                alert("Usuario com email ou senha errado!")
            }else{
                throw new Error('Erro ao tentar logar');
            }
        }
        return response.json();
    })
    .then(data => {
        if(data.token){
            //Armazena o token e redireciona
            localStorage.setItem('token', data.token);
            console.log("Token armazenado com sucesso: ", data.token);
            
            if(verificarRole(data.token)){

                window.location.href="/Tela Principal/telaPrincipal.html"

            }else{
                alert("Ops, estamos trabalhando na sua tela ainda. Espere um pouco :v")
                //window.location.href="/Tela Usuario/TelaPrincipal.html"
            }
            //limpar campos, mas não será necessario talvez

        }else{
            console.log('Erro ao obter o token: ', data);
        }
    })
    .catch(error => {
        console.log('Erro ao fazer login: ', error);
    })
}


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
        logar();
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


let departamentoValor = ""
const departamentoSelecionado = document.querySelector("#departamentoSelect");
departamentoValor = departamentoSelecionado.options[departamentoSelecionado.selectedIndex].text;

departamentoSelecionado.addEventListener('change', function() {
    const indiceCaixa = departamentoSelecionado.selectedIndex;
    departamentoValor = departamentoSelecionado.options[indiceCaixa].text;

});

//conteiners de registro

const conteinerName = document.querySelector(".conteiner-div-name");
const conteinerEmail = document.querySelector(".conteiner-div-email");
const conteinerSenha = document.querySelector(".conteiner-div-senha");

let spanCreateRegist; 
let spanPassRegist;


//Se conectando com o backend! Inicio do método registrar

function registrar(){
    fetch("http://localhost:8080/auth/register", {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            "nome": inputName.value,
            "departamento": departamentoValor,
            "email": inputEmailRegist.value,
            "senha": inputPasswordRegist.value
            
        })
    })
    .then(response => {
        if(!response.ok){
            if(response.status === 403){
                alert("Não foi possivel criar a conta!")
            }else if(response.status === 404){
                alert("Houve um problema no registro!");
            }else{
                throw new Error('Erro ao tentar logar');
            }
        }
        return response.json();
    })
    .then(data => {
        if(data.token){
            //Vamos por hora apenas armazenar o token e exibir a mensagem
            //Não tive tempo de montar a tela do usuario
            localStorage.setItem('token', data.token);
            console.log('Token armazenado com sucesso: ', data.token);
            alert("Estamos construindo a tela do usuario no momento. Aguarde!!");
            //window.location.href = "/telaUsuario/Principal.html"
            

        }else{
            console.log("Erro ao obter o token: ", data);
        }
    })
    .catch(error => {
        console.log('Erro ao fazer registrar: ', error);
    })
}


//Fim do método de registrar




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
        registrar();
        limparCamposRegistrar();
        console.log("Checar se salvou no banco!");
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


//Limpar campos em registrar

function limparCamposRegistrar(){
    inputName.value = "";
    inputEmailRegist.value = "";
    inputPasswordRegist.value = "";

}


// Fim das validações no campo de registro




