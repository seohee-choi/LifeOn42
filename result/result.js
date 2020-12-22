const bodyDiv = document.querySelector(".bodyDiv");
const loadingBox = document.querySelector(".loadingPage");
const canvas = document.getElementById("jsCanvas");
const userImg = document.querySelector(".character");
const save = document.querySelector(".jsSave");
const sub = document.querySelector(".js-sub");
const Return = document.querySelector(".js-button");
const url = "http://seohee-choi.github.io/LifeOn42";

canvas.width = 500;
canvas.height = 500;

function share(url) {
	if (navigator.share) {
		navigator.share({ title: "LifeOn42", text: "42서울 속 당신의 모습을 지금 알아보세요🎈", url: `${url}` });
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
	const userVal = getUserVal();
	const imageURLs = [];
	imageURLs.push(`../pic/default2.png`);

	let i = 0;
	userVal.forEach(function (element) {
		imageURLs.push(`../pic/${i}/${element}.png`);
		i++;
	});
	return imageURLs;
}

function handleImage(callback) {
	const imgURLs = getImageURL();
	//이미지 요소들을 일시에 뿌려주기 위해서 두 개의 캔버스 사용했습니다.
	const workCanvas = document.createElement("canvas");
	const workContext = workCanvas.getContext('2d');
	workCanvas.width = 500;
	workCanvas.height = 500;

	let imagesOk = 0;
	const bgimg = new Image();
	bgimg.src = imgURLs[imgURLs.length - 1];
	bgimg.onload = function () {
		workContext.drawImage(bgimg, 0, 0);

		let defaultimage = new Image();
		defaultimage.src = imgURLs[0];
		defaultimage.onload = () => {
			workContext.drawImage(defaultimage, 0, 0);

			let guildImg = new Image();
			guildImg.src = imgURLs[1];
			guildImg.onload = () => {
				workContext.drawImage(guildImg, 0, 0);

				const accNbr = getAccNbr();
				let image = new Image();
				image.src = `../pic/accessory/${accNbr}.png`;
				image.onload = () => {
					workContext.drawImage(image, 0, 0);
					for (let i = 2; i < imgURLs.length - 1; i++) {
						let image = new Image();
						image.src = imgURLs[i];
						image.onload = function () {
							workContext.drawImage(image, 0, 0);
							imagesOk++;
							if (imagesOk >= imgURLs.length - 3) {
								callback(workCanvas);
							}
						}
					}
				}
			}
		}
	}
}

function drawCanvas(workCanvas) {
	const context = canvas.getContext('2d');
	context.drawImage(workCanvas, 0, 0);
	if (location.href.indexOf('#') == -1)
		location.replace(location.href + '?#');
}

function calcResult(resultVal) {
	if (resultVal < 7)
		return -1;
	else if (resultVal >= 7 && resultVal < 12)
		return 0;
	else if (resultVal >= 12 && resultVal < 17)
		return 1;
	else if (resultVal >= 17 && resultVal < 22)
		return 2;
	else if (resultVal >= 21 && resultVal < 26)
		return 3;
	else if (resultVal >= 25 && resultVal < 29)
		return 4;
	else if (resultVal >= 29)
		return -1;
}

function getResultVal() {
	const resultVal = localStorage.getItem("valNum");
	return resultVal;
}

function handleResult() {
	const resultVal = getResultVal();
	const resultIdx = calcResult(parseInt(resultVal));
	const subMain = sub.querySelector(".submain");
	const subsub = sub.querySelector(".subsub");
	subMain.innerText = `Lv.${resultIdx} ${exList[resultIdx].t}`;
	subsub.innerText = `${exList[resultIdx].s}`;
}

function againTest() {
	location.href = "https://seohee-choi.github.io/LifeOn42/";
}

function init() {
	getUserName();
	handleImage(drawCanvas);
	handleResult();
	if (save) {
		save.addEventListener("click", saveImg);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	if (location.href.indexOf('#') == -1) {
		loadingBox.style.display = "";
		bodyDiv.style.display = "none";
	}
	window.onload = () => {
		init();
	};
}
);