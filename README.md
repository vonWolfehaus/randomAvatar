# Random Avatar

A tiny script for generating attractive random avatars. Relies on [randomColor](https://github.com/davidmerfield/randomColor) and the canvas element. Better than those weird Gravatar shapes, more exciting than a solid color. See `index.html` for some samples.

![Demo](randomAvatar.jpg)

Only built to be used in the browser. Never tested with nodejs, but it's wrapped in a UMD pattern. To use it:

```javascript
var avatar = randomAvatar(); // an image element for easy display
var div = document.getElementById('a-random-element'); // grab some element that's on your website
div.appendChild(avatar); // place it in the DOM
```

## Options

`size` - All generated avatars are square, so this value is used for both width and height [**default:** `128`]

`style` - Which of the three background styles to use: `circle`, `square`, `hex` [**default:** `random`]

`text` - The text to display [**default:** one random capitalized letter]

`contrast` - Adjusts the contrast of the background colors, with higher values providing a lot more color variations. Values too high will make the text difficult to read, recommended values are 0-40) [**default:** `25`]

`luminosity` - Directly passed to randomColorjs, controls the luminosity of the generated color. You can specify a string containing `random`, `bright`, `light` or `dark` [**default:** `bright`]

`outputType` - Which data type to return. If `image` is specified it will return an Image element. Otherwise, `canvas` will return the raw canvas element [**default:** `image`]

## Examples

```javascript
// returns a 128x128 Image element with a square tile background in a lovely springtime pastel hue and the text "CB" overlaying it
randomAvatar({
	size: 128,
	luminosity: 'light',
	style: 'square',
	text: 'CB'
})

// returns a 32x32 Image element with a random background pattern and no text
randomAvatar({
	size: 32,
	text: ''
})
```