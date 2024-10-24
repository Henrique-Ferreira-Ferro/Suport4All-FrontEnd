//Desativar usuario
const btnDesativar = document.querySelector(".btnDelete");

//Ativar usuario
const btnAtivarUsuario = document.querySelector(".btnAtivar");



const boxDialog = document.querySelector('#box-dialog');
const btnSim = document.querySelector("#btnSim");
const btnNao = document.querySelector("#btnNao");


//Geração automatica de tabela


function loadTable(usuarios) {
    const tableCont = document.querySelector(".table-usuarios");

    usuarios.forEach(usuariosB => {
        let tagTr = document.createElement("tr");

        let idTd = document.createElement("td");
        idTd.textContent = usuariosB.id;
        tagTr.appendChild(idTd);

        let emailTd = document.createElement("td");
        emailTd.textContent = usuariosB.email;
        tagTr.appendChild(emailTd);

        let nomeTd = document.createElement("td");
        nomeTd.textContent = usuariosB.nome;
        tagTr.appendChild(nomeTd);

        let roleTd = document.createElement("td");
        roleTd.textContent = usuariosB.role;
        tagTr.appendChild(roleTd);

        let senhaTd = document.createElement("td");
        senhaTd.textContent = usuariosB.senha;
        tagTr.appendChild(senhaTd);

        let departamentoTd = document.createElement("td");
        departamentoTd.textContent = usuariosB.departamentoNome;
        tagTr.appendChild(departamentoTd);

        let statusTd = document.createElement("td");
        statusTd.textContent = usuariosB.status;
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
            const usuarioId = usuariosB.id;
            // Redireciona para a página de edição passando o ID como parâmetro na URL
            window.location.href = `EditarUsuario.html?id=${usuariosB.id}`;
        });

        // Botão Deletar
        let desativarTd = document.createElement("td");
        let buttonDesativar = document.createElement("button");
        buttonDesativar.textContent = "Desativar";
        buttonDesativar.classList.add("btn-delete");
        buttonDesativar.classList.add("btnDelete");
        // Adicionar o evento de clique para abrir o dialog
        buttonDesativar.addEventListener("click", function() {
            boxDialog.showModal();
        });
        desativarTd.appendChild(buttonDesativar);
        tagTr.appendChild(desativarTd);

        //Botão Ativar usuario
        let ativarTd = document.createElement("td");
        let buttonAtivar = document.createElement("button");
        buttonAtivar.textContent = "Ativar";
        buttonAtivar.classList.add("btn-ativar");
        buttonAtivar.classList.add("btnAtivar");
        buttonAtivar.addEventListener("click", function(){
            alert("Usuario ativado com sucesso!")
        })
        ativarTd.appendChild(buttonAtivar);
        tagTr.appendChild(ativarTd);

        tableCont.appendChild(tagTr);
    });
}
//Fim do metodo de geração automatica


//Inicio da conexão com o Back-End - Listando todos os usuarios 

function listarTodosUsuarios(){
    
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/usuario",{
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET"
    })
    .then(res => {
        if(!res.ok){
            throw new Error(`Erro: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    })
    .then(function(usuarios){
        loadTable(usuarios);
    })
    .catch(function(error){
        console.log("Erro ao carregar os usuarios: ", error);
    })
}



// Fim da conexão com o back-end - listando todos os usuarios;

window.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    listarTodosUsuarios();
})


btnSim.addEventListener("click", function(){
    alert("Usuario desativado!");
})

btnNao.addEventListener("click", function(){
    boxDialog.close();
})
