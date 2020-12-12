const canvas = document.getElementById("jsCanvas");
const userImg = document.querySelector(".character");
const link = document.querySelector(".jsLink");
const save = document.querySelector(".jsSave");

const url = "http://seohee-choi@github.io/LifeOn42";

canvas.width = 500;
canvas.height = 500;

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
	const pic = canvas.toDataURL();
	const a = document.createElement("a");
	a.href = pic;
	a.download = "myLifeOn42";
	a.click();
}

function paintUserName(userName){	
	const title = document.querySelector(".js-title");
	title.innerText = `${userName}님의 LifeOn42는...`;
}

function getUserName(){
	const userIdx = location.href.lastIndexOf('=')+1;
	const userName = decodeURI(location.href.substr(userIdx));
	if (userIdx && userName) {
		paintUserName(userName);
	}
}

function getUserVal(){
	const userVal = localStorage.getItem("valList");
	localStorage.removeItem("valList");
	return userVal;
}

function getImageURL(){
	const userVal = JSON.parse(getUserVal());
	const imageURLs = [];
	let i = 0;
	userVal.forEach(function(element) { 
		imageURLs.push(`../pic/${i}/${element}.png`);
		i++;
	});
	return imageURLs;
}

function handleImage(){
	const imgURLs = getImageURL();
	const context = canvas.getContext('2d');
	let img = new Image(); 

	img.src = "../pic/default2.png";
	img.onload = function(){
		context.drawImage(img, 1, 1);
	}
	context.globalCompositeOperation="source-over";

	for (let i=0; i<imgURLs.length; i++) { 
		let img = new Image(); 
		img.src = imgURLs[i];
		img.onload = function(){
			context.drawImage(img, 1, 1);
		}
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
