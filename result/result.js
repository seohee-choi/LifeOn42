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
		console.log(userIdx, userName);
		paintUserName(userName);
	}
}

function getUserVal(){
	const userVal = localStorage.getItem("valList");
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

	//이미지 요소들을 일시에 뿌려주기 위해서 두 개의 캔버스 사용했습니다.
	const workCanvas = document.createElement("canvas");
	workCanvas.width = 500;
	workCanvas.height = 500;

	const workContext = workCanvas.getContext('2d');

	let image = new Image();
	image.src = "../pic/default2.png";

	image.onload = function(){
		workContext.drawImage(image, 1, 1);
	}
	// workContext.globalCompositeOperation="source-over";

	for (let i=0; i<imgURLs.length; i++) { 
		let image = new Image(); 
		image.src = imgURLs[i];
		console.log(imgURLs[i]);
		image.onload = function(){
			workContext.drawImage(image, 1, 1);
			console.log("온로드진입");
		}
	}
	const context = canvas.getContext('2d');
	setTimeout(() => {context.drawImage(workCanvas, 0, 0); console.log("드로우이미지 진입")}, 1000);
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
