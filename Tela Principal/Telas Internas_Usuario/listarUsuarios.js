//Desativar usuario
const btnDesativar = document.querySelector(".btnDelete");

//Ativar usuario
const btnAtivarUsuario = document.querySelector(".btnAtivar");

//variavel para pegar id do usuario
let idUsuario = "";


const boxDialog = document.querySelector('#box-dialog');
const btnSim = document.querySelector("#btnSim");
const btnNao = document.querySelector("#btnNao");

let tagTr = "";
//Geração automatica de tabela


function loadTable(usuarios) {
    const tableCont = document.querySelector(".table-usuarios");

    usuarios.forEach(usuariosB => {
        tagTr = document.createElement("tr");

        if(usuariosB.status === "DESLIGADO"){
            tagTr.classList.add("user-desligado");
        }

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
            // Redireciona para a página de edição passando o ID como parâmetro na URL
            window.location.href = `EditarUsuario.html?id=${usuariosB.id}`;
        });

        // Botão desativar
        let desativarTd = document.createElement("td");
        let buttonDesativar = document.createElement("button");
        buttonDesativar.textContent = "Desativar";
        buttonDesativar.classList.add("btn-delete");
        buttonDesativar.classList.add("btnDelete");
        // Adicionar o evento de clique para abrir o dialog
        buttonDesativar.addEventListener("click", function() {
            idUsuario = usuariosB.id;
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
            ativarUsuarioPorId(usuariosB.id);
            alert("Usuario ativado com sucesso!")
            window.location.reload();
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

//Inicio do metodo para alterar o status do usuario para desativado
function desativarUsuarioPorId(id){
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/usuario/update/status/${id}`,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        method: "PUT",
        body: JSON.stringify({
            "status": "DESLIGADO"
        })
    })
    .then(response => {
        if(!response.ok){
            if(response.status === 403){
                alert("usuario não possui autorização para alterar status de usuarios!");
            }else if(response.status === 404){
                alert("Erro ao tentar realizar ação!");
            }else{
                throw new Error("Erro ao tentar alterar status");
            }
        }
        return response.json;
    })
    .catch(error => {
        console.log("Erro ao tentar alterar o status ", error);
    })
}



function ativarUsuarioPorId(id){
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/usuario/update/status/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        method: "PUT",
        body: JSON.stringify({
            "status": "ATIVO"
        })
    })
    .then(response => {
        if(!response.ok){
            if(response.status === 403){
                alert("Usuario não possui autorização para ativar usuarios!");
            }else if(response.status === 404){
                alert("Erro ao ativar usuario!");
            }else{
                throw new Error("Erro não tratado: ")
            }
        }
        return response.json;
    })
    .catch(error => {
        console.log("Erro ao tentar alterar o status: ", error);
    })
}



//Fim do metodo que desativa um usuario


window.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    listarTodosUsuarios();
})


btnSim.addEventListener("click", function(){
    desativarUsuarioPorId(idUsuario);
    alert("Usuario desativado!");    
    window.location.reload();
})

btnNao.addEventListener("click", function(){
    boxDialog.close();
})
