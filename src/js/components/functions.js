//---Проверка браузера

(function checkBrowser() {
	let currentBrowser;

	if (navigator.userAgent.indexOf("Firefox") > -1) {
		currentBrowser = "firefox";
	} else if (navigator.userAgent.indexOf("Opera") > -1) {
		currentBrowser = "opera";
	} else if (navigator.userAgent.indexOf("Trident") > -1) {
		currentBrowser = "explorer";
	} else if (navigator.userAgent.indexOf("Edge") > -1) {
		currentBrowser = "edge";
	} else if (navigator.userAgent.indexOf("Chrome") > -1) {
		currentBrowser = "chrome";
	} else if (navigator.userAgent.indexOf("Safari") > -1) {
		currentBrowser = "safari";
	} else {
		currentBrowser = "unknown";
	}

	console.log("You are using: " + currentBrowser);

	document.body.classList.add(currentBrowser)
})();

//---Is Mobile

let isMobile = {
	Android: function () { return navigator.userAgent.match(/Android/i); },
	BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
	iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
	Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
	any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

(function checkMobile() {
	if (isMobile.any()) { document.body.classList.add('_mobile'); }
})();

//---WEBP

(function isWebp() {
	function testWebP(callback) {
		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	testWebP(function (support) {
		if (support === true) {
			document.querySelector('html').classList.add('_webp');
		} else {
			document.querySelector('html').classList.add('_no-webp');
		}
	});
})();

//---Throttle

export const throttle = (fn, ms) => {
	let isThrottled = false;
	let savedArgs;
	let savedThis;

	function wrapper() {
		if (isThrottled) {
			savedArgs = arguments;
			savedThis = this;

			return;
		}

		fn.apply(this, arguments);

		isThrottled = true;

		setTimeout(function() {
			isThrottled = false;

			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms)
	}

	return wrapper;
}

//---Debounce

export const debounce = (fn, ms) => {
	let timeout;

	return function () {
		const fnCall = () => { fn.apply(this, arguments) }

		clearTimeout(timeout)
		timeout = setTimeout(fnCall, ms)
	}
}