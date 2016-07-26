
# sw

[![Build Status](https://travis-ci.org/komondor/sw.svg?branch=master)](https://travis-ci.org/komondor/sw)


- this module requires [node-gyp](https://github.com/nodejs/node-gyp)
- windows and mac

#### then, install globally:

```bash
npm install sw -g
```

#### usage:

```bash
$ sw folder [[subf1][subf2][...]]      
```

- to point to the home directory, use ":"
- to point to the parent directory, use ".."

#### example:

- to point to folder location: '~/desktop/folder1/folder2' :

```bash
$ sw : desk r1 r2
```

- if there is only one match, then it will perform:

```bash
$ cd ~/desktop/folder1/folder2
```

- if there are 2 or more matches, it will prompt to choose the location

```bash
? Which folder would like to work with? (Use arrow keys)
❯ ./desktop/folder1/folder2
  ./desktop/folder12/folder2
  ./desktop/folder123/folder1
```

#### demo:

<img src="media/example.gif" width="1000">
