let noteArr = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"];

let inputLength = 7;

let transposeBtn = document.getElementById("transpose-btn");

transposeBtn.addEventListener("click", transposeProcess);

function transposeProcess(e) {
  document.getElementById("warning").style.visibility = "hidden";
  e.preventDefault();

  let valid = true; // checks if user-input is valid or not

  // Previous Key
  let prevK = noteArr.indexOf(
    document.getElementById("user-input1").value.toUpperCase()
  );

  // New Key
  let newK = noteArr.indexOf(
    document.getElementById("new-key").value.toUpperCase()
  );

  let addingFactor = 12 + (newK - prevK);

  // Array that stores user input
  let inputArr = [];

  let outputVal = [];

  for (let j = 1; j <= inputLength && valid; j++) {
    let inputVal = document.getElementById(`user-input${j}`).value;

    if (inputVal != "" && noteArr.indexOf(inputVal.toUpperCase()) === -1) {
      valid = false;
    } else if (inputVal != "") {
      inputArr.push(inputVal.toUpperCase());
      // transpoing and adding the values to the array outputVal
      let i = noteArr.indexOf(inputVal.toUpperCase());
      outputVal.push(noteArr[(i + addingFactor) % noteArr.length]);
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
    document.getElementById("warning").style.visibility = "visible";

    document.getElementById("oldOutputCard").style.visibility = "hidden";
    document.getElementById("newOutputCard").style.visibility = "hidden";
  }
}

/*
//Things to fix:
1. 
2. UI - DONE for now
3. What to do when user enters a minor chord
4. 
5. undefined - DONE
6. What if user enters wrong letters? - DONE
7. IDK why there is a scroll bar
8. make it reactive
*/
