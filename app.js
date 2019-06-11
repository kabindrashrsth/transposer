let noteArr1 = ["C", "D", "E", "F", "G", "A", "B"];
let noteArr2 = ["m", "b", "#", "7", "3", "9"];
let noteArr3 = ["m", "7", "3", "9"];
let noteArr4 = ["7", "3", "9"];

let inputLength = 12;

let transposeBtn = document.getElementById("transpose-btn");

transposeBtn.addEventListener("click", transposeProcess);

function transposeProcess(e) {
  e.preventDefault();

  let valid = true; // checks if user-input is valid or not

  document.getElementById("new-key").style.border = "none";
  document.getElementById("user-input1").style.border = "none";

  let prevKID = document.getElementById("user-input1");
  let newKID = document.getElementById("new-key");

  // Previous Key
  let prevK = noteArr1.indexOf(capitalizedFirstLetter(prevKID.value).charAt(0));

  // New Key
  let newK = noteArr1.indexOf(capitalizedFirstLetter(newKID.value).charAt(0));

  console.log(prevK);
  console.log(newK);

  if (newK != -1 && prevK != -1) {
    // newK is valid, so sets green border
    document.getElementById("new-key").style.border = "green solid 1px";

    let addingFactor = noteArr1.length + (newK - prevK);

    // Array that stores user input
    let inputArr = [];

    let outputVal = [];

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
          inputArr.push(inputVal);
          // transpoing and adding the values to the array outputVal
          let i = noteArr1.indexOf(inputVal.charAt(0));
          outputVal.push(
            noteArr1[(i + addingFactor) % noteArr1.length] + inputVal.slice(1)
          );
        }
      }
    }

    if (valid) {
      // For output
      let nOutput = document.getElementById("newOutput");
      let oOutput = document.getElementById("oldOutput");

      let newOutputString = "";
      let oldOldputString = "";

      for (let i = 0; i < inputArr.length; i++) {
        oldOldputString += inputArr[i] + "   ";
        newOutputString += outputVal[i] + "   ";
      }

      oOutput.innerText = oldOldputString;

      nOutput.innerText = newOutputString;

      document.getElementById("oldOutputCard").style.visibility = "visible";
      document.getElementById("newOutputCard").style.visibility = "visible";
    } else {
      showWarning();
    }
  } else {
    if (newK === -1) {
      document.getElementById("new-key").style.border = "red solid 2px";
      if (newKID.value === "") {
        showKeyWarning();
      } else {
        showWarning();
      }
    }
    if (prevK === -1) {
      document.getElementById("user-input1").style.border = "red solid 2px";
      if (prevKID.value === "") {
        showKeyWarning();
      } else {
        showWarning();
      }
    }
  }
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

// validates the user input
function validateInput(input) {
  let isValid = false;

  switch (input.length) {
    case 1:
      if (noteArr1.indexOf(input) != -1) {
        isValid = true;
      }
      break;

    case 2:
      if (
        noteArr1.indexOf(input.charAt(0)) != -1 &&
        noteArr2.indexOf(input.charAt(1)) != -1
      ) {
        isValid = true;
      }
      break;

    case 3:
      if (
        noteArr1.indexOf(input.charAt(0)) != -1 &&
        noteArr2.indexOf(input.charAt(1)) != -1 &&
        noteArr3.indexOf(input.charAt(2)) != -1 &&
        input.charAt(1) != input.charAt(2)
      ) {
        isValid = true;
      }
      break;

    case 4:
      if (
        noteArr1.indexOf(input.charAt(0)) != -1 &&
        noteArr2.indexOf(input.charAt(1)) != -1 &&
        noteArr3.indexOf(input.charAt(2)) != -1 &&
        noteArr4.indexOf(input.charAt(3)) != -1 &&
        input.charAt(1) != input.charAt(2) &&
        input.charAt(2) != input.charAt(3)
      ) {
        isValid = true;
      }
      break;
  }

  return isValid;
}

/*
//Things to fix:
1. 
2. UI - DONE for now
3. What to do when user enters a minor chord?
   Make two arrays: one for first letter and another for all possible second characters. - DONE

4. 
5. undefined - DONE
6. What if user enters wrong letters? - DONE
7. IDK why there is a scroll bar - DONE
8. make it responsive - DONE
9. not accepting flats. - DONE
10. how did Bb -> A gave G#? -DONE
11. how to deal with 'add's?

*/
