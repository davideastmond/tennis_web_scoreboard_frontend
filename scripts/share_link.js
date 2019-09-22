$(()=> {
  // Grab the value from the link text
  const dataLink = encodeURIComponent($("#game-link").val());
  const api_key = $("#api-key").data('apikey');
  const qr_size = 4;
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://pierre2106j-qrcode.p.rapidapi.com/api?backcolor=ffffff&pixel=${qr_size}&ecl=L%20%7C%20M%7C%20Q%20%7C%20H&forecolor=000000&type=text%20%7C%20url%20%7C%20tel%20%7C%20sms%20%7C%20email&text=${dataLink}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "pierre2106j-qrcode.p.rapidapi.com",
      "x-rapidapi-key": api_key
    }
  };
  
  $.ajax(settings).done(function (response, textStatus, jqXHR) {	
    const qrImage = $('<img id="qr-code-image">').attr('src', response);
    $("#qr-code-share-div").append(qrImage);
  });
  
  $("#start-game-button").click ((e) => {
    // This will navigate to the game session
    const navigationURL = $("#game-link").val();
    window.location = navigationURL;
  });
  
});