game = {
	questions: [],
	myData: [			
		{		
			category: "Weird Nature",	
			type: "multiple",	
			difficulty: "medium",	
			question: "The only Albino trees are _________ because that is the only species of trees that can take nutrients from other sources than photosynthesis.",	
			correct_answer: "Red Woods",	
			incorrect_answers: [	
				"Pines",
				"Dogwoods",
				"Cedar"
			],
			image: "assets/images/Albino-Redwood.jpg"
		},
		{		
			category: "Weird Nature",	
			type: "multiple",	
			difficulty: "medium",	
			question: "The 'Valley of _____ Trees' is in Panama, where all the trees are ______.",	
			correct_answer: "Square",	
			incorrect_answers: [	
				"Blue",
				"Triangle",
				"Poisonous"
			],
			image: "assets/images/st02.jpg"
		},		
		{		
			category: "Weird Nature",	
			type: "multiple",	
			difficulty: "medium",	
			question: "The most poisonous tree in the world is the ___________ (Though all of these are poisonous). Burning it is dangerous, don't breathe the fumes!",	
			correct_answer: "Manchineel",	
			incorrect_answers: [	
				"Bunya Pine",
				"Cerbera Odollam",
				"Antiaris"
			],
			image: "assets/images/manchineel-trees.jpg"
		},		
		{		
			category: "Weird Nature",	
			type: "multiple",	
			difficulty: "medium",	
			question: "The sandbox tree has ___________ fruit.",	
			correct_answer: "Explosive",	
			incorrect_answers: [	
				"Liquid",
				"Paralyzing",
				"Inflammable"
			],
			image: "assets/images/sandbox.jpg"
		},		
		{		
			category: "Weird Nature",	
			type: "multiple",	
			difficulty: "medium",	
			question: "Tardigrades are very good at surviving _________.",	
			correct_answer: "Apocalypses",	
			incorrect_answers: [	
				"Being eaten",
				"For centuries not hibernating",
				"Diseases"
			],
			image: "assets/images/tardigrade.jpg"
		},		
		{		
			category: "Weird Nature",	
			type: "multiple",	
			difficulty: "medium",	
			question: "Cats' purr at a frequency that helps relieve _________.",	
			correct_answer: "Headaches",	
			incorrect_answers: [	
				"Heart palpitations",
				"Anger",
				"Tiredness"
			],
			image: "assets/images/cat.gif"	
		},		
		{		
			category: "Weird Nature",	
			type: "multiple",	
			difficulty: "medium",	
			question: "Sand ______ are the cutest _________ in the world. They chirp!",	
			correct_answer: "Frogs",	
			incorrect_answers: [	
				"Cats",
				"Dogs",
				"Turtles"
			],
			image: "https://media.giphy.com/media/1mht8tODXy0OA/giphy.gif"
		},		
		{		
			category: "Weird Nature",	
			type: "multiple",	
			difficulty: "medium",	
			question: "Which one of these do not have examples which explode (with no additional explosives added)?",	
			correct_answer: "Juice",	
			incorrect_answers: [	
				"Frogs",
				"Lakes",
				"Milk"
			],
			image: "https://i.imgur.com/yLOfV9w.gif"
		}
	],
	//Number of the question.  Incremented when stopwatch records a lap (should be called after answer is given)
	curQuestion: 0,
	Guess: "",
	answerOrder: [],
	//Only use if adding in the API of other trivia games
	categories: ["General Knowledge", "Weird Science", "Entertainment: Books", "Entertainment: Film", "Entertainment: Music", "Entertainment: Musicals &amp; Theatres", "Entertainment: Television", "Entertainment: Video Games", "Entertainment: Board Games", "Science &amp; Nature", "Science: Computers", "Science: Mathematics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Entertainment: Comics", "Science: Gadgets", "Entertainment: Japanese Anime &amp; Manga", "Entertainment: Cartoon &amp; Animations"],
	//...because there are numbers they don't do...
	categoriesNumber: [9, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
	difficulties: ["any", "easy", "medium", "hard"],
	difficultiesText: ["Any", "Easy", "Medium", "Hard"],
	types: ["any", "multiple", "boolean"],
	typesText: ["Any Type", "Multiple Choice", "True/False"],
	numberOfQuestions: 8,
	//again, for the other trivia game APIs
	cateImages: [],
	//for web API
	category: "Weird Science",
	difficulty: "easy",
	type: "multiple",
	right: 0,
	wrong: 0,
	ranOut: 0,
	intervalId: 0,
	clockRunning: false,
	time: 0,
	singleTime: 0,
  	questionTimes: [],
	stopwatch: {
		reset: function() {
		    game.time = 0;
		    game.singleTime = 30;
		    //Change the "display" div to "00:00."
		    $("#display").text("00:00");
		    $("#display2").text("00:00");
		    $("#laps").empty();
		},
		start: function() {
		    //Use setInterval to start the count here and set the clock to running.
	      	if (!game.clockRunning) {
		        game.clockRunning = true;
		        game.singleTime = 30;
		        game.intervalId = setInterval(game.stopwatch.count, 1000);
	    	}
		},
		stop: function() {
			//Use clearInterval to stop the count here and set the clock to not be running.
		    clearInterval(game.intervalId);
		    game.clockRunning = false;
		    game.stopwatch.recordLap();

		},
		recordLap: function() {

		      //Get the current time, pass that into the stopwatch.timeConverter function,
		      //        and save the result in a variable.

		      game.questionTimes[game.curQuestion] = game.singleTime;
		      //Increment lap by 1. Remember, we can't use "this" here.
		},
		count: function() {
		    //increment time by 1, remember we cant use "this" here.
		    game.time++;
		    game.singleTime--;

		    //Get the current time, pass that into the stopwatch.timeConverter function,
		    //        and save the result in a variable.
		    var curTime = game.stopwatch.timeConverter(game.time);
		    var curSingleTime = game.stopwatch.timeConverter(game.singleTime);
		    //Use the variable you just created to show the converted time in the "display" div.
		    $("#display").text(curTime);
		    $("#display2").text(curSingleTime);
		    if(game.singleTime <= 0){
		    	//End game due to time out
		    	game.stopwatch.stop();
		    	game.noAnswer();
		    }
		},
		timeConverter: function(t) {
		  	//  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
		    var minutes = Math.floor(t / 60);
		    var seconds = t - (minutes * 60);
		    if (seconds < 10) {
		      seconds = "0" + seconds;
		    }
		    if (minutes === 0) {
		      minutes = "00";
		    }
		    else if (minutes < 10) {
		      minutes = "0" + minutes;
		    }
		    return minutes + ":" + seconds;
		}
	},
	shuffle: function(array){
		for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
	    return array;
	},
	rightAnswer: function() {
		//got answer right
		game.right++;
		$("#main").html("<p>Right! The answer was: "+game.questions[game.curQuestion].correct_answer+"</p>");
	},
	wrongAnswer: function() {
		//got answer wrong
		game.wrong++;

		$("#main").html("<p>Wrong! The answer was: "+game.questions[game.curQuestion].correct_answer+"</p><p>You guessed: "+game.guess+"</p>");
	},
	checkAnswer: function(guess){
		console.log("Answered");
		game.stopwatch.stop();
		// input: $("#label"+$(":checked")[0].id).text()
		//to be added back in if using submit buttons
		// if (typeof($(":checked")[0]) != "undefined") {
		game.guess = guess;
		if(guess ==game.questions[game.curQuestion].correct_answer){
			game.rightAnswer();
		} else {
			game.wrongAnswer();
		}
		// }
		game.endQuestion();
	},
	noAnswer: function() {
		//ran out of time
		game.guess = "";

		$("#main").html("<p>Ran out of time! The answer was: "+game.questions[game.curQuestion].correct_answer)+"</p>";
		//end question
		game.endQuestion();
		
	},
	endQuestion: function() {
		var image = "";
		//Add image in
		if(typeof(game.questions[game.curQuestion].image) != "undefined") {
			image = game.questions[game.curQuestion].image;
		} else {
			var queryURL = "https://api.giphy.com/v1/gifs/search?q="+game.questions[game.curQuestion].correct_answer+"&api_key=dc6zaTOxFJmzC";
			
			
			$.ajax({
		      url: queryURL,
		      method: 'GET'
		    }).done(function(response) {
		      	console.log(response);
		      	var image = response.data[0].images.fixed_height.url;
		    });

		}
		$("#image").html('<img src ="'+image+'" class="img-fluid">');

		if(game.curQuestion == game.questions.length-1) {
			game.endGame();
		} else {
			setTimeout(function(){
				game.curQuestion++;
				game.populateTrivia();
			}, 4000);
		}
	},
	endGame: function() {
		game.stopwatch.stop();
		//End results!
		$("#main").html("<p>Game finished! Your results:</p><p>Total time: "+game.stopwatch.timeConverter( game.time)+"</p><p>Most time consuming question: "+game.questions[game.questionTimes.indexOf(Math.max.apply(Math,game.questionTimes))].question+"</p><p>Least time consuming question: "+game.questions[game.questionTimes.indexOf(Math.min.apply(Math,game.questionTimes))].question+"</p><p>You got "+game.right+" questions right, "+game.wrong+" questions wrong, and ran out of time on "+game.ranOut+' questions.</p><p><div class="btn-group"><button class="btn btn-default" type="button" id="restart"><em class="glyphicon glyphicon-repeat"></em> Restart?</button></div></p>');
			game.stopwatch.reset();
			game.right= 0;
			game.wrong= 0;
			game.ranOut= 0;
			game.intervalId= 0;
			game.clockRunning= false;
			game.questionTimes= [];
			game.curQuestion= 0;
			game.guess= "";
			game.answerOrder= [];


		//Show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

	},
	populateTrivia: function(trivia){
		//takes result from either results or API
		console.log(game);
		console.log(game.category);
		console.log(game.difficulty);
		console.log(game.questions[game.curQuestion].correct_answer);
		console.log(game.questions[game.curQuestion]);

		//Initializes with no extra buttons.
		$("#main").html('<p id="question"></p><div class="btn-group btn-group-vertical" data-toggle="buttons" id="answers"></div>');
		$("#image").empty();

		//Initializes trivia to have blank question, input area, and submit button.
		// $("#main").html('<p id="question"></p><div class="input-group" id="answers"></div></div><div class="btn-group"><button class="btn btn-default" type="button" id="submit"><em class="glyphicon glyphicon-share"></em> Select</button><button class="btn btn-default" type="button" id="giveup"><em class="glyphicon glyphicon-remove"></em> Give Up Question</button><button class="btn btn-default" type="button" id="forfeit"><em class="glyphicon glyphicon-warning-sign"></em> Forfeit Game</button></div>');


		//initialize answer order so number of answers are correct
		game.answerOrder = []; 
		for (var j = 0; j <= game.questions[game.curQuestion].incorrect_answers.length; j++) {
		    game.answerOrder.push(j);
		}
		//change order of answers so they are random.
		game.answerOrder = game.shuffle(game.answerOrder);
		$("#question").text(game.questions[game.curQuestion].question);
		//blanks out text
		$("#answers").empty();

		for (var i = 0; i < game.answerOrder.length; i++) {
			var answer = "";
	        if (game.answerOrder[i] != 3) {
	        	answer = game.questions[game.curQuestion].incorrect_answers[game.answerOrder[i]];
	        } else {
	        	answer = game.questions[game.curQuestion].correct_answer;
	        }
	        // <div class="radio"><label id="label'+i+'"><input type="radio" name="optradio" id="'+i+'">'+answer+'</label></div>');


	        $("#answers").append('<label class="btn answerBtn"><input type="radio"><i class="fa fa-circle-o fa-2x"></i><i class="fa fa-dot-circle-o fa-2x"></i> <span id="'+i+'">'+answer+'</span></label>');
		}
		game.stopwatch.start();

	},
	retrieveAPI: function(){
		$.ajax({
	      url: "https://opentdb.com/api.php?amount="+game.numberOfQuestions+"&category="+game.categoriesNumber[game.categories.indexOf[game.category]]+"&difficulty="+game.difficulty+"&type="+game.type,
	      method: "GET"
	    }).done(populateTrivia(response.results[0]));
	},
	//NON API version. Does not allow choice (I'm only making one trivia table myself)Z
	startScreen: function(){
		//Makes intro screen with options for difficulty and start button.
		$("#main").html('<p>Welcome to my Trivia Game. Default category: Weird Science.</p><div class="btn-group"><button class="btn btn-default" type="button" id="start"><em class="glyphicon glyphicon-play"></em> Start</button></div>');
		$("#image").empty();
		$("#display").empty();
		$("#display2").empty();
	},
	startTrivia: function(){
		
		console.log("Started Trivia");

		//Code to populate questions with my data...Later I will change to populate from either my data or the API, which is why it is not hard coded.

		$("h1").text(game.category + " Trivia Game!");
		$("title").text(game.category + " Trivia Game!");
		game.questions = game.myData;
		console.log("data retrieved");
		game.questions = game.shuffle(game.questions);
		console.log("shuffled");
		game.populateTrivia();
	},
	chooseCategory: function() {
		$("h1").text(game.category + " Trivia Game!");
		$("title").text(game.category + " Trivia Game!");
	}



}

game.startScreen();

$("body").on("click", ".answerBtn", function() {
	console.log($(this).text());
	game.checkAnswer($(this).text().trim());
});


$("body").on("click", "#start", function() {
	//
	game.startTrivia();
});

$("body").on("change", "#category", function() {
	//reads changes to category dropdown and selects value
	game.startTrivia();
});


$("body").on("click", "#restart", function() {
	//reads changes to category dropdown and selects value
	game.startScreen();
});
