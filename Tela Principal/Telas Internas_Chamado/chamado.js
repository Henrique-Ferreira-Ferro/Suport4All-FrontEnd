
    const titulo = document.querySelector("#titulo-input");
    const btnAbrir = document.querySelector("#btn-abrir");
    const containerTituloInsert = document.querySelector(".container-div-input-titulo");
    let ElementeSpan;
        
    btnAbrir.addEventListener("click", function(){
 
        if(ElementeSpan){
            ElementeSpan.remove();
        }

        let tituloValue = titulo.value;
        if(tituloValue.trim() == ""){
            ElementeSpan = document.createElement("span");
            ElementeSpan.innerHTML = "Não deixe o titulo vaziu!"
            containerTituloInsert.appendChild(ElementeSpan);
            ElementeSpan.setAttribute("class", "error");
            
        }else{
            //Comunicação com o back-end

            limparCampos();
        }
    
    });    

    titulo.addEventListener("input", function(){
        ElementeSpan.remove();    
    })
    
    //Limpeza dos campos

    function limparCampos(){
        titulo.value = "";
    }

    


