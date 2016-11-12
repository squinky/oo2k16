var TITLE_DELAY = 2000;
var titleTimeElapsed;

var titleBG;

function initTitle(bg)
{
	titleBG = new createjs.Bitmap(bg);
}

function showTitle()
{	
	currentScreen = SCREEN_TITLE;
	stage.addChild(titleBG);

	titleTimeElapsed = 0;
}

function hideTitle()
{	
	stage.removeAllChildren();
}

function updateTitle(timeSinceLastTick)
{
	// add a time delay so that we don't button-mash through the title screen
	titleTimeElapsed += timeSinceLastTick;
	if (titleTimeElapsed < TITLE_DELAY) return;

	if (keyPressed)
	{
		hideTitle();
		startGame();
	}
}
