Dotto helps you setting up your dotfiles using Node.js.

# Requirements

Dotto uses ES2015 features and requires Node.js ^5.x.x.

# Installation

You need to install Dotto as a global npm module by running

```javascript
npm install -g dotto
```

# Usage

Dotto has two components; a CLI and a node module that can be used from your
dotfiles' install scripts. The CLI will scan your dotfiles directory for
installer files, ask you which ones you would like to run, and finally execute
your selected install scripts sequentially. You envoke the CLI by executing

```bash
dotto [--dotfiles "path"][--installer "pattern"] 
```

The `--dotfiles` flag lets you specify the path to the folder containing your
dotfiles and defaults to node's current working directory. The `--installer`
flag allows you to set the filename you use for your install scripts. All
install scripts need to have the same name, but reside at different paths. The
default install script name is `installer`.

The philiosophy of Dotto is to allow you to write install scripts specfic to
each of your applications configured via dotfiles. For example, you have a
shared configuration for Vim and Neovim. Neovim recently moved to an
XFG-compliant configuration, which means its configuration files should reside
in a subfolder of `~/.config`. Instead setting up a structure of dummy symlink
files or similar, you can write a single install script that will create
symlinks to your shared Vim/Neovim configuration files specific to each
application. This gives you a lot of control over how your dotfiles should be
set up.

In addition to running your install scripts Dotto exposes a bunch of useful
 modules and helper functions that you may use in your install scripts.

## API

After installing Dotto globally you can require it in your install script like
this

```javascript
const dotto = require('dotto');
```

Here is a list of the various helper modules and functions exposed by Dotto.

### dotto.shell

This is full blown [shelljs](http://documentup.com/shelljs/shelljs) for running
terminal commands from within node. Very useful for things like creating folders
or similar from your install script.

### dotto.brew

Exposes [brewmaster](https://github.com/felixjung/brewmaster), a wrapper for
installing Homebrew/Linuxbrew packages from node. After bootstrapping
Homebrew/Linuxbrew from a bash script and getting node installed, you can use
brewmaster to install all your favorite packages with custom options etc.

### dotto.symlink

A simple function for creating symlinks, one of the most important operations
when setting up dotfiles. Compared to just copying your dotfiles to your
homefolder, symlinking them allows you to track any changes via git. This
example

```javascript
const dotto = require('dotto');

symlink('~/.dotfiles/source', '~/.target');
```

will try to create a symlink located at `~/.target` pointing to
`~/.dotfiles/source`. If `symlink` finds that the target already exists, it will
ask you how to proceed via a prompt.

## Notes

Dotto is still very much a work in progress. Now that I got an initial version
released, I will start using it in my own dotfiles. Which should get some of the
surely existing bugs ironed out. If you're heaving some trouble using Dotto,
please open an issue. If you fix a bug, opening a pull request would be awesome.

