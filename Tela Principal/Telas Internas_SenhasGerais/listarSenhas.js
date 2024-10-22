const btnDeletar = document.querySelector(".btnDeleteAction");


const boxDialog = document.querySelector('#box-dialog');
const btnSim = document.querySelector("#btnSim");
const btnNao = document.querySelector("#btnNao");


const tableCont = document.querySelector(".table-senhas");

//Geração automatica de tabela

/*
Campos da tabela

id
Origem
login
Email
senha
descricao
Editar senha
Deletar Senha
*/

function loadTable(senhas) {
    const tableCont = document.querySelector(".table-senhas");

    senhas.forEach(senhaB => {
        let tagTr = document.createElement("tr");

        let idTd = document.createElement("td");
        idTd.textContent = senhaB.id;
        tagTr.appendChild(idTd);

        let origemTd = document.createElement("td");
        origemTd.textContent = senhaB.origem;
        tagTr.appendChild(origemTd);

        let loginTd = document.createElement("td");
        loginTd.textContent = senhaB.login;
        tagTr.appendChild(loginTd);

        let emailTd = document.createElement("td");
        emailTd.textContent = senhaB.email;
        tagTr.appendChild(emailTd);

        let senhaTd = document.createElement("td");
        senhaTd.textContent = senhaB.senha;
        tagTr.appendChild(senhaTd);

        let descricaoTd = document.createElement("td");
        descricaoTd.textContent = senhaB.descricao;
        tagTr.appendChild(descricaoTd);

        // Botão Editar
        let editTd = document.createElement("td");
        let buttonEdit = document.createElement("button");
        buttonEdit.textContent = "Editar";
        buttonEdit.classList.add("btn-edit");
        editTd.appendChild(buttonEdit);
        tagTr.appendChild(editTd);

        buttonEdit.addEventListener("click", function() {
            // Pegue o ID da senha da linha correspondente
            const senhaId = senhaB.id;
            // Redireciona para a página de edição passando o ID como parâmetro na URL
            window.location.href = `editarSenha.html?id=${senhaId}`;
        });

        // Botão Deletar
        let deleteTd = document.createElement("td");
        let buttonDelete = document.createElement("button");
        buttonDelete.textContent = "Deletar";
        buttonDelete.classList.add("btn-delete");
        // Adicionar o evento de clique para abrir o dialog
        buttonDelete.addEventListener("click", function() {
            boxDialog.showModal(); // Mostrar o dialog de confirmação
        });

        deleteTd.appendChild(buttonDelete);
        tagTr.appendChild(deleteTd);

        tableCont.appendChild(tagTr);
    });
}
//Fim do metodo de geração automatica


//Inicio do metodo para listar todas as senhas 
//Conexões com o back-end
function ListarTodasAsSenhas(){
    const token = localStorage.getItem('token'); // Obtém o token armazenado

    fetch("http://localhost:8080/senhas", {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Erro: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    })
    .then(function(senhas) {
        loadTable(senhas);
    })
    .catch(function(error) {
        console.error("Erro ao carregar as senhas:", error);
    });
    
}

//Fim das conexões com o back-end

//Evento de abrir pagina

window.addEventListener("DOMContentLoaded", function(event) {
    event.preventDefault();
    ListarTodasAsSenhas();
});


//Fim do evento de abertura da página


btnNao.addEventListener("click", function(){
    boxDialog.close();
})

