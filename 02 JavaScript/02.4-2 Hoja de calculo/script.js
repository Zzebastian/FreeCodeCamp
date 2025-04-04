const infixToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
}

const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));
// Esta función evalua una cadena de texto y la convierte en una función que puede ser ejecutada.
const highPrecedence = str => {
  const regex = /([\d.]+)([*\/])([\d.]+)/;
  // \d es lo mismo que 0-9   El punto es para incluir decimales y el "+" es para que tomar el número completo.
  // Entre paréntesis se colocan los grupos que se quieren capturar
  // muy importante que no sea global, pues así se detendrá en la primier coincidencia.
  // return regex.test(str); // Esta línea es borrada posteriormente, lo único que hace es chequear si la cadena tiene un número seguido de un operador y otro número

  const str2 = infixEval(str, regex);
  return str === str2 ? str : highPrecedence(str2);
}

const isEven = num => num % 2 === 0;
const sum = (nums) =>nums.reduce((total,num)=>total+num,0)
// Toma entrada nums, le aplica una función donde a total (al que se le asigna valor inicial "0") se le suma "num" y el resultado se le asigna a total 
//   https://www.w3schools.com/jsref/jsref_reduce.asp
// Estas ds funciones son para crear un rango de números y de caracteres
const average = nums => sum(nums) / nums.length;

const median = nums => {
  const sorted = nums.slice().sort((a, b) => a - b);
// Es necesario colocar primero slice() para no alterar el array original, ya que sort() lo altera.
const length = sorted.length;
// length es una propiedad, NO una función, por lo que no se le colocan paréntesis.
const middle = length / 2 - 1;
return isEven(length)
    ? average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];
}

const spreadsheetFunctions = {
  "": str => str,
  sum,
  average,
  median,
  even:nums=>nums.filter(num=>isEven(num)),
  // En el ejercicio de FCC se hace distino, pero son equivalentes.
  // even: nums => nums.filter(isEven),
  someeven: nums => nums.some(isEven),
  everyeven: nums => nums.every(isEven),
  firsttwo: nums => nums.slice(0, 2),
  lasttwo: nums => nums.slice(-2),
  has2: nums=> nums.find(num=>num===2)===2?true:false,
  // has2: nums => nums.includes(2),
  increment: nums => nums.map(num=>num+1),
  random: nums => (nums.slice(0,2)[1]-nums.slice(0,2)[0])*Math.random()+nums.slice(0,2)[0],
  // random: ([x, y]) => Math.floor(Math.random() * y + x),
  range: nums => range(nums[0],nums[1]),
  // range: nums => range(...nums),
  nodupes: nums => [...new Set(nums)()]

}

const applyFunction = str => {
  const noHigh = highPrecedence(str);
  const infix = /([\d.]+)([+-])([\d.]+)/;
  // Se obtiene la primer Suma o Resta
  const str2 = infixEval(noHigh, infix);
  
  
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
  // Se obtiene la primer función que se encuentra en la cadena de texto
  const toNumberList = args => args.split(",").map(parseFloat);
  const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
  return str2.replace(functionCall, (match, fn, args) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) );
}

const range = (start, end) => Array(end - start + 1).fill(start).map((elemento ,indice )=>elemento+indice);//**** */
// Array es un constructor, que crea un array de "n" elementos
// .fill es un método que se le aplica al constructor para llenar esos elementos
// .map genera un nuevo array sin alterar el original para lo cual se le debe ingresar una función para el tratamiento donde elemento es el valor original colocado por "fill" y indice es la posición de ese valor en el array
//     https://www.w3schools.com/jsref/jsref_map.asp

const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map((code)=>String.fromCharCode(code));//**** */


// Es lo mismo que el anterior pero con caracteres, se usa charCodeAt para obtener el valor ASCII de un caracter y "0" para obtener el primer caracter de la cadena únicamente.
// Luego le encadeno el map para obtener el caracter de ese valor ASCII
const evalFormula = (x, cells) => {
  const idToText = id => cells.find(cell => cell.id === id).value;
  // obtiene el valor de la celda referenciada y lo coloca en la ecuación actual
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
  const elemValue = num => character => idToText(character + num);
  // esta línea es una reducción del siguiente código
        // const elemValue = num => {
        //   const inner = character => {
        //     return idToText(character + num);
        //   }
        //   return inner;
        // }
  const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue(num));
  // esta línea es una reducción del siguiente código
        // const addCharacters = function(character1) {
        //   return function(character2) {
        //       return function(num) {
        //           return charRange(character1, character2).map(elemValue(num));;
        //       };
        //   };
        // };
  // Los argumentos se ingresan en funciones anidadas para permitir invocaciones parciales
  // .map se utiliza para aplicar la función elemValue a cada elemento y se le ingresa el valor de num para que se le agregue a cada elemento el número de fila correspondiente.
  const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
  // De la siguiente manera se puede llamar a todas las fuciones currying:
  // funcion(par1)(par2)(par3)
  const cellRegex = /[A-J][1-9][0-9]?/gi;
  const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase()));
  const functionExpanded = applyFunction(cellExpanded);
  return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);
}

window.onload = () => {
    const container = document.getElementById("container");
    const createLabel = (name) => {
        const label = document.createElement("div");
        label.className = "label";
        label.textContent = name;
        // className y textContent son propiedades
        // createElement es un atributo
        // por eso la asignación en el primero se hace con "=" mientras que la --aplicación-- en el segundo se logra con "()"
        container.appendChild(label);

    }
    const letters = charRange("A", "J");
    letters.forEach((letter)=>createLabel(letter))
    // Aquí se crea un label por cada letra del rango de letras de "A" a "J" y se le asigna el texto de la letra y todo esto se coloca en el contenedor visible en el HTML.
    //     https://www.w3schools.com/jsref/jsref_foreach.asp
    // .forEach se aplica a cada elemento del array
    range(1, 99).forEach(number => {
        createLabel(number);
        letters.forEach(letter => {
          const input = document.createElement("input");
          input.type = "text";
          input.id = letter + number;
          input.ariaLabel = letter + number;
          // Con todos estos elementos se le va dando forma a la hoja de cálculo
          input.onchange = update;        
          // Se le asigna la función update a la propiedad onchange del input, para que cada vez que cambie el valor de un input se ejecute la función update.
          container.appendChild(input);
          // Con esta última acción se crea la matriz de cálculo, hasta antes de este punto, la hoja de cálculo se veía muy descolocada
        })
})
}

const update = event => {
  const element = event.target;
  // target es una propiead que devuelve qué elemento disparó el evento
  const value = element.value.replace(/\s/g, "");
  if (!value.includes(element.id) && value.startsWith('=')) {
    // Elimina la posiblidad que dentro del valor se referencie la misma celda
    element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children));
    // Array.from convierte el HTMLCollection en un array para que se le pueda aplicar el método children
  }
}