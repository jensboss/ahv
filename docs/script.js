const ahvNumberInput = document.getElementById("ahv-number");
const randomizeButton = document.getElementById("randomize-button");
const submitButton = document.getElementById("submit-button");
const responseText = document.getElementById("response-text");

submitButton.addEventListener("click", encodeAhvNumber);
randomizeButton.addEventListener("click", randomAhvNumber);

const words = []

function populateWords(text) {
    const lines = text.split('\n');
    lines.forEach(function(word) {
        if (word.trim() !== '') {
            words.push(word);
        } 
      });
}

function computeCheckDigit(digits) {
    const weightedDigits = digits.map((value, idx) => {
        const weight = (idx % 2) * 2 + 1;
        return value * weight
    });
    console.log(weightedDigits);

    var sum = 0;
    for (var i = 0; i < weightedDigits.length; i++) {
        sum += weightedDigits[i];
    }

    var checkSumMod10 = sum % 10;
    checkSumMod10 =  (checkSumMod10 > 0) ? (10 - checkSumMod10) : checkSumMod10
    return checkSumMod10
}

function randomAhvNumber() {
    const randomDigits = [7, 5, 6]; //country code
    for (var i = 0; i < 9; i++) {
        var randomNum = Math.floor(Math.random() * 10) + 1;
        randomDigits.push(randomNum);
    }
    console.log(randomDigits);
    const checkDigit = computeCheckDigit(randomDigits);
    console.log(checkDigit);

    var ahvNumberString = randomDigits.join('') + checkDigit;
    console.log(ahvNumberString);
    ahvNumberString = ahvNumberString.slice(0, 3) + "." 
                        + ahvNumberString.slice(3,7) + "." 
                        + ahvNumberString.slice(7,11) + "." 
                        + ahvNumberString.slice(11,13);
    ahvNumberInput.value = ahvNumberString
    responseText.textContent = "";
}

function encodeBase2048(ahvNumber) {
    const subjectId = ahvNumber.replaceAll('.', '').substring(3, 12);
    var subjectNumber = parseInt(subjectId);
    var remainder;
    console.log(subjectNumber);
    const encoding = [];
    while (subjectNumber > 0) {
        remainder = subjectNumber % 2048;
        subjectNumber = Math.trunc(subjectNumber / 2048);
        console.log(subjectNumber);
        encoding.push(remainder);
    }
    return encoding.reverse()
}
    

function encodeAhvNumber() {
    ahvNumber = ahvNumberInput.value;
    const wordIndices = encodeBase2048(ahvNumber);
    const encodingWords = wordIndices.map(idx => words[idx]);
    responseText.textContent = encodingWords.join(" ");
}

window.onload = function() {
    fetch('english.txt')
      .then(response => response.text())
      .then(data => populateWords(data))
      .catch(error => console.error(error));
  };
