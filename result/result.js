function paintUserName(userName){
	
	const title = document.querySelector(".js-title");
	title.innerText = `${userName}님의 LifeOn42는...`;
	console.log(userName);
}
function getUserName(){
	const userName = location.href.substr(location.href.lastIndexOf('=')+1);
	if (userName)
	{
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
