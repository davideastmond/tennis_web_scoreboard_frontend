
$(() => {
  const localIP = $("#web-server").data('webserver').toString();
  // Create a new client socket and connect to the web_server
  const clientSocket = new  WebSocket(localIP);

  const g_id = $("#gameID").data('gameid');

  clientSocket.onopen = () => {
    // Immediately refresh / update the score upon connecting
    fetchGameScore(g_id, clientSocket);
  };

  clientSocket.onmessage = (data) => {
    const recData = JSON.parse(data.data);

    if (recData.type === "server_response") {
      if (recData.message === "current_game_score") {
        updateUIDisplay(recData);
      }
    } else if (recData.message === "game_id_not_found") {
      alert("game id not found");
    } else {
      console.log("Unrecognized response");
    }
  };

  // When the user taps
  $("#tap-p1-score").click((e) => {
    // Send a message to server
    // Bumthe score
    bumpScore(g_id, 0, clientSocket);
  });

  $("#tap-p2-score").click((e) => {
    bumpScore(g_id, 1, clientSocket);
  });
});

function fetchGameScore(gameID, socket) {
  socket.send(JSON.stringify({ type: 'fetch_score', id: gameID }));
}

function bumpScore(gameID, int_forPlayer, socket) {
  // This increases the player score based on either player 1 or 2
  if (int_forPlayer !== 0 && int_forPlayer !== 1) {
    throw "Invalid player";
  }
    // Connection made
  try {
    socket.send(JSON.stringify({ type: "bump_score", id: gameID, forPlayer: int_forPlayer}));
  } catch (error) {
    console.log(error);
  }
}

function updateUIDisplay(recData, error) {
  showHideSets(recData, error);
  // Updates the scoreboard and sets
  $("#tap-p1-score").text(recData.game.tennis_score[0]);
  $("#tap-p2-score").text(recData.game.tennis_score[1]);
  $("#p1-label").text(recData.game.players[0]);
  $("#p2-label").text(recData.game.players[1]);
  $("#player-one-name").html(recData.game.players[0]);
  $("#player-two-name").html(recData.game.players[1]);

  if (error) {
    $("#main-game-div").css('display', 'none');
    alert('connection lost');
  }
  
  const $table_rows = $('tr');
  console.log($table_rows[1].cells[1].innerHTML);
  updateSetTable(recData.game.sets);
}


function showHideSets(recData, error) {
  // This will show or hide the last two columns of the table depending on 3-set or 5-set game
  if (recData.game.max_set_game === 3) {
    $(".five-set").css('visibility', 'hidden') ;
  } else {
    $(".five-set").css('visibility', 'visible');
  }
}

function updateSetTable(setsObject) {
  // This function takes in only the sets object, iterates over it and updates the set scoreboard table
  const $table_rows = $('tr');
  for (let [key, value] of Object.entries(setsObject)) {
    console.log("KV", key, value);
    console.log(typeof(key), typeof(value));
    $table_rows[1].cells[parseInt(key) + 1].innerHTML = setsObject[key][0];
    $table_rows[2].cells[parseInt(key) + 1].innerHTML = setsObject[key][1];
  }
}