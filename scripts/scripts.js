$(document).ready(function(){
	var validator = $("#fileUploadForm").validate({
			rules: {
				patientName : "required",
				gender : "required",
				dob : "required",
				address : "required",
				city : "required",
				state : "required",
				telephone : "required",
				zipcode : "required",				
				memberId : "required",
				payer : "required",
				planName : "required",
				memberbenefitCoverage : "required",
				diagnosis : "required",
				referringProvider : "required",
				preAuthNumber : "required",
				from : "required",
				to : "required",
				placeOfService : "required",
				emergency : "required",
				cpt_hpcs : "required",
				modifier : "required",
				charges : "required",
				npi : "required"
			},
			/* messages: {
				patientName: "Enter your firstname"
			},*/
			errorPlacement: function(error, element) {
				if (element.is(":radio"))
					error.appendTo(element.parent().next().next());
				else if (element.is(":checkbox"))
					error.appendTo(element.next());
				else
					error.appendTo(element.parent());
			},
			submitHandler: function() {
					var array = [];
					var mobileArray = [];
					
					var now = new Date(Date.now());
					var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
					
					/*function makeid(length) {
					   var result           = '';
					   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
					   var charactersLength = characters.length;
					   for ( var i = 0; i < length; i++ ) {
						  result += characters.charAt(Math.floor(Math.random() * charactersLength));
					   }
					   return result;
					   
					} */

//console.log(makeid(5));

var clamId = (Math.random()+' ').substring(2,8)+(Math.random()+' ').substring(2,8);


var date = new Date($('#from').val());
  fromday = date.getDate();
  frommonth = date.getMonth() + 1;
  fromyear = date.getFullYear();
  var fromdate = ([fromday, frommonth, fromyear].join('/'));
  
var date = new Date($('#to').val());
  today = date.getDate();
  tomonth = date.getMonth() + 1;
  toyear = date.getFullYear();
  var todate = ([today, tomonth, toyear].join('/'));  
  
  var date = new Date($('#dob').val());
  dobday = date.getDate();
  dobmonth = date.getMonth() + 1;
  dobyear = date.getFullYear();
  var dobdate = ([dobday, dobmonth, dobyear].join('/')); 
  

  

			$("form").each(function() {	
			array.push({
				"$class": "org.example.ca.SubmitApplication",
				"claimId": clamId,
				"provider": "James.Doe",//$('.userName').text(),
				"payer": $('#payer').val(),
				"claimDetails": {
				  "memberId": $('input[name=memberId]').val(),
				  "$class": "org.example.ca.Claimdetails",
				  "memberbenefitCoverage": $('input[name=memberbenefitCoverage]').val(),
				  "diagnosis": $('input[name=diagnosis]').val(),
				  "referringProvider": $('input[name=referringProvider]').val(),
				  "referringProviderNumber": parseInt($('input[name=preAuthNumber]').val()),
				  "preAuthNumber": parseInt($('input[name=preAuthNumber]').val()),				  
				  "from": new Date($('input[name=from]').val() +' '+ formatted).toISOString(),
				  "to": new Date($('input[name=to]').val() +' '+ formatted).toISOString(),
				  "placeOfService": parseInt($('input[name=placeOfService]').val()),
				  "emergency": $('input[name=emergency]').val(),
				  "cpt_hpcs": $('input[name=cpt_hpcs]').val(),
				  "modifier": parseInt($('input[name=modifier]').val()),
				  "charges": parseInt($('input[name=charges]').val()),
				  "npi": parseInt($('input[name=npi]').val()),
				  "patientName": $('input[name=patientName]').val(),
				  "gender": $('input[name=gender]').val(),
				  "dob": new Date($('input[name=dob]').val() +' '+ formatted).toISOString(),
				  "address": $('input[name=address]').val(),
				  "city": $('input[name=city]').val(),
				  "state": $('input[name=state]').val(),
				  "zipcode": $('input[name=zipcode]').val(),
				  "telephone": $('input[name=telephone]').val(),
				  "planName": $('#planName').val(),
				  "claimSubmissionDate": new Date().toISOString(), // new Date($('input[name=claimSubmission]').val() +' '+ $('#timestamp').val()).toISOString(),
				  "claimSubmissionTime":  new Date().toISOString()
				  
				}

			});
			
			var device_id = "dlOLP2r6TymDU7NzjzdNlK:APA91bEelegsLY8L-7SphSrfoHejyoiDTVkTGdemaORE-61fIBD-dXhcV_Y0ZDP5yo1jWR6NNST5GqjF_pHy3zKDAsvMp75jFVV1QjtJ2hixVUricWFMJZn1eI8SoQOPoqRZCO1V3Hvv";
			mobileArray = {
				"to": device_id,				
				"notification": {
				  "title": "Submit Notification",
				  "body": 'Submitted the following Claim:' +' '+clamId
				},
				"data":{"memberId":$('input[name=memberId]').val() ,"claimId": clamId}
			};						
			
				
			});
						
		var jsonString = JSON.stringify(array);
		var mobileNotification  = JSON.stringify(mobileArray);
			
			//console.log(jsonString);
			
			$.ajax({
				  url: "https://3a696f95.ngrok.io/api/SubmitApplication",				  
				//url: 'scripts/data.json',
				  type: "POST",
				  dataType: "json",
				  contentType: "application/json",
				  data: jsonString,   
				  success: function(data, textStatus, jqXHR)  {
				  $.modal.close();
				  $('#success').modal();
					$(document).on('click','#confirmSuccess',function(){	
					
					$.ajax ({
						  url: "https://fcm.googleapis.com/fcm/send",				  
						  type: "POST",						  						 
						  headers : {
								Authorization : "key=AAAAc8wl9Eo:APA91bEttCMnJZAjoDIFy8pQrPpX3F9vTWHovkPPiS-4sKQstAa7Q2-eiI4r0wniqZnk-NP7tkFzFxfrTC18PiIHO-l1aYZjhrrE4wGtuooKiJNRftsenBf3VsS0HjZyGSMYOs5_kjlE"
						  },
						  contentType: "application/json",
						  dataType: "json",
						  data: mobileNotification,
						  
							  success: function(data, textStatus, jqXHR) {								  
								  location.reload(true);	
							  },
							  error: function(data, textStatus, jqXHR)  {								  
									location.reload(true);									  
							  }
						
					});
						
					});	

					
				  console.log(jsonString);	
				  console.log(mobileNotification);					  
				  
				  },
				  error: function(data, textStatus, jqXHR)  {
					console.log(jsonString);
					
					$.ajax ({
						  url: "https://fcm.googleapis.com/fcm/send",				  
						  type: "POST",						  						 
						  headers : {
								Authorization : "key=AAAAc8wl9Eo:APA91bEttCMnJZAjoDIFy8pQrPpX3F9vTWHovkPPiS-4sKQstAa7Q2-eiI4r0wniqZnk-NP7tkFzFxfrTC18PiIHO-l1aYZjhrrE4wGtuooKiJNRftsenBf3VsS0HjZyGSMYOs5_kjlE"
						  },
						  contentType: "application/json",
						  dataType: "json",
						  data: mobileNotification,
						  
							  success: function(data, textStatus, jqXHR) {
								  console.log(mobileNotification);
								  location.reload(true);	
							  },
							  error: function(data, textStatus, jqXHR)  {
								  console.log(mobileNotification);	
									location.reload(true);									  
							  }
						
					});
					
					
				  }
			}); 
			},
			highlight: function(element, errorClass) {
				$(element).parent().next().find("." + errorClass).removeClass("checked");
				
			}
	});

	});
	
