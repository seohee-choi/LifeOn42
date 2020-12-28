const questionBox = document.querySelector(".question");
const chooseBox = document.querySelectorAll(".choose");
const nextBtn = document.querySelector(".jsNext");
//const statusBar = document.querySelector("#status-bar");
const lstLen = qnaList.length;

let userVal = [];
let resultVal = 0;
let idx = 0;
let valAcc = 0;
const ACCNUM = 13;

var i = 0;
function move(idx) {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("status-bar");
    var width = elem.style.width;
    var id = setInterval(frame, 10);

    function frame() {
      if (width >= idx) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

const qArr = qnaList.map((node) => {
  return {
    question: node.q,
  };
});
const aArr = qnaList.map((node) => {
  return {
    answer: node.a,
  };
});
const scoreArr = qnaList.map((node) => {
  return {
    result: node.score,
  };
});

//statusBar.max = JSON.stringify(lstLen);

function paintQuestion(question) {
  const currQ = question.question;
  questionBox.innerText = currQ;
}

function selectVal(event) {
  nextBtn.disabled = false;
  const chLen = chooseBox.length;
  for (let i = 0; i < chLen; i++) {
    chooseBox[i].classList.remove("clicked");
  }
  event.target.classList.add("clicked");
}

function paintAnswer(answer) {
  const ansLen = answer.answer.length;
  for (let i = 0; i < ansLen; i++) {
    chooseBox[i].innerText = answer.answer[i];
    chooseBox[i].addEventListener("click", selectVal);
  }
}

function endQna() {
  localStorage.setItem("valList", JSON.stringify(userVal));
  localStorage.setItem("valNum", resultVal);
  localStorage.setItem("valAcc", valAcc);
  location.href = `../result/result.html`;
}

function handleQna(qArr, aArr) {
  if (idx === lstLen) endQna();
  else {
    paintQuestion(qArr[idx]);
    paintAnswer(aArr[idx]);
    move(idx);
    //statusBar.value = JSON.stringify(idx + 1);
    idx++;
  }
}

function handleNext(event) {
  event.preventDefault();
  for (let i = 0; i < chooseBox.length; i++) {
    if (chooseBox[i].classList[1] === "clicked") {
      chooseBox[i].classList.remove("clicked");
      userVal.push(i);
      if (userVal.length !== 1 && userVal.length <= qnaList.length) {
        resultVal += parseInt(scoreArr[userVal.length - 1].result[i]);
      }
      break;
    }
  }
  if (idx == (lstLen - 1)) {
    nextBtn.innerText = "제출하기";
  }
  nextBtn.disabled = true;
  handleQna(qArr, aArr);
}

function init() {
  handleQna(qArr, aArr);
  valAcc = Math.floor(Math.random() * ACCNUM + 1);
  nextBtn.addEventListener("click", handleNext);
}

document.addEventListener("DOMContentLoaded", () => {
  window.onload = () => {
    init();
  };
}
);
