// Simulación de Phishing
document.getElementById('phishing-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('phishing-username').value;
  const password = document.getElementById('phishing-password').value;
  document.getElementById('phishing-output').innerHTML = `Credenciales recolectadas: <br> Usuario: ${username} <br> Contraseña: ${password}`;
  console.log(`Credenciales recolectadas: Usuario: ${username}, Contraseña: ${password}`);
});
