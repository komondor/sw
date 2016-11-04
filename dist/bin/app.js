#!/usr/bin/env node


'use strict';

var SW = require('../app/index.js');
var robot = require('robotjs');

// array of argument provided by user
// example: sw la d sw -> return ['la','d','sw']
var list = process.argv.slice(2);

// create an instance of SW
var sw = new SW();

// change bin process directory to user directory
process.chdir(process.cwd());

// verify if the user has provided argument(s)
if (process.argv[2]) {
	sw
	//start iteration process
	.iteration(list)
	// end iteration process and return result if any
	.then(function (result) {
		if (result.length > 1) {
			sw.questionuser(result).then(function (choice) {
				robot.typeString('cd "' + choice + '"');
				robot.keyTap('enter');
			});
		} else {
			robot.typeString('cd "' + result[0] + '"');
			robot.keyTap('enter');
		}
	}).catch(error).done();
}
// if no argument provided
else {
		error("\nusage:\n\n sw folder1 [[subfolder1][subfolder2][...]]\n");
	}

// if error or no match(shouldn't be an error,I should change that)
function error(err) {
	console.log(err);
}