/* Submit Claim ends */
/*
$.ajax({
  url: 'https://api.spacexdata.com/v3/history',
  type: "GET",
  dataType: 'json',
  data: data,
  success: function(data, textStatus, jqXHR)  {
					console.log(jsonString);
				  },
				  error: function(data, textStatus, jqXHR)  {
					console.log(jsonString);
				  }
});



/* Dashboard starts */

$.get('https://3a696f95.ngrok.io/api/ApproveApplication',function(data){
console.log(data);
var thead = "<thead><tr><th width='25%'>TransactionId ID</th><th width='20%'>Claim ID</th><th width='20%'>Patient Name</th><th width='18%'>Plan Name</th><th width='15%'>Actions</th></tr></thead>";
var output = '<tbody>';  
$.each(data, function(key,val){
	
  output += '<tr><td><a href='+ val.transactionId+'>TransactionId ID<a></td><td class="approvedcId">'+ val.claimId+'</td><td>'+ val.claimDetails.patientName +'</td><td>'+ val.claimDetails.planName +'</td><td><a href="#approve-3" id="confirmApproval" class="btn approvedClaimBtn" rel="modal:open">Action</a></td></tr>';
  
});

output += '</tbody>';
$('#approvedClaims').html(thead + output);
});

$.get('https://3a696f95.ngrok.io/api/RejectApplication',function(data){
console.log(data);
var thead = "<thead><tr><th width='25%'>TransactionId ID</th><th width='20%'>Claim ID</th><th width='20%'>Patient Name</th><th width='20%'>Plan Name</th><th width='20%'>Actions</th></tr></thead>";
var output = '<tbody>';  
$.each(data, function(key,val){
  output += '<tr><td><a href='+ val.transactionId+'>TransactionId ID<a></td><td class="rejectedcId">'+ val.claimId+'</td><td>'+ val.claimDetails.patientName +'</td><td>'+ val.claimDetails.planName +'</td><td><a href="#approve-2" id="confirmApproval" class="btn rejectedClaimBtn" rel="modal:open">Action</a></td></tr>';
});
output += '</tbody>';
$('#rejectedClaims').html(thead + output);
});



