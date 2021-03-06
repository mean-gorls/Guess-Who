'use strict';

let remainingGuesses = 2;
let allPeople = [];
let displayPeople = [];
let correctPerson = [];
let remainingQuestions = 5;

let gameTable = document.getElementById('game');
let selectedCharacter = document.getElementById('character-details');
let playButton = document.getElementById('play-button');
let remainingGuess = document.getElementById('guesses-x');
let remainingTurns = document.getElementById('remaining-turns');

const namesArr = ['Adam', 'Brad', 'Brody', 'Bryce', 'Charles', 'David', 'Donnie', 'Gus', 'Haley', 'Harry', 'John', 'Karen', 'Kathy', 'Keith', 'Kelsey', 'Ken', 'Kevin', 'Madeline', 'Malcolm', 'Margot', 'Mark', 'Matt', 'Megan', 'Melissa', 'Michael', 'Molly', 'Nicole', 'Ryan', 'Sam', 'Stacey', 'Tim', 'Todd', 'Tyler'];

const hairArr = ['Black', 'Black', 'Red', 'Brown', 'Brown', 'Black', 'Blonde', 'Black', 'Brown', 'Brown', 'Blonde', 'Blonde', 'Black', 'Black', 'Brown', 'Black', 'Blonde', 'Red', 'Black', 'Blonde', 'Red', 'Brown', 'Red', 'Black', 'Black', 'Brown', 'Black', 'Brown', 'Black', 'Black', 'Brown', 'Black', 'Brown'];

const glassesArr = ['Yes', 'No', 'No', 'Yes', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'Yes', 'Yes', 'No', 'No', 'Yes', 'No', 'No', 'Yes', 'Yes', 'Yes', 'No', 'No', 'No', 'No', 'Yes', 'No', 'No', 'Yes', 'No', 'Yes', 'Yes'];

const shirtArr = ['White', 'White', 'Black', 'Grey', 'Blue', 'Purple', 'Blue', 'Blue', 'Grey', 'Black', 'White', 'Grey', 'Purple', 'Black', 'Yellow', 'White', 'White', 'White', 'Yellow', 'White', 'Grey', 'Yellow', 'Grey', 'Grey', 'Purple', 'Purple', 'White', 'Black', 'Grey', 'White', 'Blue', 'Blue', 'Yellow'];

const facialArr = ['Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'No', 'Yes', 'Yes', 'No', 'No', 'No', 'No', 'Yes', 'No', 'No', 'No', 'No', 'Yes', 'Yes', 'No', 'No', 'Yes', 'No', 'No', 'No', 'No', 'No', 'Yes', 'No', 'No'];

const departmentArr = ['Marketing', 'IT', 'Marketing', 'HR', 'HR', 'HR', 'IT', 'HR', 'Marketing', 'IT', 'HR', 'HR', 'Marketing', 'IT', 'HR', 'Marketing', 'HR', 'IT', 'Marketing', 'HR', 'IT', 'Marketing', 'HR', 'Marketing', 'Marketing', 'IT', 'IT', 'HR', 'IT', 'HR', 'Marketing', 'Marketing', 'IT'];

const pronounArr = [2, 2, 3, 3, 2, 2, 2, 3, 3, 2, 1, 2, 1, 3, 1, 1, 2, 2, 1, 3, 1, 1, 3, 1, 3, 2, 1, 1, 3, 2, 2, 3, 3];

const jobArr = ['Director', 'Supervisor', 'Director', 'Manager', 'Manager', 'Manager', 'Supervisor', 'Manager', 'Director', 'Supervisor', 'Manager', 'Manager', 'Director', 'Supervisor', 'Manager', 'Director', 'Manager', 'Supervisor', 'Director', 'Manager', 'Supervisor', 'Director', 'Manager', 'Director', 'Director', 'Supervisor', 'Supervisor', 'Manager', 'Supervisor', 'Manager', 'Director', 'Director', 'Supervisor'];

let silhouette = new Person('', '', '', '', '', '', '', '', '', '', '');

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
  createHiddenPerson();
  // displaySelectedCharacter(0);
  grabLocal();
  //updates chosen people and hidden person with local storage.
  renderPeople();
  //picks a person of the displayed people as the answer

}

