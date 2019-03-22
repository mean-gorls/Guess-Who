'use strict';

var peopleGuessed = 2;
var allPeople = [];
var displayPeople = [];
var correctPerson = [];
// var remainingQuestions = 5;

var gameTable = document.getElementById('game');
var selectedCharacter = document.getElementById('character-details');

var namesArr = ['Adam', 'Brad', 'Brody', 'Bryce', 'Charles', 'David', 'Donnie', 'Gus', 'Haley', 'Harry', 'John', 'Karen', 'Kathy', 'Keith', 'Kelsey', 'Ken', 'Kevin', 'Madeline', 'Malcolm', 'Margot', 'Mark', 'Matt', 'Megan', 'Melissa', 'Michael', 'Molly', 'Nicole', 'Ryan', 'Sam', 'Stacey', 'Tim', 'Todd', 'Tyler'];

var hairArr = ['Black', 'Black', 'Red', 'Brown', 'Brown', 'Black', 'Blonde', 'Black', 'Brown', 'Brown', 'Blonde', 'Blonde', 'Black', 'Black', 'Brown', 'Black', 'Blonde', 'Red', 'Black', 'Blonde', 'Red', 'Brown', 'Red', 'Black', 'Black', 'Brown', 'Black', 'Brown', 'Black', 'Black', 'Brown', 'Black', 'Brown'];

var glassesArr = ['Yes', 'No', 'No', 'Yes', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'Yes', 'Yes', 'No', 'No', 'Yes', 'No', 'No', 'Yes', 'Yes', 'Yes', 'No', 'No', 'No', 'No', 'Yes', 'No', 'No', 'Yes', 'No', 'Yes', 'Yes'];

var shirtArr = ['White', 'White', 'Black', 'Grey', 'Blue', 'Purple', 'Blue', 'Blue', 'Grey', 'Black', 'White', 'Grey', 'Purple', 'Black', 'Yellow', 'White', 'White', 'White', 'Yellow', 'White', 'Grey', 'Yellow', 'Grey', 'Grey', 'Purple', 'Purple', 'White', 'Black', 'Grey', 'White', 'Blue', 'Blue', 'Yellow'];

var facialArr = ['Yes', 'Yes', 'Yes', 'Yes', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'Yes', 'Yes', 'No', 'No', 'Yes', 'No', 'No', 'Yes', 'Yes', 'Yes', 'No', 'No', 'No', 'No', 'Yes', 'No', 'No', 'Yes', 'No', 'Yes', 'Yes',];

var departmentArr = ['Marketing', 'IT', 'Marketing', 'HR', 'HR', 'HR', 'IT', 'HR', 'Marketing', 'IT', 'HR', 'HR', 'Marketing', 'IT', 'HR', 'Marketing', 'HR', 'IT', 'Marketing', 'HR', 'IT', 'Marketing', 'HR', 'Marketing', 'Marketing', 'IT', 'IT', 'HR', 'IT', 'HR', 'Marketing', 'Marketing', 'IT'];

var pronounArr = [2, 2, 3, 3, 2, 2, 2, 3, 3, 2, 1, 2, 1, 3, 1, 1, 2, 2, 1, 3, 1, 1, 3, 1, 3, 2, 1, 1, 3, 2, 2, 3, 3];

var jobArr = ['Director', 'Supervisor', 'Director', 'Manager', 'Manager', 'Manager', 'Supervisor', 'Manager', 'Director', 'Supervisor', 'Manager', 'Manager', 'Director', 'Supervisor', 'Manager', 'Director', 'Manager', 'Supervisor', 'Director', 'Manager', 'Supervisor', 'Director', 'Manager', 'Director', 'Director', 'Supervisor', 'Supervisor', 'Manager', 'Supervisor', 'Manager', 'Director', 'Director', 'Supervisor'];

var silhouette = new Person('', '', '', '', '', '', '', '', '', '', '');

silhouette.filepath = 'img/silhouette.png';

run();

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
  gameTable.innerHTML = '';
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

