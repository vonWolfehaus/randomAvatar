# Random Avatar

A tiny script for generating attractive random avatars. Relies on [randomColor](https://github.com/davidmerfield/randomColor). Better than those weird Gravatar shapes, more exciting than a solid color. See `index.html` for some samples.

Only built to be used in the browser. Never tested with nodejs, but it's wrapped in a UMD pattern. To use it:

```
var avatar = randomAvatar(); // an image element for easy display
var div = document.getElementById('a-random-element'); // grab some element that's on your website
div.appendChild(avatar); // place it in the DOM
```

# Options

`size` - All generated avatars are square, so this value is used for both width and height [default: `128`]

`style` - Which of the three background styles to use: `circle`, `square`, `hex` [default: `random`]

`text` - The text to display [default: one random capitalized letter]

`contrast` - Adjusts the contrast of the background colors, with higher values providing a lot more color variations. Values too high will make the text difficult to read, recommended values are 0-40) [default: `25`]

`luminosity` - Directly passed to randomColorjs, controls the luminosity of the generated color. You can specify a string containing `random`, `bright`, `light` or `dark` [default: `bright`]