function populateAllPeople() {
  for (let i = 0; i < namesArr.length; i++) {
    let names = namesArr[i];
    let hair = hairArr[i];
    let glasses = glassesArr[i];
    let shirt = shirtArr[i];
    let facial = facialArr[i];
    let department = departmentArr[i];
    let proNoun = pronounArr[i];
    let job = jobArr[i];
    let id = i;
    let holder = new Person(names, hair, glasses, shirt, facial, department, proNoun, job, id);
    allPeople.push(holder);
  }
}
//function to populate displayed People array

function displayPeopleIncludes(id) {
  for (let i = 0; i < displayPeople.length; i++) {
    if (displayPeople[i].id == id) {
      return true;
    }
  }
  return false;
}

function choosePeople() {
  while (displayPeople.length < 25) {
    let randomNumber = Math.floor(Math.random() * allPeople.length);
    if (!displayPeopleIncludes(randomNumber)) {
      displayPeople.push(allPeople[randomNumber]);
    }
  }
}

function renderPeople() {
  gameTable.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 5; j++) {
      let gameTd = document.createElement('td');
      let displayImg = document.createElement('img');
      displayImg.src = displayPeople[(i * 5) + j].filepath;
      displayImg.id = (i * 5) + j;
      gameTd.appendChild(displayImg);
      row.appendChild(gameTd);
    }
    gameTable.appendChild(row);
  }
}

function createHiddenPerson() {
  let randomNumber = Math.floor(Math.random() * displayPeople.length);
  let chosen1 = displayPeople[randomNumber];
  correctPerson.push(chosen1);
  console.log(correctPerson);
}

function grabLocal() {
  if (localStorage.answer) {
    let grabbedAnswer = localStorage.getItem('answer');
    let parsedAnswer = JSON.parse(grabbedAnswer);
    console.log(parsedAnswer);
    correctPerson = parsedAnswer;
  }
  if (localStorage.remainingPeople) {
    let grabbedPeople = localStorage.getItem('remainingPeople');
    let parsedPeople = JSON.parse(grabbedPeople);
    console.log('here?', parsedPeople);
    displayPeople = parsedPeople;
  }
  if (localStorage.numQuestions) {
    let grabbedQuestion = localStorage.getItem('numQuestions');
    let parsedQuestion = JSON.parse(grabbedQuestion);
    remainingQuestions = parsedQuestion;
  }
  if (localStorage.guessesString) {
    let grabbedGuesses = localStorage.getItem('guessesString');
    let parsedGuesses = JSON.parse(grabbedGuesses);
    remainingGuesses = parsedGuesses;
  }
}

let guessButton = document.createElement('button');

function displaySelectedCharacter(event) {
  document.getElementById('character-details').innerHTML = '';
  let id = event.target.id;
  let displayImg = document.createElement('img');
  displayImg.src = displayPeople[id].filepath;
  selectedCharacter.appendChild(displayImg);

  let displayLi = document.createElement('ul');

  let nameItem = document.createElement('li');
  nameItem.innerText = 'Name: ' + displayPeople[id].name;
  displayLi.appendChild(nameItem);

  let hairItem = document.createElement('li');
  hairItem.innerText = 'Hair Color: ' + displayPeople[id].hair;
  displayLi.appendChild(hairItem);

  let glassesItem = document.createElement('li');
  glassesItem.innerText = 'Glasses: ' + displayPeople[id].glasses;
  displayLi.appendChild(glassesItem);

  let shirtColorItem = document.createElement('li');
  shirtColorItem.innerText = 'Shirt Color: ' + displayPeople[id].shirtColor;
  displayLi.appendChild(shirtColorItem);

  let facialHairItem = document.createElement('li');
  facialHairItem.innerText = 'Facial Hair: ' + displayPeople[id].facialHair;
  displayLi.appendChild(facialHairItem);

  let departmentItem = document.createElement('li');
  departmentItem.innerText = 'Department: ' + displayPeople[id].department;
  displayLi.appendChild(departmentItem);

  let pronounItem = document.createElement('li');
  pronounItem.innerText = 'Pronoun: ' + displayPeople[id].pronoun;
  displayLi.appendChild(pronounItem);

  let jobTitleItem = document.createElement('li');
  jobTitleItem.innerText = 'Job Title: ' + displayPeople[id].jobTitle;
  displayLi.appendChild(jobTitleItem);

  guessButton.innerText = 'Guess ' + displayPeople[id].name;
  guessButton.id = displayPeople[id].id;
  displayLi.appendChild(guessButton);

  selectedCharacter.appendChild(displayLi);

  displayScoreboard();
}

