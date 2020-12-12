// import {userVal} from '../survey/survey.js'

const canvas = document.getElementById("jsCanvas");

const userImg = document.querySelector(".character");
const kakao = document.querySelector(".jsKakao");
const insta = document.querySelector(".jsInsta");
const link = document.querySelector(".jsLink");
const save = document.querySelector(".jsSave");

const url = "http://seohee-choi@github.io/LifeOn42";

canvas.width = 500;
canvas.height = 500;
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

function saveImg() {
	const img = canvas.toDataURL();
	const a = document.createElement("a");
	a.href = img;
	a.download = "myLifeOn42";
	a.click();
}

function paintUserName(userName){	
	const title = document.querySelector(".js-title");
	title.innerText = `${userName}님의 LifeOn42는...`;
	// console.log(userName);
}

function getUserName(){
	const userIdx = location.href.lastIndexOf('=')+1;
	const userName = decodeURI(location.href.substr(userIdx));
	if (userIdx && userName) {
		paintUserName(userName);
	}
}

function handleImage(){
	const userVal = localStorage.getItem("valList");
	console.log(userVal);
	localStorage.removeItem("valList");
	let defaultImg = new Image();
	defaultImg.src = "../pic/default2.png";
	const context = canvas.getContext('2d');
	defaultImg.onload = function() {
		context.drawImage(defaultImg, 1, 1);
	}
}

function init(){
	getUserName();
	handleImage();
	if (save) {
		save.addEventListener("click", saveImg);
	}
}

document.addEventListener("DOMContentLoaded", () =>{
    window.onload = () => {
       	 init();
   	   };
	}
);