$.get('https://3a696f95.ngrok.io/api/SubmitApplication',function(data){
	var result = [];
	function comp(a, b) {
    return new Date(a.result.claimDetails.claimSubmissionDate).getTime() - new Date(b.result.claimDetails.claimSubmissionDate).getTime();
}

result.sort(comp);



var thead = "<thead><tr><th width='20%'>TransactionId ID</th><th width='20%'>Claim ID</th><th width='20%'>Patient Name</th><th width='20%'>Plan Name</th><th width='20%'>Actions</th></tr></thead>";
var output = '<tbody>';  
$.each(data, function(key,val){
  output += '<tr><td><a href='+ val.transactionId+'>'+ val.transactionId+'<a></td><td class="cId">'+ val.claimId+'</td><td>'+ val.claimDetails.patientName +'</td><td>'+ val.claimDetails.planName +'</td><td><a href="#approve-1" id="confirmApproval" class="btn submitClaimBtn" rel="modal:open">Action</a></td></tr>';
  //console.log(val.claimDetails.claimSubmissionDate);
  result.push(output);
});


//console.log(result.sort() );
output += '</tbody>';
$('#submittedClaims').html(thead + output);
});





/* Dashboard ends */	
	
	
	$(document).ready(function(){
		
		
	
	$('#confirmReject').on('click', function(){
		$('#validate1').text('Error Detected').addClass('disabled');
		$('.leftPanel table tr').eq(0).css('color','red');
		$('.leftPanel table tr').eq(2).css('color','red');
		$('#rejectClaim, #approveClaim').addClass('disabled');
	});
	$('#confirmReject2').on('click', function(){
		$('#validate2').text('Error Detected').addClass('disabled');
		//$('.rightPanel table tr').eq(5).css('color','red');		
	});
	
	$('#loginBtn').on('click',function() {
		var role = $('input[name=role]:checked').val();
		if (role == 'Provider') {
			$('#loginBtn').attr('href','index.html');
		}
		else  {
			$('#loginBtn').attr('href','insurer-index.html');
		}
	});
	$('#btn-Submit').on('click',function() {
		
		$('#rejectClaim, #validate1, #validate2, #submitClaim').addClass('disabled');
	});
	});
	
	
	$(document).ready(function(){
		
		
		
$.get('https://3a696f95.ngrok.io/api/ApproveApplication',function(data){
console.log(data);
var output = '<tbody>';  
$.each(data, function(key,val){
  output += '<tr><td class=labelKey with=45%>Patient Name</td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.claimDetails.patientName +'</td></tr><tr><td class=labelKey with=45%>Gender</td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.claimDetails.gender +'</td></tr><tr><td class=labelKey with=45%>DOB</td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.claimDetails.dob +'</td></tr><tr><td class=labelKey with=45%>Patient’s Address</td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.claimDetails.address +'</td></tr><tr><td class=labelKey with=45%>City</td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.claimDetails.city +'</td></tr><tr><td class=labelKey with=45%>State</td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.claimDetails.state +'</td></tr><tr><td class=labelKey with=45%>Telephone</td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.claimDetails.telephone +'</td></tr><tr><td class=labelKey with=45%>Plan name   </td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.claimDetails.planName +'</td></tr>';
});
output += '</tbody>';
$('#providerDetailsLeft').html(output);
});



$.get('https://3a696f95.ngrok.io/api/RejectApplication',function(data){
console.log(data);
var output = '<tbody>';  
$.each(data, function(key,val){
  output += '<tr><td class=labelKey with=45%>Member ID</td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.claimDetails.memberId +'</td></tr><tr><td class=labelKey with=45%>Claim Submission Time</td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.claimDetails.claimSubmission +'</td></tr><tr><td class=labelKey with=45%>Claim Submission Date</td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.timestamp +'</td></tr><tr><td class=labelKey with=45%>Member Benefit Coverage</td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.claimDetails.memberbenefitCoverage +'</td></tr><tr><td class=labelKey with=45%>Diagnosis (ICD)</td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.claimDetails.diagnosis +'</td></tr><tr><td class=labelKey with=45%>Referring Provider</td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.claimDetails.referringProvider +'</td></tr><tr><td class=labelKey with=45%>Pre Authorization Number</td><td class=tblSep>:</td><td class=labelValue with=45%>'+ val.claimDetails.preAuthNumber +'</td></tr><tr><td class=labelKey with=45%>&nbsp; </td><td class=tblSep></td><td class=labelValue with=45%>&nbsp;</td></tr>';
});
output += '</tbody>';
$('#providerDetailsRight').html(output);
});



$.get('https://3a696f95.ngrok.io/api/SubmitApplication',function(data){
console.log(data);
var output = '<ul>';  
$.each(data, function(key,val){
  output += '<tr class="even"><td>'+ val.claimDetails.from +'</td><td>'+ val.claimDetails.to +'</td><td>'+ val.claimDetails.placeOfService +'</td><td>'+ val.claimDetails.emergency +'</td><td>'+ val.claimDetails.cpt_hpcs +'</td><td>'+ val.claimDetails.modifier +'</td><td>'+ val.claimDetails.charges +'</td><td>'+ val.claimDetails.npi +'</td></tr>';
});
output += '</ul>';
$('#btmTable').html(output);
});


});


	
