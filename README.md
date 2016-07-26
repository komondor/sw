
# sw :

[![Build Status](https://travis-ci.org/komondor/sw.svg?branch=master)](https://travis-ci.org/komondor/sw)


- this module requires [node-gyp](https://github.com/nodejs/node-gyp)
- windows and mac

#### then, install globally:

```bash
npm install sw -g
```

#### usage:

```bash
$ sw folder|sc [[subf1|sc][subf2|sc][...]]      
```

#### special characters(sc)

characters | description
---------- | ------------
`:`        | `home directory(special only as first argument)`
`..`       | `parent folder`


#### example 1:

 name | description
---------- | ------------
`from`        | `~/desktop`
`to`       | `~/desktop/folder1/folder2`
`with cd:` | `$ cd folder1/folder2`
`with sw:` | `$ sw r1 r2`



#### example 2:

 name | description
---------- | ------------
`from`        | `~/desktop/folder1`
`to`       | `~/Downloads/subfolder/library`
`with cd`      | `$ cd ~/downloads/subfolder/library`
`with sw`       | `$ sw : do sub lib`

#### example 3:

 name | description
---------- | ------------
`from`        | `~/Downloads/subfolder/library`
`to`       | `~/Downloads/subfolder/mediafolder/textfolder`
`with cd:` |  ` $ cd ../mediafolder/textfolder`
`with sw`  | `$ sw .. me te`



#### matches :


match(es) | return
---------- | ------------
`0`        | `no match`
`1`       | `to(target) directory`
`2 or more` | `Which folder would like to work command with? (Use arrow keys)`
