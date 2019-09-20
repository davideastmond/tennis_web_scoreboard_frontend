$(()=> {
	// Grab the value from the link text
	const dataLink = encodeURIComponent($("#game-link").val());
	
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://neutrinoapi-qr-code.p.rapidapi.com/qr-code",
		"method": "POST",
		"headers": {
			"x-rapidapi-host": "neutrinoapi-qr-code.p.rapidapi.com",
			"x-rapidapi-key": "a3af53267emshff97be782ee184dp1fd442jsnc1bad4243ec1",
			"content-type": "application/x-www-form-urlencoded"
		},
		"data": {
			"bg-color": "#ffffff",
			"width": "128",
			"fg-color": "#000000",
			"height": "128",
			"content": $("#game-link").val()
		}
	};
	
	$.ajax(settings).done(function (response, textStatus, jqXHR) {
		
		console.log("Text status", textStatus);
		console.log("Text status", jqXHR);
	});
	

});