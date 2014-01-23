$(function() {
	$(document).on('focusin', '.field, textarea', function() {
		if(this.title==this.value) {
			this.value = '';
		}
	}).on('focusout', '.field, textarea', function(){
		if(this.value=='') {
			this.value = this.title;
		}
	});
	var ratioW = 1440,
		devW = 1,
		devL=0,
		eyeOff = 300;

	function alignBG(){
		if ($('#bg img').width() > ratioW ) {
			devW = $('#bg img').width()/1440;
		} else {
			devW =1;
		}
		$('#bg img').css('top', -((eyeOff*devW)-eyeOff))

		if ($(window).width() < ratioW){
			devL = -( (ratioW - $(window).width())/2);
		} else {
			devL = 0
		}
		$('#bg img').css('left',devL  )
	}

	$(window).on('resize', function(){
		alignBG()
	}).on('load', function(){
		alignBG()
		$('#bg img').animate({opacity:1},200)
	})

});

$("#ADTPAX").change(function(){
	if( $(this).val() >= 1 ){
		var deca = "";
		for(var i = 0; i <= 4 ; i++){ deca += "<option value='"+ i +"'>"+ i +"</option>"; }
		$("#CHDPAX").html(deca);
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