gameTable.addEventListener('click', displaySelectedCharacter);

function displayScoreboard() {

  displayRemainingGuess();
  // shows number of remaining guesses
  displayRemainingTurns();
  // shows remaining number of questions

  function displayRemainingGuess() {
    clearGuessUl();
    let createUl = document.createElement('ul');
    let liEl = document.createElement('li');
    liEl.innerText = 'Remaining Guesses: ' + remainingGuesses;
    createUl.appendChild(liEl);
    remainingGuess.appendChild(createUl);
    console.log('Remaining Guesses: ' + remainingGuesses);
  }

  function displayRemainingTurns() {
    clearTurnUl();
    let createUl = document.createElement('ul');
    let liEl = document.createElement('li');
    liEl.innerText = 'Remaining Questions: ' + remainingQuestions;
    createUl.appendChild(liEl);
    remainingTurns.appendChild(createUl);
  }
}

function clearGuessUl() {
  while (remainingGuess.firstChild) {
    remainingGuess.removeChild(remainingGuess.firstChild);
  }
}

function clearTurnUl() {
  while (remainingTurns.firstChild) {
    remainingTurns.removeChild(remainingTurns.firstChild);
  }
}

function guessPerson() {

  let id = event.target.id;

  remainingGuesses--;

  if (id == correctPerson[0].id) {
    alert('Correct! You won!');
    gameOver();
    return;
  }

  if (remainingGuesses < 1) {
    alert('No, Game over...');
    gameOver();
    return;
  }

  else {
    alert('Incorrect! Remaining guesses: ' + remainingGuesses + '.');
    let guessesString = JSON.stringify(remainingGuesses);
    localStorage.setItem(guessesString, 'guessesString');
    displayScoreboard();
    storeData();
  }
}

guessButton.addEventListener('click', guessPerson);

function decreaseTurns() {

  remainingQuestions--;

  if (remainingQuestions === 1) {
    alert('You can ask 1 more question, make it count...');
    return;
  }

  if (remainingQuestions === 0) {
    alert('You are out of questions! Choose who...');
  }

  if (remainingQuestions < 0) {
    alert('You asked a question when you had 0 remaining! Game over...');
  }

}

//event listeners for all questions

$('.allCategories').click(checkAnswer);

// I need to check the glasses logic and facial hair logic, anything with yes and no answers.

