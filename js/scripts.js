/* AIR.bg Javascript file */

$(document).ready(function(){

	// get main page tabs by hash
	if(window.location.hash != "") {
		$('#tabs').children('li').each(function(){
				var idName = $(this).attr('id');
				if( $(this).hasClass(idName) ){
				}else{
					$(this).removeClass(idName + '-active');
					$(this).addClass(idName);
					$(this).css("z-index" ,"200");
					$("div.main-booking-form-body").children('div').each(function(){
						$(this).css("display","none");
					});
				}
		});

		$(window.location.hash).removeClass($(window.location.hash).attr('id'));
		$(window.location.hash).addClass($(window.location.hash).attr('id') + '-active');
		$(window.location.hash).css("z-index","300");
		var bodyName = $(window.location.hash).attr('id') + '-body';
		$("#"+bodyName).fadeIn("slow");
	}

	// timetable destinations
	if( $('#E_LOCATION_1_R').length > 0 ){
		$.ajax({
			type: 'POST',
			url: '/ajax/service_fee',
			data: {from: $('#E_LOCATION_1_R').val(), to: $('#B_LOCATION_1_R').val()},
			success: function(result) { $('#SO_GL').val(result); },
			dataType: "text"
		});
	}

	// style tables
	if( $('table.roundtable').length > 0 ){

		$('table.roundtable tr').each(function(){
			
			if( $(this).is(":first-child") ){
				$(this).children('td').each(function(){
					
					if( $(this).is(":first-child") && $(this).is(":last-child") ){
						$(this).addClass('onlytop');
					}else if( $(this).is(":first-child") ){
						$(this).addClass('firstfirst up-left-round');
					}else if( $(this).is(":last-child") ){
						$(this).addClass('firstelse up-right-round');
					}else{
						$(this).addClass('firstelse');
					}

				});
			}else if( $(this).is(":last-child") ){
				$(this).children('td').each(function(){

					if( $(this).is(":first-child") && $(this).is(":last-child") ){
						$(this).addClass('onlybottom');
					}else if( $(this).is(":first-child") ){
						$(this).addClass('firstlast down-left-round');
					}else if( $(this).is(":last-child") ){
						$(this).addClass('firstlastelse down-right-round');
					}else{
						$(this).addClass('firstlastelse');
					}

				});
			}else{
				$(this).children('td').each(function(){
					if( $(this).is(":first-child") ){
						$(this).addClass('first');
					}else{
						$(this).addClass('else');
					}
				});
			}

		});
	}

	// news ticker
	function getnext(){
		if( $(this).next().length > 0 ){
			$(this).next().fadeIn(400).delay(2000).fadeOut(400,getnext);
		}else{
			$('#news-scroll li:first-child').fadeIn(400).delay(2000).fadeOut(400,getnext);
		}
	}
	if( $('#news-scroll').length > 0 ){
		$('#news-scroll li:first-child').fadeIn(400).delay(2000).fadeOut(400,getnext);
	}

});

$("#tabs > li > a").click(
	function(){

		$(this).parents('ul').children('li').each(function(){
				var idName = $(this).attr('id');
				if( $(this).hasClass(idName) ){
				}else{
					$(this).removeClass(idName + '-active');
					$(this).addClass(idName);
					$(this).css("z-index" ,"200");
					$("div.main-booking-form-body").children('div').each(function(){
						$(this).css("display","none");
					});
				}
		});

		$(this).parent().removeClass($(this).parent().attr('id'));
		$(this).parent().addClass($(this).parent().attr('id') + '-active');
		$(this).parent().css("z-index","300");
		var bodyName = $(this).parent().attr('id') + '-body';
		$("#"+bodyName).fadeIn("fast");
	}
);

$("li.submenu_first > a").hover(
	function(){
		$(this).parent().css('background-image','url("/images/box-top-hover.png")');
	},
	function(){
		$(this).parent().css('background-image','url("/images/box-top.png")');
	}
);

$("li.submenu_last > a").hover(
	function(){
		$(this).parent().css('background-image','url("/images/box-bottom-hover.png")');
	},
	function(){
		$(this).parent().css('background-image','url("/images/box-bottom.png")');
	}
);

/* USERS LOGIN */

$('#login').click(
	function(){
		if( $("#loginbox").css('display') == 'block' ){
			$("#loginbox").fadeOut('fast');
		}else{
			$("#loginbox").fadeIn('fast');
		}
	}
);

