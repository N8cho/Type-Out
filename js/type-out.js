
/*----- VARIABLES -----*/

var audioMusic = document.createElement('audio');
var audioMuted = false;

var gameRunning = 0;
var lifes = 3;
var score = 0;
var waitTime = 1000;


/*----- FUNCTIONS  -----*/

// Music Loop
function playMusic( audioMusic ) {  

	//var audioMusic = document.createElement('audio');
	var audioFile = "./themes/theme1/music/music-loop.wav";

	console.log("Music Loop - audioFile = " + audioFile);
	audioMusic.setAttribute('src', audioFile);
	audioMusic.volume = 0.1;
	audioMusic.play();

	audioMusic.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    });
}	

// Pop Sound
function playPop( el ) {  

	$(el).addClass('played');

	var audioPop = document.createElement('audio');
	var audioIndex = Math.floor((Math.random() * 3) + 1);
	var audioFile = "./themes/theme1/sound/pop" + audioIndex + ".ogg";

	console.log("Pop Sound - audioIndex = " + audioIndex);
	console.log("Pop Sound - audioFile = " + audioFile);
	audioPop.setAttribute('src', audioFile);
	audioPop.volume = 1.0;
	audioPop.play();
}

// Life lost
function lifeLost( el ) {  
	lifes--;
	console.log('Remaining lifes = ' + lifes);
	var heart = $('[class=life]').last();
	heart.attr("src","img/heart_empty.png").addClass("empty");
	heart.effect( "shake", { direction : "down", distance : 5 } );

	var audioPop = document.createElement('audio');
	var audioFile = "./themes/theme1/sound/life.wav";

	console.log("Lost Life - audioFile = " + audioFile);
	audioPop.setAttribute('src', audioFile);
	audioPop.play();

	if ( lifes < 1 ) {
		console.log('%c GAME OVER ', 'background: #222; color: #bada55');
		gameRunning = 0;
		setTimeout(stopAll, 125);

		showEndScreen(1, score);
		
	}
}

// Reset Lives
function resetLives(el) {
	$('.life').each(function() {
		$(this).attr("src","img/heart_full.png").removeClass("empty");
	});
}

// Reset Score
function resetScore(el) {
	score = 0;
	$('#score').html(score);
}

// Stop all animated bubbles
function stopAll() {
	$('.bubb').each(function() {
    	$(this).stop(true, false);
    });
}

// Remove bubbles code
function cleanBubbles() {
	$('.bubb').each(function() {
    	$(this).remove();
    });
}

// Return to title screen from game screen
function returnToTitle() {
	showEndScreen(0, score);

	$('#main').delay(750).fadeOut('slow').queue(function() {
		cleanBubbles();
		$('#header').animate({opacity: 0.0}).queue(function() {
			$('#title-screen').fadeIn('slow');
			$(this).dequeue();
		});
		$(this).dequeue();
	});
}

// Reset games variables
function resetGame() {
	waitTime = 1000;
	lifes = 3;
	resetLives();
	resetScore();
}

// Animate the Type-Out logo on title screen
function animateLogo() {
	var logo = $('#title-screen .logo');

	logo.animate({ "top": "-=30px" }, 1000, function() {
		logo.animate({ "top": "+=30px" }, 1000);
		animateLogo();
	});
}

// Populate and animate the element from where you can tweet your score
function showEndScreen( enter, value ) {
	var tweet = $('#tweet-score-holder');
	var score = $('#score-holder .score');
	var center = ((tweet.parent().height()) / 2) + 200;

	$("#tweet-it").attr("href", "https://twitter.com/intent/tweet?text=My%20%23Type-Out%20Score:%20"+value+"%20...%20Just%20beat%20it%20!")

	if( enter )
	{
		score.html( value );
		tweet.animate({ "bottom": "+="+center+"px" }, 1000);
	}else{
		tweet.animate({ "bottom": "-="+center+"px" }, 1000);
	}
}

// Generate a random character
function randomChar()
{
	var IDs = new Object();
		IDs['k'] = Math.floor(Math.random() * ( 90 - 65 + 1 )) + 65;	// Generate a valid ASCII code
		IDs['ch'] = String.fromCharCode(IDs['k']);						// Generate a valid ASCII value

	return IDs;															// Return them as an object
}

// Generating a random color
function randomColor()
{
	var color = '';
	var values = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	for (c = 0; c < 6; c++) 
	{
		no = Math.floor(Math.random() * 15);
		color += values[no];
	}
	return color;
}

