;
var nids = {};
nids.QueryId = {
	is: function(input) {
		return (
			typeof input === 'string' 
			&& input.length === 32 
			&& input.indexOf('qid') === 0
		);
	},
	create: function() {
		return 'qid' + nids.randomString(16, true, true, true);
	},
	ensure: function(input) {
		if (this.is(input) === false) {
			return this.create();
		}
		return input;
	}
};
nids.ClientId = {
	is: function(input) {
		return (
			typeof input === 'string' 
			&& input.length === 32 
			&& input.indexOf('cid') === 0
		);
	},
	create: function() {
		return 'cid' + nids.randomString(16, true, true, true);
	},
	ensure: function(input) {
		if (this.is(input) === false) {
			return this.create();
		}
		return input;
	}
};
nids.randomString = function(length, numbers, alphabetLowerCase, timestamp, alphabetUpperCase, extraChars) {
	var charArray = new Array(length);
	var randomString = '';
	var idchars = [];  
	var lengthIdChars = 0;
	var randomString_chars_alphabet = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z' ];
	var randomString_chars_numbers = [ '1','2','3','4','5','6','7','8','9','0' ];
	var randomString_chars_alphabetUpper = [ 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z' ];
	numbers = (typeof numbers === 'boolean') ? numbers : true;
	alphabetLowerCase = (typeof alphabetLowerCase === 'boolean') ? alphabetLowerCase : false;
	alphabetUpperCase = (typeof alphabetUpperCase === 'boolean') ? alphabetUpperCase : false;
	timestamp = (typeof timestamp === 'boolean') ? timestamp : false;
	if (numbers === true) { 
		idchars = idchars.concat(randomString_chars_numbers); 
	}
	if (alphabetLowerCase === true) { 
		idchars = idchars.concat(randomString_chars_alphabet); 
	}
	if (alphabetUpperCase === true) { 
		idchars = idchars.concat(randomString_chars_alphabetUpper); 
	}
	if (typeof extraChars === 'object' && extraChars instanceof Array === true) {
		idchars = idchars.concat(extraChars); 
	}
	lengthIdChars = idchars.length;
	for (var i=0; i < length; i+=1) {
		charArray[i] = idchars[Math.floor(Math.random()*lengthIdChars)];
	}
	randomString = (timestamp === true) 
		? 
			Date.now() + charArray.join('') 
		: 
			charArray.join('')
	;
	return randomString;
};


;( function() {
	// nodejs
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = nids;
	} 
	// es6
	else if (typeof export !== 'undefined') {
		export nids;
	}
	// plain browser
	else {
		window.nids = nids;
	}
} ) ();

;