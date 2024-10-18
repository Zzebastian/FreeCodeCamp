const sortButton = document.getElementById("sort");

const sortInputArray = (event) => {
  event.preventDefault();
  // Se utiliza para evitar el comportamiento predeterminado, ejemplo, evitar que  un formulario sea enviado

  const inputValues = [
    ...document.getElementsByClassName("values-dropdown")
  ].map((dropdown) => Number(dropdown.value));

  // const inputValues = document.getElementsByClassName("values-dropdown");
  //   Obtengo los valores
  // const inputValues = [...document.getElementsByClassName("values-dropdown")];
  // los coloco en un array
  // const inputValues = [...document.getElementsByClassName("values-dropdown")].map((dropdown)=>dropdown.value);
  // map y su función => devuelve implícitamente los elemento elejidps
  // const inputValues = [...document.getElementsByClassName("values-dropdown")].map((dropdown) => Number(dropdown.value));
  // Number, transforma el texto del array en números


  const sortedValues = inputValues.sort((a, b) => {
    return a - b;
  });
  // Para sort(con su callback function), el 10 es mayor que 2
  //const sortedValues = inputValues.sort();
  // Para sort, el 10 es menor que 2

  updateUI(sortedValues);
}

const updateUI = (array = []) => {
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  })
}

const bubbleSort = (array) => {
  // El primer algoritmo de ordenamiento que implementarás es el ordenamiento de burbuja, que comienza al inicio del arreglo y “burbujea” los valores no ordenados hacia el final, iterando a través del arreglo hasta que esté completamente ordenado.
  // Este método es simple de implementar pero ineficiente en listas grandes
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}

const selectionSort = (array) => {
  // Intercambios: Realiza menos intercambios en comparación con Bubble Sort.

  // Proceso: Encuentra el elemento mínimo (o máximo) en cada iteración y lo coloca en su posición correcta.
  // Estabilidad: Es un algoritmo inestable, lo que significa que no preserva el orden relativo de los elementos iguales1.
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }

  return array;
}

const insertionSort = (array) => {
  
  for (let i = 1; i < array.length; i++) {
    // Guarda el valor actual en una variable
    const currValue = array[i];
    // Inicializa j con el índice del elemento anterior
    let j = i - 1;

    // Desplaza los elementos del arreglo ordenado hacia adelante hasta encontrar la posición correcta para currValue
    while (j >= 0 && array[j] > currValue) {
      // Mueve el elemento hacia adelante
      array[j + 1] = array[j];
      j--;
    }
    // Inserta currValue en su posición correcta
    array[j + 1] = currValue;
  }
  return array;
}

sortButton.addEventListener("click", sortInputArray);