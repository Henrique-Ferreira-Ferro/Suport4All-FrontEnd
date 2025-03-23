let btnForget = document.querySelector("#btn-enviar");
let emailInput = document.querySelector("#email-input");

const boxDialog = document.querySelector('#box-dialog');
const btnFechar = document.querySelector('#btn-fechar');

function validarEmail(email){
    let regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

function enviarEmail(){
    fetch(`http://localhost:8080/forgotPassword/verifyMail/${emailInput.value}`, {
       headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
       },
       method: "POST"
    })
    .then(response => {
      if(response.status === 200){
          window.location.href = "./infoEmail.html"
      }else{
          throw new Error("Erro inesperado ao enviar link!");
      }
      return response.json;
    })
    .catch(error => {
      console.log(error);
    })

}


btnForget.addEventListener("click", function (event) {
    event.preventDefault();
  if (validarEmail(emailInput.value) != true) {
    boxDialog.showModal();
  } else {
    enviarEmail();
  }
});


btnFechar.addEventListener("click",function(){
  boxDialog.close();
})

