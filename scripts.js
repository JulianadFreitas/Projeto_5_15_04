let nome;
guardaNome();

function guardaNome() {
    nome = prompt("Dgite seu nome");
    let nomeDado = {
        name: nome
    };

    const envioNome = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", nomeDado);

    envioNome.then(sucess);
    envioNome.catch(failed);

    function sucess() {
        alert("Nome aceito");
    }

    function failed() {
        const nome = prompt("Digite outro nome pois este já está em uso");
        let nomeDado = {
            name: nome
        };
        const envioNome = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", nomeDado);
        envioNome.then(sucess);
        envioNome.catch(failed);
    }
}

chama()
setInterval(chama, 3000);

function chama() {
    const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    promessa.then(chargeMessages);
}

function chargeMessages(dados) {
    resposta = dados.data;
    rendereziMensagens();
}

function rendereziMensagens() {
    const messages = document.querySelector(".messages");
    messages.innerHTML = "";

    for (let i = 0; i < resposta.length; i++) {

        if (resposta[i].type == "status") {
            messages.innerHTML += `<div class="message status"> ${resposta[i].time} <strong>  ${resposta[i].from} </strong>${resposta[i].text}</div>`;
        } else if (resposta[i].type == "message") {
            messages.innerHTML += `<div class="message"> ${resposta[i].time} <strong>${resposta[i].from}  para ${resposta[i].to}: </strong>${resposta[i].text}</div>`;
        } else if (resposta[i].type == "private_message" && nome === resposta[i].to) {
            messages.innerHTML += `<div class="message reservada">${resposta[i].time}<strong>${resposta[i].from}</strong>reservadamente para <strong>${resposta[i].to}:</strong>${resposta[i].text}</div>`;
        }
    }
    window.scrollTo(0, document.body.scrollHeight);
}

setInterval(mantemConectado, 2000);

function mantemConectado() {
    let nomeDado = {
        name: nome
    };
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", nomeDado);
    console.log(nomeDado)
}

function sendMessage() {
    const text = document.querySelector(".areaMessage");
    const textMessage = {
		from: nome,
		to: "Todos",
		text: text.value,
		type: "message" 
	 };
     console.log(textMessage);
     const sendMessages = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", textMessage);
     console.log(textMessage);
     text.value="";
     sendMessages.then(sucess);
     sendMessages.catch(failed);

     function sucess() {
        alert("Mensagem enviada!");
    }
    function failed() {
        alert("Sua mensagem não pode ser enviada. Algo deu errado :/");
        window.location.reload();
    }
}


//onclick dos participantes no botao 
function participants() {
    const buttonParticipants = document.querySelector(".top .button");
    const show = document.querySelector(".mask");
    show.classList.remove("hidden");
    console.log(buttonParticipants);
}