const chooseBox = document.querySelectorAll(".choose");
const nextBtn = document.querySelector(".jsNext");
const lstLen = qnaList.length;

let userVal = [];
let userScore = 0;
let idx = 0;
let valAcc = 0;

const ACCNUM = 13;

function handleProgress(idx) {
  const elem = document.getElementById("status-bar");
  const nextWidth = Math.floor((100 / lstLen) * (idx + 1));
  let currWidth = Math.floor((100 / lstLen) * (idx));
  let id = setInterval(frame, 20);
  function frame() {
    if (currWidth >= nextWidth) {
      clearInterval(id);
    } else {
      currWidth++;
      elem.style.width = currWidth + "%";
    }
  }
}

const qArr = qnaList.map((node) => {
  return {
    question: node.q,
  };
});

const aArr = qnaList.map((node) => {
  const answerArr = node.a.map((key) => {
    return {
      text: Object.keys(key),
      score: Object.values(key)
    }
  });
  return {
    answer: answerArr,
  };
});

function paintQuestion(question) {
  const questionBox = document.querySelector(".question");
  const currQ = question.question;
  questionBox.innerText = currQ;
}

function selectVal(event) {
  nextBtn.disabled = false;
  const chLen = chooseBox.length;
  for (let i = 0; i < chLen; i++)
    chooseBox[i].classList.remove("clicked");
  event.target.classList.add("clicked");
}

function paintAnswer(answer) {
  const ansLen = answer.answer.length;
  for (let i = 0; i < ansLen; i++) {
    chooseBox[i].innerText = answer.answer[i].text;
    chooseBox[i].addEventListener("click", selectVal);
  }
}

function endQna() {
  localStorage.setItem("valList", JSON.stringify(userVal));
  localStorage.setItem("valNum", userScore);
  localStorage.setItem("valAcc", valAcc);
  location.href = `../result/result.html`;
}

function handleQna(qArr, aArr) {
  if (idx === lstLen) endQna();
  else {
    paintQuestion(qArr[idx]);
    paintAnswer(aArr[idx]);
    handleProgress(idx);
    idx++;
  }
}

function goToNextPage() {
	window.scrollTo(0,0);
	if (idx == (lstLen - 1)) {
		nextBtn.innerText = "제출하기";
	}
	nextBtn.disabled = true;
	handleQna(qArr, aArr);
}

function addUserScore(i) {
  const currLen = userVal.length;
	if (currLen !== 1 && currLen <= qnaList.length) {
		  userScore += parseInt(aArr[currLen - 1].answer[i].score);
	}
}

function handleNext(event) {
  event.preventDefault();
  for (let i = 0; i < chooseBox.length; i++) {
    if (chooseBox[i].classList[1] === "clicked") {
      chooseBox[i].classList.remove("clicked");
      userVal.push(i);
      addUserScore(i);
      goToNextPage();
      break;
    }
  }
}

//폰트, css 등 head에 있는 요소를 기다립니다.
//혹은 HTML에 있는 요소들이 지연되어서 로딩되는 경우를 기다리기 위해...
document.addEventListener("DOMContentLoaded", () => {
    handleQna(qArr, aArr);
    valAcc = Math.floor(Math.random() * ACCNUM + 1);
    nextBtn.addEventListener("click", handleNext);
  }
);
 