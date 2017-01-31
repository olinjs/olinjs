var spinning = false;
function spin() {
	spinning = !spinning;
	console.log(spinning);
	if (spinning) {
		document.getElementById("textbutton").setAttribute("style", "-webkit-animation-name: spin;-webkit-animation-duration: 40000ms;-webkit-animation-iteration-count: infinite;-webkit-animation-timing-function: linear;");
	}
}
console.log("hello world");