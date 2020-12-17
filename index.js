const userForm = document.querySelector(".js-user");
const userInput = document.querySelector(".js-id");
const startBtn = document.querySelector(".js-button");

 function qnaStart() {
	const userName = userInput.value;
  const alertName = document.querySelector(".alertName");
  if (userName < 1) {
    alertName.innerText = "Write your name ☝";
    alertName.style.fontFamily = 'Russo One', sans-serif;
  } else location.href = `survey/survey.html?name=${userName}`;
  //name을 location말고 localstorage에 넣으세요 ^^
}

function init() {
  startBtn.onclick = qnaStart;
  userForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

init();
