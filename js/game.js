var issues = [
	{ "name": "racism", "keys": [71, 66] }, // G B
	{ "name": "sexism", "keys": [78, 67] }, // N C
	{ "name": "classism", "keys": [77, 68] }, // M D
	{ "name": "ableism", "keys": [83, 76] }, // S L
	{ "name": "homophobia", "keys": [81, 70] }, // Q F
	{ "name": "transphobia", "keys": [80, 86] }, // P V
	{ "name": "islamophobia", "keys": [75, 72] }, // K H
	{ "name": "xenophobia", "keys": [65, 77] } ]; // A M

var players;

function initGame()
{
	players = [];

	for (var i = 0; i < 8; i++)
	{
		players.push({ "distance": 0 });
	}
}

function startGame()
{
	currentScreen = SCREEN_GAME;

	for (var i = 0; i < 8; i++)
	{
		players[i].distance = 0;
	}

	// randomize the order of issues
	// (do it 10 times so it's more random!)
	for (var j = 0; j < 10; j++)
	{
		issues.sort(function(a, b){return 0.5 - Math.random()});
	}
}

function updateGame(timeSinceLastTick)
{
	for (var i = 0; i < 8; i++)
	{
		if (issues[i].keys.indexOf(keyPressed) >= 0)
		{
			players[i].distance += 1;
		}

		console.log(issues[i].name, players[i].distance);
	}
}
