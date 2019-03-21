'use strict';

var peopleGuessed = 2;
var peopleNamesArray = [];
var allPeople = [];
var displayPeople = [];
var correctPerson = [];
var currentGuess = [];

var gameTable = document.getElementById('game');
var selectedCharacter = document.getElementById('character-details');

var namesArr = ['Adam', 'Brad', 'Brody', 'Bryce', 'Charles', 'David', 'Donnie', 'Gus', 'Haley', 'Harry', 'John', 'Karen', 'Kathy', 'Keith', 'Kelsey', 'Ken', 'Kevin', 'Madeline', 'Malcolm', 'Margot', 'Mark', 'Matt', 'Megan', 'Melissa', 'Michael', 'Molly', 'Nicole', 'Ryan', 'Sam', 'Stacey', 'Tim', 'Todd', 'Tyler'];
var hairArr = ['black', 'black', 'red', 'brown', 'brown', 'black', 'blonde', 'black', 'brown', 'brown', 'blonde', 'blonde', 'black', 'black', 'brown', 'black', 'blonde', 'red', 'black', 'blonde', 'red', 'brown', 'red', 'black', 'black', 'brown', 'black', 'brown', 'black', 'black', 'brown', 'black', 'brown'];
var glassesArr = ['yes', 'no', 'no', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'yes', 'no', 'no', 'yes', 'no', 'no', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'yes', 'no', 'no', 'yes', 'no', 'yes', 'yes'];
var shirtArr = ['white', 'white', 'black', 'grey', 'blue', 'purple', 'blue', 'blue', 'grey', 'black', 'white', 'grey', 'purple', 'black', 'yellow', 'white', 'white', 'white', 'yellow', 'white', 'grey', 'yellow', 'grey', 'grey', 'purple', 'purple', 'white', 'black', 'grey', 'white', 'blue', 'blue', 'yellow'];
var facialArr = ['yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'yes', 'no', 'no', 'yes', 'no', 'no', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'yes', 'no', 'no', 'yes', 'no', 'yes', 'yes',];
var departmentArr = ['marketing', 'it', 'marketing', 'hr', 'hr', 'hr', 'it', 'hr', 'marketing', 'it', 'hr', 'hr', 'marketing', 'it', 'hr', 'marketing', 'hr', 'it', 'marketing', 'hr', 'it', 'marketing', 'hr', 'marketing', 'marketing', 'it', 'it', 'hr', 'it', 'hr', 'marketing', 'marketing', 'it'];
var pronounArr = [2, 2, 3, 3, 2, 2, 2, 3, 3, 2, 1, 2, 1, 3, 1, 1, 2, 2, 1, 3, 1, 1, 3, 1, 3, 2, 1, 1, 3, 2, 2, 3, 3];
var jobArr = ['director', ',supervisor', 'director', 'manager', 'manager', 'manager', 'supervisor', 'manager', 'director', 'supervisor', 'manager', 'manager', 'director', 'supervisor', 'manager', 'director', 'manager', 'supervisor', 'director', 'manager', 'supervisor', 'director', 'manager', 'director', 'director', 'supervisor', 'supervisor', 'manager', 'supervisor', 'manager', 'director', 'director', 'supervisor'];
run();
var silohouette = new Person('','','','','','','','','','','');
silohouette.filepath = `img/silohouette.png`;

//Needs more arguments
function Person(name, hair, glasses, shirtColor, facialHair, department, pronoun, jobTitle, id) {
  this.name = name;
  this.hair = hair;
  this.glasses = glasses;
  this.shirtColor = shirtColor;
  this.facialHair = facialHair;
  this.department = department;
  this.pronoun = pronoun;
  this.jobTitle = jobTitle;
  this.filepath = `img/${name}.jpg`;
  this.id = id;
}


function run() {
  //creates all people objects
  populateAllPeople();
  //selecting 25 people to display
  choosePeople();
  //appends chosen people to the DOM
  renderPeople();
  //picks a person of the displayed people as the answer
  createHiddenPerson();
  // displaySelectedCharacter(0);

}

function populateAllPeople() {
  for (var i = 0; i < namesArr.length; i++) {
    var names = namesArr[i];
    var hair = hairArr[i];
    var glasses = glassesArr[i];
    var shirt = shirtArr[i];
    var facial = facialArr[i];
    var department = departmentArr[i];
    var proNoun = pronounArr[i];
    var job = jobArr[i];
    var id = i;
    var holder = new Person(names, hair, glasses, shirt, facial, department, proNoun, job, id);
    allPeople.push(holder);
  }
}
//function to populate displayed People array

function displayPeopleIncludes(id) {
  for (var i = 0; i < displayPeople.length; i++) {
    if (displayPeople[i].id === id) {
      return true;
    }
  }
  return false;
}

function choosePeople() {
  while (displayPeople.length < 25) {
    var randomNumber = Math.floor(Math.random() * allPeople.length);
    if (!displayPeopleIncludes(randomNumber)) {
      displayPeople.push(allPeople[randomNumber]);
    }
  }
}

function renderPeople() {
  console.log('Display People: ' , displayPeople);
  for (var i = 0; i < 5; i++) {
    var row = document.createElement('tr');
    for (var j = 0; j < 5; j++) {
      var gameTd = document.createElement('td');
      var displayImg = document.createElement('img');
      displayImg.src = displayPeople[(i * 5) + j].filepath;
      displayImg.id = (i * 5) + j;
      gameTd.appendChild(displayImg);
      row.appendChild(gameTd);
    }
    gameTable.appendChild(row);
  }
}
function createHiddenPerson(){
  var randomNumber = Math.floor(Math.random() * displayPeople.length);
  var chosen1 = displayPeople[randomNumber];
  correctPerson.push(chosen1);
  console.log(correctPerson);
}

var guessButton = document.createElement('button');
function displaySelectedCharacter(event) {
  // var last = document.getElementById('character-details').lastChild;
  document.getElementById('character-details').innerHTML = '';
  var id = event.target.id;
  var displayImg = document.createElement('img');
  displayImg.src = displayPeople[id].filepath;
  selectedCharacter.appendChild(displayImg);

  var displayLi = document.createElement('ul');

  var nameItem = document.createElement('li');
  nameItem.innerText = 'Name: ' + displayPeople[id].name;
  displayLi.appendChild(nameItem);

  var hairItem = document.createElement('li');
  hairItem.innerText = 'Hair Color: ' + displayPeople[id].hair;
  displayLi.appendChild(hairItem);

  var glassesItem = document.createElement('li');
  glassesItem.innerText = 'Glasses: ' + displayPeople[id].glasses;
  displayLi.appendChild(glassesItem);

  var shirtColorItem = document.createElement('li');
  shirtColorItem.innerText = 'Shirt Color: ' + displayPeople[id].shirtColor;
  displayLi.appendChild(shirtColorItem);

  var facialHairItem = document.createElement('li');
  facialHairItem.innerText = 'Facial Hair: ' + displayPeople[id].facialHair;
  displayLi.appendChild(facialHairItem);

  var departmentItem = document.createElement('li');
  departmentItem.innerText = 'Department: ' + displayPeople[id].department;
  displayLi.appendChild(departmentItem);

  var pronounItem = document.createElement('li');
  pronounItem.innerText = 'Pronoun: ' + displayPeople[id].pronoun;
  displayLi.appendChild(pronounItem);

  var jobTitleItem = document.createElement('li');
  jobTitleItem.innerText = 'Job Title: ' + displayPeople[id].jobTitle;
  displayLi.appendChild(jobTitleItem);

  guessButton.innerText = 'Guess ' + displayPeople[id].name;
  guessButton.id = displayPeople[id].id;
  displayLi.appendChild(guessButton);

  selectedCharacter.appendChild(displayLi);
  
}

gameTable.addEventListener('click', displaySelectedCharacter);

function guessPerson(){
  var id = event.target.id;
  console.log(id);
  console.log(correctPerson[0].id);
  if(id == correctPerson[0].id){
    alert('YEP!');

  }
  else{
    peopleGuessed--;
    alert('No, try again. You have ' + peopleGuessed + ' guesses left')
  }
}

guessButton.addEventListener('click', guessPerson);
//event listeners for all questions
var domShirts = getElementById('shirt-color');
var domGlasses = getElementById('glasses');
var domHair = getElementById('hair-color');
var domPronoun = getElementById('pronoun');
var domFacial = getElementById('facial');
var domJobTitle = getElementById('job-title');
var domDepartment = getElementById('department');

var domShirtBlack = getElementById('shirt-black');
var domShirtBlue = getElementById('shirt-blue');
var domShirtWhite = getElementById('shirt-white');
var domShirtGrey = getElementById('shirt-grey');
var domShirtPurple = getElementById('shirt-purple');
var domShirtYellow = getElementById('shirt-yellow');

var domGlassesYes = getElementById('glass-yes');
var domGlassesNo = getElementById('glass-no');

var domHairBlack = getElementById('hair-black');
var domHairBrown = getElementById('hair-brown');
var domHairRed = getElementById('hair-red');
var domHairBlonde = getElementById('hair-blonde');

var domPronoun1 = getElementById('pro-1');
var domPronoun2 = getElementById('pro-2');
var domPronoun3 = getElementById('pro-3');

var domFacialNo = getElementById('facial-no');
var domFacialYes = getElementById('facial-yes');

var domJobtitleSuper = getElementById('job-super');
var domJobtitleMan = getElementById('job-man');
var domJobtitleDir = getElementById('job-dir');

var domDepartmentIt = getElementById('dep-it');
var domDepartmentHr = getElementById('dep-hr');
var domDepartmentDir = getElementById('dep-dir');

domShirts.addEventListener('click', checkShirt);

function checkShirt(){
  var id = event.target.id;
  if(id == domShirtBlack){
    if(correctPerson.shirtColor == 'black'){
      for( var i = 0; i < displayPeople.length; i++){
        if(displayPeople[i].shirtColor !== 'black'){
          displayPeople[i] = silohouette;
        }
      }
    }
  }
}

if(peopleGuessed <=0){
  //clear all local storage & send them to landing page 
}
