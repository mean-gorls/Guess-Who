'use strict'

//The correct person array
//The displayed person array
//# of questions left
//# of guesses left

var newGame = document.getElementById('new-game');
var loadGame = document.getElementById('load-game');

newGame.addEventListener('click',grabLocal);

function grabLocal(){
    var grabbedAnswer = localStorage.getItem('answer');
    var parseAnswer = JSON.parse(grabbedAnswer);

    var grabbedQuestion = localStorage.getItem('numQuestions');
    var parsedQuestion = JSON.parse(grabbedQuestion);

    var grabbedPeople = localStorage.getItem('peopleString');
    var parsedPeople = JSON.parse(grabbedPeople);
    
}


function storeData(){
// var answer = JSON.stringify(correctPerson);
// localStorage.setItem('answer',answer);

var numQuestions = JSON.stringify(remainingQuestions);
localStorage.setItem('numQuestions',numQuestions);

var peopleString =JSON.stringify(peopleGuessed);
localStorage.setItem('peopleString',peopleString);
}

//string the object
var fooString= JSON.stringify(foo);
//store the object
localStorage.setItem('ourThing', fooString);
//grab the object
var retrievedData = localStorage.getItem('OurThing');
//destring the object
var retirevedDataParsed = JSON.parse(retrievedData);