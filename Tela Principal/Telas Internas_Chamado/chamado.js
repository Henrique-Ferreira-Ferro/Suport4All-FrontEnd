//Botão de abrir
const btnAbrir = document.querySelector("#btn-abrir");

//Inputs
const titulo = document.querySelector("#titulo-input");
const descricao = document.querySelector("#txtDescricao");
const arquivos = document.querySelector("#file");

//Selects
let extremidadeValor = "";
const selectExtremidade = document.querySelector("#selectExtremidade");
extremidadeValor = selectExtremidade.options[selectExtremidade.selectedIndex].text;

selectExtremidade.addEventListener('change', function(){
    const indiceCaixa = selectExtremidade.selectedIndex;
    extremidadeValor = selectExtremidade.options[indiceCaixa].text;
});


//Caixa de dialogo:

const dialog = document.getElementById('box-dialog');
const btnFechar = document.getElementById('btn-fechar');
const checkIcon = document.getElementById('checkIcon');

btnFechar.addEventListener("click", function(){
    dialog.close();
})


//Fim da caixa de dialogo

//Recuperação do id a partir do token
let idUserByToken = '';

    function recuperaId(token){
        try{
            const decodedToken = jwt_decode(token)
            idUserByToken = decodedToken.id || [];
        }catch(error){
            console.log("Erro ao tentar recuperar id do token: ", error);
      }
}

document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');
    if (token) {
        recuperaId(token);
    } else {
        console.log("Token não encontrado no localStorage.");
    }
});

//Container
const containerTituloInsert = document.querySelector(
  ".container-div-input-titulo"
);
let ElementeSpan;

//Conexão com o back-end
const formData = new FormData();
function abrirChamado(){
    const token = localStorage.getItem('token');

    formData.append('titulo', titulo.value);
    formData.append('descricao', descricao.value);
    formData.append('extremidade', extremidadeValor);
    formData.append('usuarioId', idUserByToken);
    if (arquivos.files.length > 0) {
        formData.append('anexo', arquivos.files[0]);
    }
    fetch("http://localhost:8080/chamado/create", {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+ token,
        },
        body: formData
    })
    .then(response => {
        if(!response.ok){
            if(response.status === 403){
                alert("Ops, parece que houve um problema de autenticação");
            }else if(response.status === 404){
                alert("Falha no preenchimento dos campos");
            }else {
                throw new Error("Erro ao tentar abrir o chamado!");
            }
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



btnAbrir.addEventListener("click", function () {
  if (ElementeSpan) {
    ElementeSpan.remove();
  }

  let tituloValue = titulo.value;
  if (tituloValue.trim() == "") {
    ElementeSpan = document.createElement("span");
    ElementeSpan.innerHTML = "Não deixe o titulo vaziu!";
    containerTituloInsert.appendChild(ElementeSpan);
    ElementeSpan.setAttribute("class", "error");
  } else {
    //Comunicação com o back-end
    abrirChamado();
    dialog.showModal();
    checkIcon.classList.add('animate-check');
    limparCampos();
  }
});

titulo.addEventListener("input", function () {
  ElementeSpan.remove();
});

//Limpeza dos campos

function limparCampos() {
  titulo.value = "";
  descricao.value = "";
  arquivos.value = "";
}
