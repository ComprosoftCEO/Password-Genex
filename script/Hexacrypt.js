/***
 *      _   _                                      _   
 *     | | | | _____  ____ _  ___ _ __ _   _ _ __ | |_ 
 *     | |_| |/ _ \ \/ / _` |/ __| '__| | | | '_ \| __|
 *     |  _  |  __/>  < (_| | (__| |  | |_| | |_) | |_ 
 *     |_| |_|\___/_/\_\__,_|\___|_|   \__, | .__/ \__|
 *                                     |___/|_|        
 */
//  Created by Bryan McClain


//All allowed characters in the Hexacrypt string
const allChars = " !\"#$\%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
const charCount = allChars.length;


//Filter out any illegal characters
//===================================
//  Returns the filtered string
function filter(input) {

	var retStr = "";
	var i;

	for (i = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);
		if (c >= 32 && c <= 126) {retStr+=String.fromCharCode(c);}
	}

	return retStr;
}


//Replace function for the string
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}


//Perform a Pseudo XOR on string input and using
//  a seeded Rand64 object
function pseudoXOR(input, rand) {

	var pxor;
	var i, index;	
	
	for (i = 0; i < input.length; i++) {
		pxor = rand.shuffleString(allChars);
		index = pxor.indexOf(input.charAt(i));
		input = setCharAt(input,i,pxor.charAt((pxor.length - 1) - index));
	}

	return input;
}


//Hash the string
String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};


//Encrypt using a watered-down Hexacrypt algorithm
//
//  Does NOT add garbage or a checksum
//  ONLY does PseudoXOR
function Hexacrypt_Encrypt(message,key) {

	var rand = new Rand64();
	
	//Filter dis stuff first
	message = filter(message);
	key = filter(key);

	//Cast to string
    var seed = key.hashCode();

	//A lot simpler algorithm
	rand.reseed(seed);
	message = pseudoXOR(message,rand);
	return message;
}