function createHiddenPerson() {
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

function guessPerson() {
  var id = event.target.id;
  console.log(id);
  console.log(correctPerson[0].id);
  if (id == correctPerson[0].id) {
    alert('YEP!');

  }
  else {
    peopleGuessed--;
    alert('No, try again. You have ' + peopleGuessed + ' guesses left');
  }
}

guessButton.addEventListener('click', guessPerson);
//event listeners for all questions
var domShirts = document.getElementsByClassName('shirt-color');
var domGlasses = document.getElementById('glasses');
var domHair = document.getElementById('hair-color');
var domPronoun = document.getElementById('pronoun');
var domFacial = document.getElementById('facial');
var domJobTitle = document.getElementById('job-title');
var domDepartment = document.getElementById('department');

var domShirtBlack = document.getElementById('shirt-black');
var domShirtBlue = document.getElementById('shirt-blue');
var domShirtWhite = document.getElementById('shirt-white');
var domShirtGrey = document.getElementById('shirt-grey');
var domShirtPurple = document.getElementById('shirt-purple');
var domShirtYellow = document.getElementById('shirt-yellow');

var domGlassesYes = document.getElementById('glass-yes');
var domGlassesNo = document.getElementById('glass-no');

var domHairBlack = document.getElementById('hair-black');
var domHairBrown = document.getElementById('hair-brown');
var domHairRed = document.getElementById('hair-red');
var domHairBlonde = document.getElementById('hair-blonde');

var domPronoun1 = document.getElementById('pro-1');
var domPronoun2 = document.getElementById('pro-2');
var domPronoun3 = document.getElementById('pro-3');

var domFacialNo = document.getElementById('facial-no');
var domFacialYes = document.getElementById('facial-yes');

var domJobtitleSuper = document.getElementById('job-super');
var domJobtitleMan = document.getElementById('job-man');
var domJobtitleDir = document.getElementById('job-dir');

var domDepartmentIt = document.getElementById('dep-it');
var domDepartmentHr = document.getElementById('dep-hr');
var domDepartmentDir = document.getElementById('dep-dir');

// domShirts.addEventListener('click', checkShirt);

$('.allCategories').click(checkAnswer);

function checkAnswer() {
  var id = event.currentTarget.id;

  checkShirt();
  checkGlasses();
  checkHairColor();
  // checkPronoun();
  // checkFacialHair();
  // checkJobTitle();
  // checkDepartment();

  function checkShirt() {

    blackShirt();
    blueShirt();
    whiteShirt();
    greyShirt();
    purpleShirt();
    yellowShirt();

    function blackShirt() {
      if (id == 'shirt-black' && correctPerson[0].shirtColor == 'Black') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Black') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a black shirt!');
      }
      if (id == 'shirt-black' && correctPerson[0].shirtColor !== 'Black') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor == 'Black') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a black shirt!');
      }
    }

    function blueShirt() {
      if (id == 'shirt-blue' && correctPerson[0].shirtColor == 'Blue') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Blue') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a blue shirt!');
      }
      if (id == 'shirt-blue' && correctPerson[0].shirtColor !== 'Blue') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor == 'Blue') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a blue shirt!');
      }
    }

    function whiteShirt() {
      if (id == 'shirt-white' && correctPerson[0].shirtColor == 'White') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'White') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a white shirt!');
      }
      if (id == 'shirt-white' && correctPerson[0].shirtColor !== 'White') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor == 'White') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a white shirt!');
      }
    }

    function greyShirt() {
      if (id == 'shirt-grey' && correctPerson[0].shirtColor == 'Grey') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Grey') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a grey shirt!');
      }
      if (id == 'shirt-grey' && correctPerson[0].shirtColor !== 'Grey') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor == 'Grey') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a grey shirt!');
      }
    }

    function purpleShirt() {
      if (id == 'shirt-purple' && correctPerson[0].shirtColor == 'Purple') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Purple') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a purple shirt!');
      }
      if (id == 'shirt-purple' && correctPerson[0].shirtColor !== 'Purple') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor == 'Purple') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a purple shirt!');
      }
    }

    function yellowShirt() {
      if (id == 'shirt-yellow' && correctPerson[0].shirtColor == 'Yellow') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Yellow') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a yellow shirt!');
      }
      if (id == 'shirt-yellow' && correctPerson[0].shirtColor !== 'Yellow') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor == 'Yellow') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a yellow shirt!');
      }
    }

  }

  function checkGlasses() {

    glasses();
    noGlasses();

    function glasses() {
      if (id == 'glass-yes' && correctPerson[0].glasses == 'Yes') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].glasses !== 'Yes') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing glasses!');
      }
      if (id == 'glass-yes' && correctPerson[0].glasses !== 'Yes') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].glasses == 'No') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing glasses!');
      }
    }

    function noGlasses(){
      if (id == 'glass-no' && correctPerson[0].glasses == 'No') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].glasses !== 'Yes') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is not wearing glasses!');
      }
      if (id == 'glass-no' && correctPerson[0].glasses !== 'No') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].glasses == 'No') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is wearing glasses!');
      }
    }
  }

  function checkHairColor() {

    blackHair();

    function blackHair() {
      if (id == 'hair-black' && correctPerson[0].hair == 'Black') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].hair !== 'Black') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has black hair');
      }
      if (id == 'hair-black' && correctPerson[0].hair !== 'Black') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].hair == 'Black') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have black hair');
      }
    }
  }

  // function checkPronoun() {

  // }

  // function checkFacialHair() {

  // }

  // function checkJobTitle() {

  // }

  // function checkDepartment() {

  // }

}



// if(peopleGuessed <= 0){
//   //clear all local storage & send them to landing page
// }
