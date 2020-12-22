const userForm = document.querySelector(".js-user");
const userInput = document.querySelector(".js-id");
const startBtn = document.querySelector(".js-button");

function qnaStart() {
  const userName = userInput.value;
  const alertName = document.querySelector(".alertName");
  if (userName < 1) {
    alertName.innerText = "필수 입력입니다☝";
    alertName.style.fontFamily = 'Russo One', sans - serif;
  } else {
    localStorage.setItem("userName", userName);
    location.href = `survey/survey.html`;
  }
}

function init() {
  startBtn.onclick = qnaStart;
  userForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

init();
