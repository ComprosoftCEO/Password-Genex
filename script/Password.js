//Not much to it...
function GeneratePassword(password,account,key,filter) {
	return Hexacrypt_Encrypt(sha256(account+":"+password+":"+key),key,filter);
}

//Here is the jQuery
$(document).ready(function() {

	//Generate the password when da button be clicked
	$("#Generate").click(function() {

		//Parse the allowed characters
		var filter = "";
		$("input[id='filter']").each(function(index,element) {
			if (!element.checked) {filter+=element.value;}
		});
		console.log(filter);	

		//Set the output box
		$(".output").val(
			GeneratePassword(
				$(".password").val(),
				$(".account").val(),
				$(".secret").val(),
				filter
		).substring(0,48));
	});

	//Clear all of the input boxes
	$("#Clear").click(function() {
		$(".password").val("");
		$(".account").val("");
		$(".secret").val("");
		$(".output").val("");
	});

	//Check all checkboxes
	$("#SelectAll").click(function() {
		$("input[id='filter']").prop('checked', true);
	});

	//Uncheck all checkboxes
	$("#DeselectAll").click(function() {
		$("input[id='filter']").prop('checked', false);
	});


});
