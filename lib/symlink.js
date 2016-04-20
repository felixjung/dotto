// NODE MODULES
const fs = require('fs');

// NPM MODULES
const shell = require('shelljs');
const inquirer = require('inquirer');

// LIBRARY MODULES
const prompts = require('./prompts');
const promisify = require('./promisify');

// PROMISIFIED FUNCTIONS
const fsUnlink = promisify(fs.unlink);
const fsSymlink = promisify(fs.symlink);
const fsLStat = promisify(fs.lstat);

function createSymlink(sourcePath, targetPath, overwrite) {
  console.log('foo');
  if (overwrite) {
    fsUnlink(targetPath);
  }

  console.log('bar');

  return fsSymlink(sourcePath, targetPath).then(() => targetPath);
}

function handleExistsAction(action) {
  switch (action.toUpperCase()) {
    case 'OVERWRITE':
      return createSymlink(sourcePath, targetPath, true);
    case 'SKIP':
      return Promise.resolve(null);
    default:
      process.exit();
  }
}

function symlink(sourcePath, targetPath) {
  // Check if targetPath already exists.
  const gettingStats = fsLStat(targetPath);

  return gettingStats.then(stats => {
    const exists = stats.isFile() || stats.isSymbolicLink();

    return exists ? prompts.targetExists(targetPath).then(handleExistsAction) :
      createSymlink(sourcePath, targetPath, true);
  });
}

// Register with exports
module.exports.symlink = symlink;
