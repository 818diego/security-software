// Ejemplo 1: Inyección SQL en la autenticación
document.getElementById('sql-form-1').addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('sql-input-username-1').value;
  const password = document.getElementById('sql-input-password-1').value;
  const sqlQuery = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
  document.getElementById('sql-output-1').innerHTML = `Consulta SQL ejecutada: ${sqlQuery}`;
  console.log(`Consulta SQL ejecutada: ${sqlQuery}`);
});

// Ejemplo 2: Inyección SQL en una búsqueda
document.getElementById('sql-form-2').addEventListener('submit', function (event) {
  event.preventDefault();
  const productName = document.getElementById('sql-input-2').value;
  const sqlQuery = `SELECT * FROM products WHERE name='${productName}'`;
  document.getElementById('sql-output-2').innerHTML = `Consulta SQL ejecutada: ${sqlQuery}`;
  console.log(`Consulta SQL ejecutada: ${sqlQuery}`);
});

// Ejemplo 3: Inyección SQL en la actualización de datos
document.getElementById('sql-form-3').addEventListener('submit', function (event) {
  event.preventDefault();
  const newUsername = document.getElementById('sql-input-username-3').value;
  const sqlQuery = `UPDATE users SET username='${newUsername}' WHERE id=1`;
  document.getElementById('sql-output-3').innerHTML = `Consulta SQL ejecutada: ${sqlQuery}`;
  console.log(`Consulta SQL ejecutada: ${sqlQuery}`);
} );
