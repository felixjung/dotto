// NODE MODULES
const path = require('path');

// NPM MODULES
const inquirer = require('inquirer');

// LIBRARY MODULES
const promisify = require('./promisify');

function targetExists(targetPath) {
  const fileExistsQuestion = {
    type: 'expand',
    message: `Target ${targetPath} already exists: `,
    name: 'exists',
    choices: [
      {
        key: 's',
        name: 'Skip',
        value: 'SKIP'
      },
      {
        key: 'o',
        name: 'Overwrite',
        value: 'OVERWRITE'
      },
      new inquirer.Separator(),
      {
        key: 'x',
        name: 'Abort',
        value: 'ABORT'
      }
    ]
  };

  return inquirer.prompt([fileExistsQuestion])
    .then(answer => answer.exists.toUpperCase());
}

function selectInstallers(installers) {
  const choices = installers.map(choice => ({
    name: getInstallerName(choice),
    value: choice,
    checked: true
  }));

  const message = 'Select installers to run';

  const installersQuestion = {
    type: 'checkbox',
    message: `${message}: `,
    name: 'installers',
    choices: choices
  };

  return inquirer.prompt([installersQuestion])
    .then(answer => answer.installers);
}

function getInstallerName(installerPath) {
  return path.basename(path.dirname(installerPath));
}

module.exports.targetExists = targetExists;
module.exports.selectInstallers = selectInstallers;
