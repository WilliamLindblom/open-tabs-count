var tabCount = 0;
var tabText;

function updateCountText() {
	if (tabCount < 1000) {
		tabText = String(tabCount);
	} else if (tabCount < 10000) {
		tabText = ":D";
	} else {
		tabText = "42"
	}

	context.clearRect(8, 8, canvas.width - 16, canvas.height - 16);
	context.fillText(tabText, 64, 64);

	chrome.browserAction.setIcon({imageData: context.getImageData(0, 0, canvas.width, canvas.height)});
}

var canvas = document.createElement("canvas");
var context = canvas.getContext('2d'); //Hidden canvas

var imageElem = new Image(); //Image element
imageElem.src = "icon.png";

imageElem.onload = function () {
	context.canvas.width = 128;
	context.canvas.height = 128;
	context.font = 64 + "px sans-serif";
	context.textBaseline = "middle";
	context.textAlign = "center";

	context.drawImage(imageElem, 0, 0, 128, 128);
};

//Get initial tab count
chrome.tabs.query(
	{},
	function (tabArray) {
		tabCount = tabArray.length;
		updateCountText();
	}
);

//Set listeners to update on tab open/close
chrome.tabs.onCreated.addListener(function (tab) {
	tabCount = tabCount + 1;
	updateCountText();
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
	tabCount = tabCount - 1;
	updateCountText();
});

//Open all tabs page on button click
chrome.browserAction.onClicked.addListener(function () {
	//TODO: Open all tabs page
});