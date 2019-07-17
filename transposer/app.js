// list of valid input values
let noteArr1 = [
  "C",
  "C#",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "Bb",
  "B"
];
//let noteArr2 = ["m", "b", "#", "7", "3", "9"];
let noteArr2 = ["m"];
let noteArr3 = ["7", "9", "2", "4"];

// number of input boxes
let inputLength = 12;

let transposeBtn = document.getElementById("transpose-btn");
transposeBtn.addEventListener("click", transposeProcess);

// transpose process
function transposeProcess(e) {
  e.preventDefault();

  let valid = true; // checks if user-input is valid or not

  let prevKID = document.getElementById("old-key");
  let newKID = document.getElementById("new-key");

  // Index of Previous Key
  let indexOfPrevK = noteArr1.indexOf(
    capitalizedFirstLetter(filterInput(prevKID.value))
  );

  // Index of New Key
  let indexOfNewK = noteArr1.indexOf(
    capitalizedFirstLetter(filterInput(newKID.value))
  );

  let isNewKValid = validateInput(capitalizedFirstLetter(newKID.value));
  let isPrevKValid = validateInput(capitalizedFirstLetter(prevKID.value));
  // if new key and previous key are valid
  if (isNewKValid && isPrevKValid) {
    // indexOfNewK is valid, so sets oragne border
    prevKID.style.border = "#E88F00 solid 2px";
    newKID.style.border = "#E88F00 solid 2px";

    let addingFactor = noteArr1.length + (indexOfNewK - indexOfPrevK);

    // Array that stores user input
    let inputArr = [];
    let outputArr = [];

    for (let j = 1; j <= inputLength && valid; j++) {
      let inputID = document.getElementById(`user-input${j}`);
      let inputVal = inputID.value;

      if (inputVal != "") {
        inputVal = inputVal.trim();
        inputVal = capitalizedFirstLetter(inputVal);

        if (!validateInput(inputVal)) {
          valid = false;

          inputID.style.border = "none";
          inputID.style.border = "red solid 2px";
        } else {
          inputID.style.border = "none";
          inputID.style.border = "green solid 1px";

          storeTransposeResultsInArrays(
            inputArr,
            outputArr,
            inputVal,
            addingFactor
          );
        }
      }
    }

    if (valid) {
      displayOutput(inputArr, outputArr);
      document.getElementById("oldOutputCard").style.visibility = "visible";
      document.getElementById("newOutputCard").style.visibility = "visible";
    } else {
      showWarning();
    }
  } else {
    if (!isNewKValid) {
      newKID.style.border = "red solid 2px";
      if (newKID.value === "") {
        showKeyWarning();
      } else {
        showWarning();
      }
    }
    if (!isPrevKValid) {
      prevKID.style.border = "red solid 2px";
      if (prevKID.value === "") {
        showKeyWarning();
      } else {
        showWarning();
      }
    }
  }
}

//adds the values to input array and output array
function storeTransposeResultsInArrays(
  inputArr,
  outputArr,
  inputVal,
  addingFactor
) {
  console.log(inputArr);
  inputArr.push(inputVal);
  // transpoing and adding the values to the array outputArr
  let i = noteArr1.indexOf(filterInput(inputVal));
  outputArr.push(
    noteArr1[(i + addingFactor) % noteArr1.length] + inputSlice(inputVal)
  );
}

// displays the output
function displayOutput(inputArr, outputArr) {
  // For output
  let nOutput = document.getElementById("newOutput");
  let oOutput = document.getElementById("oldOutput");

  let newOutputString = "";
  let oldOldputString = "";

  for (let i = 0; i < inputArr.length; i++) {
    oldOldputString += inputArr[i] + "   ";
    newOutputString += outputArr[i] + "   ";
  }

  oOutput.innerText = oldOldputString;

  nOutput.innerText = newOutputString;
}

// pre: accepts a string as parameter
// post: returns a string with first letter in upper-case
function capitalizedFirstLetter(inputVal) {
  return inputVal.charAt(0).toUpperCase() + inputVal.slice(1);
}

// displays warning
function showWarning() {
  document.getElementById("oldOutputCard").style.visibility = "hidden";
  document.getElementById("newOutputCard").style.visibility = "hidden";

  alert(
    "Woops! It seems like you have entered an invalid chord name. Please check if all of your inputs are valid"
  );
}

function showKeyWarning() {
  document.getElementById("oldOutputCard").style.visibility = "hidden";
  document.getElementById("newOutputCard").style.visibility = "hidden";

  alert("Don't forget to enter the key!");
}

// filters the input to get only the values that match with values of noteArr1
function filterInput(input) {
  if (input.charAt(1) === "b" || input.charAt(1) === "#") {
    return input.substring(0, 2);
  } else {
    return input.charAt(0);
  }
}

// input slice
function inputSlice(input) {
  if (input.charAt(1) === "b" || input.charAt(1) === "#") {
    return input.slice(2);
  } else {
    return input.slice(1);
  }
}

// validates the user input
function validateInput(input) {
  let isValid = false;

  let firstHalf = filterInput(input);
  let secondHalf = inputSlice(input);

  console.log(inputSlice("d").length);

  if (noteArr1.indexOf(firstHalf) != -1) {
    if (secondHalf.length > 0) {
      switch (secondHalf.length) {
        case 1:
          if (
            noteArr2.indexOf(secondHalf) != -1 ||
            noteArr3.indexOf(secondHalf) != -1
          ) {
            isValid = true;
          }
          break;

        case 2:
          if (
            noteArr2.indexOf(secondHalf.charAt(0)) != -1 &&
            noteArr3.indexOf(secondHalf.charAt(1)) != -1
          ) {
            isValid = true;
          }
          break;

        case 4:
          if (
            (secondHalf.substring(0, 3).toLowerCase() === "add" &&
              noteArr3.indexOf(secondHalf.charAt(3)) != -1) ||
            (secondHalf.substring(0, 3).toLowerCase() === "sus" &&
              noteArr3.indexOf(secondHalf.charAt(3)) != -1)
          ) {
            isValid = true;
          }
          break;

        case 5:
          if (
            noteArr2.indexOf(secondHalf.charAt(0)) != -1 &&
            secondHalf.substring(1, 4).toLowerCase() === "add" &&
            noteArr3.indexOf(secondHalf.charAt(4)) != -1
          ) {
            isValid = true;
          }
          break;
      }
    } else {
      isValid = true;
    }
  }

  return isValid;
}
