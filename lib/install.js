// NODE MODULES
const fs = require('fs');
const path = require('path');

// LIBRARY MODULES
const promisify = require('./promisify');
const prompts = require('./prompts');

// NPM MODULES
const recursive = promisify(require('recursive-readdir'));
const shell = require('shelljs');

// CONSTANTS
const dotfilesDir = process.env.DOTFILES;
const defaultInstallerName = 'installer';

function isNoInstaller(file, stats, installerName) {
  const matchesInstallerName = path.basename(file) === installerName;
  const isDirectory = stats.isDirectory();

  return !matchesInstallerName && !isDirectory;
}

function findInstallers(directory, installerName) {
  directory = directory || dotfilesDir || process.cwd();

  if (directory === process.cwd()) {
    console.warn(
      `No directory specified. Looking for installers in ${ directory }.`
    );
  }

  return recursive(
    directory,
    [(file, stats) => isNoInstaller(file, stats, installerName)]
  );
}

function runInstallers(installers) {
  installers.map(require);
}

function install(directory, installerName) {
  return findInstallers(directory, installerName)
    .then(prompts.selectInstallers)
    .then(runInstallers)
    .catch(err => { console.log('Something went wrong.', err); });
}

module.exports = install;
