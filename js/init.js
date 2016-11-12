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
	loadText = new createjs.Text("Loading: 0%", "24px Arial", "#ffffff");
	loadText.textAlign = "center";
	loadText.x = ACTUAL_WIDTH/2;
	loadText.y = ACTUAL_HEIGHT/2 - 12;
	stage.addChild(loadText);
}

function loadingComplete()
{
	stage.removeChild(loadText);

	initTitle(queue.getResult("title"));
	initGame(queue.getResult("runner01"));

	showTitle();
}

function tick()
{
	var timeSinceLastTick = createjs.Ticker.getTime() - lastTickTime;
	lastTickTime = createjs.Ticker.getTime();

	if (currentScreen == SCREEN_LOADING)
	{
		loadText.text = "Loading: "+Math.floor(queue.progress*100)+"%";
	}
	if (currentScreen == SCREEN_TITLE)
	{
		updateTitle(timeSinceLastTick);
	}
	if (currentScreen == SCREEN_GAME)
	{
		updateGame(timeSinceLastTick);
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

