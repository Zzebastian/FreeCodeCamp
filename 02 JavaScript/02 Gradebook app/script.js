// Este script combina todos los scrips individuales
// Script 01
console.log("Script 01")
function getAverage(scores) {
    let element = 0;
    for (let i = 0; i < scores.length; i++) {
        element += scores[i];
    }
    return element / scores.length;
}

console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));

// Script 02
console.log("Script 02")
function getGrade(score) {
    if (score == 100) {
        return "A++"
    }
    else if (score >= 90 && score < 99) {
        return "A"
    }
    else if (score >= 80 && score < 89) {
        return "B"
    }
    else if (score >= 70 && score < 79) {
        return "C"
    }
    else if (score >= 60 && score < 69) { return "D" }
    else {
        return "F"
    }
}

console.log(getGrade(96));
console.log(getGrade(82));
console.log(getGrade(56));
// Script 03
/*Esta función respecto script 03 
pues se puede llamar a una función para hacer parte del trabajo*/
console.log("Script 03")
function hasPassingGrade(score) {
    if (getGrade(score) !== "F") { return true }
    return false
}


console.log(hasPassingGrade(100));
console.log(hasPassingGrade(53));
console.log(hasPassingGrade(87));

//   Script 04 Final
console.log("Script 04")
function studentMsg(totalScores, studentScore) {
    if (hasPassingGrade(studentScore) == true) {
        return "Class average: " + getAverage(totalScores) + ". Your grade: " + getGrade(studentScore) + ". You passed the course."
    }
    return "Class average: " + getAverage(totalScores) + ". Your grade: " + getGrade(studentScore) + ". You failed the course."
}
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));