const btnDeletar = document.querySelector("#btnDelete");


const boxDialog = document.querySelector('#box-dialog');
const btnSim = document.querySelector("#btnSim");
const btnNao = document.querySelector("#btnNao");



btnDeletar.addEventListener("click", function(){


    boxDialog.showModal();
})


btnNao.addEventListener("click", function(){
    boxDialog.close();
})

