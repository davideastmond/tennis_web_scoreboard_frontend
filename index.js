const express = require('express');
const app = express();
const PORT = 7575;
const bodyParser = require('body-parser');
const path = require('path');
const uuidv4 = require('uuid/v4');
const gameDriver = require('./game');
const WebSocket = require('ws');

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use(express.urlencoded());
const { check, validationResult } = require('express-validator');
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'styles')));

app.use('/game/:id', express.static(path.join(__dirname, 'scripts')));
app.use('/game/:id', express.static(path.join(__dirname, 'styles')));

app.listen(PORT, ()=> {
	console.log(`Client server listening on ${PORT}`);
});

app.get('/', (req, res) => {
	res.render('home.ejs');
});

app.get('/game/:id', (req, res) => {
	// This will render a game page for a second, guest user
	// We need to make sure a game is registered in the array of games

	if (gameDriver.gameArray.includes(req.params.id)) {
		// We found something; render a game page
		res.render('game.ejs', { gameID: req.params.id });
	} else {
		res.status(400).send({ status: 'gameId not found '});
	}
});

app.post('/game/new', [check('p1').trim().escape(), check('p2').trim().escape()], (req, res) => {
	// Post request to start a new game
	// Generate a UUID and a response with a URL Then communicate with the web_server and advise it of the UUID, opening a channel.
	const uniqueId = uuidv4();

	// Send data to tennis_web_server
	ws = new WebSocket('ws://localhost:7001');
	ws.on('open', () => {
		console.log("49-- Connected to tennis_web_server");
		const jsonMessage = JSON.stringify({type: 'game_new', id: uniqueId, players: [req.body.p1, req.body.p2 ]});
		ws.send(jsonMessage);
	});

	ws.on('message', (data)=> {
		ws.close();
		const iData = JSON.parse(data);
		// Once we receive a response, we'll register the game
		gameDriver.gameArray.push(iData.id);

		// Send a response
		const sessionID = iData.id; // Gets the ID for the tennis game session
		
		res.render('game.ejs', { gameID: sessionID });
	});
});
