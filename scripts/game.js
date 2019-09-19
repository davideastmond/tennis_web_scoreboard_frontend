
$(() => {
	const localIP = $("#web-server").data('webserver').toString();
	// Create a new client socket
	console.log("5 local ip", localIP);
	const clientSocket = new  WebSocket(localIP);

	const g_id = $("#gameID").data('gameid');

	clientSocket.onopen = () => {
		
		fetchGameScore(g_id, clientSocket);
	};

	clientSocket.onmessage = (data) => {
		const recData = JSON.parse(data.data);

		if (recData.type === "server_response") {
			if (recData.message === "current_game_score") {
				console.log("Data received", recData);
				$("#tap-p1-score").text(recData.game.tennis_score[0]);
				$("#tap-p2-score").text(recData.game.tennis_score[1]);
			}
		} else if (recData.message === "game_id_not_found") {
			alert("game id not found");
		} else {
			console.log("Unrecognized response");
		}
	};


	$("#tap-p1-score").click((e) => {
		// Send a message to server
		console.log("player 1 score tapped");
		// Bumthe score
		bumpScore(g_id, 0, clientSocket);
	});

	$("#tap-p2-score").click((e) => {
		console.log("player 2 score tapped");
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
	socket.send(JSON.stringify({ type: "bump_score", id: gameID, forPlayer: int_forPlayer}));
}