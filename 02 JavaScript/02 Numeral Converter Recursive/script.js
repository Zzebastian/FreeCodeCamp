const button = document.getElementById("convert-btn");
const number = document.getElementById("number");
const output = document.getElementById("output")
const romanos = [{ letra: "M", numero: 1000, indice: 2 },
{ letra: "D", numero: 500, indice: 2 },
{ letra: "C", numero: 100, indice: 4 },
{ letra: "L", numero: 50, indice: 4 },
{ letra: "X", numero: 10, indice: 6},
{ letra: "V", numero: 5, indice: 6},
{ letra: "I", numero: 1, indice: 7},
{ letra: "", numero: 0, indice: 7},]


const convertir = (value, index) => {
    if (index === 7) return
    
    const scnIndex = romanos[index].indice
    if (value >= romanos[index].numero) {
        output.innerText += romanos[index].letra
        convertir(value -romanos[index].numero, index)
    } else if (value >= romanos[index].numero-romanos[scnIndex].numero) {
        output.innerText += romanos[scnIndex].letra
        output.innerText += romanos[index].letra
        convertir(value -(romanos[index].numero-romanos[scnIndex].numero),index+1)
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
number.addEventListener("keydown",(e)=>{if (e.key==="Enter"){director()}})

