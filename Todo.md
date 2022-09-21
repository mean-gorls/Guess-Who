### Clean up code base
* remove and limit global variables.
* look into multiplayer options.

#### Data Restructure:
* Change the shape of the static data to be an array of people objects with various properties rather than many unlinked arrays.
Consider moving "Pronoun" part of the game to display over image instead of as a guessable option. Feels like this encourages gender biases/assumptions.
* Should adjust to MVC architecture for modularization.
* Restructure essential functions to accept the newly shaped data.
* Consider bringing in a framework like React.
* Wire up a DB
* Create a form that allows users to create their own People.
* Allow users to use their input People to play a game
