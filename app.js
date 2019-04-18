(function init() {
	let colors = [];
	let pickedColor;
	let bgColor = 'rgb(51, 51, 51)';
	let transparency = 'rgba(51, 51, 51, 0)';
	let message = document.querySelector('#message');
	let squares = document.querySelectorAll('.colors');
	let btn = document.querySelector('#reset');
	let select = document.querySelector('select');
	// Hard has 9 options, and it is the default state
	let difficulty = 9;

	console.log(select);

	setGame(difficulty);
	setSquaresEventListeners();

	btn.addEventListener('click', () => {
		setGame(difficulty);
	});

	select.addEventListener('change', (e) => {
		if (e.target.value === 'easy') {
			difficulty = 3;
		} else if (e.target.value === 'medium') {
			difficulty = 6;
		} else {
			difficulty = 9;
		}
		setGame(difficulty);
	});

	function setGame(difficulty) {
		generateColors(difficulty);
		pickColor();
		changeHeaderStyle('#ff0');
		message.textContent = '';
		btn.textContent = 'New colors';
		hideSquares();
		for (let i = 0; i < colors.length; i++) {
			//assign colors
			squares[i].style.backgroundColor = colors[i];
		}
	}

	function hideSquares() {
		if (squares.length > colors.length) {
			let num = squares.length - colors.length;
			for (squares.length - num; num > 0; num--) {
				squares[squares.length - num].style.backgroundColor = transparency;
			}
		}
	}

	function setSquaresEventListeners() {
		for (let i = 0; i < squares.length; i++) {
			squares[i].addEventListener('click', (e) => {
				e.target.style.backgroundColor === pickedColor ? winGame() : tryAgain(e.target);
			});
		}
	}

	function generateColors(num) {
		colors = [];
		for (let i = 0; i < num; i++) {
			colors[i] = randomColor();
		}
	}

	function randomColor() {
		let red, green, blue;
		red = randomShade();
		green = randomShade();
		blue = randomShade();
		return `rgb(${red}, ${green}, ${blue})`;
	}

	function randomShade() {
		return Math.floor(Math.random() * 256);
	}

	function pickColor() {
		let pick = Math.floor(Math.random() * colors.length);
		pickedColor = colors[pick];
		let subTitle = document.querySelector('#pickedColor');
		subTitle.textContent = pickedColor;
	}

	function tryAgain(wrongGuess) {
		wrongGuess.style.backgroundColor = transparency;
		message.textContent = 'Try again';
	}

	function winGame() {
		hideSquares();
		for (let i = 0; i < colors.length; i++) {
			squares[i].style.backgroundColor = pickedColor;
		}
		message.textContent = 'Correct!!!';
		changeHeaderStyle(pickedColor);
		btn.textContent = 'Play again';
	}

	function niceContrast() {
		//extract numbers from string => rgb(233, 45, 44);
		let hue = pickedColor.slice(4).replace(')', '').split(', ');
		// compare the sum with 255*3/2
		let sum = hue.reduce((a, b) => Number(a) + Number(b));
		//if picked color is dark make the bg light
		sum < 255 * 3 / 2 ? (bgColor = '#rgb(255, 255, 255)') : (bgColor = '#rgb(51, 51, 51)');
	}

	function changeHeaderStyle(color) {
		let styles = `
            /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffff00+0,ffffff+20,ffffff+20,ffffff+80,ffff00+100 */
            background: rgb(255, 255, 255); /* Old browsers */
            background: -moz-linear-gradient(
                left,
                ${color},
                rgb(255, 255, 255) 20%,
                rgb(255, 255, 255) 20%,
                rgb(255, 255, 255) 80%,
                ${color}
            ); /* FF3.6-15 */
            background: -webkit-linear-gradient(
                left,
                ${color},
                rgb(255, 255, 255) 20%,
                rgb(255, 255, 255) 20%,
                rgb(255, 255, 255) 80%,
                ${color}
            ); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(
                to right,
                r${color},
                rgb(255, 255, 255) 20%,
                rgb(255, 255, 255) 20%,
                rgb(255, 255, 255) 80%,
                ${color}
            ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient(
                    startColorstr=${color},
                    endColorstr=${color},
                    GradientType=1
            ); /* IE6-9 */
        `;
		document.querySelector('header').style.cssText = styles;
	}
})();

// let colors = [
// 	'rgb(255, 23, 78)',
// 	'rgb(198, 205, 0)',
// 	'rgb(188, 156, 255)',
// 	'rgb(255, 193, 123)',
// 	'rgb(189, 0, 168)',
// 	'rgb(0, 230, 124)',
// 	'rgb(36, 74, 0)',
// 	'rgb(74, 151, 255)',
// 	'rgb(92, 32, 255)'
// ];
