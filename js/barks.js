var barks = [
	"Welcome to the 2016 Oppression Olympics.",
	"Eight competitors have come here today for a cause.",
	"They each want to end a particular form of oppression.",
	"Whoever wins will go down in history as the competitor who singlehandedly ended their form of oppression.",
	"Our eight competitors are racing against xenophobia, transphobia, homophobia, islamophobia, ableism, racism, classism, and sexism.",
	"Some athletes used to race against ageism, but they have since retired from the sport.",
	"When it comes down to it, this is a sport about merit!",
	"It's 2016 and yet somehow this competition always seems relevant.",
	"One thing is for sure.",
	"It's everyone for themselves in this exciting race!",
	"Remember, folks.",
	"At the end of the day, these athletes gain nothing from helping each other.",
	"They have to focus on their own race!",
	"Only one can win!",
	"There has long been consensus that these competitions are the only fair way to decide which issues we should address!",
	"Banding together has long been discounted as a distraction -- we all know that we have to address one form of oppression at a time to be effective.",
	"That way, we can be sure it has been completely eradicated in all its forms, before we put energy into ridding ourselves of other forms of oppression, which are unrelated.",
	"This is sure to be a tight race!"
];

var currentBark = 0;

function bark()
{
	responsiveVoice.speak(barks[currentBark], "UK English Male", { volume: 1, rate: 1.2 });

	currentBark++;
	if (currentBark >= barks.length)
	{
		// scramble the barks!!!
		for (var i = 0; i < 10; i++) barks.sort(function(a, b){return 0.5 - Math.random()});
		currentBark = 0;
	}
}
