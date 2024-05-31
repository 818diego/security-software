document.getElementById('generate-keys').addEventListener('click', function() {
  const keySizes = [1024, 2048, 4096];
  let modalContent = '';

  keySizes.forEach(size => {
      console.log(`Generando claves RSA de ${size} bits...`);
      const { publicKey, privateKey } = generateKeys(size);
      console.log(`Clave Pública (${size} bits):`, publicKey);
      console.log(`Clave Privada (${size} bits):`, privateKey);

      modalContent += `<h3 class="text-xl font-bold mt-4">${size} bits</h3>`;
      modalContent += `<p><strong>Clave Pública:</strong> e=${publicKey.e}, n=${publicKey.n}</p>`;
      modalContent += `<p><strong>Clave Privada:</strong> d=${privateKey.d}, n=${privateKey.n}</p>`;
  });

  document.getElementById('modal-content').innerHTML = modalContent;
  document.getElementById('modal').classList.remove('hidden');
});

document.getElementById('close-modal').addEventListener('click', function() {
  document.getElementById('modal').classList.add('hidden');
});

function generateKeys(bits) {
  const e = 65537n; // Valor comúnmente utilizado para e

  // Función para generar un número primo grande de "bits" bits
  function generateLargePrime(bits) {
      const min = 1n << BigInt(bits - 1);
      const max = (1n << BigInt(bits)) - 1n;

      while (true) {
          const num = randomBigInt(min, max);
          if (isPrime(num)) {
              return num;
          }
      }
  }

  // Función para generar un número aleatorio en el rango [min, max]
  function randomBigInt(min, max) {
      const range = max - min;
      const bitLength = range.toString(2).length;
      let rand;
      do {
          rand = BigInt('0b' + Array.from({ length: bitLength }, () => Math.floor(Math.random() * 2)).join(''));
      } while (rand > range);
      return rand + min;
  }

  // Prueba de primalidad básica (Miller-Rabin sería mejor para producción)
  function isPrime(num) {
      if (num < 2n) return false;
      if (num === 2n || num === 3n) return true;
      if (num % 2n === 0n || num % 3n === 0n) return false;
      let i = 5n;
      while (i * i <= num) {
          if (num % i === 0n || num % (i + 2n) === 0n) return false;
          i += 6n;
      }
      return true;
  }

  const p = generateLargePrime(bits / 2);
  const q = generateLargePrime(bits / 2);
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);
  const d = modInverse(e, phi);

  return {
      publicKey: { e, n },
      privateKey: { d, n }
  };
}

function modInverse(a, m) {
  const m0 = m;
  let y = 0n, x = 1n;
  let aBig = BigInt(a);
  let mBig = BigInt(m);

  while (aBig > 1n) {
      const q = aBig / mBig;
      let t = mBig;

      mBig = aBig % mBig;
      aBig = t;
      t = y;

      y = x - q * y;
      x = t;
  }

  if (x < 0n) x += m0;
  return x;
}
