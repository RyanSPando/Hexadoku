//filter function to get unique values in the array
function onlyUnique(value, index, self) {
    return self.lastIndexOf(value) === index;
}
//write game data to firebase database
function writeGameData(gameData) {
  var userId = firebase.auth().currentUser.uid;
  firebase.database().ref('web/data/users/' + userID).set({
    saveGame: gameData
  });
}
//grab save game data
function retrieveGameData() {
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('/users/' + userId).once('gameData').then(function(snapshot) {
  });
}
//makes a copy of the gameboard and puts it into a string for storage on save
function generateStringifiedGameBoard(gameBoardObject, stringifiedSolvedPuzzle) {
  var stringifiedCurrentGameBoard = '';
  currentGameBoard = gameBoardObject.values.each((index,value) => {
    if ($(value).val() === '') {
      stringifiedCurrentGameBoard += ('*' + stringifiedSolvedPuzzle[index]);
    }
    else if ($(value).prop('disabled')) {
      stringifiedCurrentGameBoard += ('-' + stringifiedSolvedPuzzle[index]);
    }
    else {
      stringifiedCurrentGameBoard += $(value).val();
    }
  });
  return stringifiedCurrentGameBoard;
}


//take a stringified puzzle and applies it to the gameboard
function fillGameBoard(puzzleString) {
  count = 0;
  $('#game-board .game-cell').each(function(index, value) {

    if (puzzleString[count] === '*') {
      $(this).attr('value', '')
      this.value = '';
      count += 2;
    }
    else if (puzzleString[count] === '-') {
      $(this).attr('value', puzzleString[count])
      $(this).attr('disabled', true);
      $(this).css('color', 'black');
      this.value = puzzleString[count + 1];
      count += 2;
    }
    else{
        $(this).attr('value', puzzleString[count])
        this.value = puzzleString[count];
        count++;
    }
  });
}
