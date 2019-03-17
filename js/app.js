'use strict';

var peopleGuessed = 0;
var peopleNamesArray = [];
var allPeople = [];
var displayPeople = [];

var gameTable = document.getElementById('game');

var namesArr = ['Adam', 'Brad', 'Brody', 'Bryce', 'Charles', 'David', 'Donnie', 'Gus', 'Haley', 'Harry', 'John', 'Karen', 'Kathy', 'Keith', 'Kelsey', 'Ken', 'Kevin', 'Madeline', 'Malcom', 'Margot', 'Mark', 'Matt', 'Megan', 'Melissa', 'Micheal', 'Molly', 'Nicole', 'Ryan', 'Sam', 'Stacy', 'Tim', 'Todd', 'Tyler'];
var hairArr = ['black', 'black', 'red', 'brown', 'brown', 'black', 'blonde', 'black', 'brown', 'brown', 'blonde', 'blonde', 'black', 'black', 'brown', 'black', 'blonde', 'red', 'black', 'blonde', 'red', 'brown', 'red', 'black', 'black', 'brown', 'black', 'brown', 'black', 'black', 'brown', 'black', 'brown']; var glassesArr = [true, false, false, true, false, false, false, false, false, false, false, false, true, true, false, false, true, false, false, true, true, true, false, false, false, false, true, false, false, true, false, true, true];
var shirtArr = ['white', 'white', 'black', 'grey', 'blue', 'purple', 'blue', 'blue', 'grey', 'black', 'white', 'grey', 'purple', 'black', 'yellow', 'white', 'white', 'white', 'yellow', 'white', 'grey', 'yellow', 'grey', 'grey', 'purple', 'purple', 'white', 'black', 'grey', 'white', 'blue', 'blue', 'yellow'];
var facialArr = [true, true, true, true, false, false, false, false, false, false, false, false, true, true, false, false, true, false, false, true, true, true, false, false, false, false, true, false, false, true, false, true, true,];
var departmentArr = ['marketing', 'it', 'marketing', 'hr', 'hr', 'hr', 'it', 'hr', 'marketing', 'it', 'hr', 'hr', 'marketing', 'it', 'hr', 'marketing', 'hr', 'it', 'marketing', 'hr', 'it', 'marketing', 'hr', 'marketing', 'marketing', 'it', 'it', 'hr', 'it', 'hr', 'marketing', 'marketing', 'it'];
var pronounArr = [2, 2, 3, 3, 2, 2, 2, 3, 3, 2, 1, 2, 1, 3, 1, 1, 2, 2, 1, 3, 1, 1, 3, 1, 3, 2, 1, 1, 3, 2, 2, 3, 3];
var jobArr = ['director', ',supervisor', 'director', 'manager', 'manager', 'manager', 'supervisor', 'manager', 'director', 'supervisor', 'manager', 'manager', 'director', 'supervisor', 'manager', 'director', 'manager', 'supervisor', 'director', 'manager', 'supervisor', 'director', 'manager', 'director', 'director', 'supervisor', 'supervisor', 'manager', 'supervisor', 'manager', 'director', 'director', 'supervisor'];

run();

//Needs more arguments
function Person(name, hair, glasses, shirtColor, facialHair, department, pronoun, jobTitle) {
  this.name = name;
  this.hair = hair;
  this.glasses = glasses;
  this.shirtColor = shirtColor;
  this.facialHair = facialHair;
  this.department = department;
  this.pronoun = pronoun;
  this.jobTitle = jobTitle;
  this.filepath = `img/${name}.jpg`;
}

function run() {
  populateAllPeople();
  choosePeople();
  renderPeople();

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
    var holder = new Person(names, hair, glasses, shirt, facial, department, proNoun, job);
    allPeople.push(holder);
  }
}
//function to populate displayed People array


function choosePeople() {
  while (displayPeople.length < 25) {
    var randomNumber = Math.floor(Math.random() * displayPeople.length);
    if (!displayPeople.includes(allPeople[randomNumber]));
    displayPeople.push(allPeople[randomNumber]);
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
      gameTd.appendChild(displayImg);
      row.appendChild(gameTd);
    }
    gameTable.appendChild(row);
  }
}

// }


// $('.profile-photo').click(function (event) {

// });



//OKay so the order that we will run the for loop will be as such, we will append the photos and link their scr from the properties, then we will create a class tag with jquery at index [i]
// we can use that class tag to refer to the img and attach the info somehow.
//repeat.

