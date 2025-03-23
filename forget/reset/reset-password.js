const params = new URLSearchParams(window.location.search);

const token = params.get("token");
const messageDiv = document.getElementById("message");
const resetForm = document.getElementById("resetForm");

fetch(`http://localhost:8080/forgotPassword/reset?token=${token}`, {
    method: "POST",
})
.then(response => response.json())
.then(data => {
    if(data.message === "Token válido! Você pode redefinir sua senha."){
        messageDiv.textContent = "Token válido. Digite sua nova senha";
        resetForm.style.display = "block";
    }else{
        messageDiv.textContent = data.message;
    }
})
.catch(error => {
    messageDiv.textContent = "Erro ao validar o token. Tente novamente";
    console.log(error);
})

//Enviar nova senha

resetForm.addEventListener("submit", function(e){
    e.preventDefault();

    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;

    fetch(`http://localhost:8080/forgotPassword/changePassword?token=${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password,
            repeatPassword
        }),
    })
    .then(response => response.json())
    .then(data => {
        messageDiv.textContent = data.message;
        resetForm.style.display = "none";
    })
    .catch(error => {
        messageDiv.textContent = "Erro ao redefinir a senha. Tente novamente!";
        console.error(error);
    })
})

















