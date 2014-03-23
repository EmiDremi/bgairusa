/* Bg Air Usa Javascript file */



/* BOOKING FORM */

$('#oneway').click(function(){
	$('#returndate').css('display','none');
	$('#returndate-flex').css('display','none');
});

$('#twoway').click(function(){
	$('#returndate').css('display','block');
	$('#returndate-flex').css('display','block');
	
});


$('#ADTPAX').change(function(){
	if( $(this).val() >= 1 ){
		var deca = "";
		for(var i = 0; i <= 4 ; i++){ deca += "<option value='"+ i +"'>"+ i +"</option>"; }
		$('#CHDPAX').html(deca);
		var bebeta = "";
		for(var b = 0; b <= $(this).val() ; b++){ bebeta += "<option value='"+ b +"'>"+ b +"</option>"; }
		$('#InfantPAX').html(bebeta);
	}else{
		$('#CHDPAX').html("<option value='0'>0</option>");
		$('#InfantPAX').html("<option value='0'>0</option>");
	}
});

$('#amadeus_book').submit(function(){

	var error = [];

	if( $('#B_LOCATION_1').val() == 0 ){
		error.push("Please, choose departure airport.");
	}

	if( $('#E_LOCATION_1').val() == 0 ){
		error.push("Please, choose arrival airport.");
	}

	if( $('#B_DATE_1').val() == "" ){
		error.push("Please, choose departure date.");
	}

	if( ( $('#B_DATE_2').val() == "" ) && ( $('#twoway').is(":checked") ) ){
		error.push("Please, choose return date.");
	}

	if( $('#oneway').is(":checked") ){
		$('#B_DATE_2').val($('#B_DATE_1').val());
	}

	var num = 1;
	var add_elements = "";
	
	var adults = $('#ADTPAX').val();
	var youth = $('#FIELD_YTH_NUMBER').val();
	var childred = $('#CHDPAX').val();
	var students = $('#FIELD_STU_NUMBER').val();
	var infants = $('#InfantPAX').val();
	
	for(i=1; i<(parseInt(adults)+1); i++){
		add_elements += '<input type="hidden" name="TRAVELLER_TYPE_'+num+'" value="ADT" />'+"\n\r";
		num++;
	}
	
	for(i=1; i<(parseInt(youth)+1); i++){
		add_elements += '<input type="hidden" name="TRAVELLER_TYPE_'+num+'" value="YTH" />'+"\n\r";
		num++;
	}

	for(i=1; i<(parseInt(childred)+1); i++){
		add_elements += '<input type="hidden" name="TRAVELLER_TYPE_'+num+'" value="CHD" />'+"\n\r";
		num++;
	}
	for(i=1; i<(parseInt(students)+1); i++){
		add_elements += '<input type="hidden" name="TRAVELLER_TYPE_'+num+'" value="STU" />'+"\n\r";
		num++;
	}

	for(i=1; i<(parseInt(infants)+1); i++){
		add_elements += '<input type="hidden" name="HAS_INFANT_'+i+'" value="TRUE" />'+"\n\r";
		num++;
	}

	$('#traveler_data').html(add_elements);

	var errormsg = error.join("\n");
	if( errormsg != "" ){
		alert(errormsg);
		return false;
	}else{
		return true;
	}

});

/* AD: Commening out for BgAirUsa
$('#B_LOCATION_1,#E_LOCATION_1').change(function(){
	// get the service fee
	$.ajax({
		type: 'POST',
		url: '/ajax/service_fee',
		data: {from: $('#B_LOCATION_1').val(), to: $('#E_LOCATION_1').val()},
		success: function(result) { $('#SO_GL').val(result); },
		dataType: "text"
	});
});
*/

$("#sign_up_form").submit(function(e){
	e.preventDefault();

	if ($("#inf_field_Name").val() == '') {
		$("#inf_field_Name").css("border-color", "red");
		$("#status").html("PLEASE, ENTER NAME!");
		$("#status").css("visibility", "visible");
		setTimeout(function() {$("#status").css("visibility", "hidden"); $("#inf_field_Name").css("border-color", "rgb(238, 238, 238)");}, 5000);
		return false;
	}
	
	var email_addr = $('#inf_field_Email').val();
	if (email_addr == '') {
		$("#inf_field_Email").css("border-color", "red");
		$("#status").html("PLEASE, ENTER EMAIL ADDRESS!");
		$("#status").css("visibility", "visible");
		setTimeout(function() {$("#status").css("visibility", "hidden"); $("#inf_field_Email").css("border-color", "rgb(238, 238, 238)");}, 5000);
		return false;
	}
	
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(!regex.test(email_addr)) {
           $("#status").html("INVALID EMAIL ADDRESS!");
		   $("#status").css("visibility", "visible");
		   $("#inf_field_Email").css("border-color", "red");
           setTimeout(function() {$("#status").css("visibility", "hidden");$("#inf_field_Email").css("border-color", "rgb(238, 238, 238)");}, 5000);
           return false;
    }

	$.ajax({
        type: 'POST',
       	url: 'process_signup.php5',
	    data: $("#sign_up_form").serialize(),
	    success: function(response, textStatus, jqXHR) {
          $("#inf_field_Name").val("");
          $("#inf_field_Email").val("");
		  $("#status").html(response);
		  $("#status").css("visibility", "visible");
		  setTimeout(function() {$("#status").css("visibility", "hidden");}, 5000);
		},
		error: function(jqXHR, textStatus, errorThrown) {
	      $("#status").html("ERROR! STATUS - " + textStatus);
	      $("#status").css("visibility", "visible");
	      setTimeout(function() {$("#status").css("visibility", "hidden");}, 5000);
		},
		dataType: 'html'
	});
	
});

