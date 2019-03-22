'use strict'

//The correct person array
//The displayed person array
//# of questions left
//# of guesses left

var newGame = document.getElementById('new-game');
var loadGame = document.getElementById('load-game');

newGame.addEventListener('click',clearLocal);

function clearLocal(){
    localStorage.clear();
}