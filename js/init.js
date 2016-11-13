var stage;
var ACTUAL_WIDTH = 1280;
var ACTUAL_HEIGHT = 720;
var ASPECT_RATIO = 16/9;

var currentScreen;
var SCREEN_LOADING = 0;
var SCREEN_TITLE = 1;
var SCREEN_INSTRUCTIONS = 2;
var SCREEN_GAME = 3;
var SCREEN_WIN = 4;

var keyPressed = 0;

var queue;
var lastTickTime;
var loadText;

var foreground;

var ARCADE_MODE = false;

window.addEventListener('resize', resize, false);

function init()
{
	stage = new createjs.Stage("gameCanvas");
	createjs.Touch.enable(stage);
	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.setFPS(40);
	resize();
	
	showLoadingScreen();
	
	this.document.onkeyup = keyup;
	
	queue = new createjs.LoadQueue(true);
	queue.installPlugin(createjs.Sound);
	queue.on("complete", loadingComplete, this);
	queue.loadManifest("manifest.json");
}

function showLoadingScreen()
{
	currentScreen = SCREEN_LOADING;
	loadText = new createjs.Text("LOADING: 0%", "48px Stardos Stencil", "#ffffff");
	loadText.textAlign = "center";
	loadText.x = ACTUAL_WIDTH/2;
	loadText.y = ACTUAL_HEIGHT/2 - 24;
	stage.addChild(loadText);
}

function loadingComplete()
{
	stage.removeChild(loadText);

	foreground = new createjs.Bitmap(queue.getResult("theatre"));

	initTitle(queue.getResult("titleScreen"));
	initInstructions();
	initGame(queue.getResult("track"), queue.getResult("oldwhitedudethumbsup"), queue.getResult("countdown"),
		[ queue.getResult("runner02"), queue.getResult("runner03"), queue.getResult("runner04"),
			queue.getResult("runner05"), queue.getResult("runner06"), queue.getResult("runner07"),
			queue.getResult("runner08"), queue.getResult("runner09") ],
		[ queue.getResult("track01"), queue.getResult("track02"), queue.getResult("track03"),
			queue.getResult("track04"), queue.getResult("track05"), queue.getResult("track06"),
			queue.getResult("track07"), queue.getResult("track08") ]);
	initWin(queue.getResult("rainingmoney"));

	showTitle();
}

function tick()
{
	var timeSinceLastTick = createjs.Ticker.getTime() - lastTickTime;
	lastTickTime = createjs.Ticker.getTime();

	if (currentScreen == SCREEN_LOADING)
	{
		loadText.text = "LOADING: "+Math.floor(queue.progress*100)+"%";
	}
	if (currentScreen == SCREEN_TITLE)
	{
		updateTitle(timeSinceLastTick);
	}
	if (currentScreen == SCREEN_INSTRUCTIONS)
	{
		updateInstructions(timeSinceLastTick);
	}
	if (currentScreen == SCREEN_GAME)
	{
		updateGame(timeSinceLastTick);
	}
	if (currentScreen == SCREEN_WIN)
	{
		updateWin(timeSinceLastTick);
	}
	
	keyPressed = 0;
	
	stage.update();
}

function keyup(event)
{
    keyPressed = event.keyCode;
}

function resize()
{	
	stage.canvas.width = window.innerWidth;
	stage.canvas.height = window.innerHeight; 
	   
	if (stage.canvas.width/stage.canvas.height < ASPECT_RATIO)
	{
		stage.scaleX = stage.canvas.width/ACTUAL_WIDTH;
		stage.scaleY = stage.scaleX;
		stage.y = (stage.canvas.height-(ACTUAL_HEIGHT*stage.scaleY))/2
		stage.x = 0;
	}
	else
	{
		stage.scaleY = stage.canvas.height/ACTUAL_HEIGHT;
		stage.scaleX = stage.scaleY;
		stage.x = (stage.canvas.width-(ACTUAL_WIDTH*stage.scaleX))/2
		stage.y = 0;
	}
}

