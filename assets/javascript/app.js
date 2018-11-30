// js document with this. It contains all of the code for the .js file:
$( document ).ready(function() {



    // this game object holds all of the questions, possible answers, and then the index of the correct answer for each
        var game = {
            
            questions:[
            {
                   question: 'How many Cleveland Browns players have made the Pro Football Hall of Fame?',
                   possibles: ['16', '12', '8', '4'], 
                   id: 'question-one', 
                   answer: 0
            }, {
                question: 'Who was the first Browns player to make it into the Hall of Fame?',
                possibles: ['Lour Groza', 'Otto Graham', 'Ozzie Newsome', 'Jim Brown',],
                id: 'question-two',
                answer: 1
            }, {
                question: 'Who was the last Browns player to make it into the Hall of Fame?',
                possibles: ['Chuck Noll', 'Joe DeLamielleure', 'Gene Hickerson', 'Ozzie Newsome'],
                id: 'question-three',
                answer: 2
            }, {
                question: 'What year were the Cleveland Browns founded?',
                possibles: ['1935', '1940', '1945', '1950',],
                id: 'question-four',
                answer: 2
            }, {
                question: 'Since the Cleveland Browns resumed operations in 1999, how many winning seasons have they had?',
                possibles: ['0', '1', '2', '3', '4'],
                id: 'question-five',
                answer: 2
            }, {
                question: 'The Cleveland Browns are named after...',
                possibles: ['Bernie Brown', 'Betty Crocker Brownies', 'Jim Brown', 'Paul Brown',],
                id: 'question-six',
                answer: 3
    
            }, {
                question: 'The Quarterback with the most starts (116) for the Browns was...',
                possibles: ['Otto Graham', 'Frank Ryan', 'Brian Sipe', 'Bernie Kosar',],
                id: 'question-seven',
                answer: 0
            }, {
                question: 'What year did Art Model move the team to Baltimore?',
                possibles: ['1993', '1994', '1995', '1996', '1997'],
                id: 'question-eight',
                answer: 2
            }, {
                question: 'What year did the Cleveland Browns resume play in Cleveland after the move to Baltimore ?',
                possibles: ['1996', '1997', '1998', '1999', '2000'],
                id: 'question-nine',
                answer: 3
            }, {
                question: 'The largest Browns Backers Club is in...',
                possibles: ['Jackonsville, Florida', 'Savannah, Georgia', 'Wilmington, North Carolina', 'New York, New York', 'Phoenix, Arizona'],
                id: 'question-ten',
                answer: 4
            }, {
                question: 'Who is Clevelands all-time receiving leader?',
                possibles: ['Ozzie Newsome', 'Jim Brown', 'Paul Warfield', 'Webster Slaughter', 'Dante Lavelli'],
                id: 'question-eleven',
                answer: 0
            }
            
            ]}
    
        // test
        var message = 'Game Over!';
        // var $message = $('#message');
        // test
    
    // Initialize the button that starts the game 
        $(".startGame").on("click", function (){
    // when the start button is clicked, the div with the questions that was hidden is shown
            $('.wrapper').show();
            console.log('hello');
            // and button is hidden
            $(this).hide();
        });
    
        // Number of seconds Guesser has 
        var number = 90;
        $('#timeLeft').on('click', run); 

        

//         <button onclick="setTimeout(myFunction, 30000);">Try it</button>

// <script>
// function myFunction() {
//     alert('Game');
// }
// </script>
    
        // enable the number of seconds to decrease with time, and to display
        // the result of that decrease until time is up. 
        function decrement(){
            // Decrease number by one.
            number--;
            // Show the number in the #timeLeft div.
            $('#timeLeft').html('<h2>' + number + " seconds"+'</h2>');
            // When the number is equal to zero, 
            if (number === 0){
            // run the stop function.
            stop(); alert("Time is up, but hey, you can try again!");
            // Alert the user that time is up. Update the innerHTML of the message
           // div to say 'Game Over!'
            // alert('Time Up!')
            $('#message').html('time up!');
            checkAnswers();
            }
        }
        // test
        // writes the win or lose message 
            // function writeMessage (){
            // 	// updates the contents of the message div
            // 	$message.html(message);
            // }
        // test
    
        // the run function sets the spacing of the decrement function's time interval so that
        // it can be equal to a second per number decrement.
        function run(){
            counter = setInterval(decrement, 1000);
        }
        
        // The stop function
        function stop(){
        // Clears our "counter" interval. The interval name is passed to the clearInterval function.
            clearInterval(counter);
        }
    
        // Execute the run function.
        run();
    
    // this function creates the inputs needed for the form and relates them to the
    // items held within the game object 
    function formTemplate(data) {
    // the first variable relates the form field for question with the data in the object for
    // each question so that the questions can be inputed into that form field
        var qString = "<form id='questionOne'>"+ data.question +"<br>";
    // access the question object's possibles array needed to answer each question
        var possibles = data.possibles;
    // a for loop to go through the possibles array for each question to add the values of each possibles
    // array and using qString, add them as radio buttons to the question to which they are
    // associated
        for (var i = 0; i < possibles.length; i++) {
            var possible = possibles[i];
            console.log(possible);
            qString = qString + "<input type='radio' name='"+data.id+"' value="+ i +" style='margin-left: 16' style='margin-right: 16'>" +possible;
    
        }
        return qString + "</form>";
    }
    window.formTemplate = formTemplate;
    
    // this function takes the template created in the last function and by appending it,
    // allows it to be displayed on the page
    function buildQuestions(){
        var questionHTML = ''
        for (var i = 0; i<game.questions.length; i++) {
            questionHTML = questionHTML + formTemplate(game.questions[i]);
        }
        $('#questions-container').append(questionHTML);
    
    }
    
    // function that 
    function isCorrect(question){
        var answers = $('[name='+question.id+']');
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    }
    
    // call the buildQuestions function
    buildQuestions();
    
    // function to build the display of guesser results
    function resultsTemplate(question){
        var htmlBlock = '<div>'
        htmlBlock = htmlBlock + question.question + ': ' + isChecked;
        return htmlBlock + "</div>";
    }
    
    // function to tabulate the guesser results
    function checkAnswers (){
    
    // variables needed to hold results
        var resultsHTML = '';
        var guessedAnswers = [];
        var correct = 0;
        var incorrect = 0;
        var unAnswered =0
    
    // for loop through each question and passes the questions at each index first into
    // the isCorrect function to see if they match the indices of correct answers, and if they do,
    // increments up the correct score
        for (var i = 0; i<game.questions.length; i++) {
            if (isCorrect(game.questions[i])) {
                correct++;
            } else {
    // then this statement runs the questions at each index through the checkAnswered function
    // to determine whether the user clicked an answer, or did not click an answer, so that
    // incorrect and unAnswered scores can be delineated from each other
                if (checkAnswered(game.questions[i])) {
                    incorrect++;
                } else {
                    unAnswered++;
                }
            }
    
        }
    // display the results of the function in the results div and use strings of text to relate the
    // results of the for loop with their corresponding values
        $('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
    }
    
    // this function checks whether the guesser actually checked an answer for each of the 
    // questions
    function checkAnswered(question){
        var anyAnswered = false;
        var answers = $('[name='+question.id+']');
    // the for loop creates a condition to check if the buttons were checked and and then sets
    // the anyAnswered variable to true if they were
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                anyAnswered = true;
            }
        }
    // then return the anyAnswered variable so it can be tabulated in the last function to distinguish
    // between incorrect answers and those answers that were not attempted
        return anyAnswered;
    
    }
    
    // create a function with an onclick event for the doneButton that both checks the Answers 
    // and stops the clock when "done" button is pressed
        $('#doneButton').on('click', function() {
        checkAnswers();
        stop();
        $("#messageDiv").html("Game Over!");
        })
    });