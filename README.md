
# sw

[![Build Status](https://travis-ci.org/komondor/sw.svg?branch=master)](https://travis-ci.org/komondor/sw)

#### Installation:

- this module requires [node-gyp](https://github.com/nodejs/node-gyp)
- then, `npm install sw -g`


#### Description:

Terminal command to change directory. Example: `sw fo sub` would search for a directory
that matches this regular expression:`/.*fo.*\/.*sub.*/g`. Therefore, it would match `./folder/subfolder`
but not `folder/whatever`.  If it matches only one directory, it will perform `cd ./to/this/directory`.
If it matches two or more directories, it will prompt you to choose one. There are two special characters:
`:` to target the home directory(only as first argument) and `..` to target the parent directory.
So `sw : ..` is equivalent to `cd ~/..`. Another example: `sw a b c d e` would match `./array/boolean/current/do/es6`
