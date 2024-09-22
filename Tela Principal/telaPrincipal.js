document.getElementById('open_btn').addEventListener('click', function(){
    document.getElementById('sidebar').classList.toggle('open-sidebar');
})

let user = document.querySelector("#user");

user.addEventListener("click", function(event){
    event.preventDefault();

    console.log("teste")

})


