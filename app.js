let noteArr = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"];

let transposeBtn = document.getElementById("transpose-btn");

transposeBtn.addEventListener("click", transposeProcess);

function transposeProcess(e) {
  e.preventDefault;

  // Previous Key
  let prevK = noteArr.indexOf(document.getElementById("user-input1").value);

  // New Key
  let newK = noteArr.indexOf(document.getElementById("new-key").value);

  let addingFactor = 12 + (newK - prevK);

  // Array that stores user input
  let inputArr;

  //let inputVal = document.getElementById("user-input1").value;
  let outputVal = [];

  for (let j = 1; j < 8; j++) {
    let inputVal = document.getElementById(`user-input${j}`).value;

    if (inputVal != "") {
      let check = false;
      let i = 0;

      console.log(inputVal.toUpperCase());
      // Half-step transpose, use indexOf instead
      while (!check) {
        if (noteArr[i] === inputVal.toUpperCase()) {
          outputVal.push(noteArr[(i + addingFactor) % noteArr.length]); // outputVal = noteArr[i + 1];
          check = true;
        }
        i++;
      }
    }
  }

  let nOutput = document.getElementById("newOutput");

  nOutput.innerText = `${outputVal[0]}, ${outputVal[1]}, ${outputVal[2]}, ${
    outputVal[3]
  }, ${outputVal[4]}, ${outputVal[5]}, ${outputVal[6]},`;
}