function checkAnswer() {
  let id = event.currentTarget.id;

  checkShirt();
  checkGlasses();
  checkHairColor();
  checkPronoun();
  checkFacialHair();
  checkJobTitle();
  checkDepartment();
  decreaseTurns();
  storeData();
  displayScoreboard();
  gameOver();

  function checkShirt() {

    blackShirt();
    blueShirt();
    whiteShirt();
    greyShirt();
    purpleShirt();
    yellowShirt();


    function blackShirt() {
      if (id == 'shirt-black' && correctPerson[0].shirtColor === 'Black') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Black') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a black shirt!');
      }
      if (id == 'shirt-black' && correctPerson[0].shirtColor !== 'Black') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].shirtColor === 'Black') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a black shirt!');
      }
    }

    function blueShirt() {
      if (id == 'shirt-blue' && correctPerson[0].shirtColor === 'Blue') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Blue') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a blue shirt!');
      }
      if (id == 'shirt-blue' && correctPerson[0].shirtColor !== 'Blue') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].shirtColor === 'Blue') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a blue shirt!');
      }
    }

    function whiteShirt() {
      if (id == 'shirt-white' && correctPerson[0].shirtColor === 'White') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'White') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a white shirt!');
      }
      if (id == 'shirt-white' && correctPerson[0].shirtColor !== 'White') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].shirtColor === 'White') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a white shirt!');
      }
    }

    function greyShirt() {
      if (id == 'shirt-grey' && correctPerson[0].shirtColor === 'Grey') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Grey') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a grey shirt!');
      }
      if (id == 'shirt-grey' && correctPerson[0].shirtColor !== 'Grey') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].shirtColor === 'Grey') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a grey shirt!');
      }
    }

    function purpleShirt() {
      if (id == 'shirt-purple' && correctPerson[0].shirtColor === 'Purple') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Purple') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a purple shirt!');
      }
      if (id == 'shirt-purple' && correctPerson[0].shirtColor !== 'Purple') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].shirtColor === 'Purple') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing a purple shirt!');
      }
    }

    function yellowShirt() {
      if (id == 'shirt-yellow' && correctPerson[0].shirtColor === 'Yellow') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].shirtColor !== 'Yellow') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is wearing a yellow shirt!');
      }
      if (id == 'shirt-yellow' && correctPerson[0].shirtColor !== 'Yellow') {
        for (let j = 0; j < displayPeople.length; j++) {
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
      if (id == 'glass-yes' && correctPerson[0].glasses === 'Yes') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].glasses !== 'Yes') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();

        alert('Yes, the mystery person is wearing glasses!');
      }
      if (id == 'glass-yes' && correctPerson[0].glasses !== 'Yes') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].glasses === 'Yes') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not wearing glasses!');
      }
    }

    function noGlasses() {
      if (id == 'glass-no' && correctPerson[0].glasses === 'No') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].glasses !== 'No') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is not wearing glasses!');
      }
      if (id == 'glass-no' && correctPerson[0].glasses !== 'No') {
        for (let j = 0; j < displayPeople.length; j++) {
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
      if (id == 'hair-black' && correctPerson[0].hair === 'Black') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].hair !== 'Black') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has black hair.');
      }
      if (id == 'hair-black' && correctPerson[0].hair !== 'Black') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].hair === 'Black') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have black hair.');
      }
    }

    function redHair() {
      if (id == 'hair-red' && correctPerson[0].hair === 'Red') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].hair !== 'Red') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has red hair.');
      }
      if (id == 'hair-red' && correctPerson[0].hair !== 'Red') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].hair === 'Red') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have red hair.');
      }
    }

    function blondeHair() {
      if (id == 'hair-blonde' && correctPerson[0].hair === 'Blonde') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].hair !== 'Blonde') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has blonde hair.');
      }
      if (id == 'hair-blonde' && correctPerson[0].hair !== 'Blonde') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].hair === 'Blonde') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have blonde hair.');
      }
    }

    function brownHair() {
      if (id == 'hair-brown' && correctPerson[0].hair === 'Brown') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].hair !== 'Brown') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has brown hair.');
      }
      if (id == 'hair-brown' && correctPerson[0].hair !== 'Brown') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].hair === 'Brown') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have brown hair.');
      }
    }

  }

  function checkPronoun() {

    pronoun1();
    pronoun2();
    pronoun3();

    function pronoun1() {
      if (id == 'pro-1' && correctPerson[0].pronoun === 1) {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].pronoun !== 1) {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has prounoun type 1.');
      }
      if (id == 'pro-1' && correctPerson[0].pronoun !== 1) {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].pronoun === 1) {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have pronoun type 1.');
      }
    }

    function pronoun2() {
      if (id == 'pro-2' && correctPerson[0].pronoun === 2) {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].pronoun !== 2) {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has prounoun type 2.');
      }
      if (id == 'pro-2' && correctPerson[0].pronoun !== 2) {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].pronoun === 2) {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have pronoun type 2.');
      }

    }

    function pronoun3() {
      if (id == 'pro-3' && correctPerson[0].pronoun === 3) {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].pronoun !== 3) {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has prounoun type 3.');
      }
      if (id == 'pro-3' && correctPerson[0].pronoun !== 3) {
        for (let j = 0; j < displayPeople.length; j++) {
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
      if (id == 'facial-yes' && correctPerson[0].facialHair === 'Yes') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].facialHair !== 'Yes') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person has facial hair.');
      }
      if (id == 'facial-yes' && correctPerson[0].facialHair !== 'Yes') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].facialHair === 'Yes') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person does not have facial hair.');
      }
    }

    function noFacialHair() {
      if (id == 'facial-no' && correctPerson[0].facialHair === 'No') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].facialHair !== 'No') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person does not have facial hair.');
      }
      if (id == 'facial-no' && correctPerson[0].facialHair !== 'No') {
        for (let j = 0; j < displayPeople.length; j++) {
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
      if (id == 'job-super' && correctPerson[0].jobTitle === 'Supervisor') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].jobTitle !== 'Supervisor') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is a supervisor.');
      }
      if (id == 'job-super' && correctPerson[0].jobTitle !== 'Supervisor') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].jobTitle === 'Supervisor') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not a supervisor.');
      }
    }

    function manager() {
      if (id == 'job-man' && correctPerson[0].jobTitle === 'Manager') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].jobTitle !== 'Manager') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is a manager.');
      }
      if (id == 'job-man' && correctPerson[0].jobTitle !== 'Manager') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].jobTitle === 'Manager') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not a manager.');
      }
    }

    function director() {
      if (id == 'job-dir' && correctPerson[0].jobTitle === '') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].jobTitle !== '') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is a director.');
      }
      if (id == 'job-dir' && correctPerson[0].jobTitle !== '') {
        for (let j = 0; j < displayPeople.length; j++) {
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
      if (id == 'dep-it' && correctPerson[0].department === 'IT') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].department !== 'IT') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is in IT.');
      }
      if (id == 'dep-it' && correctPerson[0].department !== 'IT') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].department === 'IT') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not in IT.');
      }
    }

    function hr() {
      if (id == 'dep-hr' && correctPerson[0].department === 'HR') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].department !== 'HR') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is in HR.');
      }
      if (id == 'dep-hr' && correctPerson[0].department !== 'HR') {
        for (let j = 0; j < displayPeople.length; j++) {
          if (displayPeople[j].department === 'HR') {
            displayPeople[j] = silhouette;
          }
        }
        renderPeople();
        alert('No, the mystery person is not in HR.');
      }
    }

    function marketing() {
      if (id == 'dep-market' && correctPerson[0].department === 'Marketing') {
        for (let i = 0; i < displayPeople.length; i++) {
          if (displayPeople[i].department !== 'Marketing') {
            displayPeople[i] = silhouette;
          }
        }
        renderPeople();
        alert('Yes, the mystery person is in Marketing.');
      }
      if (id == 'dep-market' && correctPerson[0].department !== 'Marketing') {
        for (let j = 0; j < displayPeople.length; j++) {
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

function storeData() {
  let answer = JSON.stringify(correctPerson);
  localStorage.setItem('answer', answer);

  let remainingPeople = JSON.stringify(displayPeople);
  localStorage.setItem('remainingPeople', remainingPeople);

  let numQuestions = JSON.stringify(remainingQuestions);
  localStorage.setItem('numQuestions', numQuestions);

  let guessesString = JSON.stringify(remainingGuesses);
  localStorage.setItem('guessesString', guessesString);
}

playButton.addEventListener('click', gameOver);

function clearLocal() {
  localStorage.clear();
}

function gameOver() {
  if (remainingGuesses < 1 || remainingQuestions < 0) {
    clearLocal();
    location.reload();
    run();
  }
}


