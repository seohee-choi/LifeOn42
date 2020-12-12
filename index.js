const userForm = document.querySelector(".js-user");
const userInput = document.querySelector(".js-id");
const startBtn = document.querySelector(".js-button");

 function qnaStart() {
	const userName = userInput.value;
  const alertName = document.querySelector(".alertName");
  if (userName < 1) {
    alertName.innerText = "Write your name ☝";
  } else location.href = `survey/survey.html?name=${userName}`;
}

function init() {
  startBtn.onclick = qnaStart;
  userForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

init();
