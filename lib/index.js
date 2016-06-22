'use strict';
const npmName = require('npm-name');
const npmSafeName = require('npm-safe-name');

// cache name availability checks for faster name check for same names
const nameAvailabilityMap = {};

/**
 * This function will use the given prompt config and will then check if the value is
 * available as a name on npm. If the name is already picked, we'll ask the user to
 * confirm or pick another name.
 * @param  {Object}   prompt   Inquirer prompt configuration
 * @param  {inquirer} inquirer Object with a `prompt` method. Usually `inquirer` or a
 *                             yeoman-generator.
 */
module.exports = function askName(prompt, inquirer) {
  const prompts = [prompt, {
    type: 'confirm',
    name: 'askAgain',
    message: 'The name above already exists on npm, choose another?',
    default: true,
    when: function (answers) {
      const name = answers[prompt.name];
      const isSafe = npmSafeName(name);
      return new Promise(resolve => {
        if (!isSafe) {
          resolve(!isSafe);
        }

        if (nameAvailabilityMap[name] === false) {
          resolve(!nameAvailabilityMap[name]);
        }

        npmName(name).then(isAvailable => {
          nameAvailabilityMap[name] = !!isAvailable;
          resolve(!isAvailable);
        });
      });
    }
  }];

  return inquirer.prompt(prompts).then(function (props) {
    if (props.askAgain) {
      return askName(prompt, inquirer);
    }

    return props;
  });
};
