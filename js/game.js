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

var WIN_SCORE = 200;

var gameBG, gameFG, kyriarch;

var SPRITE_INITIAL_X = 10;
var SPRITE_INITIAL_Y = 90;
var TRACK_INITIAL_Y = 177;
var SPRITE_Y_SPACING = 68;

var roaringCrowdAudio;

function initGame(bg, fg, kyr, runner, tr)
{
	gameBG = new createjs.Bitmap(bg);
	gameFG = new createjs.Bitmap(fg);

	kyriarch = new createjs.Bitmap(kyr);
	kyriarch.x = 900;
	kyriarch.y = 50;

	players = [];

	for (var i = 0; i < 8; i++)
	{
		var sprite = new createjs.Bitmap(runner);
		sprite.x = SPRITE_INITIAL_X;
		sprite.y = SPRITE_INITIAL_Y + SPRITE_Y_SPACING*i;
		sprite.scaleX = 0.5;
		sprite.scaleY = 0.5;

		var track = new createjs.Bitmap(tr);
		track.y = TRACK_INITIAL_Y + SPRITE_Y_SPACING*i;

		players.push({ "sprite": sprite, "track": track, "score": 0 });
	}
}

function startGame()
{
	currentScreen = SCREEN_GAME;
	stage.addChild(gameBG);

	// randomize the order of issues
	// (do it 10 times so it's more random!)
	for (var j = 0; j < 10; j++)
	{
		issues.sort(function(a, b){return 0.5 - Math.random()});
	}

	for (var i = 0; i < 8; i++)
	{
		players[i].score = 0;
		players[i].sprite.x = SPRITE_INITIAL_X;
		stage.addChild(players[i].sprite);
		stage.addChild(players[i].track);
	}

	stage.addChild(kyriarch);
	stage.addChild(gameFG);

	roaringCrowdAudio = createjs.Sound.play("roaringcrowd", { loop: -1 })
}

function endGame()
{
	stage.removeAllChildren();
	roaringCrowdAudio.stop();
}

function updateGame(timeSinceLastTick)
{
	for (var i = 0; i < 8; i++)
	{
		if (issues[i].keys.indexOf(keyPressed) >= 0) // whose key did we press?
		{
			players[i].score += 1;
			players[i].sprite.x = SPRITE_INITIAL_X + players[i].score*5;

			if (players[i].score >= WIN_SCORE)
			{
				endGame();
				showTitle();
				return;
			}
		}
	}
}
