let btnForget = document.querySelector("#btn-enviar");
let emailInput = document.querySelector("#email-input");


function validarEmail(email){
    let regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

btnForget.addEventListener("click", function (event) {
    event.preventDefault();
  if (validarEmail(emailInput.value) != true) {
    alert("Insira um email valido!");
  } else {
    window.location.href = "/Sign%20in%20Sign%20Up/login.html"; 
 }
});