$('#login-form').submit(function(){
	if( $('#login_password').val() == '' || $('#login_username').val() == '' ){
		alert( $('#js_login_empty').val() );
		return false;
	}else{
		return true;
	}
});

/* POLL */

$("#poll-close").click(function(){
	if( $("#poll").css('width') == '42px' ){
		$("#poll").css('width','auto');
	}
	$("#poll-container").animate({width:'toggle'},{duration: 200,complete: function(){ 
			if( $("#poll-container").css('display') == 'none'){ 
				$("#poll").css('width','42px'); 
			}
		}
	});
	//$("div.poll-footshadow").animate({width:'toggle'},200);
});


/* SUBMENUS */

$('div.content_submenu > ul').children('li').each(function(){
	if( $(this).height() < '15' ){
		$(this).children('a').css('padding-top','13px');
		$(this).children('a').css('padding-bottom','13px');
	}else{
		$(this).children('a').css('padding-top','7px');
		$(this).children('a').css('padding-bottom','6px');
	}

});

/* CHARTERS FORM */

$('#chartersform-number').change(function(){
		var fields = $(this).val();
		fields++;
		$('#charters-form li').css('display','none');
	
		$('#charters-form li').each(function(index){
			if( index < fields ){
				$(this).css('display','block');
			}
		});
	}
);

$(function(){
	if( $('#charters-form') ){
		$('#charters-form li').each(function(index){
			if( index < 3 ){
				$(this).css('display','block');
			}
		});
	}
});

$('#charters-form').submit(function(){
	var mandatory = ['organization','phone','email','person'];
	var errors = [];

	$('#charters-form input[type="text"]').each(function(){ 
		if( $.inArray( $(this).attr('name'), mandatory) != '-1' ){
			if( $(this).val().length == 0 ){
				errors.push($(this).attr('name'));
			}
		}
	});

	if( errors.length > 0 ){
		alert(jerrors['mandatory_fields']);
	}else{
		$.post('/ajax/charters',$(this).serialize(), function(result) {
			$('#result').html( $('#thankyou').html() );
		}, 'html');
	}
	return false;
});

/* BUSINESS FLIGHT FORM */

$('#businessflight-form').submit(function() {
	var mandatory = ['name','surname','email','company','title'];
	var errors = [];

	$('#businessflight-form input').each(function(){ 
		if( $.inArray( $(this).attr('name'), mandatory) != '-1' ){
			if( $(this).val().length == 0 ){
				errors.push($(this).attr('name'));
			}
		}
	});

	if( errors.length > 0 ){
		alert(jerrors['mandatory_fields']);
	}else{
		$.post('/ajax/businessflights',$(this).serialize(), function(result) {
			$('#result').html( $('#thankyou').html() );
		}, 'html');
	}
	return false;
});

/* SHOP ORDERFORM */

$('#shoporder-form').submit(function() {
	var shop_error = [];
	$('#shoporder-form input[type="text"]').each(function(index, domEle){ 
		if( $(domEle).val() == '' ){ shop_error.push( $(domEle).attr('name') ); }
	});
	if( !$('#shoporder-form input[name="title"]').is(":checked") ){ shop_error.push( 'title' ); }
	if( shop_error.length == 0){
		$.post('/ajax/shoporder',$(this).serialize(), function(result) {
			$('#result').html(result);
		});
	}else{
		alert( $('#shop_jserror').val() );
	}
	return false;
});

/* POLL */

$('#anketa').submit(function() {

	if( $('#poll-content input[name="answer[]"]').is(":checked") ){
		$.post('/ajax/poll',$(this).serialize(), function(result) {
			$('#poll-container').css('display','none');
			$('#poll-thankyou').css('display','block');
			$("#poll").delay(1500).fadeOut('slow');
		}, 'html');
	}else{
		alert( "Please, choose at least one option." );
	}
	return false;
});

$('#offices').change(
	function(){
		$.post('/ajax/offices', {offices: $(this).val(), lang: $('#sys_language').val() }, function(result) { $('#result').html(result); }, 'html');
	}
);

$('#timetableairports').change(
	function(){
		$.post('/ajax/getdestinations', {airport_cityid: $(this).val(), lang: $('#sys_language').val() }, function(result) { $('#result').html(result); }, 'html');
	}
);

/* REGISTRATION FORM */

