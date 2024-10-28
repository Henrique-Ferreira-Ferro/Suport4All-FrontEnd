
const tableBody = document.querySelector("#table-body");

let tagTr = "";

function loadTable(chamados) {
    tableBody.innerHTML = '';

    chamados.forEach(chamadosB => {
        tagTr = document.createElement("tr");

        let idTd = document.createElement("td");
        idTd.textContent = chamadosB.id;
        tagTr.appendChild(idTd);

        let tituloTd = document.createElement("td");
        tituloTd.textContent = chamadosB.titulo;
        tagTr.appendChild(tituloTd);

        let dateTd = document.createElement("td");
        dateTd.textContent = chamadosB.date;
        tagTr.appendChild(dateTd);

        let statusTd = document.createElement("td");
        statusTd.textContent = chamadosB.status;
        tagTr.appendChild(statusTd);

        let descricaoTd = document.createElement("td");
        descricaoTd.textContent = chamadosB.descricao;
        tagTr.appendChild(descricaoTd);

        let extremidadeTd = document.createElement("td");
        extremidadeTd.textContent = chamadosB.extremidade;
        tagTr.appendChild(extremidadeTd);

        let anexoTd = document.createElement("td");
        if(chamadosB.anexo != null){
            anexoTd.textContent = "Arquivo presente"
        }else{
            anexoTd.textContent = chamadosB.anexo;
        }
        tagTr.appendChild(anexoTd);

        let usuarioIdTd = document.createElement("td");
        usuarioIdTd.textContent = chamadosB.usuarioId;
        tagTr.appendChild(usuarioIdTd);

        // Botão Editar
        let editTd = document.createElement("td");
        let buttonEdit = document.createElement("button");
        buttonEdit.textContent = "Editar";
        buttonEdit.classList.add("btn-edit");
        editTd.appendChild(buttonEdit);
        tagTr.appendChild(editTd);

        buttonEdit.addEventListener("click", function() {
            // Pegue o ID da senha da linha correspondente
            // Redireciona para a página de edição passando o ID como parâmetro na URL
            window.location.href = `EditarChamado.html?id=${chamadosB.id}`;
        });


        tableBody.appendChild(tagTr);
    });
}
//Fim do metodo de geração automatica


//Inicio da conexão com o back-end -- Listando todos usuarios

let chamadosList = [];

function listarTodosChamados(){

    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/chamado", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        method: "GET"
    })
    .then(res => {
        if(!res.ok){
            throw new Error(`Erro: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    })
    .then(function(chamados){
        chamadosList = chamados;
        loadTable(chamados);
    })
    .catch(function(error){
        console.log("Erro ao carregar os chamados: ", error);
    })

}



//Carregamento do DOM 

window.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    listarTodosChamados();
})








