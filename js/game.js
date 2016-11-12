var issues = [
	{ "name": "racism", "keys": [71, 66] }, // G B
	{ "name": "sexism", "keys": [78, 67] }, // N C
	{ "name": "classism", "keys": [77, 68] }, // M D
	{ "name": "ableism", "keys": [83, 76] }, // S L
	{ "name": "homophobia", "keys": [81, 70] }, // Q F
	{ "name": "transphobia", "keys": [80, 86] }, // P V
	{ "name": "islamophobia", "keys": [75, 72] }, // K H
	{ "name": "xenophobia", "keys": [65, 69] } ]; // A E

var players;

var SPRITE_INITIAL_X = 10;
var SPRITE_INITIAL_Y = 50;

function initGame(runner)
{
	players = [];

	for (var i = 0; i < 8; i++)
	{
		var sprite = new createjs.Bitmap(runner);
		sprite.x = SPRITE_INITIAL_X;
		sprite.y = SPRITE_INITIAL_Y + SPRITE_INITIAL_Y*i;
		players.push({ "sprite": sprite, "score": 0 });
	}
}

function startGame()
{
	currentScreen = SCREEN_GAME;

	// randomize the order of issues
	// (do it 10 times so it's more random!)
	for (var j = 0; j < 10; j++)
	{
		issues.sort(function(a, b){return 0.5 - Math.random()});
	}

	for (var i = 0; i < 8; i++)
	{
		players[i].score = 0;
		stage.addChild(players[i].sprite);
	}
}

function updateGame(timeSinceLastTick)
{
	for (var i = 0; i < 8; i++)
	{
		if (issues[i].keys.indexOf(keyPressed) >= 0)
		{
			players[i].score += 1;
			players[i].sprite.x = SPRITE_INITIAL_X + players[i].score*5;
		}
	}
}
