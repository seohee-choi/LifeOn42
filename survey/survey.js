const questionBox = document.querySelector(".question");
const chooseBox = document.querySelectorAll(".choose");
const nextBtn = document.querySelector(".jsNext");
const statusBar = document.querySelector(".status-bar");
const lstLen = qnaList.length;

let userVal = [];
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

statusBar.max = JSON.stringify(lstLen);

function paintQuestion(question) {
  const currQ = question.question;
  questionBox.innerText = currQ;
}

function selectVal(event) {
  nextBtn.disabled = "false";
  const chLen = chooseBox.length;
  if (event.target.classList[1] === "clicked") {
    event.target.classList.remove("clicked");
  } else {
    for (let i = 0; i < chLen; i++) {
      chooseBox[i].classList.remove("clicked");
    }
    event.target.classList.add("clicked");
  }
}

function paintAnswer(answer) {
  const ansLen = answer.answer.length;
  for (let i = 0; i < ansLen; i++) {
    chooseBox[i].innerText = answer.answer[i];
    chooseBox[i].addEventListener("click", selectVal);
  }
}

function handleQna(qArr, aArr) {
  if (idx === lstLen) endQna();
  else {
    paintQuestion(qArr[idx]);
    paintAnswer(aArr[idx]);
    statusBar.value = JSON.stringify(idx);
    idx++;
  }
}

function handleNext() {
  // - 선택 x >> next 못누름
  // - 선택 o >> next 눌리고 답변값 저장하는 함수 호출
  for (let i = 0; i < chLen; i++) {
    if (chooseBox[i].classList === "clicked") {
      userVal.push(i);
      break;
    }
  }
  nextBtn.disabled = "disabled";
  handleQna(qArr, aArr);
}

function init() {
  handleQna(qArr, aArr);
  nextBtn.addEventListener("click", handleNext);
}
//start btn누를 때만 실행
//start btn을 누르지 않고 survey.html에 접근하면 어떻게 될까?

init();
