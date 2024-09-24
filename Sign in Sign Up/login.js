
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

logarNaApp.addEventListener("click", function(event){
    event.preventDefault();
    window.location.href="/Tela Principal/telaPrincipal.html"

})


