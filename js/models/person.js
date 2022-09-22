class Person {

  constructor(name, hairColor, hasGlasses, shirtColor, hasFacialHair, department, job){
    this.name = name;
    this.hairColor = hairColor;
    this.hasGlasses = hasGlasses;
    this.shirtColor = shirtColor;
    this.hasFacialHair = hasFacialHair;
    this.department = department;
    this.job = job;
  }

//could work as a universal getter by passing in which value. Which would allow us to check all properties with some sneaky variables. 
  getValidProperty(property){
    switch(property){
      case 'name':
      return this.name

    default:
    console.log(`${property} is not a valid property.`)
    return false
    }
  }

}

module.exports.person = Person;
