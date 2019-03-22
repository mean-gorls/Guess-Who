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

var facialArr = ['Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'No', 'Yes', 'Yes', 'No', 'No', 'No', 'No', 'Yes', 'No', 'No', 'No', 'No', 'Yes', 'Yes', 'No', 'No', 'Yes', 'No', 'No', 'No', 'No', 'No', 'Yes', 'No', 'No'];

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
    alert('You won! Starting a new game.');
  }
  else {
    peopleGuessed--;
    alert('No, try again. You have ' + peopleGuessed + ' guesses left');
  }
}

guessButton.addEventListener('click', guessPerson);
//event listeners for all questions

$('.allCategories').click(checkAnswer);

// I need to check the glasses logic and facial hair logic, anything with yes and no answers.

function checkAnswer() {
  var id = event.currentTarget.id;

  checkShirt();
  checkGlasses();
  checkHairColor();
  checkPronoun();
  checkFacialHair();
  checkJobTitle();
  checkDepartment();

  function checkShirt() {

    blackShirt();
    blueShirt();
    whiteShirt();
    greyShirt();
    purpleShirt();
    yellowShirt();

    function blackShirt() {
      if (id === 'shirt-black' && correctPerson[0].shirtColor === 'Black') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Black') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a black shirt!');
      }
      if (id === 'shirt-black' && correctPerson[0].shirtColor !== 'Black') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].shirtColor === 'Black') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a black shirt!');
      }
    }

    function blueShirt() {
      if (id === 'shirt-blue' && correctPerson[0].shirtColor === 'Blue') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Blue') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a blue shirt!');
      }
      if (id === 'shirt-blue' && correctPerson[0].shirtColor !== 'Blue') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].shirtColor === 'Blue') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a blue shirt!');
      }
    }

    function whiteShirt() {
      if (id === 'shirt-white' && correctPerson[0].shirtColor === 'White') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'White') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a white shirt!');
      }
      if (id === 'shirt-white' && correctPerson[0].shirtColor !== 'White') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].shirtColor === 'White') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a white shirt!');
      }
    }

    function greyShirt() {
      if (id === 'shirt-grey' && correctPerson[0].shirtColor === 'Grey') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Grey') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a grey shirt!');
      }
      if (id === 'shirt-grey' && correctPerson[0].shirtColor !== 'Grey') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].shirtColor === 'Grey') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a grey shirt!');
      }
    }

    function purpleShirt() {
      if (id === 'shirt-purple' && correctPerson[0].shirtColor === 'Purple') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Purple') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a purple shirt!');
      }
      if (id === 'shirt-purple' && correctPerson[0].shirtColor !== 'Purple') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].shirtColor === 'Purple') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a purple shirt!');
      }
    }

    function yellowShirt() {
      if (id === 'shirt-yellow' && correctPerson[0].shirtColor === 'Yellow') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Yellow') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a yellow shirt!');
      }
      if (id === 'shirt-yellow' && correctPerson[0].shirtColor !== 'Yellow') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].shirtColor === 'Yellow') {
            displayPeople[j] = silhouette;
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
      if (id === 'glass-yes' && correctPerson[0].glasses === 'Yes') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].glasses !== 'Yes') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();

        alert('Yes, the mystery person is wearing glasses!');
      }
      if (id === 'glass-yes' && correctPerson[0].glasses !== 'Yes') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].glasses === 'Yes') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing glasses!');
      }
    }

    function noGlasses() {
      if (id === 'glass-no' && correctPerson[0].glasses === 'No') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].glasses !== 'No') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is not wearing glasses!');
      }
      if (id === 'glass-no' && correctPerson[0].glasses !== 'No') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].glasses === 'No') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is wearing glasses!');
      }
    }
  }

  function checkHairColor() {

    blackHair();
    redHair();
    blondeHair();
    brownHair();

    function blackHair() {
      if (id === 'hair-black' && correctPerson[0].hair === 'Black') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].hair !== 'Black') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has black hair');
      }
      if (id === 'hair-black' && correctPerson[0].hair !== 'Black') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].hair === 'Black') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have black hair');
      }
    }

    function redHair() {
      if (id === 'hair-red' && correctPerson[0].hair === 'Red') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].hair !== 'Red') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has red hair');
      }
      if (id === 'hair-red' && correctPerson[0].hair !== 'Red') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].hair === 'Red') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have red hair');
      }
    }

    function blondeHair() {
      if (id === 'hair-blonde' && correctPerson[0].hair === 'Blonde') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].hair !== 'Blonde') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has blonde hair');
      }
      if (id === 'hair-blonde' && correctPerson[0].hair !== 'Blonde') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].hair === 'Blonde') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have blonde hair');
      }
    }

    function brownHair() {
      if (id === 'hair-brown' && correctPerson[0].hair === 'Brown') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].hair !== 'Brown') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has brown hair');
      }
      if (id === 'hair-brown' && correctPerson[0].hair !== 'Brown') {
        for (var j = 0; i < displayPeople.length; j++) {
          if (displayPeople[j].hair === 'Brown') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have brown hair');
      }
    }

  }

  function checkPronoun() {

    pronoun1();
    pronoun2();
    pronoun3();

    function pronoun1() {
      if (id === 'pro-1' && correctPerson[0].pronoun === 1) {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].pronoun !== 1) {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has prounoun type 1.');
      }
      if (id === 'pro-1' && correctPerson[0].pronoun !== 1) {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].pronoun === 1) {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have pronoun type 1.');
      }
    }

    function pronoun2() {
      if (id === 'pro-2' && correctPerson[0].pronoun === 2) {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].pronoun !== 2) {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has prounoun type 2.');
      }
      if (id === 'pro-2' && correctPerson[0].pronoun !== 2) {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].pronoun === 2) {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have pronoun type 2.');
      }

    }

    function pronoun3() {
      if (id === 'pro-3' && correctPerson[0].pronoun === 3) {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].pronoun !== 3) {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has prounoun type 3.');
      }
      if (id === 'pro-3' && correctPerson[0].pronoun !== 3) {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].pronoun === 3) {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have pronoun type 3.');
      }
    }

  }

  function checkFacialHair() {

    facialHair();
    noFacialHair();

    function facialHair() {
      if (id === 'facial-yes' && correctPerson[0].facialHair === 'Yes') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].facialHair !== 'Yes') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has facial hair.');
      }
      if (id === 'facial-yes' && correctPerson[0].facialHair !== 'Yes') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].facialHair === 'Yes') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have facial hair.');
      }
    }

    function noFacialHair() {
      if (id === 'facial-no' && correctPerson[0].facialHair === 'No') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].facialHair !== 'No') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person does not have facial hair.');
      }
      if (id === 'facial-no' && correctPerson[0].facialHair !== 'No') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].facialHair === 'No') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person has facial hair.');
      }
    }
  }

  function checkJobTitle() {

    supervisor();
    manager();
    director();

    function supervisor() {
      if (id === 'job-super' && correctPerson[0].jobTitle === 'Supervisor') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].jobTitle !== 'Supervisor') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is a supervisor.');
      }
      if (id === 'job-super' && correctPerson[0].jobTitle !== 'Supervisor') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].jobTitle === 'Supervisor') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not a supervisor.');
      }
    }

    function manager() {
      if (id === 'job-man' && correctPerson[0].jobTitle === 'Manager') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].jobTitle !== 'Manager') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is a manager.');
      }
      if (id === 'job-man' && correctPerson[0].jobTitle !== 'Manager') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].jobTitle === 'Manager') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not a manager.');
      }
    }

    function director() {
      if (id === 'job-dir' && correctPerson[0].jobTitle === '') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].jobTitle !== '') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is a director.');
      }
      if (id === 'job-dir' && correctPerson[0].jobTitle !== '') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].jobTitle === 'Director') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not a director.');
      }
    }

  }

  function checkDepartment() {

    it();
    hr();
    marketing();

    function it() {
      if (id === 'dep-it' && correctPerson[0].department === 'IT') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].department !== 'IT') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is in IT.');
      }
      if (id === 'dep-it' && correctPerson[0].department !== 'IT') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].department === 'IT') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not in IT.');
      }
    }

    function hr() {
      if (id === 'dep-hr' && correctPerson[0].department === 'HR') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].department !== 'HR') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is in HR.');
      }
      if (id === 'dep-hr' && correctPerson[0].department !== 'HR') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].department === 'HR') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not in HR.');
      }
    }

    function marketing() {
      if (id === 'dep-market' && correctPerson[0].department === 'Marketing') {
        for (var i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].department !== 'Marketing') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is in Marketing.');
      }
      if (id === 'dep-market' && correctPerson[0].department !== 'Marketing') {
        for (var j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].department === 'Marketing') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not in Marketing.');
      }
    }

  }

}
