

var assert 			= require("assert");
var program 		= require('../dist/app/index');

let clone = new program();


describe('Test: FONCTION READFOLDER \n', function(){

	it('readfolder should return /node_modules with keyword node in ./ folder', function(){
		clone.readfolder(['./','node']).then(function(value){
			assert.equal('./node_modules', value );
		});
	});

	it('readfolder should return /test with keyword te in ./ folder', function(){
		clone.readfolder(['./','te']).then(function(value){
			assert.equal('./test', value );
		});
	});
});

describe('Test: FONCTION ITERATION \n', function(){

	it('iteration should return /test with keyword te in ./ folder', function(){
		clone.iteration(['te']).then(function(value){
			assert.equal('./test', value );
		});
	});

	it('iteration should return /node_modules/shelljs with keyword \n\    ["nod","js"] in ./ folder', function(){
		clone.iteration(['nod','js']).then(function(value){
			assert.equal('./node_modules/shelljs', value[0] );
		});
	});
});
