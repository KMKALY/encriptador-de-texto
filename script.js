// Seleccionamos los elementos clave
const textArea = document.querySelector("#input-text");
const mensaje = document.querySelector("#output-text");
const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const copyBtn = document.getElementById('copy-btn');
const placeholderContent = document.getElementById('placeholder-content');

// Excluir caracteres especiales
const specialCharsRegex = /[^a-zA-Z0-9\s]/;

// Matriz de codificación y decodificación
const matrizCodigo = [
    ["e", "enter"], 
    ["i", "imes"], 
    ["a", "ai"], 
    ["o", "ober"], 
    ["u", "ufat"]
];

// Función para manejar la transformación de texto
function handleTextTransformation(action) {
    const inputText = textArea.value.trim().toLowerCase();

    if (inputText === '') {
        alert('Recuerda ingresar texto');
        return;
    }

    if (specialCharsRegex.test(inputText)) {
        alert('No se permiten caracteres especiales');
        return;
    }

    let outputText;

    if (action === 'encrypt') {
        outputText = transformText(inputText, true);
        document.body.classList.add('bg-changed');
    } else if (action === 'decrypt') {
        outputText = transformText(inputText, false);
        document.body.classList.remove('bg-changed');
    }

    mensaje.value = outputText;

    if (outputText.trim() === '') {
        placeholderContent.style.display = 'flex';
        copyBtn.style.display = 'none';
    } else {
        placeholderContent.style.display = 'none';
        copyBtn.style.display = 'block';
    }

    textArea.value = '';
}

// Función de transformación genérica
function transformText(text, isEncrypt) {
    let transformedText = text;

    for (let i = 0; i < matrizCodigo.length; i++) {
        const [normal, encrypted] = matrizCodigo[i];
        const from = isEncrypt ? normal : encrypted;
        const to = isEncrypt ? encrypted : normal;
        transformedText = transformedText.replaceAll(from, to);
    }

    return transformedText;
}

// Evento para copiar el texto al portapapeles
copyBtn.addEventListener('click', function() {
    mensaje.select();
    mensaje.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert('Texto copiado al portapapeles');
});

// Asociamos eventos a los botones de encriptar y desencriptar
encryptBtn.addEventListener('click', function() {    
        // Se llama a la función de encriptación
        handleTextTransformation('encrypt');    
});

decryptBtn.addEventListener('click', function() {    
        // Se llama a la función de encriptación
    handleTextTransformation('decrypt');    
});