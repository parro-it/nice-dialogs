# nice-dialogs

Awesome replace for alert, confirm & prompt js commands.

> This is built with [Electron](https://github.com/atom/electron) usage in minf, but should flawlessy work
> on any modern browser that support dialog element. The module is tested
> only on Electron. Open an issue if you find bugs on browsers.

> Templates use CSS classes from [Photon](https://github.com/connors/photon)
> However, Photon css file are not included, so you can style it whatever you whant.

[![Travis Build Status](https://img.shields.io/travis/parro-it/nice-dialogs.svg)](http://travis-ci.org/parro-it/nice-dialogs)
[![NPM module](https://img.shields.io/npm/v/nice-dialogs.svg)](https://npmjs.org/package/nice-dialogs)
[![NPM downloads](https://img.shields.io/npm/dt/nice-dialogs.svg)](https://npmjs.org/package/nice-dialogs)

## Installation

```bash
npm install --save nice-dialogs
```

## Usage

```javascript
  const dialogs = require('nice-dialogs');
  dialogs.confirm('Are you sure?', 'title')
    .then(result => console.log(result))  // true/false

  dialogs.alert('Something happened!', 'Title')
    .then(result => console.log(result))  // always true
```

## License

MIT License.

Copyright (c) 2015 Andrea Parodi
