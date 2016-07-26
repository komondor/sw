'use strict';

var Q = require('q');
var fs = require('fs');
var _ = require('underscore');
var shelljs = require('shelljs');
var inquirer = require("inquirer");
var args = require('yargs').argv;


//export
module.exports 	= SW;

function SW(){this.possiblematch = []}

// search folder for a match
// resolve: array of matches
// reject: no match
SW.prototype.readfolder =  function (data) {
	var self = this;
	var urlnow = data[0];
	var word = data[1];
  var thatDeffered = Q.defer();

	// intercept ..
	if(word === ".."){
		self.possiblematch = [];
		let resultUrl = urlnow+word+'/';
		thatDeffered.resolve([resultUrl]);
	}

	fs.readdir(urlnow, function(err,success){
		_.each(success, function(argu){
			var stats = fs.statSync(urlnow+argu);
			if(argu.search(new RegExp(word, "i"))>-1 && stats.isDirectory())
				self.possiblematch.push(urlnow+argu+'/');
		});
		if(self.possiblematch.length ===0){
			self.possiblematch = [];
			thatDeffered.resolve(null);
		}
		else {
			self.result = self.possiblematch;
			self.possiblematch = [];
			thatDeffered.resolve(self.result);
		}
	});
	return thatDeffered.promise;
}

// once the iteration process is completed
// and matches.length > 1
// ask user to choose folder
SW.prototype.questionuser = function (choices) {
	var thatDeffered = Q.defer();
	var questionfolder = [{
		type: "list",
		name: "folderChoice",
		message: "Which folder would like to work with?",
		choices: choices
	}];

	inquirer.prompt( questionfolder, function( answers ) {
		thatDeffered.resolve(answers.folderChoice);
	});
	return thatDeffered.promise;
}

// iteration
SW.prototype.iteration =  function (list,url)  {
	var self = this;
	var thatDeffered = Q.defer();
	var starting_path = ['./'];
	let home_directory = getUserHome()
	console.log(home_directory);

	if(list[0]=== ':') {

		list = list.slice(1);
		starting_path = [home_directory + '/'];

		if(list.length === 0) {
			thatDeffered.resolve([starting_path])
		}

	}

	var sequenceKeyword = Q().then(()=>{
			return [starting_path,list]
	});

	for(let i=0;i<list.length;i++){
		let resultat = [];
		sequenceKeyword=sequenceKeyword.then(function(data){
			var keywordDeffered = Q.defer();
			var sequenceFolder = Q().then(function(){
				return [data[0][0],list[i]];
			});

			for(let j=0;j<data[0].length;j++){
				sequenceFolder = sequenceFolder
				.then(self.readfolder.bind(self))
				.then(function(datafrom){
					var folderDiffered = Q.defer();
					if(j !== data[0].length-1){
						if(datafrom)
							datafrom.forEach((fromiter)=>{resultat.push(fromiter)});
						folderDiffered.resolve([data[0][j+1],list[i]]);
					}
					if(j === data[0].length-1 && i !== list.length -1){
						if(!datafrom && resultat.length ===0)
							thatDeffered.reject('no match');
						if(datafrom)
							datafrom.forEach((fromiter)=>{resultat.push(fromiter)});
						keywordDeffered.resolve([resultat]);
					}
 					if(j === data[0].length-1 && i === list.length -1){
						if(!datafrom && resultat.length ===0)
							thatDeffered.reject('no match');
						if(datafrom)
							datafrom.forEach((fromiter)=>{resultat.push(fromiter)});
						thatDeffered.resolve(resultat);
					}
					return folderDiffered.promise;
				});
			}
			sequenceFolder
				.catch((err)=>{thatDeffered.reject(err)})
				.done();
			return keywordDeffered.promise;
		});

	}
	sequenceKeyword
		.catch((err)=>{thatDeffered.reject(err)})
		.done();
	return thatDeffered.promise;
}

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
