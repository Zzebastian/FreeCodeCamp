const clearBtn = document.getElementById("clear-btn");
const checkBtn = document.getElementById("check-btn");
const escribir = (msj,nro) => {
  document.querySelector("#results-div").textContent += msj + nro;
  // document.querySelector("#results-div").innerHTML += `<p>${msj} + ${nro}<p>`;
}
const borrar = (event) => {
  event.preventDefault();
  document.querySelector("#results-div").textContent = ""
};

const testear = (event) => {
  event.preventDefault();
  const str = document.getElementById("user-input").value;
  
  
  
  if (str =="") {alert("Please provide a phone number")}
  
  const regex = /(.?[0-9])?[ ]?([\-(])?([0-9]{3,})([-)])?[ ]?([0-9]{3,})[ \-]?([0-9]{4,})/;
  const match = str.match(regex);
  if (!match){return escribir("Invalid US number: ",str)}
  match.shift();
  
  
  if ((match.includes("(") && !match.includes(")"))||(!match.includes("(") && match.includes(")"))){
    return escribir("Invalid US number: ",str)
  }
  
  const texto = match.join("").replace("(","").replace(")","");

  if ((texto.replace(/\-/g,"").length == 11 && texto[0]==1) || texto.replace(/\-/g,"").length == 10) {return escribir("Valid US number: ",str)}
  else {return escribir("Invalid US number: ",str)}
}

clearBtn.addEventListener("click", borrar);
checkBtn.addEventListener("click", testear);
