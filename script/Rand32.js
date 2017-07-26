//    ____                 _   _________  
//   |  _ \ __ _ _ __   __| | |___ /___ \ 
//   | |_) / _` | '_ \ / _` |   |_ \ __) |
//   |  _ < (_| | | | | (_| |  ___) / __/ 
//   |_| \_\__,_|_| |_|\__,_| |____/_____|
//                          
//  Pseudo-Random Number Generator for 32-Bit integers                 
//  Created by Bryan McClain

//Some constants
const MULTIPLER = 1103515245;
const INCREMENT = 12345;
const ORDER	= 32;
const ARR_MASK = 31;
const BIT_MASK = 4294967295;

class Rand32 {

	//Create a new Rand64 Class
	constructor() {
		this.arr = new Array;
	}
	

	//Give it a new seed
	reseed(seed) {		
		var i;	

		if(seed === undefined || seed === null) {
			seed = Math.floor(Math.random() * 1103515245);	
		}

		//Use Linear congruential generator to fill array
		for (i = 0; i < ORDER; i++) {
			seed = (seed*MULTIPLER + INCREMENT) & BIT_MASK;
			this.arr[i] = seed;

    	    //Switch bits
    	    seed = ((seed << 16) | (seed >> 16)) & BIT_MASK;
		}
		this.arr[ORDER] = 0;
	}


	//Get the next random number
	//
	//  If specified, maxval returns number 0 <= X < max
	next(maxval) {
		var index = this.arr[ORDER] = (this.arr[ORDER] + 1) & ARR_MASK;
		this.arr[index] += (this.arr[(index + 5) & ARR_MASK] + this.arr[(index + 17) & ARR_MASK]);
		
		if(maxval !== undefined && maxval !== null) {
			return Math.abs(this.arr[index]) % maxval;
		} else {
			return Math.abs(this.arr[index]);
		}
	}


	//Shuffle a string using this random object
	shuffleString(input) {

		var retVal = "";
		var strlen, index;
		var i;	

		strlen = input.length;
		while ((strlen = input.length) > 0) {
			index = this.next(strlen);
			retVal += input.charAt(index);
			input = input.substring(0,index) + input.substring(index+1,input.length);
		}

		return retVal;
	}
}
