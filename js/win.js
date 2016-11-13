var winText, moolah1, moolah2;

var WIN_DELAY = 2000;
var winTimeElapsed;

function initWin(m)
{
	winText = new createjs.Text("", "24px Roboto", "#ffffff");
	winText.lineWidth = 1024;
	winText.textAlign = "center";
	winText.x = ACTUAL_WIDTH/2;

	moolah1 = new createjs.Sprite(new createjs.SpriteSheet(m));
	moolah1.gotoAndPlay("anim");
	moolah1.x = 0;
	moolah1.y = ACTUAL_HEIGHT - 350;

	moolah2 = new createjs.Sprite(new createjs.SpriteSheet(m));
	moolah2.gotoAndPlay("anim");
	moolah2.x = ACTUAL_WIDTH - 500;
	moolah2.y = ACTUAL_HEIGHT - 350;
}

function showWin(winner)
{	
	currentScreen = SCREEN_WIN;

	var txt = "YOU HAVE WON!\n\nCONGRATULATIONS!\n\n"+winner.toUpperCase()+" IS OVER! "+winner.toUpperCase()+" IS A THING OF THE PAST!\nYOU HAVE SINGLEHANDEDLY SOLVED "+winner.toUpperCase()+"!\nWHOA, THAT WAS A REALLY GOOD THING YOU DID.\nTHANK GOODNESS WE DON'T HAVE TO THINK ABOUT THAT ANYMORE.\n\nWAIT, WHAT ABOUT THE OTHER CAUSES?\n\n...\n......\n...\n\n\nOH WELL.";
	winText.text = txt;
	winText.y = ACTUAL_HEIGHT/2 - instructionsText.getMeasuredHeight()/2;

	stage.addChild(moolah1);
	stage.addChild(moolah2);
	stage.addChild(foreground);
	stage.addChild(winText);

	winTimeElapsed = 0;

	createjs.Sound.play("CrowdRoarbutton");
}

function hideWin()
{	
	stage.removeAllChildren();
}

function updateWin(timeSinceLastTick)
{
	// add a time delay so that we don't button-mash through the win screen
	winTimeElapsed += timeSinceLastTick;
	if (winTimeElapsed < WIN_DELAY) return;

	// go back to the title screen if idle for 1 minute
	if (winTimeElapsed > 60000)
	{
		hideWin();
		showTitle();
	}

	if (keyPressed)
	{
		hideWin();
		createjs.Sound.play("ddrbuttonpress");
		showTitle();
	}
}
