var barks = [
	"When it comes down to it, this is a sport about merit!",
	"It's 2016 and yet somehow this competition always seems relevant.",
	"This is a tight race!",
	"It's everyone for themselves in this exciting race!",
	"They might as well be standing in the middle of a mall!",
	"At the end of the day, these athletes gain nothing from helping each other. They have to focus on their own race!",
	"Only one can win!",
	"Maybe one day, one of the winning athletes can coach one of the others to victory, but not today!",
	"These competitions are the only fair way to decide which issues we should address!",
	"If they really needed help, they would run faster!"
];

var currentBark = 0;

function bark()
{
	if (currentBark == 0)
	{
		// scramble the barks!!!
		for (var i = 0; i < 10; i++) barks.sort(function(a, b){return 0.5 - Math.random()});
	}

	responsiveVoice.speak(barks[currentBark], "UK English Male", {rate: 1.2});

	currentBark++;
	if (currentBark >= barks.length) currentBark = 0;
}
