const userForm = document.querySelector(".js-user");
const userInput = document.querySelector(".js-id");
const startBtn = document.querySelector(".js-button");
// console.log(userInput.value);

// function localName(event) {}

function qnaStart() {
  const userName = userInput.value;
  const alertName = document.querySelector(".alertName");
  if (userName < 1) {
    alertName.innerText = "Write your name ☝";
  }
else loadQna();
}

function init() {
  startBtn.onclick = qnaStart;
}

init();
