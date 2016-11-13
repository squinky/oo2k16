var instructionsText;

var INSTRUCTIONS_DELAY = 100;
var instructionsTimeElapsed;

function initInstructions()
{
	var txt = "Welcome to OPPRESSION OLYMPICS 2K16, where the tools to end your oppression are in your hands!\n\nSystemic oppression affects us all, but none more so than you. You face a lot of challenges! It's time to end oppression for you and people like you! You will be competing against others trying to end other forms of oppression (these may also affect you, but hey, we have to focus on one issue at a time, right?). \n\nTo end oppression, you have to be the first to reach the Kyriarch at the end of the racetrack. The Kyriarch is a busy man with many important things to do. He only has time to listen to one cause at a time. Don't worry, whenever the Kyriarch is on the case, he throws lunch money at diversity initiatives and the problem is solved!\n\nCONTROLS:\nAlternate pressing your assigned buttons as quickly as you can in order to move your cause forward. Your buttons will be displayed next to the name of the form of oppression you are racing against.\n\nIf two causes try to move at the same time, the first one to press their buttons will move forward, while the other will be moved backwards."
	instructionsText = new createjs.Text(txt, "24px Roboto", "#ffffff");
	instructionsText.lineWidth = 1024;
	instructionsText.x = ACTUAL_WIDTH/2 - instructionsText.lineWidth/2;
	instructionsText.y = ACTUAL_HEIGHT/2 - instructionsText.getMeasuredHeight()/2;
}

function showInstructions()
{	
	currentScreen = SCREEN_INSTRUCTIONS;
	
	stage.addChild(foreground);
	stage.addChild(instructionsText);

	instructionsTimeElapsed = 0;

	createjs.Sound.play("ddrbuttonpress");
}

function hideInstructions()
{	
	stage.removeAllChildren();
}

function updateInstructions(timeSinceLastTick)
{
	// add a time delay so it doesn't just skip to the instructions screen
	instructionsTimeElapsed += timeSinceLastTick;
	if (instructionsTimeElapsed < INSTRUCTIONS_DELAY) return;

	if (keyPressed)
	{
		hideInstructions();
		startGame();
	}
}
