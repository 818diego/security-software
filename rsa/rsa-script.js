// script.js
document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtención de valores del formulario
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Generación de claves RSA
  const { publicKey, privateKey } = generateKeys();

  // Cifrado de datos
  const encryptedUsername = encrypt(username, publicKey);
  const encryptedPassword = encrypt(password, publicKey);

  console.log("Encrypted Username:", encryptedUsername);
  console.log("Encrypted Password:", encryptedPassword);

  // Desencriptado de datos para validación
  const decryptedUsername = decrypt(encryptedUsername, privateKey);
  const decryptedPassword = decrypt(encryptedPassword, privateKey);

  console.log("Decrypted Username:", decryptedUsername);
  console.log("Decrypted Password:", decryptedPassword);

  // Validación de datos
  if (username === decryptedUsername && password === decryptedPassword) {
      console.log("Validation successful");
  } else {
      console.log("Validation failed");
  }

  // Mostrar claves en console.log
  console.log("Public Key:", publicKey);
  console.log("Private Key:", privateKey);

  // Mostrar modal
  document.getElementById('modal').classList.remove('hidden');
});

document.getElementById('close-modal').addEventListener('click', function () {
  document.getElementById('modal').classList.add('hidden');
});

function generateKeys() {
  const p = generatePrimeNumber();
  const q = generatePrimeNumber();
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const e = findCoprime(phi);
  const d = modInverse(e, phi);

  return {
      publicKey: { e, n },
      privateKey: { d, n }
  };
}

function encrypt(message, key) {
  const { e, n } = key;
  return message.split('').map(char => {
      const m = char.charCodeAt(0);
      return modExp(m, e, n).toString();
  }).join(' ');
}

function decrypt(encryptedMessage, key) {
  const { d, n } = key;
  return encryptedMessage.split(' ').map(c => {
      const m = modExp(parseInt(c), d, n);
      return String.fromCharCode(m);
  }).join('');
}

function generatePrimeNumber() {
  // Genera un número primo pequeño para simplicidad
  const primes = [61, 53, 47, 41, 37, 31, 29, 23, 19, 17, 13, 11, 7, 5, 3, 2];
  return primes[Math.floor(Math.random() * primes.length)];
}

function findCoprime(phi) {
  let e = 3;
  while (gcd(e, phi) !== 1) {
      e += 2;
  }
  return e;
}

function modInverse(a, m) {
  const m0 = m;
  let y = 0, x = 1;
  if (m === 1) return 0;
  while (a > 1) {
      const q = Math.floor(a / m);
      let t = m;
      m = a % m;
      a = t;
      t = y;
      y = x - q * y;
      x = t;
  }
  if (x < 0) x += m0;
  return x;
}

function modExp(base, exp, mod) {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
      if (exp % 2 === 1) result = (result * base) % mod;
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
  }
  return result;
}

function gcd(a, b) {
  while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
  }
  return a;
}
