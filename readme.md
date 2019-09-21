# Tennis Web Scoreboard Front End App

### About
When you are out on the tennis court, playing a friendly match, don't you wish there was an electronic means of keeping track of your match, game, set score via
your mobile phone? With the power of the web, you can keep track of your games, sets and matches *live and in real time* with all of your friends.

This project is the front end part, which allows the initiator to enter the names of player and start a game. A random link is generated (along with a QR code), which the 
initiator can send to their mates or an umpire even, to keep track of the score, live in real time.

Once a user joins a game session via the link, their client connects to teh web_score_board_server, where the game information is served to each client.

### Related Server Project

Server app is found here [!Server](https://github.com/davideastmond/tennis_web_scoreboard_server)

### Features
- QR codes
- Websockets

### Future Feature Ideas

- Authentication
- Security restrictions
- Database implementation (likely noSQL)
- Email and/or SMS blasting (for sharing the game link with your friends)

### How to Use

- This app requires both the back end and front end app. The link is above.
- Obtain an RapidAPI application key.
- Fork or clone both the front and server repos.
- Run `npm i` to install dependencies
- Create a .env file using the env_sample templates. Fill in the missing info for your local host, and insert your RapidAPI key in the correct field.
- run `npm start` to launch the app.
### Dependencies

- uuid
- express
- node