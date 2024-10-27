
const tableBody = document.querySelector("#table-body");


function loadTable(chamados) {
    tableBody.innerHTML = '';

    chamados.forEach(chamadosB => {
        tagTr = document.createElement("tr");

        let idTd = document.createElement("td");
        idTd.textContent = chamadosB.id;
        tagTr.appendChild(idTd);

        let emailTd = document.createElement("td");
        emailTd.textContent = chamadosB.email;
        tagTr.appendChild(emailTd);

        let nomeTd = document.createElement("td");
        nomeTd.textContent = chamadosB.nome;
        tagTr.appendChild(nomeTd);

        let roleTd = document.createElement("td");
        roleTd.textContent = chamadosB.role;
        tagTr.appendChild(roleTd);

        let senhaTd = document.createElement("td");
        senhaTd.textContent = chamadosB.senha;
        tagTr.appendChild(senhaTd);

        let departamentoTd = document.createElement("td");
        departamentoTd.textContent = chamadosB.departamentoNome;
        tagTr.appendChild(departamentoTd);

        let statusTd = document.createElement("td");
        statusTd.textContent = chamadosB.status;
        tagTr.appendChild(statusTd);


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

