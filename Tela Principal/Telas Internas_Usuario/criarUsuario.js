const btnCreate = document.querySelector("#btn-create");

/*Inputs*/
const inputName = document.querySelector("#input-nome");


/*Containers dos inputs*/
const containerName = document.querySelector(".container-input-name");

/*Spans gerados*/

let spanName;

btnCreate.addEventListener("click", function(event){
    event.preventDefault();

    let valueName = inputName.value;

    if(spanName){
        spanName.remove();
    }

    if(valueName.trim() === ""){
        spanName = document.createElement("span");
        spanName.innerHTML = "O nome não pode estar vaziu!"
        spanName.setAttribute("class","error");
        containerName.appendChild(spanName);

    }

})

// Remoção do span name ao digitar

containerName.addEventListener("input", function(){
    if(spanName){
        spanName.remove();
    }
})


