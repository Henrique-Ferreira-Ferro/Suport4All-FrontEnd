//Desativar usuario
const btnDesativar = document.querySelector("#btnDelete");

//Ativar usuario
const btnAtivarUsuario = document.querySelector("#btnAtivar");



const boxDialog = document.querySelector('#box-dialog');
const btnSim = document.querySelector("#btnSim");
const btnNao = document.querySelector("#btnNao");



btnAtivarUsuario.addEventListener("click", function(){
    alert("usuario ativado com sucesso!");
})


btnDesativar.addEventListener("click", function(){


    boxDialog.showModal();
})


btnSim.addEventListener("click", function(){
    
})

btnNao.addEventListener("click", function(){
    boxDialog.close();
})
