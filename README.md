
# sw

[![Build Status](https://travis-ci.org/komondor/sw.svg?branch=master)](https://travis-ci.org/komondor/sw)



#### install:

- this module requires [node-gyp](https://github.com/nodejs/node-gyp)
- then, `npm install sw -g`

#### description:

`cd` command with shorcuts(change directory)


#### example

`sw fo sub`  searches for a directory that matches this regular     	expression: `/.*fo.*\/.*sub.*/g`. Therefore, it would match`./folder/subfolder` but not `folder/whatever`

- If it matches only one directory, it will perform `cd ./to/this/directory`
- If it matches two or more directories, it will prompt you to choose a folder


#### special characters

There are 4 special characters

###### absolute path ("/")

```bash

#  special only as first argument
#  that would match with /usr/local/share

sw / u loc sh
```

###### relative to home directory ( "~" or ":")

```bash

# special only as first argument
# that would match ~/Desktop/afolderwithalongname

sw ~ Desk gnam

# or with ":"

sw : sk rwi

```

###### parent folder( "..")

```bash

# from /usr/local/share/zsh
# that would match  /usr/local/include

sw .. .. ncl

```
