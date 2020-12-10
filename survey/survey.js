const questionBox = document.querySelector(".question");
const chooseBox = document.querySelector(".choose");
const lstLen = qnaList.length;


// function paintQuestion(question){

// }
// function paintAnswer(answer){

// }

// let idx = 0;

// function handleQna(qArr, aArr) {
//   console.log("done");
//     if (idx === lstLen) endQna();  
//     else {
//       // paintQuestion(qArr[idx]);
//       // paintAnswer(aArr[idx]);
//       idx++;
//     } 
//   }

function loadQna() { //start btn누를 때만 실행
  //start btn을 누르지 않고 survey.html에 접근하면 어떻게 될까?
  location.href = "survey/survey.html";
  const qArr = qnaList.map(node => {
    return {
      question: node.q
    }
  }
  ); 
  const aArr = qnaList.map(node => {
    return {
      answer: node.a
    }
  }
  );
  // handleQna(qArr, aArr);
  console.log("done");
}

