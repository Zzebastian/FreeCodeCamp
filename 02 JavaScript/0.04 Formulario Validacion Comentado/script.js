// Obtiene los elementos del DOM por su ID
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

// Función para limpiar una cadena de caracteres específicos
function cleanInputString(str) {
  const regex = /[+-\s]/g;
    // /[+-\s]/ es una expresión regular (regex) que busca los caracteres +, - y cualquier espacio en blanco (\s).
      
    // El modificador g indica que la búsqueda debe ser global, es decir, que debe encontrar todas las ocurrencias en la cadena, no solo la primera.
  return str.replace(regex, '');
}

// Función para verificar si una cadena contiene una entrada inválida
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
    // /\d+e\d+/ es una expresión regular (regex) que busca patrones numéricos en notación científica.
    
    // \d+ significa uno o más dígitos.
    
    // e es el carácter que indica notación científica.
    
    // \d+ después de e significa uno o más dígitos.
    
    // El modificador i indica que la búsqueda no distingue entre mayúsculas y minúsculas
  return str.match(regex);
}

// Función para agregar una nueva entrada de calorías
function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

// Función para calcular las calorías
function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  // Obtiene los inputs de número de cada sección
  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
  const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
  const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
  const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
  const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

  // Calcula las calorías de cada sección
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
  // "budgetNumberInput" debe ser un array, de lo contrario, no funcinará. Esto significa que si quiero pasar un valor, lo que debo hacer es simplemente pasar el -valor- como un array

  if (isError) {
    return;
  }

  // Calcula las calorías consumidas y restantes
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';
  // es lo mismo que:
  //   let surplusOrDeficit;
  //   if (remainingCalories<){surplusOrDeficit="Surplus"}
  //   else {surplusOrDeficit="Deficit"}
  // al menos en la práctica, aunque la primera es una constante y la segunda una variable.
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove('hide');
}

// Función para obtener las calorías de los inputs
function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    // la variable en cuestión queda declarada en cada instancia del bucle, pero no tiene valor fuera de él.
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

// Función para limpiar el formulario
function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  for (const container of inputContainers) {
    container.innerHTML = '';
  }

  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

// Agrega los event listeners a los botones y al formulario
addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
