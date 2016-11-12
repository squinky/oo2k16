var titleBG;

function initTitle(bg)
{
	titleBG = new createjs.Bitmap(bg);
}

function showTitle()
{	
	currentScreen = SCREEN_TITLE;
	stage.addChild(titleBG);
}

function hideTitle()
{	
	stage.removeChild(titleBG);
}

function updateTitle(timeSinceLastTick)
{
	if (keyPressed)
	{
		hideTitle();
		startGame();
	}
}
