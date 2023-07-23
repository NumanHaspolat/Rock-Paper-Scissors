const yourChoice = document.getElementById("your-choice");
const pcChoice = document.getElementById("pc-choice");
const select = document.querySelector(".select");
const h2 = document.querySelectorAll(".h2");
let userSelect;
let pcRandom;

const yourScore = document.getElementById("you");
const pcScore = document.getElementById("pc");
const domTopScore = document.querySelector(".top-score");

const resultDiv = document.querySelector(".result-msg");
const containerEl = document.querySelector(".container");
const modalEl = document.querySelector(".modal-container");
const modalBtn = document.querySelector("#modal-ok");

const final = document.getElementById("final");

select.addEventListener("click", (e) => {
  if (e.target.getAttribute("alt")) {
    userSelect = e.target.getAttribute("alt");
    yourChoice.innerHTML = `<img src ="./assets/${userSelect}.png"></img>`;
    pc();
  }
});

const pcArr = ["tas", "kagit", "makas"];

function pc() {
  pcRandom = pcArr[Math.floor(Math.random() * 3)];
  console.log(pcRandom);
  pcChoice.innerHTML = `<img src ="./assets/${pcRandom}.png"></img>`;
  result();
}

function result() {
  switch (userSelect) {
    case "tas":
      if (pcRandom == "kagit") {
        lost();
      } else if (pcRandom == "makas") {
        win();
      }
      break;

    case "kagit":
      if (pcRandom == "makas") {
        lost();
      } else if (pcRandom == "tas") {
        win();
      }
      break;
    case "makas":
      if (pcRandom == "tas") {
        lost();
      } else if (pcRandom == "kagit") {
        win();
      }
      break;

    default:
      break;
  }

  if (userSelect == pcRandom) {
    resultDiv.classList.add("active");
    resultDiv.innerHTML = "Berabere";
    containerEl.style.boxShadow = "3px 3px 10px 1px #FFC538";
    resultDiv.style.backgroundColor = "#FFC538";
  }

  if (yourScore.innerText == "10") {
    final.innerHTML = `Kazandin`;
    document.querySelector(".modal").style.backgroundColor = "#5AB7AC";
    modalBtn.style.color = "#5AB7AC";
    topScoreCheck();
  }

  if (pcScore.innerText == "10" || yourScore.innerText == "10") {
    modal();
  }
}

function lost() {
  resultDiv.classList.add("active");
  resultDiv.innerHTML = "Kaybettin";
  containerEl.style.boxShadow = "3px 3px 10px 1px #fb778b";
  resultDiv.style.backgroundColor = "#fb778b";
  pcScore.innerText++;
}

//Biz kazanırsak bu fonksiyon çağrılacak ve renkleri, mesajı değiştirecek
function win() {
  resultDiv.classList.add("active");
  resultDiv.innerHTML = "Kazandin";
  containerEl.style.boxShadow = "3px 3px 10px 1px #5AB7AC";
  resultDiv.style.backgroundColor = "#5AB7AC";
  yourScore.innerText++;
}

function modal() {
  modalEl.classList.add("show");
}

modalBtn.addEventListener("click", () => {
  modalBtn.style.display = "none";
  window.location.reload();
});

let storagedScore = localStorage.getItem("highScore");
console.log(storagedScore);

let topScore; //ekrana yazdıracağım değer.

//local storage boş ise 0-0 yazdırmak için
if (storagedScore) {
  topScore = `10 - ${storagedScore}`;
} else {
  topScore = "0 - 0";
}

// top score u dom a yazdır.
domTopScore.innerText = topScore;

function topScoreCheck() {
  storagedScore || localStorage.setItem("highScore", +pcScore.innerText);

  if (storagedScore >= pcScore.innerText) {
    localStorage.setItem("highScore", +pcScore.innerText);
  }
}
