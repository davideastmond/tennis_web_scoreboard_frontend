
const localIP = "ws://192.168.100.115:7001";

$(() => {

	// Create a new client socket
	const clientSocket = new  WebSocket(localIP);

	const g_id = $("#gameID").data('gameid');

	clientSocket.onopen = () => {
		console.log('onopen fetch!');
		fetchGameScore(g_id, clientSocket);
	};

	clientSocket.onmessage = (data) => {
		const recData = JSON.parse(data.data);

		if (recData.type === "server_response") {
			if (recData.message === "current_game_score") {
				console.log("24, id", recData.id);
				$("#tap-p1-score").text(recData.score.p1_score);
				$("#tap-p2-score").text(recData.score.p2_score);
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
		bumpScore(g_id, 1, clientSocket);
	});

	$("#tap-p2-score").click((e) => {
		console.log("player 2 score tapped");
		bumpScore(g_id, 2, clientSocket);
	});
});

function fetchGameScore(gameID, socket) {
	socket.send(JSON.stringify({ type: 'fetch_score', id: gameID }));
}

function bumpScore(gameID, int_forPlayer, socket) {
	// This increases the player score based on either player 1 or 2
	if (int_forPlayer !== 1 && int_forPlayer !== 2) {
		throw "Invalid player";
	}
		// Connection made
	socket.send(JSON.stringify({ type: "bump_score", id: gameID, forPlayer: int_forPlayer}));
}