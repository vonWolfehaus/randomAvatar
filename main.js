// Created by Corey Birnbaum (coreybirnbaum.com), released under MIT license.
// Credit for the hex stuff: https://gist.github.com/zackthehuman/1867663
// Credit for randomColor: https://github.com/davidmerfield/randomColor
;(function(root, factory) {
	// Support CommonJS
	if (typeof exports === 'object') {
	var randomAvatar = factory();

	// Support NodeJS & Component, which allow module.exports to be a function
	if (typeof module === 'object' && module && module.exports) {
		exports = module.exports = randomAvatar;
	}

	// Support CommonJS 1.1.1 spec
	exports.randomAvatar = randomAvatar;

	// Support AMD
	} else if (typeof define === 'function' && define.amd) {
	define([], factory);

	// Support vanilla script loading
	} else {
		root.randomAvatar = factory();
	}
}(this, function() {

	var canvas;
	var ctx;
	var bgColor;
	var fontSize;
	var opts;

	function randomAvatar(options) {
		if (!options) options = {}
		opts = {
			size: options.size || 128,
			style: options.style || 'random',
			text: options.text || randomText(),
			contrast: options.contrast || 25,
			luminosity: options.luminosity || 'bright'
		}

		if (!canvas) {
			canvas = document.createElement('canvas')
			canvas.width = opts.size
			canvas.height = opts.size
			ctx = canvas.getContext('2d')
		}

		fontSize = opts.size / 2;
		bgColor = randomColor({format: 'hslArray', luminosity: opts.luminosity})

		ctx.fillStyle = getHSLStyle(bgColor)
		ctx.fillRect(0, 0, opts.size, opts.size)
		ctx.font = fontSize+'px sans-serif'
		ctx.textAlign = 'center'

		var style;
		switch (opts.style) {
			case 'circle':
				style = 0
				break;
			case 'hex':
				style = 1
				break;
			case 'square':
				style = 2
				break;
			default:
				style = Math.floor(Math.random() * 3)
				break;
		}

		switch (style) {
			case 0:
				drawCircleBoard(4, 5, Math.floor(opts.size / 5))
				break;
			case 1:
				drawHexBoard(4, 5, Math.floor(opts.size / 5))
				break;
			case 2:
				drawSquareBoard(4, 5, Math.floor(opts.size / 5))
				break;
		}

		drawText(opts.text)

		var image = new Image();
		image.src = canvas.toDataURL('image/png');
		return image;
	}

	function drawCircleBoard(width, height, sideLength) {
		var i, j, x, y;
		var baseH = bgColor[0]
		var baseS = bgColor[1]
		var baseL = bgColor[2]
		var newHSL = [baseH, baseS, baseL]
		var pixelVariance = opts.size / 13
		// console.log(bgColor)

		var hexagonAngle = 0.523598776; // 30 degrees in radians
		var hexHeight = Math.sin(hexagonAngle) * sideLength;
		var hexRadius = Math.cos(hexagonAngle) * sideLength;
		var hexRectangleHeight = sideLength + 2 * hexHeight;
		var hexRectangleWidth = 2 * hexRadius;
		var offset = getRandomSizeVariance(sideLength * 1.3, 0)

		for (i = 0; i < width; ++i) {
			for (j = 0; j < height; ++j) {
				x = i * hexRectangleWidth + ((j % 2) * hexRadius) - offset
				y = j * (sideLength + hexHeight) - offset
				ctx.beginPath();
				ctx.arc(x + sideLength, y + sideLength, sideLength + getRandomSizeVariance(pixelVariance, 0.9), 0, Math.PI * 2);
				newHSL[0] = getRandomColorVariant(baseH, 360)
				newHSL[1] = getRandomColorVariant(baseS, 100)
				newHSL[2] = getRandomColorVariant(baseL, 100)
				ctx.fillStyle = getHSLStyle(newHSL)
				ctx.fill();
			}
		}
	}

	function drawHexBoard(width, height, sideLength) {
		var i, j, x, y;
		var baseH = bgColor[0]
		var baseS = bgColor[1]
		var baseL = bgColor[2]
		var newHSL = [baseH, baseS, baseL]
		var pixelVariance = opts.size / 13
		// console.log(bgColor)

		var hexagonAngle = 0.523598776; // 30 degrees in radians
		var offset = getRandomSizeVariance(sideLength * 1.3, 0)
		var hexHeight = Math.sin(hexagonAngle) * sideLength;
		var hexRadius = Math.cos(hexagonAngle) * sideLength;
		var hexRectangleHeight = sideLength + 2 * hexHeight;
		var hexRectangleWidth = 2 * hexRadius;

		for (i = 0; i < width; ++i) {
			for (j = 0; j < height; ++j) {
				x = i * hexRectangleWidth + ((j % 2) * hexRadius) - offset + getRandomSizeVariance(pixelVariance, 0.5)
				y = j * (sideLength + hexHeight) - offset + getRandomSizeVariance(pixelVariance, 0.5)
				ctx.beginPath()
				ctx.moveTo(x + hexRadius, y)
				ctx.lineTo(x + hexRectangleWidth, y + hexHeight)
				ctx.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength)
				ctx.lineTo(x + hexRadius, y + hexRectangleHeight)
				ctx.lineTo(x, y + sideLength + hexHeight)
				ctx.lineTo(x, y + hexHeight)
				ctx.closePath()
				newHSL[0] = getRandomColorVariant(baseH, 360)
				newHSL[1] = getRandomColorVariant(baseS, 100)
				newHSL[2] = getRandomColorVariant(baseL, 100)
				ctx.fillStyle = getHSLStyle(newHSL)
				ctx.fill()
			}
		}
	}

	function drawSquareBoard(width, height, sideLength) {
		var i, j, x, y;
		var baseH = bgColor[0]
		var baseS = bgColor[1]
		var baseL = bgColor[2]
		var newHSL = [baseH, baseS, baseL]
		var pixelVariance = opts.size / 13
		// console.log(bgColor)

		sideLength *= 1.75
		// var shiftValue = sideLength * 0.25
		var offset = getRandomSizeVariance(sideLength * 1.3, 0)

		for (i = 0; i < width; ++i) {

			for (j = 0; j < height; ++j) {
				x = i * sideLength - offset// + shiftValue
				y = j * sideLength - offset
				// shiftValue *= -1
				newHSL[0] = getRandomColorVariant(baseH, 360)
				newHSL[1] = getRandomColorVariant(baseS, 100)
				newHSL[2] = getRandomColorVariant(baseL, 100)
				ctx.fillStyle = getHSLStyle(newHSL)
				ctx.fillRect(x, y, sideLength + getRandomSizeVariance(pixelVariance, 0.9), sideLength + getRandomSizeVariance(pixelVariance, 0.9))
			}
		}
	}

	function drawText(txt) {
		ctx.fillStyle = getContractColor(bgColor)
		ctx.fillText(txt, opts.size/2, (opts.size/2) + (fontSize/3))
	}

	// CREDIT: https://24ways.org/2010/calculating-color-contrast/
	function getContractColor(hsl) {
		var h = hsl[0] / 360 // has to be normalized for hslToRgb()
		var s = hsl[1] / 100
		var l = hsl[2] / 100
		var rgb = hslToRgb(h, s, l)
		var yiq = ((rgb[0]*299) + (rgb[1]*587) + (rgb[2]*114)) / 1000
		return (yiq >= 128) ? '#222' : '#fff'
	}

	// CREDIT: https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
	function hslToRgb(h, s, l) {
		var r, g, b;
		if (s == 0) {
			r = g = b = l; // achromatic
		}
		else {
			function hue2rgb(p, q, t){
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1/6) return p + (q - p) * 6 * t;
				if (t < 1/2) return q;
				if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}

			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = hue2rgb(p, q, h + 0.33333333333);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 0.33333333333);
		}

		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}

	function getHSLStyle(hsl) {
		return 'hsl('+hsl[0]+', '+hsl[1]+'%, '+hsl[2]+'%)';
	}

	function getRandomColorVariant(v, m) {
		return clamp(v + getRandomSizeVariance(opts.contrast, 0.5), 0, m)
	}

	function getRandomSizeVariance(b, v) {
		return (Math.random() * b) - (b * v)
	}

	function randomText() {
		return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26))
	}

	function clamp(v, min, max) {
		return Math.min(Math.max(v, min), max)
	}

	return randomAvatar;
}));
