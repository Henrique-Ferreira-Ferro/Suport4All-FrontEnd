const runBtn = document.getElementById("runCommand");
const output = document.getElementById("output");
const status = document.getElementById("status");
const token = localStorage.getItem("token");
runBtn.addEventListener("click", async () => {
    const target = document.getElementById("target").value.trim();
    const tool = document.getElementById("tool").value;

    if (!target) {
        alert("Informe um destino para o diagnóstico.");
        return;
    }

    // Mapeia para o Enum do backend
    const commandMap = {
        ping: "PING",
        traceroute: "TRACEROUTE"
    };

    const payload = {
        command: commandMap[tool],
        host: target,
        count: 4
    };

    status.textContent = "Executando...";
    status.className = "status running";
    output.textContent = `> ${payload.command} ${payload.host}\n\n`;

    try {
        const response = await fetch("http://localhost:8080/api/network/execute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                'Authorization': 'Bearer '+ token
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(err);
        }

        const result = await response.text();

        output.textContent += result;
        status.textContent = "Concluído";
        status.className = "status done";

    } catch (err) {
        output.textContent += "\n[ERRO]\n" + err.message;
        status.textContent = "Erro";
        status.className = "status error";
    }
});
