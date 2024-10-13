
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



//Validações no campo de login inicial

const emailInput = document.querySelector("#input-email");
const senhaInput = document.querySelector("#input-senha");


logarNaApp.addEventListener("click", function(event){
    event.preventDefault();

    let email = emailInput.value;
    let senha = senhaInput.value;

    if(email == "" || senha == ""){
        alert("Não deixe o email e a senha vazias")
    }

    if(validarEmail(email) == false){
        alert("Email invalido");
    }

    //window.location.href="/Tela Principal/telaPrincipal.html"

})


//validar email

function validarEmail(email){
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;

    return regex.test(email);
}


//Fim das validações no campo de login inicial 




