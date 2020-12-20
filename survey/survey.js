const questionBox = document.querySelector(".question");
const chooseBox = document.querySelectorAll(".choose");
const nextBtn = document.querySelector(".jsNext");
const statusBar = document.querySelector(".status-bar");
const lstLen = qnaList.length;

let userVal = [];
let resultVal = 0;
let idx = 0;

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

statusBar.max = JSON.stringify(lstLen);

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

  location.href = `../result/result.html`;
}

function handleQna(qArr, aArr) {
  if (idx === lstLen) endQna();
  else {
    paintQuestion(qArr[idx]);
    paintAnswer(aArr[idx]);
    statusBar.value = JSON.stringify(idx + 1);
    idx++;
  }
}

function handleNext(event) {
  event.preventDefault();
  for (let i = 0; i < chooseBox.length; i++) {
    if (chooseBox[i].classList[1] === "clicked") {
      chooseBox[i].classList.remove("clicked");
      userVal.push(i);
      // console.log(userVal.length);
      if (userVal.length !== 1) {
        resultVal += parseInt(scoreArr[userVal.length - 1][i]);
        console.log(scoreArr[userVal.length - 1][i], i, Array.isArray(scoreArr[userVal.length]));
      }
      break;
    }
  }
  nextBtn.disabled = true;
  handleQna(qArr, aArr);
}

function init() {
  handleQna(qArr, aArr);
  nextBtn.addEventListener("click", handleNext);
}

document.addEventListener("DOMContentLoaded", () => {
  window.onload = () => {
    init();
  };
}
);