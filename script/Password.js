//Not much to it...
function GeneratePassword(password,account,key) {
	return Hexacrypt_Encrypt(sha256(account+":"+password+":"+key),key);
}

//Here is the jQuery
$(document).ready(function() {

	//Generate the password when da button be clicked
	$("#Generate").click(function() {
		$(".output").val(
			GeneratePassword(
				$(".password").val(),
				$(".account").val(),
				$(".secret").val()
		).substring(0,48));
	});

	//Clear all of the input boxes
	$("#Clear").click(function() {
		$(".password").val("");
		$(".account").val("");
		$(".secret").val("");
		$(".output").val("");
	});

});
