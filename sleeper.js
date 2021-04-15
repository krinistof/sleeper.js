// ==UserScript==
// @name           Sleeper.js
// @namespace      http://example.org
// @description    Sleeper.js = Teams helper
// @version        0.0.1
// @downloadURL    https://github.com/solymosi/npu/releases/latest/download/npu.user.js
// @include        https://teams.microsoft.com/_#/pre-*
// ==/UserScript==

(function(){

let spans, threshold, intId, element

function participants(){
	// There may be a better solution.
	let x = element.innerText
	// The span contains the number between brackets, so we have to remove them
	return parseInt(x.substr(1, x.length-2))
}

function bye(){
	stopChecker()
	//TODO = Add goodbye message generator, and sending
	//
	// Find the hangup button, and click it
	document.getElementById("hangup-button").click()
}

function check(){
	if(participants() < threshold)
		bye()
}

function start(){
	init()
	startChecker()
}

function init(){
	//Getting the array of toggle-number class spans
	spans = document.querySelectorAll("span.toggle-number")

	//TODO make method which automatically determines threshold
	threshold = 7

	//Checking if participants tab is opened
	if(spans.length == 0){
		//If not, then open it
		let b = document.getElementById("roster-button")
		if(!b){
			document.getElementById("callingButtons-showMoreBtn").click()
			setTimeout(init, 4000)
			return
		}
		b.click()
		setTimeout(init, 4000)
		return
	}
	element = spans[1]
}

function startChecker(){
	intId = setInterval(check, 4000)
	console.log("Checker started with PID: ", intId)
}

function stopChecker(){
	console.log("Checker stopped!")
	clearInterval(intId)
}

let c = setInterval(() => {
	//Wait till call is opened
	if(document.getElementById("hangup-button")){
		console.log("hívás folyamatban")
		clearInterval(c)
		setTimeout(start, 7000)
	}
}, 2000)
})()
