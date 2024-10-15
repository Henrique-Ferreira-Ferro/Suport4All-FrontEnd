let btnForget = document.querySelector("#btn-enviar");
let emailInput = document.querySelector("#email-input");

const boxDialog = document.querySelector('#box-dialog');
const btnFechar = document.querySelector('#btn-fechar');

function validarEmail(email){
    let regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

btnForget.addEventListener("click", function (event) {
    event.preventDefault();
  if (validarEmail(emailInput.value) != true) {
    boxDialog.showModal();
  } else {
    alert("Seu chamado foi aberto! Aguarde um tempo para que a equipe possa avalia-lo e resetar sua senha!")
    window.location.href = "/Sign%20in%20Sign%20Up/login.html"; 
 }
});


btnFechar.addEventListener("click",function(){
  boxDialog.close();
;})

