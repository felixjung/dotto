#!/usr/bin/env node

'use strict';

// EXPOSED NPM MODULES
module.exports.shell = require('shelljs');
module.exports.brew = require('brewmaster');

// DOTTO MODULES
module.exports.symlink = require('./lib/symlink');
