const canvas = document.getElementById("jsCanvas");
const userImg = document.querySelector(".character");
const kakao = document.querySelector(".jsKakao");
const insta = document.querySelector(".jsInsta");
const link = document.querySelector(".jsLink");
const save = document.querySelector(".jsSave");

const url = "http://seohee-choi@github.io/LifeOn42";

// function shareKakao() {
	
// }

// function shareInsta() {
	
// }


function copyLink(url) {
	const tmp = document.createElement("textarea");
	document.body.appendChild(tmp);
	tmp.value = url;
	tmp.select();
	document.execCommand("copy");
	document.body.removeChild(tmp);
	console.log(tmp);
}

function savePic() {
	const img = canvas.toDataURL();
	const a = document.createElement("a");
	a.href = img;
	a.download = "my LifeOn42💬";
	a.click();
}

if (save) {
	save.addEventListener("click", savePic);
}

function paintUserName(userName){	
	const title = document.querySelector(".js-title");
	title.innerText = `${userName}님의 LifeOn42는...`;
	// console.log(userName);
}

function getUserName(){
	const userIdx = location.href.lastIndexOf('=')+1;
	const userName = decodeURI(location.href.substr(userIdx));
	if (userName) {
		paintUserName(userName);
	}
}

function init(){
	getUserName();
}

document.addEventListener("DOMContentLoaded", () =>{
    window.onload = () => {
       	 init();
   	   };
	}
);
