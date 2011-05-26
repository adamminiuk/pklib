/*!
 * pklib JavaScript Library 0.6.1
 * http://pklib.com/
 * 
 * Copyright 2011, Piotr Kowalski
 * GNU General Public License
 * http://pklib.com/license
 * 
 * Dependence jQuery 1.3.x or high!
 * http://jquery.com/
 * 
 * Date: Wed Mar 16 2011 20:44:09 GMT+0100
 */

if (typeof jQuery != 'function'){
    throw Error('jQuery is need\'ed ! Please visit: http://jquery.com/');
}

// Add alias name 'bind' to 'addEvent'. This is better to syntax language
jQuery.fn.addEvent = jQuery.fn.bind;

// Add alias 'unbind' to 'removeEvent'. This is better to syntax language
jQuery.fn.removeEvent = jQuery.fn.unbind;

// Remove element in array
if (!Array.prototype.remove ){
	Array.prototype.remove = function() {
		for(var i = 0; i < arguments.length; ++i){
			if (typeof this.splice != 'undefined') this.splice(arguments[i], 1);
		}
	    return this;
	};
}

// Remove duplicates from array
if (!Array.prototype.unique ){
	Array.prototype.unique = function() {
		for(var effect = 0; effect < 3; ++effect){
			for(var i = 0; i < this.length; ++i){
				for(var j = i + 1 ; j < this.length; ++j){
					if (this[i] === this[j]) this.remove(j);
				}
			}
		}
	    return this;
	};
}

// Check value if is in array
if (!Array.prototype.inArray){
	Array.prototype.inArray = function(parameter) {
		for(var i = 0; i < this.length; ++i){
			if (this[i] === parameter) return true;
		}
		return false;
	};
}

// Check if string is letter
if (!String.prototype.isLetter){
	String.prototype.isLetter = function() {
		if (this.length === 1){
            var ascii = pklib.utils.slug(this[0]).charCodeAt(),
                lowercase = pklib.utils.ascii.lower,
                uppercase = pklib.utils.ascii.upper;
            if (lowercase.inArray(ascii) || uppercase.inArray(ascii)){
                return true;
            }
			return false;
		}
		return false;
	};
}

if (!Date.prototype.getFullMonth){
	Date.prototype.getFullMonth = function(add){
		var month = (parseInt(new Date().getMonth(), 10) + 1);
		add && month += add;
		if(month < 10){
			month = '0' + month;
		} 
		return month; 
	}; 
}