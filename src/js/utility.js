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
//makes a copy of the gameboard and
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
  $('#game-board .game-cell').each(function(index, value) {
    if (puzzleString[index] === '*') {
      $(this).attr('value', '')
      this.value = '';
      index++;
    }
    else if (puzzleString[index] === '-') {
      $(this).attr('value', puzzleString[index])
      $(this).attr('disabled', true);
      $(this).css('color', 'black');
      this.value = puzzleString[index + 1];
      index++;
    }
    else{
        $(this).attr('value', puzzleString[index])
        this.value = puzzleString[index];
    }
  });
}
