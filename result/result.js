const canvas = document.getElementById("jsCanvas");
const url = "http://seohee-choi.github.io/LifeOn42";

canvas.width = 500;
canvas.height = 500;

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
	const context = canvas.getContext('2d');
	//이미지 요소들을 일시에 뿌려주기 위해서 두 개의 캔버스 사용했습니다. - 를 왠지 안해도 될 것 같아서
	//현재는 한개의 캔버스에만 출력하고있습니다.
	//const workCanvas = document.createElement("canvas");
	//const workContext = workCanvas.getContext('2d');
	//workCanvas.width = 500;
	//workCanvas.height = 500;

	//리팩토링 대상
	//수정은 한번만 클래스
	let imagesOk = 0;
	const bgimg = new Image();
	bgimg.src = imgURLs[imgURLs.length - 1];
	bgimg.onload = () => {
		context.drawImage(bgimg, 0, 0);

		//반복되는 패턴이 많이 보이는데 재귀?
		//재귀해서 콜백함수 부르거나...
		let defaultimage = new Image();
		defaultimage.src = imgURLs[0];
		defaultimage.onload = () => {
			context.drawImage(defaultimage, 0, 0);

			let guildImg = new Image();
			guildImg.src = imgURLs[1];
			guildImg.onload = () => {
				context.drawImage(guildImg, 0, 0);

				const accNbr = getAccNbr();
				let image = new Image();
				image.src = `../pic/accessory/${accNbr}.png`;
				image.onload = () => {
					context.drawImage(image, 0, 0);
					for (let i = 2; i < imgURLs.length - 1; i++) {
						let image = new Image();
						image.src = imgURLs[i];
						image.onload = function () {
							context.drawImage(image, 0, 0);
							imagesOk++;
							if (imagesOk >= imgURLs.length - 3) {
								callback();
							}
						}
					}
				}
			}
		}
	}
}

function replaceFn() {
	location.replace(location.href + '?#');
}

function drawCanvas() {
	//context.drawImage(workCanvas, 0, 0);
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
	handleImage(drawCanvas);
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
