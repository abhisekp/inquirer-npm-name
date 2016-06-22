
# inquirer-npm-name
Helper function using [inquirer](https://github.com/SBoudrias/Inquirer.js) to validate a value provided in a prompt does not exist as a npm package.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url] [![All Contributors](all-contributors-image)](#contributors)

If the value is already used as a npm package, then the users will be prompted and asked if they want to choose another one. If so, we'll recurse through the same validation process until we have a name that is unused on the npm registry. This is a helper to catch naming issue in advance, it is not a validation rule as the user can always decide to continue with the same name.

## Install

```sh
$ npm install --save @abhisekp/inquirer-npm-name # npm i -S @abhisekp/inquirer-npm-name
```

## Usage

```js
const inquirer = require('inquirer');
const askName = require('@abhisekp/inquirer-npm-name');

askName({
  name: 'name',
  message: 'Module Name'
}, inquirer).then(answers => {
  console.log(answers.name);
});
```

Inside a **Yeoman Generator** you'd call it this way:

```js
const generators = require('yeoman-generator');
const inquirer = require('inquirer');
const askName = require('@abhisekp/inquirer-npm-name');

module.exports = generators.Base.extend({
  prompting: function () {
    const appNamePrompt = {
      type: 'input',
      name: 'appname',
      message: 'What would you like to name the app?',
      default: answers => this.appname, // optional
      filter: appname => appname.trim().replace(/\s+/g, '-').toLowerCase() // optional
    };

    const prompts = []; // other prompts

    return askName(appNamePrompt, this)
      .then(name =>
        this.prompt(prompts)
          .then(answers => this.answers = answers)
      );
  }
});
```

`askName` takes 2 parameters:

1. `prompt` an [Inquirer prompt configuration](https://github.com/SBoudrias/Inquirer.js#question).
2. `inquirer` or any object with a `obj.prompt()` method.

**Returns:** A `Promise` resolved with the answer object.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/1029200?v=3" width="100px;"/><br /><sub>Abhisek Pattnaik</sub>](http://about.me/abhisekp)<br />[💻](https://github.com/sboudrias/inquirer-npm-name/commits?author=abhisekp) 💡 |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [Simon Boudrias](http://twitter.com/vaxilart)


[npm-image]: https://badge.fury.io/js/inquirer-npm-name.svg
[npm-url]: https://npmjs.org/package/inquirer-npm-name
[travis-image]: https://travis-ci.org/SBoudrias/inquirer-npm-name.svg?branch=master
[travis-url]: https://travis-ci.org/SBoudrias/inquirer-npm-name
[daviddm-image]: https://david-dm.org/SBoudrias/inquirer-npm-name.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/SBoudrias/inquirer-npm-name
[coveralls-image]: https://coveralls.io/repos/SBoudrias/inquirer-npm-name/badge.svg
[coveralls-url]: https://coveralls.io/r/SBoudrias/inquirer-npm-name
