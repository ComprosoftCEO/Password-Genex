//    _   _                                      _   
//   | | | | _____  ____ _  ___ _ __ _   _ _ __ | |_ 
//   | |_| |/ _ \ \/ / _` |/ __| '__| | | | '_ \| __|
//   |  _  |  __/>  < (_| | (__| |  | |_| | |_) | |_ 
//   |_| |_|\___/_/\_\__,_|\___|_|   \__, | .__/\__|
//                                   |___/|_|        
//  Created by Bryan McClain


//All allowed characters in the Hexacrypt string
const allChars = " !\"#$\%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
const charCount = allChars.length;
var filterString;                       //Some passwords don't want certain chars


//Filter out any illegal characters
//===================================
//  Returns the filtered string
function filterInput(input) {

	var retStr = "";
	var i;

	for (i = 0; i < input.length; i++) {
		var c = input.charAt(i);
		if (filterString.indexOf(c) > -1) {retStr+=c;}
	}

	return retStr;
}

//Filters all chars using the filter string
function filterAllChars(filter) {
    
    //Reset filter string
    filterString = "";    
    
    for (i = 0; i < allChars.length; i++) {
        var c = allChars.charAt(i)
        if (filter.indexOf(c) < 0) {filterString+=c;}
    }

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
		pxor = rand.shuffleString(filterString);
		index = pxor.indexOf(input.charAt(i));
		input = setCharAt(input,i,pxor.charAt((pxor.length - 1) - index));
	}

	return input;
}


//Encrypt using a watered-down Hexacrypt algorithm
//
//  Filter string filters any unwanted characters\
//      -NEVER FILTER 0-9 and a-f
//
//  Does NOT add garbage or a checksum
//  ONLY does PseudoXOR
function Hexacrypt_Encrypt(message,key,filter) {

	var rand = new Rand32();
	
	//Filter dis stuff first
    filterAllChars(filter);	
    message = filterInput(message);
	key = filterInput(key);

	//Cast to string using Hash8
    var seed = Hash8(key);

	//A lot simpler algorithm
	rand.reseed(seed);
	message = pseudoXOR(message,rand);
	return message;
}
