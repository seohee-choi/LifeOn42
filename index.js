function qnaStart(userName) {
  localStorage.setItem("userName", userName);
  location.href = `survey/survey.html`;
}

function checkName(e) {
  const userInput = document.querySelector(".js-id");
  if (userInput.value) {
    e.preventDefault();
    qnaStart(userInput.value);
  }
}