
var playerName = "";
var maximumNumber = "";
var minimumNumber = 0;
var gameStarted = false;
var randomNumber; // variable that stores the target random number generated in each game
var numberOfGuessesAllowed;
var numberGuessed = 0; //variable that keeps track of the number of times the user guessed
var containSpecialChars = false;
var containNumbers = false;
var isNumber = false;

//callback function that gets executed when document is ready
$(document).ready(function () {
    //function that checks for special characters in the given string parameter and returns a boolean depending on the case
    function containsSpecialChars(name) {
        let pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
        return pattern.test(name);
    }
    //funciton that checks if the string parameter given contains numbers and returns a boolean depending on the case
    function containsNumbers(name) {
        return (/\d/.test(name));
    }
    //function that checks if the string parameter given represents a valid number and returns a boolean depending on the case
    function isANumber(number) {
        return !isNaN(number);
    }
    //function that gets the maximum number from the input field and returns the value
    function getMaxFromUser(){
        return $("#maxnum").val();
    }
    //function that gets the player name from input field and returns the value
    function getPlayerName(){
        return $("#fullname").val();
    }
    //displays messages on the dashboard giving user validity of input
    function displayMessages(containSpecialChars, containNumbers, isNumber) {
        //if name input field contains special characters or numbers and number input field is a valid number
        let conditionOne = ((containSpecialChars || containNumbers) && isNumber);
        //if name input field contains special characters or numbers and number input field is also not a valid number
        let conditionTwo = (containSpecialChars || containNumbers) && !isNumber;
        //if name input field contains no special characters or numbers but number input field is not a number
        let conditionThree = !(containSpecialChars || containNumbers) && !isNumber;
        //if name input field does not contains no special characters or numbers and number input field is also a valid number
        let conditionFour = !(containSpecialChars || containNumbers) && isNumber;

        //series of if else statements to 
        //display the corresponding set of messages in the dashboard if conditionOne is true
        if (conditionOne) {
            $("#displaymessage").html("<h5>Enter the value for the fields below</h5>");
            $("#displaymessage1").html("<h5>Name cannot contain number of special characters</h5>");
            $("#displaymessage2").html("");
        }//display the corresponding set of messages in the dashboard if conditionTwo is true
        else if (conditionTwo) {
            $("#displaymessage").html("<h5>Enter the value for the fields below</h5>");
            $("#displaymessage1").html("<h5>Name cannot contain number of special characters</h5>");
            $("#displaymessage2").html("<h5>Enter a valid whole number</h5>");
        }//display the corresponding set of messages in the dashboard if conditionThree is true
        else if (conditionThree) {
            $("#displaymessage").html("<h5>Enter the value for the fields below</h5>");
            $("#displaymessage1").html("");
            $("#displaymessage2").html("<h5>Enter a valid whole number</h5>");
        }//display the corresponding set of messages in the dashboard if conditionFour is true
        else if (conditionFour) {
            $(".jumbotron").html("<h1 class=\"animated flash\">GAME STARTED</h1><br>");
            setTimeout(function () {
                $(".jumbotron").append("<h4 class=\"animated flash\">Maximum number as set by " + playerName + " is " + maximumNumber + "</h4>");
            },2000);
            setTimeout(function () {
                $(".jumbotron").append("<h4 class=\"animated flash\">Keep guessing a number from 0 to " + maximumNumber + "</h4>");
            },4000);
        }
    }
    //function that displays the message on the dashboard if the input fields are empty
    function displayMessageIfInputFieldsAreEmpty() {
        $("#displaymessage").html("<h5>Enter values for both fields</h5>");
        $("#displaymessage1").html("");
        $("#displaymessage2").html("");
    }
    //function that calls a call back function that makes the viewport scroll to the game area in an animation
    function scrollToGameScreen(){
        //callback function that scrolls the 
        setTimeout(function () {
            let offset = 80;
            $("html, body").animate({
                scrollTop: $("#gamearea").offset().top + offset
            }, 2000);
        }, 5000);
    }
    //function that displays the message that prompts the user to guess the number given the range with animation
    function displayMessageToPromptUserToGuessWithAnimation(){
        //callback function that marks the content of the corresponding HTML element
        setTimeout(function () {
            $("#guess").html("<h5 class=\"animated flash\">Guess the whole number from " + minimumNumber + " to " + maximumNumber + "</h5>");
        }, 8000);
    }
    //function that displays answer button with animation
    function displayAnswerInputFieldWithAnimation(){
        //callback function that marks the content of the corresponding HTML element
        setTimeout(function () {
            $("#answerButtonContainer").html("<input id=\"answer\" class=\"rounded animated tada\"><br>");
        }, 9000);
    }
    //function that displays the answer button with animation
    function displayAnswerButtonWithAnimation(){
        //callback function to display answer button with animation
        setTimeout(function() {
            $("#answerButtonContainer").append("<button id=\"answerbutton\" class=\"btn btn-primary mt-2 mb-2 animated tada\">Answer</button>");
            //call back function that gets executed when the answer button is clicked
            $("#answerbutton").click(function () {
                var answer = getGuessFromUser();
                //incrementing the counter to keep track of the number of times the user has guessed
                ++numberGuessed;
                //calling function with arguments randomNumber and answer that checks if the guess is correct
                isGuessCorrect(randomNumber, answer);
            });
        }, 10000);
    }
    //function that gets guess from the user and returns it
    function getGuessFromUser(){
        return parseInt($("#answer").val());
    }
    //function that generates a random number from 0 to the number provided as the parameter and returns it
    function generateRandomNumber(maximumNumber){
        return Math.floor(Math.random() * (maximumNumber - minimumNumber)) + minimumNumber;
    }
    /*function that takes in the randomly generated number and answer from the user as parameter, 
    compares them and gives feedback accordingly*/
    function isGuessCorrect(randomNumber, answer) {
        //condition that checks to see if the number of guesses made by the user is still less than the total number of allowed guesses
        if (numberGuessed < numberOfGuessesAllowed) {
            //condition that checks if the guess is lesser than the goal
            if (answer > randomNumber) {
                setTimeout(function () {
                    $("#guess").html("<h5 class=\"animated flash\">Guess too high. Guess Again </h5>");
                }, 1000);
            }//condition that checks if the guess is greater than the goal
            if (answer < randomNumber) {
                setTimeout(function () {
                    $("#guess").html("<h5 class=\"animated flash\">Guess too low. Guess Again </h5>");
                }, 1000);
            }//condition that checks if the guess is the same as the goal
            if (answer === randomNumber) {
                //call back function that displays the end game result 
                setTimeout(function () {
                    $("body").html("<div class=\"jumbotron text-center\"><h1 class=\"text-success\">GAME WON!</h1></div>" +
                        "<button class=\"btn btn-primary mt-1 mb-1\" id=\"restartgame\">RESTART</button>");
                    $("#restartgame").click(function () {
                        location.reload();
                    });
                }, 1000);
            }
            //call back function that displays the number of times the user has guessed as an animation on screen
            setTimeout(function () {
                $("#numberofguesses").html("<h5 class=\"animated flash\">Number of times guessed : " + numberGuessed + " </h5>");
            }, 1000);
            //callback function that displays the maximum number of guesses the user can make as an animation on screen
            setTimeout(function () {
                $("#maxnumberofguesses").html("<h5 class=\"animated flash\">Maximum guesses allowed : " + numberOfGuessesAllowed + " </h5>");
            }, 1000);
        }
        else {
            $("body").html("<div class=\"jumbotron text-center\"><h1 class=\"text-danger\">GAME OVER!</h1></div>" +
                "<button class=\"btn btn-primary mt-1 mb-1\" id=\"restartgame\">RESTART</button>");
            $("#restartgame").click(function () {
                location.reload();
            });
        }
    }
    //function that starts the game
    function startGame(){
        //generate random number by calling function and store it in variable
        randomNumber = generateRandomNumber(parseInt(maximumNumber));
        //generating random number for the number of guesses allowed;
        numberOfGuessesAllowed = Math.floor(Math.random() * 20) + 5;
        //calling function that will scroll the viewport to the game area
        scrollToGameScreen();
        //calling function that displays the message that prompts the user to guess the values
        displayMessageToPromptUserToGuessWithAnimation();
        //calling function that displays the input text field
        displayAnswerInputFieldWithAnimation();
        //calling function that displays the answer button
        displayAnswerButtonWithAnimation();
    }
    //game begins and start game function is called 
    $("#submitbuton").click(function () {
        playerName = getPlayerName();
        maximumNumber = getMaxFromUser();
        //checks to see if input fields are not empty
        let inputFieldsNotEmpty = (playerName !== "" && maximumNumber !== "");
        
        //proceeds with the next step only if input fields are not empty
        if (inputFieldsNotEmpty) {
            containSpecialChars = containsSpecialChars(playerName);
            containNumbers = containsNumbers(playerName);
            isNumber = isANumber(maximumNumber);
            
            /*function call to display messages on dashboard to give user feedback on the validity of the values 
            entered in the fields*/
            displayMessages(containSpecialChars, containNumbers, isNumber);
            
            //checks to see if input field values are valid
            let inputFieldsValuesValid = !containSpecialChars && !containNumbers && isNumber;
            //if input field values are valid then game is started
            if (inputFieldsValuesValid)
                startGame();
        }
        else
            displayMessageIfInputFieldsAreEmpty();//calling function to display message if input fields are empty
    });
});