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
  let prevK = noteArr1.indexOf(
    capitalizedFirstLetter(filterInput(prevKID.value))
  );

  // New Key
  let newK = noteArr1.indexOf(
    capitalizedFirstLetter(filterInput(newKID.value))
  );

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
          let i = noteArr1.indexOf(filterInput(inputVal));
          outputVal.push(
            noteArr1[(i + addingFactor) % noteArr1.length] +
              inputSlice(inputVal)
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
