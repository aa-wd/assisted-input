# assisted-input

Easily add characters with a diacritic mark to an input field. Similar to (and inspired by) how phone keyboards allow you to hold a key pressed to get related keys. See [this demo](https://inputs.aawd.nl) for instructions.

[![animationb322518a8f8d0323.gif](https://s3.gifyu.com/images/animationb322518a8f8d0323.gif)](https://gifyu.com/image/9se0)

## Installation

`assisted-input` is available on `npm`:

```console
npm install --save @aawd/assisted-input
```

if you just quickly want to check it out, clone the repo, run the `express` server and open `http://localhost:9022`:

```console
git clone https://github.com/aa-wd/assisted-input.git
cd assisted-input
npm install && npm run build
npm run server:prod
```

## Usage

- add `data-assisted` attribute to input elements
- add the [minimal css needed](https://gist.github.com/aa-wd/b0fb3f007e85641c6570b4b3ee850ba0) (feel free to adjust)
- initialize the assisted input fields

Add `data-assisted` as an attribute to inputs you want assistance for:

```html
<!-- regular input -->
<input />

<!-- assisted input -->
<input data-assisted />
```

In your javascript, initialize the assisted input fields script by calling the default export (let's name it `createAssistedInputs`) with an object that has single characters as keys, and an array of single characters with diacritic marks as values.


```js
import createAssistedInputs from '@aawd/assisted-input';

createAssistedInputs({
  'a': ['a', 'à', 'â', 'æ'],
  'c': ['c', 'ç'],
  'e': ['e', 'é', 'è', 'ê', 'ë'],
  'i': ['i', 'î', 'ï'],
  'o': ['o', 'ô', 'œ'],
  'u': ['u', 'û', 'ü', 'ù'],
});

```
Now hold any of those keys (in the example `a`, `c`, `e`, `i`, `o`, `u`) pressed for a while. See [the demo](https://inputs.aawd.nl) for more instructions.
