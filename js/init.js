var stage;
var ACTUAL_WIDTH = 1280;
var ACTUAL_HEIGHT = 720;
var ASPECT_RATIO = 16/9;

var keyPressed = 0;

var queue;
var lastTickTime;
var gameLoaded = false;
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
	
	this.document.onkeydown = keydown;
	
	queue = new createjs.LoadQueue(true);
	queue.installPlugin(createjs.Sound);
	queue.on("complete", loadingComplete, this);
	queue.loadManifest("manifest.json");
}

function showLoadingScreen()
{
	loadText = new createjs.Text("Loading: 0%", "24px Arial", "#ffffff");
	loadText.textAlign = "center";
	loadText.x = ACTUAL_WIDTH/2;
	loadText.y = ACTUAL_HEIGHT/2 - 12;
	stage.addChild(loadText);
}

function loadingComplete()
{
	stage.removeChild(loadText);
	gameLoaded = true;

	stage.addChild(new createjs.Bitmap(queue.getResult("title")));
}

var spoke; // DELETE ME
function tick()
{
	var timeSinceLastTick = createjs.Ticker.getTime() - lastTickTime;
	lastTickTime = createjs.Ticker.getTime();

	if (!gameLoaded)
	{
		loadText.text = "Loading: "+Math.floor(queue.progress*100)+"%";
	}

	// DELETE ME
	if (lastTickTime >= 1000 && !spoke)
	{
		responsiveVoice.speak("Welcome to Oppression Olympics 2K sixteen!", "UK English Male", {rate: 1.2});
		spoke = true;
	}
	
	keyPressed = 0;
	
	stage.update();
}

function keydown(event)
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

