#!/usr/bin/env node --use_strict

// NPM MODULES
const minimist = require('minimist');

// DOTTO MODULES
const install = require('../lib/install');

// Module implementation
const args = minimist(process.argv.slice(2));

const installer = args.installer;
const dotfiles = args.dotfiles;

install(dotfiles, installer);
