
    /*
     * código referente a abertura de um chamado! 
     * 
     */

    const titulo = document.querySelector("#titulo-input");

    const btnAbrir = document.querySelector("#btn-abrir");

    btnAbrir.addEventListener("click", function(){
        console.log(titulo);
        alert("teste de botão clicado");
    })

