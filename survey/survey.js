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
	const userName = location.href.substr(location.href.lastIndexOf('=')+1);
	location.href = `../result/result.html?name=${userName}`;

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
      userVal.push(i + 1);
      break;
    }
  }
  console.log(userVal);
  nextBtn.disabled = true;
  handleQna(qArr, aArr);
}

function init() {
  handleQna(qArr, aArr);
  nextBtn.addEventListener("click", handleNext);
}

document.addEventListener("DOMContentLoaded", () =>{
	console.log("로딩중~~")
    window.onload = () => {
	console.log("로딩완료~~")

        init();
      };
	}
	);
