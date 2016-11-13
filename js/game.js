var issues = [
	{ "name": "racism", "keys": [71, 66], "keyLetters": ['G', 'B'] },
	{ "name": "sexism", "keys": [78, 67], "keyLetters": ['N', 'C']  },
	{ "name": "classism", "keys": [77, 68], "keyLetters": ['M', 'D']  },
	{ "name": "ableism", "keys": [83, 76], "keyLetters": ['S', 'L']  },
	{ "name": "homophobia", "keys": [81, 70], "keyLetters": ['Q', 'F']  },
	{ "name": "transphobia", "keys": [80, 86], "keyLetters": ['P', 'V']  },
	{ "name": "islamophobia", "keys": [75, 72], "keyLetters": ['K', 'H']  },
	{ "name": "xenophobia", "keys": [65, 69], "keyLetters": ['A', 'E']  } ];

var players;

var WIN_SCORE = 200;

var gameBG, kyriarch, lights, runners, bottomBox;

var SPRITE_INITIAL_X = 25;
var SPRITE_INITIAL_Y = 125;
var SPRITE_Y_SPACING = 68;
var TEXT_INITIAL_X = 200;
var TEXT_INITIAL_Y = 198;
var KEYS_INITIAL_X = 780;

var roaringCrowdAudio, music;

var START_DELAY = 4000;
var gameTimeElapsed;

function initGame(bg, kyr, li, r, tracks)
{
	gameBG = new createjs.Bitmap(bg);

	kyriarch = new createjs.Bitmap(kyr);
	kyriarch.x = 900;
	kyriarch.y = 50;

	lights = new createjs.Sprite(new createjs.SpriteSheet(li));
	lights.x = ACTUAL_WIDTH/2 - 83;
	lights.y = ACTUAL_HEIGHT/2 - 252;
	lights.scaleX = 0.5;
	lights.scaleY = 0.5;

	runners = [];

	for (var j = 0; j < r.length; j++)
	{
		runners.push(new createjs.Bitmap(r[j]));
	}

	players = [];

	for (var i = 0; i < 8; i++)
	{
		var track = new createjs.Bitmap(tracks[i]);

		players.push({ "sprite": null, "track": track, "text": null, "keys": null, "score": 0 });
	}

	bottomBox = new createjs.Shape();
	bottomBox.graphics.beginFill("#000000").drawRect(0, ACTUAL_HEIGHT, ACTUAL_WIDTH, 200);
}

function startGame()
{
	currentScreen = SCREEN_GAME;
	stage.addChild(gameBG);

	// randomize the order of issues and runner sprites
	// (do it 10 times so it's more random!)
	for (var j = 0; j < 10; j++)
	{
		issues.sort(function(a, b){return 0.5 - Math.random()});
		runners.sort(function(a, b){return 0.5 - Math.random()});
	}

	for (var i = 0; i < 8; i++)
	{
		players[i].score = 0;
		players[i].sprite = runners[i];
		players[i].sprite.x = SPRITE_INITIAL_X;
		players[i].sprite.y = SPRITE_INITIAL_Y + SPRITE_Y_SPACING*i;
		players[i].sprite.scaleX = 0.5;
		players[i].sprite.scaleY = 0.5;

		var txt = issues[i].name.toUpperCase();
		players[i].text = new createjs.Text(txt, "24px Stardos Stencil", "#ffffff");
		players[i].text.x = TEXT_INITIAL_X;
		players[i].text.y = TEXT_INITIAL_Y + SPRITE_Y_SPACING*i;
		players[i].text.alpha = 0.6;

		if (!ARCADE_MODE)
		{
			var keys = "["+issues[i].keyLetters[0]+"] + ["+issues[i].keyLetters[1]+"]";
			players[i].keys = new createjs.Text(keys, "24px Stardos Stencil", "#ffffff");
			players[i].keys.x = KEYS_INITIAL_X;
			players[i].keys.y = TEXT_INITIAL_Y + SPRITE_Y_SPACING*i;
			players[i].keys.alpha = 0.6;
		}

		stage.addChild(players[i].track);
		stage.addChild(players[i].text);
		if (!ARCADE_MODE) stage.addChild(players[i].keys);
		stage.addChild(players[i].sprite);
	}

	stage.addChild(bottomBox);
	stage.addChild(kyriarch);
	stage.addChild(foreground);
	stage.addChild(lights);

	if (music) music.paused = false;
	else music = createjs.Sound.play("jockjams", { loop: -1, volume: 0.05 });
	roaringCrowdAudio = createjs.Sound.play("roaringcrowd", { loop: -1, volume: 0.05 });
	createjs.Sound.play("mariokart", { volume: 0.5 });

	gameTimeElapsed = 0;
}

function endGame()
{
	stage.removeAllChildren();
	roaringCrowdAudio.stop();
	music.paused = true;
	responsiveVoice.cancel();
}

function updateGame(timeSinceLastTick)
{
	gameTimeElapsed += timeSinceLastTick;

	if (gameTimeElapsed < 1000)
	{
		lights.gotoAndStop("three");
	}
	else if (gameTimeElapsed < 2000)
	{
		lights.gotoAndStop("two");
	}
	else if (gameTimeElapsed < 3000)
	{
		lights.gotoAndStop("one");
	}
	else if (gameTimeElapsed < 4000)
	{
		lights.gotoAndStop("go");
	}
	else
	{
		stage.removeChild(lights);
	}

	// don't take input until the game says go
	if (gameTimeElapsed < START_DELAY) return;

	if (!responsiveVoice.isPlaying()) bark();

	// press 0 for nobody to win
	if (keyPressed == 48)
	{
		endGame();
		showWin("nothing");
		return;
	}

	for (var i = 0; i < 8; i++)
	{
		if (issues[i].keys.indexOf(keyPressed) >= 0) // whose key did we press?
		{
			scorePlayers(i);

			if (players[i].score >= WIN_SCORE)
			{
				endGame();
				showWin(issues[i].name);
				return;
			}
		}
	}
}

function scorePlayers(winner)
{
	for (var i = 0; i < 8; i++)
	{
		if (i == winner) players[i].score += 4;
		else if (players[i].score > 0) players[i].score -= 1;
		players[i].sprite.x = SPRITE_INITIAL_X + players[i].score*5;
	}
}
