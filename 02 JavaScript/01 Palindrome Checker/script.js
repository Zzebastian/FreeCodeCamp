const checkBtn = document.getElementById("check-btn");
const result = document.getElementById('result');

const trueText = " is a palindrome"
const falseText = " is not a palindrome"

const checkFn = ()=>{
    const textInput = document.getElementById('text-input')
    const textFinal = cleanInputString(textInput.value)
    
    if (textFinal.length===1){ return createAnswer(true,textInput.value)}
    else if (textFinal.length===0){
        alert("Please input a value")}
    else {
    const textInverted = textFinal.split("").reverse().join("")
    return textFinal.toLowerCase() === textInverted.toLowerCase() ? createAnswer(true,textInput.value):createAnswer(false,textInput.value)
    }
}
function cleanInputString(str) {
    const regex = /[^a-zA-Z0-9]/g;
      // Esta es una expresión regular (regex) que se usa para encontrar todos los caracteres que no son alfanuméricos.
        
      //  ^ niega todo lo que es a continuación del mismo.

      // El modificador g indica que la búsqueda debe ser global, es decir, que debe encontrar todas las ocurrencias en la cadena, no solo la primera.
    return str.replace(regex, '');
  }
  const createAnswer = (res,textInput) =>{
    console.log(res);
    let text = res ? trueText:falseText
    result.innerText=textInput+text;
  }


checkBtn.addEventListener('click',checkFn);