$('#register-form').submit(function() {
	var error_arr = [];
	var any = /^[^\s]+$/i;
	var email = /^([\w\.]+)\@([-a-z0-9\.]+)\.([\w\.]{2,5})$/i;
	var phone = /^[\+]?([\d\s\/]{5,})$/i;

	$('#register-form input[type="text"]').each(function(index, domEle){
		if( $(domEle).attr('name') == 'name' ){ if( any.test( $(domEle).val() )){ }else{  error_arr.push( $(domEle).attr('name') ); } }
		if( $(domEle).attr('name') == 'surname' ){ if( any.test( $(domEle).val() )){ }else{ error_arr.push( $(domEle).attr('name') ); } }
		if( $(domEle).attr('name') == 'phone' ){ if( phone.test( $(domEle).val() )){ }else{ error_arr.push( $(domEle).attr('name') ); } }
		if( $(domEle).attr('name') == 'email' ){ if( email.test( $(domEle).val() )){ }else{ error_arr.push( $(domEle).attr('name') ); } }
	});
	if( error_arr.length == 0){
		$.post('/ajax/register',$(this).serialize(), function(result) {
			$('#result').html(result);
			$('#register-buttons').html('');
		});
	}else{
		alert( error_arr.join('\n') );
		//alert( $('#shop_jserror').val() );
	}
	return false;
});

$('#resetpw-form').submit(function() {
	var email = /^([\w\.]+)\@([-a-z0-9\.]+)\.([\w\.]{2,5})$/i;
	if( email.test( $('#resetemail').val() ) ){
		$.post('/ajax/resetpw',{email: $('#resetemail').val(), lang: $('#sys_language').val()}, function(result) {
			$('#result').html(result);
			$('#reset-button').html('');
		});
	}
	return false;
});

$('#changepw-form').submit(function() {
	if( $('#newpass').val() == $('#again').val() ){
		$.post('/ajax/changepw',{password: $('#newpass').val(), lang: $('#sys_language').val()}, function(result) {
			$('#result').html(result);
			$('#reset-button').html('');
		});
	}else{
		alert("Паролите не съвпадат");
	}
	return false;
});

/* BOOKING FORM */

$('#oneway').click(function(){
	$('#returndate').css('display','none');
	$('#returndate-flex').css('display','none');
});

$('#twoway').click(function(){
	$('#returndate').css('display','block');
	$('#returndate-flex').css('display','block');
	
});

$('#B_LOCATION_1').change(function(){
	$('#E_LOCATION_1').html("<option>...</option>");
	$.post('/ajax/book_to',{acronym: $(this).val(), lang: $('#sys_language').val() }, function(result) {
		$('#E_LOCATION_1').html(result);
		$.ajax({
			type: 'POST',
			url: '/ajax/service_fee',
			data: {from: $('#B_LOCATION_1').val(), to: $('#E_LOCATION_1').val()},
			success: function(result) { $('#SO_GL').val(result); },
			dataType: "text"
		});
	});
	return false;
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

// TIMETABLE 

$('#B_LOCATION_1_R,#E_LOCATION_1_R').change(function(){
	// get the service fee
	$.ajax({
		type: 'POST',
		url: '/ajax/service_fee',
		data: {from: $('#E_LOCATION_1_R').val(), to: $('#B_LOCATION_1_R').val()},
		success: function(result) { $('#SO_GL').val(result); },
		dataType: "text"
	});
});

$('#E_LOCATION_1_R').change(function(){
	$('#B_LOCATION_1_R').html("<option>...</option>");
	$.post('/ajax/book_to',{acronym: $(this).val(), lang: $('#sys_language').val() }, function(result) {
		$('#B_LOCATION_1_R').html(result);
	});
	return false;
});

// END TIMETABLE

// MAIN PAGE - ONLINE CHECKIN

$('#IFormOfIdentification').change(function(){
	$("#typeid").text($(this).find(":selected").text() +":");
});

$('#signup').submit(function(){
	$.post('/ajax/subscribe', { pommo_signup: 'true', Email: $('#emailid').val() }, 
		function(result){
			if( result.match(/Subscription request received/) ){ $('#newsletter_result').html('<b>'+jerrors['thankyou']+'</b>'); 
			}else if( result.match(/Email address already exists/) ){ $('#newsletter_result').html('<b>'+jerrors['dublicate']+'</b>'); 
			}else{ 
				$('#newsletter_result').html('Error');
			}
		}
	,'text');

	return false;
});