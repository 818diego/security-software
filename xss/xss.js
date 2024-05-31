// Función de sanitización (comentar para fines educativos)
function sanitizeInput(input) {
  const temp = document.createElement('div');
  temp.textContent = input;
  return temp.innerHTML;
}

// Ejemplo 1: XSS Reflejado
document.getElementById('xss-form-1').addEventListener('submit', function (event) {
  event.preventDefault();
  const userInput = document.getElementById('xss-input-1').value;
  // const sanitizedInput = sanitizeInput(userInput); // Descomentar para sanitizar
  alert(`Entrada del usuario en Ejemplo 1: ${userInput}`);
  // Reflejando la entrada del usuario sin escapar (demostración de vulnerabilidad)
  document.getElementById('xss-output-1').innerHTML = `Hola, ${userInput}!`;
});

/**
 * Cómo probar la vulnerabilidad:
 * Ingresa el siguiente script en el campo de entrada y envía el formulario:
 * <script>alert('XSS Reflejado!');</script>
 */


// Ejemplo 2: XSS Almacenado
const comments = [];
document.getElementById('xss-form-2').addEventListener('submit', function (event) {
  event.preventDefault();
  const comment = document.getElementById('xss-input-2').value;
  // const sanitizedComment = sanitizeInput(comment); // Descomentar para sanitizar
  comments.push(comment);
  console.log(`Nuevo comentario almacenado: ${comment}`);
  displayComments();
});

function displayComments() {
  const output = document.getElementById('xss-output-2');
  output.innerHTML = '';
  comments.forEach(comment => {
    const div = document.createElement('div');
    // Reflejando comentarios almacenados sin escapar (demostración de vulnerabilidad)
    div.innerHTML = comment;
    console.log(`Mostrando comentario almacenado: ${comment}`);
    output.appendChild(div);
  });
}

/**
 * Cómo probar la vulnerabilidad:
 * Ingresa el siguiente script en el campo de comentario y envía el formulario:
 * <script>alert('XSS Almacenado!');</script>
 */


// Ejemplo 3: XSS Basado en DOM
document.getElementById('xss-form-3').addEventListener('submit', function (event) {
  event.preventDefault();
  const userInput = document.getElementById('xss-input-3').value;
  // const sanitizedInput = sanitizeInput(userInput); // Descomentar para sanitizar
  console.log(`Entrada del usuario en Ejemplo 3: ${userInput}`);
  const output = document.getElementById('xss-output-3');
  const div = document.createElement('div');
  // Insertando la entrada del usuario directamente en el DOM sin escapar (demostración de vulnerabilidad)
  div.innerHTML = userInput;
  output.appendChild(div);
});

/**
 * Cómo probar la vulnerabilidad:
 * Ingresa el siguiente script en el campo de mensaje y envía el formulario:
 * <script>alert('XSS Basado en DOM!');</script>
 */
