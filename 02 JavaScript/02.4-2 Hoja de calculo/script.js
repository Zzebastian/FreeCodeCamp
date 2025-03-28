// Estas ds funciones son para crear un rango de números y de caracteres

const range = (start, end) => Array(end - start + 1).fill(start).map((elemento ,indice )=>elemento+indice);
// Array es un constructor, que crea un array de "n" elementos
// .fill es un método que se le aplica al constructor para llenar esos elementos
// .map genera un nuevo array sin alterar el original para lo cual se le debe ingresar una función para el tratamiento donde elemento es el valor original colocado por "fill" y indice es la posición de ese valor en el array
//     https://www.w3schools.com/jsref/jsref_map.asp
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map((code)=>String.fromCharCode(code));
// Es lo mismo que el anterior pero con caracteres, se usa charCodeAt para obtener el valor ASCII de un caracter y "0" para obtener el primer caracter de la cadena únicamente.
// Luego le encadeno el map para obtener el caracter de ese valor ASCII

window.onload = () => {
    const container = document.getElementById("container");
    const createLabel = (name) => {
        const label = document.createElement("div");
        label.className = "label";
        label.textContent = name;
        // className y textContent son propiedades
        // createElement es un atributo
        // por eso la asignación en el primero se hace con "=" mientras que la --aplicación-- en el segundo se logra con "()"

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
        //   Con todos estos elementos se le va dando forma a la hoja de cálculo
          container.appendChild(input)
        //   Con esta última acción se crea la matriz de cálculo, hasta antes de este punto, la hoja de cálculo se veía muy descolocada
        })
})
}