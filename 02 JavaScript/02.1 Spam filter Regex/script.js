const messageInput = document.getElementById("message-input");
const result = document.getElementById("result");
const checkMessageButton = document.getElementById("check-message-btn");

const helpRegex = /please help|assist me/i;
// please help|assist me: El operador | actúa como un “o” lógico, buscando cualquiera de las dos frases.
// i: El modificador i hace que la búsqueda sea insensible a mayúsculas y minúsculas.

const dollarRegex = /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i;
// [0-9]+: Busca uno o más dígitos.
// \s*: Permite cero o más espacios en blanco.
// (?:hundred|thousand|million|billion)?: Un grupo no capturante que busca opcionalmente una de estas palabras.
// \s+: Uno o más espacios en blanco.

const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;
// (?:^|\s): Asegura que la frase esté al inicio de la cadena o precedida por un espacio.
// fr[e3][e3]: Busca “free” con variaciones en las letras “e” (puede ser “e” o “3”).
// m[o0]n[e3]y: Busca “money” con variaciones en las letras “o” (puede ser “o” o “0”) y “e” (puede ser “e” o “3”).
// (?:$|\s): Asegura que la frase esté al final de la cadena o seguida por un espacio.

const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;
// [s5][t7][o0][c{[(]k: Busca “stock” con variaciones en las letras “s” (puede ser “s” o “5”), “t” (puede ser “t” o “7”), “o” (puede ser “o” o “0”), y “c” (puede ser “c”, “{”, “[” o “(”).

const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;


const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

const isSpam = (msg) => denyList.some((regex) => regex.test(msg));
// Si algún (some) elemento de denyList, al cual voy a llamar regex, testea positivo en msg, devuelve "true"

checkMessageButton.addEventListener("click", () => {
  if (messageInput.value === "") {
    alert("Please enter a message.");
    return;
  }

  result.textContent = isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";
  messageInput.value = "";
});