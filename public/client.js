/* jshint esversion: 6 */

console.log(' --- client.js start --- ');

window.gPort = "8888";
window.gURL = "http://localhost:" + window.gPort;

function buildDeviceList(allDevices) {

	var ul = $("<ul>").addClass("list-group");
	for (var index = 0; index < allDevices.length; index++) {

		var device_id_nospaces = allDevices[index].device_id.replace(/ /g, '');
		console.log("DEVICE ID WITH DASH: " + device_id_nospaces);

		ul.append("<li class='list-group-item' style='cursor:pointer' value='"
		+ allDevices[index].device_id + "'>"
		+ "<label><input type='radio' name='device-list-group' id='"
		+ device_id_nospaces + "'><span class='device-id-label'>"
		+ allDevices[index].device_id + "</span></label>"
		+ "<button class='btn btn-default delete' type='button'>delete</button>"
		+ "</li>");
	}

	console.log(ul);
	return ul;
}

function selectChosenDeviceIDWhenDoneWithAjax(finishedAjax) {

	console.dir(finishedAjax);
	
	$.when(finishedAjax).done(function(result) {
		console.log("Getting device id set to YES");

		$.ajax({
			type: 'POST',
			url: window.gURL + "/getselecteddeviceid",
			data:{},
			success: function(msg) {
				console.log(`CLIENT.JS - device to select is: ${msg.device_id}`);
				var toSelect = "#device-id-list #" + msg.device_id;
				console.log("client.js - " + toSelect);
					$(toSelect).prop('checked', true);
			}
		}); //ajax
	}); //when
	
} //function


/////////// init device id ///////////////////////////////

$(function() {

	console.log("client.js - --------> running init device ID");
	$.ajax({
			type: 	'POST',
			url: 	window.gURL + "/initdeviceid",
			data:{},
			success: function(msg) {
				console.log("client.js - INIT DEVICE ID SUCCESS! " + msg.message);
				$("#device-id-display").text(msg.message);
			}
	}); //ajax

	console.log("client.js - --------> running init device LIST");
	var ajaxInitDeviceList = $.ajax({
		type: 	'POST',
		url: 	window.gURL + "/initdevicelist",
		data:{},
		success: function(allDevices) {
			console.dir(allDevices);
			console.log("There are a total of: " + allDevices.length + " devices");
			var buildUL = buildDeviceList(allDevices);

			$("#device-id-list").empty();
			$("#device-id-list").append(buildUL);

			selectChosenDeviceIDWhenDoneWithAjax(allDevices);
		}
	});//ajax


	// RESPONDERS:

	// WHENEVER THE DEVICE LIST CHANGES IN SELECTION, we tick which device id
	// IS MARKED TRUE
	
	$('#device-id-list').on('change', 'ul li input[name=device-list-group]', function() {
		//change Device's attribute 'description' to yes for  $(this).parent().text()
		var deviceid = $(this).parent().text().trim();
		console.log("client.js - selected |" + deviceid + "| radio button");
		console.log("client.js - calling POST /changedevicedescription");
		$.ajax({
			type: 	'POST',
			url: 	window.gURL + "/changedevicedescription",
			data:{ "deviceid"				: deviceid },
			success: function(msg) {
				console.log("------received reply from /changedevicedescription");
				console.dir(msg);

				console.log("client.js - device id:" + msg.message + ", have been set to YES");
				$("#device-id-display").text(msg.message);

			} //success
		}); //ajax
	}); //click


//http://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements?lq=1
//make sure you ouse a id/class that pre-existed before the dynamic change, #device-id-list

  //for the DOM, for event 'click' on class '.delete'
	$('#device-id-list').on( 'click', 'ul li button.delete', function() {

		//STEP 1

		//$(this).parent().css("background-color", "red");
		console.log("client.js - CLICKED on delete button of " + $(this).parent().attr('value'));

		var deviceid = $(this).parent().attr('value');

		//ajax request for delete in database
		var ajaxDeleteDeviceId = $.ajax({
			type: 	'POST',
			url: 	window.gURL + "/deletedeviceid",
			data:
			{
				 "deviceid"				: deviceid
			},
			success: function(msg) {
					var buildUL = buildDeviceList(msg);
					$("#device-id-list").empty();
					$("#device-id-list").append(buildUL);
			}
		}); //ajax

		//STEP2 - ajax server to highlight the list with description 'yes'
		selectChosenDeviceIDWhenDoneWithAjax(ajaxDeleteDeviceId);

	}); //device-list-id on


	$('#insert-newdeviceid-button').click(function() {
		console.log("you clicked on insert new device id");

		var deviceId = $('#input-new-deviceid').val();

		//STEP 1 - ajax the new device to be inserted into the database
		var ajaxForInsertDeviceID = $.ajax({
			type: 	'POST',
			url: 	window.gURL + "/newdeviceid",

			data:
			{
				 "deviceid"				: deviceId
			},
			success: function(msg) {
				var buildUL = buildDeviceList(msg);
				$("#device-id-list").empty();
				$("#device-id-list").append(buildUL);
			} //success
		}); //ajax

		console.log("END of insert new device id");

		//STEP2 - ajax server to highlight the list with description 'yes'
		selectChosenDeviceIDWhenDoneWithAjax(ajaxForInsertDeviceID);

	}); //click

	$('#send-custom-button').click(function() {

		var payLoadText = $('#customPayloadTextArea').val();
		var alertText 	= $('#customAlertTextArea').val();
			
	    $.ajax({
	        type: 	'POST',
	        url: 	window.gURL + "/sendcustomnotification",

			data:
			{
			    "customPayload"				: payLoadText,
				"customAlert"					: alertText
			},
			success: function(msg) {
            	console.log('client.js - button click success, with msg: ' + msg);
        	}
	    });
	});

	$('#send-healthcheck-button').click(function() {
	    $.ajax({
	        type: 	'POST',
	        url: 	window.gURL + "/sendhealthchecknotification",

					data:
					{
					   "key1"				: "data content here",
						 "key2" 			: "haha"
					},
					success: function(msg) {
            console.log('client.js - health check send button click success, with msg: ' + msg);
        }
	    });
	}); //$


}); //function

console.log(' --- client.js end --- ');
