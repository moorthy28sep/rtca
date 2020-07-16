
$(document).ready(function(){
	var device_id = "dlOLP2r6TymDU7NzjzdNlK:APA91bEelegsLY8L-7SphSrfoHejyoiDTVkTGdemaORE-61fIBD-dXhcV_Y0ZDP5yo1jWR6NNST5GqjF_pHy3zKDAsvMp75jFVV1QjtJ2hixVUricWFMJZn1eI8SoQOPoqRZCO1V3Hvv";
	  var myArray = [];
	  var mobileApproveArray = [];
	  var mobileRejectedArray = [];
	  $(document).on('click','.submitClaimBtn',function(){
		var cId = $(this).closest('tr').find('.cId').text();
			$("#cIdValue").text(cId);
		});			
		
		$('#approveClaim').on('click',function(){	
			
		
			$.get('http://13.234.114.251:3000/api/SubmitApplication',function(data){
			
				$(data).filter(function (i,n){
					if( n.claimId === $("#cIdValue").text()) {
						n.$class = "org.example.ca.ApproveApplication";
						delete n['transactionId'];
						delete n['timestamp'];
					myArray.push(n);
					
						var myApprovedClaim = JSON.stringify(myArray);			
						console.log(myApprovedClaim);
							$.ajax({
								url: "http://13.234.114.251:3000/api/ApproveApplication",								
								type: "POST",
								dataType: "json",
								contentType: "application/json",
								data: myApprovedClaim,   
							success: function(data, textStatus, jqXHR)  {
								$.modal.close();						
								$('#success').modal();												
								$(document).on('click','#confirmSuccess',function(){									
									location.reload(true);	
								});

						
						
						mobileApproveArray = {
								"to": device_id,				
								"notification": {
								  "title": "Approved Notification",
								"body": 'Claim Approved'
								},
								"data" : {
									  "memberId": $('input[name=memberId]').val(),
									  "claimId": n.claimId
									  }
								  }
								  
						var mobileAprroveNotification  = JSON.stringify(mobileApproveArray);

						$.ajax ({
						  url: "https://fcm.googleapis.com/fcm/send",				  
						  type: "POST",						  						 
						  headers : {
								Authorization : "key=AAAAc8wl9Eo:APA91bEttCMnJZAjoDIFy8pQrPpX3F9vTWHovkPPiS-4sKQstAa7Q2-eiI4r0wniqZnk-NP7tkFzFxfrTC18PiIHO-l1aYZjhrrE4wGtuooKiJNRftsenBf3VsS0HjZyGSMYOs5_kjlE"
						  },
						  contentType: "application/json",
						  dataType: "json",
						  data: mobileAprroveNotification,  
						  
							  success: function(data, textStatus, jqXHR) {
								  console.log(mobileAprroveNotification);
							  },
							  error: function(data, textStatus, jqXHR)  {
								  console.log(mobileAprroveNotification);						  
							  }
						
					});								
							},
							error: function(data, textStatus, jqXHR)  {	
								$.modal.close();
								$('#success').modal();																
								$(document).on('click','#confirmSuccess',function(){									
									location.reload(true);	
								});								
							}
							}); 
						
					}
				});
			});
		});
		
		$('#rejectClaim').on('click',function(){	
		
			$.get('http://13.234.114.251:3000/api/SubmitApplication',function(data){
			
				$(data).filter(function (i,n){
					if( n.claimId === $("#cIdValue").text()) {
						n.$class = "org.example.ca.RejectApplication";
						delete n['transactionId'];
						delete n['timestamp'];
					myArray.push(n);
						var myApprovedClaim = JSON.stringify(myArray);			
						console.log(myApprovedClaim);
							$.ajax({
								url: "http://13.234.114.251:3000/api/RejectApplication",								
								type: "POST",
								dataType: "json",
								contentType: "application/json",
								data: myApprovedClaim,   
							success: function(data, textStatus, jqXHR)  {								
								$.modal.close();
								$('#successRejected').modal();								
								//alert("Claim Rejected Successfully");
								$(document).on('click','#confirmSuccess',function(){									
									location.reload(true);	
								});
								
								
								
						mobileRejectedArray = {
								"to": device_id,				
								"notification": {
								  "title": "Rejected Notification",
								"body": 'Claim Rejected'
								},
								  "data" : {
								  "memberId": $('input[name=memberId]').val(),
								  "claimId": n.claimId
								  }
								  }
								  
								  var mobileRejectedNotification  = JSON.stringify(mobileRejectedArray);
						

						$.ajax ({
						  url: "https://fcm.googleapis.com/fcm/send",				  
						  type: "POST",						  						 
						  headers : {
								Authorization : "key=AAAAc8wl9Eo:APA91bEttCMnJZAjoDIFy8pQrPpX3F9vTWHovkPPiS-4sKQstAa7Q2-eiI4r0wniqZnk-NP7tkFzFxfrTC18PiIHO-l1aYZjhrrE4wGtuooKiJNRftsenBf3VsS0HjZyGSMYOs5_kjlE"
						  },
						  contentType: "application/json",
						  dataType: "json",
						  data: mobileRejectedNotification,  
						  
							  success: function(data, textStatus, jqXHR) {
								  console.log(mobileRejectedNotification);
							  },
							  error: function(data, textStatus, jqXHR)  {
								  console.log(mobileRejectedNotification);						  
							  }
						
					});
					
															
							},
							error: function(data, textStatus, jqXHR)  {								
								$.modal.close();
								$('#successRejected').modal();								
								//alert("Claim Rejected Successfully");
								$(document).on('click','#confirmSuccess',function(){									
									location.reload(true);	
								});
							}
							}); 
						
					}
				});
			});
		});


$(document).on('click','.approvedClaimBtn',function(){
		var approvedcId = $(this).closest('tr').find('.approvedcId').text();
			$("#approvedcIdValue").text(approvedcId);
});

$(document).on('click','.rejectedClaimBtn',function(){
		var rejectedcId = $(this).closest('tr').find('.rejectedcId').text();
			$("#rejectedcIdValue").text(rejectedcId);
});

		
		});