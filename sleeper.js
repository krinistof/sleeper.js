// ==UserScript==
// @name           Sleeper.js
// @namespace      http://example.org
// @description    Sleeper.js: Teams helper
// @version        0.0.1
// @downloadURL    https://github.com/solymosi/npu/releases/latest/download/npu.user.js
// @include        https://teams.microsoft.com/_#/pre-*
// ==/UserScript==

(function(){
let sleeper = {
	participants: () => {
		// There may be a better solution.
		let x = sleeper.spans[1].innerText
		// The span contains the number between brackets, so we have to remove them
		return parseInt(x.substr(1, x.length-2))
	},
	bye: () => {
		sleeper.stopChecker()
		//TODO: Add goodbye message generator, and sending
		//
		// Find the hangup button, and click it
		document.getElementById("hangup-button").click()

	},
	check: () => {
		if(sleeper.participants() < sleeper.threshold)
			sleeper.bye()
	},
	start: () => {
		sleeper.init()
		sleeper.startChecker()
	},
	init: () => {
		//Getting the array of toggle-number class spans
		sleeper.spans = document.querySelectorAll("span.toggle-number")

		//TODO make method which automatically determines threshold
		sleeper.threshold = 7

		//Checking if participants tab is opened
		if(!sleeper.spans){
			//If not, then open it
			document.getElementById("roster-button").click()
			setTimeout(sleeper.init, 4000)
		}
		sleeper.element = sleeper.spans[1]
	},
	startChecker: () => {
		alert("Checker started!")
		sleeper.intId = setInterval(sleeper.check, 4000)
	},
	stopChecker: () => {
		console.log("Checker stopped!")
		clearInterval(sleeper.intId)
	}
}

let c = setInterval(() => {
	//Wait till call is opened
	if(document.getElementById("hangup-button")){
		clearInterval(c)
		setTimeout(sleeper.start, 7000)
	}
}, 2000)
})()
