let btnForget = document.querySelector("#btn-enviar");
let emailInput = document.querySelector("#email-input");

const boxDialog = document.querySelector('#box-dialog');
const btnFechar = document.querySelector('#btn-fechar');

function validarEmail(email){
    let regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

//Pesquisa de usuario existente por email
function pesquisarUsuarioPorEmail(){
    fetch("http://localhost:8080/usuario/find/email", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ email: emailInput.value })
    })
    .then(res => {
      if(!res.ok){
        throw new Error(`Erro: ${res.status} - ${res.statusText}`)
      }
      return res.json();
    })
    .then(data => {
      let idUser = data.id;
      console.log(idUser);
      abrirChamado(idUser);
    })
    .catch(error => {
      console.log("Erro ao resgatar informações do usuario: ", error);
    })
}



//Fim da pesquisa de usuario por email


//Conectando com o back-end da aplicação - Abrindo um chamado
//Ops, como vou abrir um chamado, se somente quem está autenticado pode?


function abrirChamado(idUser){
  const formData = new FormData();

  formData.append('titulo', 'Esqueci minha senha!');
  formData.append('descricao', 'Mensagem automatica: Usuario ')
  formData.append('extremidade', 'SIMPLES')
  formData.append('usuarioId', idUser)

  fetch("http://localhost:8080/chamado/create", {
      method: "POST",
      body: formData
  })
  .then(response => {
    if(response.status === 403){
      console.log("Problema de acesso!")
    }else if(response.status === 404){
      alert("Usuario não encontrado!");
    }else{
      throw new Error("Erro ao tentar abrir o chamado!");
    }
    return response.json();
  })
  .then(data => {
    console.log("Chamado criado com sucesso: ", data);
  })
  .catch(error => {
    console.log("Erro ao tentar abrir o chamado ", error);
  })

}



//Fim da conexão com o back-end da aplicação - Fechando um chamado



btnForget.addEventListener("click", function (event) {
    event.preventDefault();
  if (validarEmail(emailInput.value) != true) {
    boxDialog.showModal();
  } else {
    pesquisarUsuarioPorEmail();
    alert("Seu chamado foi aberto! Aguarde um tempo para que a equipe possa avalia-lo e resetar sua senha!")
    window.location.href = "/Sign%20in%20Sign%20Up/login.html"; 
  }
});


btnFechar.addEventListener("click",function(){
  boxDialog.close();
})

