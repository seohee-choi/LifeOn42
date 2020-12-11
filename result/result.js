const userImg = document.querySelector(".character");

function paintUserName(userName){	
	const title = document.querySelector(".js-title");
	title.innerText = `${userName}님의 LifeOn42는...`;
	console.log(userName);
}

function getUserName(){
	const userIdx = location.href.lastIndexOf('=')+1;
	const userName = decodeURI(location.href.substr(userIdx));
	if (userName) {
		paintUserName(userName);
		userImg.write("<img src= ..\pic\default.png>")
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
