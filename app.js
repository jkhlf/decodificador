let historico = [];

function validarTexto(texto) {
    const regex = /^[a-z\s]+$/;
    return regex.test(texto);
}

function criptografar() {
    let texto = document.getElementById('inputText').value.trim();
    if (texto === "") {
        alert("Por favor, digite um texto.");
        return;
    }
    
    if (!validarTexto(texto)) {
        alert("O texto deve conter apenas letras minúsculas sem acento.");
        return;
    }
    
    let textoCriptografado = texto.replace(/e/g, "enter")
                                  .replace(/i/g, "imes")
                                  .replace(/a/g, "afi")
                                  .replace(/o/g, "ober")
                                  .replace(/u/g, "ufat");
    
    document.getElementById('outputText').innerText = textoCriptografado;
    historico.push(textoCriptografado);
    salvarHistorico();
    atualizarHistorico();

    document.getElementById('outputImage').style.display = 'none';
    document.getElementById('aside_text').style.display = 'none';
}

function descriptografar() {
    let texto = document.getElementById('inputText').value.trim();
    if (texto === "") {
        alert("Por favor, digite um texto.");
        return;
    }
    
    if (!validarTexto(texto)) {
        alert("O texto deve conter apenas letras minúsculas sem acento.");
        return;
    }
    
    let textoDescriptografado = texto.replace(/enter/g, "e")
                                     .replace(/imes/g, "i")
                                     .replace(/afi/g, "a")
                                     .replace(/ober/g, "o")
                                     .replace(/ufat/g, "u");
    
    document.getElementById('outputText').innerText = textoDescriptografado;
}

function copiarTexto() {
    let texto = document.getElementById('outputText').innerText;
    if (texto === "") {
        alert("Não há texto para copiar.");
        return;
    }
    
    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("Texto copiado!");
        })
        .catch(err => {
            console.error('Erro ao copiar texto: ', err);
        });
}

function atualizarHistorico() {
    const historicoContainer = document.getElementById('historico');
    historicoContainer.innerHTML = "";

    historico.forEach((texto, index) => {
        let item = document.createElement('div');
        item.classList.add('historico-item');
        item.innerText = `${index + 1}: ${texto}`;
        historicoContainer.appendChild(item);
    });
}

function salvarHistorico() {
    localStorage.setItem('historico', JSON.stringify(historico));
}

function carregarHistorico() {
    const historicoSalvo = localStorage.getItem('historico');
    if (historicoSalvo) {
        historico = JSON.parse(historicoSalvo);
        atualizarHistorico();
    }
}

function limparHistorico() {
    historico = [];
    salvarHistorico();
    atualizarHistorico();
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

window.onload = function() {
    carregarHistorico();
};

const toggle = document.getElementById('fullscreen_btn'); 

toggle.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen(); 
    }
});