$(document).ready(function()
{
	// Getting the canvas size and positioning the start button
	var width = $('#main').width();
	var height = $('#main').height() - $('#header').height() - 2*$('#footer').height();

	console.log("Screen Width = " + width);
	console.log("Screen Height = " + height);
	console.log("Header Height = " + $('#header').height());
	console.log("Footer Height = " + $('#footer').height());

	

	$('#return-to-title').click( function() {
		returnToTitle();
	});

	// Switch button to turn on-off music
	$('#music-switch').click( function() {
		if( !audioMuted ) {
			audioMusic.volume = 0.0;
			$('#music-switch img').attr("src","img/speaker-off.png");
			audioMuted = true;
		}else{
			audioMusic.volume = 0.1;
			$('#music-switch img').attr("src","img/speaker-on.png");
			audioMuted = false;
		}
		
	});

	$('#play-again').click( function() {
		cleanBubbles();
		resetGame();

		showEndScreen(0, score);

		$(this).delay(500).queue(function() {
			gameRunning = 1;
			console.log('Game STARTED !');
			console.log('Remaining lifes = ' + lifes);
			genLetter();
			$(this).dequeue();
		});
	});

	$('#main').css(
	{ 
		"height" : height+'px'
	});


	$.fn.visible = function() {
	    return this.css('visibility', 'visible');
	};

	$.fn.invisible = function() {
	    return this.css('visibility', 'hidden');
	};

	$.fn.suma = function() {
		score += 20;
		$('#score').html(score);
	}

	$.fn.delayCss = function(cssChanges) {
	    $(this).each(function() {
	        var element = $(this),
	            lastDelay = 0;
	        $.each(cssChanges, function(i, options) {
	            lastDelay += parseInt(options.delay);
	            setTimeout(function() {
	                element.css(options.css);
	            }, lastDelay);
	        });
	    });
	}

	var cssChanges = [
	    {
			delay: 75,
			css: { "background-position": '-70px 0px' }
		},{
			delay: 45,
			css: { "background-position": '-140px 0px' }
		}
	];

	// Start to animate the Type-Out logo on title screen
	animateLogo();

	// Start the game
	$('#start').click( function()
	{
		resetGame();

		$('#title-screen').fadeOut('slow').queue(function() {
			$('#header').animate({opacity: 1.0}).queue(function() {
				$('#main').fadeIn('slow').css('cursor', 'none');
				$(this).delay(500).queue(function() {
					gameRunning = 1;
					console.log('Game STARTED !');
					console.log('Remaining lifes = ' + lifes);
					genLetter();
					$(this).dequeue();
				});
				$(this).dequeue();
			});
	    	$(this).dequeue();
		});
	});

	
	// Dealing KeyEvents and processing matched bubble
	$(document).keydown( function(event) 
	{
		if( gameRunning ) {
			var keycode = event.keyCode;
			var delay = 0; 

			// Quit a life if the key pressed doesn't exists in game
			if( $('.bubb'+keycode).length == 0 )
			{
				console.log("No existe la letra -> Vida restada");
				lifeLost();
			}

			$('.bubb'+keycode).each(function( index ) {
				
				// Stop element animation
				$(this).stop(true, false);

				// Add points
				$(this).suma();

				// Gets element position, show and animate point value
				var position = $(this).position();
				console.log("Bubble left = " + position.left);
				console.log("Bubble top = " + position.top);
				var score = $('<span class="bubb score" style="top: '+(position.top-35)+'px; left: '+position.left+'px">+20</span>');
				$("#main").append( score ); 
				score.animate({ "top": "-=100px", "opacity": "0" }, 1000, function() {
					score.remove();
				});

				// Play 'Pop' sound
				$(this).delay(delay).queue(function() {
			    	if(!$(this).hasClass('played')) playPop( this );
			    	$(this).delayCss(cssChanges); 
			    	$(this).dequeue();
				});

				// Remove element from ViewPort
				$(this).delay(125).queue(function() {
			    	$(this).remove();
			    	$(this).dequeue();
				});

				// Add delay if there are more than one coincident element
			    delay += 250;
			});
		}

	});

	// Generating a random alphabet between A-Z
	function genLetter()
	{
		waitTime = waitTime-5;
		console.log("%c waitTime = " + waitTime, 'background: #fdff2e' );

		if ( gameRunning ) {
			var color = randomColor();
			var key = randomChar();
			console.log('key[k]: ' + key['k']);
			console.log('key[ch]: ' + key['ch']);

			// Bounds where is able to move the element
			var from = height + 100;
			var to = Math.floor(Math.random() * (height-90)) + 30;
			var left = Math.floor(Math.random() * (width-90)) + 30;
			
			// Set the element in screen and animate it
			var $element = $('<span class="bubb bubb'+ key['k'] +'" style="left: '+ left +'px; top: '+ from +'px; background: url(\'./themes/theme1/img/bubble-sprite.png\') 0px 0px no-repeat; background-size: 300% 100%">'+ key['ch'] +'</span>');
			$('#main').append($element);
			$element.animate({ "top": to }, 1000, function() {
				$element.animate({ "top": from }, 1000, function(){
					// If element gets out of bounds before being pop, lost life and remove it
					console.log("Letra perdida -> Vida restada");
					lifeLost();
					$element.remove();
				});
			});

			// Wait before generate the next element
			setTimeout(genLetter, waitTime);
		}
	}
	
});


// Wait for everything be setted on DOM before ...
$(window).on("load", function() {
	// Start playing background music
    playMusic( audioMusic );
});