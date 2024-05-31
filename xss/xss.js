// Ejemplo 1: XSS Reflejado
document.getElementById('xss-form-1').addEventListener('submit', function(event) {
  event.preventDefault();
  const userInput = document.getElementById('xss-input-1').value;
  // Reflejando la entrada del usuario sin escapar
  document.getElementById('xss-output-1').innerHTML = `Hola, ${userInput}!`;
});



// Ejemplo 2: XSS Almacenado
const comments = [];
document.getElementById('xss-form-2').addEventListener('submit', function(event) {
    event.preventDefault();
    const comment = document.getElementById('xss-input-2').value;
    comments.push(comment);
    displayComments();
});

function displayComments() {
    const output = document.getElementById('xss-output-2');
    output.innerHTML = '';
    comments.forEach(comment => {
        const div = document.createElement('div');
        // Reflejando comentarios almacenados sin escapar
        div.innerHTML = comment;
        output.appendChild(div);
    });
}


// Ejemplo 3: XSS Basado en DOM
document.getElementById('xss-form-3').addEventListener('submit', function(event) {
  event.preventDefault();
  const userInput = document.getElementById('xss-input-3').value;
  const output = document.getElementById('xss-output-3');
  const div = document.createElement('div');
  // Insertando la entrada del usuario directamente en el DOM sin escapar
  div.innerHTML = userInput;
  output.appendChild(div);
});


// Ejemplo 4: XSS Basado en URL
document.getElementById('xss-form-4').addEventListener('submit', function(event) {
  event.preventDefault();
  const userInput = document.getElementById('xss-input-4').value;
  const url = new URL(window.location.href);
  url.searchParams.set('message', userInput);
  window.history.pushState({}, '', url);
  document.getElementById('xss-output-4').innerHTML = `Mensaje: ${userInput}`;
  console.log(`URL generada: ${url}`);
  console.log(`Contenido del mensaje: ${userInput}`);
});

// Leer parámetro de la URL y reflejar en la página
const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('message');
if (message) {
  console.log(`Mensaje recibido de la URL: ${message}`);
  document.getElementById('xss-output-4').innerHTML = `Mensaje: ${message}`;
}


// Ejemplo 5: XSS en un Campo de Búsqueda
document.getElementById('xss-form-5').addEventListener('submit', function(event) {
  event.preventDefault();
  const userInput = document.getElementById('xss-input-5').value;
  // Reflejando la entrada del usuario sin escapar
  document.getElementById('xss-output-5').innerHTML = `Resultados para: ${userInput}`;
});

