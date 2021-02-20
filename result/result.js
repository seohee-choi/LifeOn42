const canvas = document.getElementById("jsCanvas");
const url = "http://seohee-choi.github.io/LifeOn42";

canvas.width = 500;
canvas.height = 500;
const context = canvas.getContext('2d');


function share() {
	if (navigator.share) {
		navigator.share({
			title: "LifeOn42",
			text: "42서울 속 당신의 모습을 지금 알아보세요🎈",
			url: url,
		});
	} else {
		alert('지원하지 않는 브라우저입니다');
	}
}

function saveImg() {
	const pic = canvas.toDataURL();
	const a = document.createElement("a");
	a.href = pic;
	a.download = "myLifeOn42";
	a.click();
}

function paintUserName(userName) {
	const title = document.querySelector(".js-title");
	title.innerText = `${userName}님의 LifeOn42는...`;
}

function getUserName() {
	const userName = localStorage.getItem("userName");
	if (userName) {
		paintUserName(userName);
	}
}

function getAccNbr() {
	const accNbr = localStorage.getItem("valAcc");
	return accNbr
}

function getUserVal() {
	const lstLen = qnaList.length;
	let userVal = JSON.parse(localStorage.getItem("valList"));
	if (userVal.length > lstLen)
		userVal = userVal.slice(0, lstLen);
	return userVal;
}

function getImageURL() {
	let userVal = getUserVal();
	const imageURLs = [];
	userVal = userVal.slice(1, userVal.length - 1);

	let i = 0;
	userVal.forEach(function (element) {
			imageURLs.push(`../pic/${i}/${element}.png`);
		i++;
	});
	return imageURLs;
}

function getImportantImgURL(){
	const userVal = getUserVal();
	const importantImgURLs = [];
	const accNbr = getAccNbr();

	importantImgURLs.push(`../pic/bgi/${userVal[6]}.png`);
	importantImgURLs.push(`../pic/default2.png`);
	importantImgURLs.push(`../pic/guild/${userVal[0]}.png`);
	importantImgURLs.push(`../pic/accessory/${accNbr}.png`);
	return importantImgURLs;
}

function drawImg(){
	const imgURLs = getImageURL();

	let imagesOk = 0;
	console.log(imgURLs);

	for (let i = 0; i < imgURLs.length; i++) {
		let image = new Image();
		image.src = imgURLs[i];
		console.log(image.src);
		image.onload = function () {
			context.drawImage(image, 0, 0);
			imagesOk++;
			console.log(imagesOk);
			if (imagesOk == imgURLs.length) {
				drawCanvas();
			}
		}
	}
}

function drawImportantImg(callback){
	const importantImgURLs = getImportantImgURL();
	let imagesOk = 0;

	for (let i = 0; i < importantImgURLs.length; i++) {
		let image = new Image();
		image.src = importantImgURLs[i];
		image.onload = function () {
			context.drawImage(image, 0, 0);
			imagesOk++;
			if (imagesOk == importantImgURLs.length)
				callback();
		}
	}
}

function replaceFn() {
	location.replace(location.href + '?#');
}

function drawCanvas() {
	if (location.href.indexOf('#') == -1)
		setTimeout(replaceFn, 2500);
}

function calcResult(userScore) {
	const resScore = Math.floor((userScore - 5)/4);
	if (userScore < 6 || userScore >= 25)
		unexpectedVal();
	else return (resScore);
}

function getuserScore() {
	const userScore = localStorage.getItem("valNum");
	return userScore;
}

function unexpectedVal() {
	alert("유효하지 않은 값입니다.");
	againTest();
}

function handleResult() {
	const sub = document.querySelector(".js-sub");
	const userScore = getuserScore();
	const resultIdx = calcResult(parseInt(userScore));
	const subMain = sub.querySelector(".submain");
	const subsub = sub.querySelector(".subsub");
	subMain.innerText = `Lv.${userScore % 6 + 1} ${exList[resultIdx].t}`;
	subsub.innerText = `${exList[resultIdx].s}`;
}

function againTest() {
	location.href = url;
}

function init() {
	const save = document.querySelector(".jsSave");
	getUserName();
	drawImportantImg(drawImg);
	handleResult();
	if (save) {
		save.addEventListener("click", saveImg);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	if (location.href.indexOf('#') == -1) {
		const main = document.querySelector("section");
		const loadingBox = document.querySelector(".loadingBox");
		loadingBox.style.display = "";
		main.style.display = "none";
	}
	window.onload = () => {
		init();
	};
});
