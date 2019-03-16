'use strict' 

var peopleGuessed = 0;
var peopleNamesArray = []; 
var allPeople = [];

//Needs more arguments
function Person(name,hair,glasses,shirtColor,facialHair,department,pronoun,jobTitle){
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



$('.profile-photo').click(function (event) {

});



//OKay so the order that we will run the for loop will be as such, we will append the photos and link their scr ffrom the properties, then we will create a class tag with jquery at index [i] 
// we can use that class tag to refer to the img and attach the info somehow. 
//repeat. 
