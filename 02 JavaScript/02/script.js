const button = document.getElementById("convert-btn");
const number = document.getElementById("number");1001
const output = document.getElementById("output")
const romanos = [{ letra: "M", numero: 1000 },
{ letra: "D", numero: 500 },
{ letra: "C", numero: 100 },
{ letra: "L", numero: 50 },
{ letra: "X", numero: 10 },
{ letra: "V", numero: 5 },
{ letra: "I", numero: 1 },]


const convertir = (value, index) => {
    // console.log(number);
    // console.log(romanos[index].letra);
    
    if (value >= romanos[index].numero) {
        output.innerText += romanos[index].letra
        convertir(value -romanos[index].numero, index)
    } else convertir(value, index+1)
}

const director = () => {
    const value = parseInt(number.value);
    if (!value) { output.innerText = "Please enter a valid number"; return }
    if (value <= 0) { output.innerText = "Please enter a number greater than or equal to 1"; return }
    if (value >= 4000) { output.innerText = "Please enter a number less than or equal to 3999"; return }
    output.innerText = ""
    convertir(value, 0);
}

button.addEventListener("click", director);


