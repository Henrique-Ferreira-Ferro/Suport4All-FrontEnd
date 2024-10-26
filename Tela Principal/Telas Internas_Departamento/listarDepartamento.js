


const tableCont = document.querySelector(".table-senhas");



//Geração automatica de tabela


function loadTable(departamento) {
    const tableCont = document.querySelector(".table-senhas");

    departamento.forEach(departamentoB => {
        let tagTr = document.createElement("tr");

        let idTd = document.createElement("td");
        idTd.textContent = departamentoB.id;
        tagTr.appendChild(idTd);

        let nomeDepartTd = document.createElement("td");
        nomeDepartTd.textContent = departamentoB.nomeDepart;
        tagTr.appendChild(nomeDepartTd);


        let descricaoTd = document.createElement("td");
        descricaoTd.textContent = departamentoB.descricao;
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
            const departamentoId = departamentoB.id;
            // Redireciona para a página de edição passando o ID como parâmetro na URL
            window.location.href = `editarDepartamento.html?id=${departamentoId}`;
        });

       

        tableCont.appendChild(tagTr);
    });
}

//Função que carrega todos os departamentos
function ListarTodosOsDepartamentos(){
    const token = localStorage.getItem('token');

    fetch("http://localhost:8080/departamento", {
        headers: {
            'Authorization': 'Bearer '+ token,
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
    .then(function(departamentos){
        loadTable(departamentos);
    })
    .catch(function(error){
        console.log("Erro ao carregar os departamentos: ", error);
    })
}


//Evento de abrir pagina

window.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    ListarTodosOsDepartamentos();
})





















