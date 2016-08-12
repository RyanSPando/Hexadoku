//filter function to get unique values in the array
function onlyUnique(value, index, self) {
  return self.lastIndexOf(value) === index;
}

//write game data to firebase database
function writeGameData(gameData, solvedBoard) {
  var userID = firebase.auth().currentUser.uid;

  firebase.database().ref('web/data/users/' + userID).set({
    saveGame: gameData,
    solvedBoard: solvedBoard
  });
}

//grab save game data from firebase database
function retrieveGameData() {
  var userID = firebase.auth().currentUser.uid;

  return firebase.database().ref('/web/data/users/' + userID).once('value').then(function(snapshot) {
    fillGameBoard(snapshot.val().saveGame);
    stringifiedSolvedPuzzle = snapshot.val().solvedBoard;
  });
}

//makes a copy of the gameboard and puts it into a string for storage on save
function generateStringifiedGameBoard(gameBoardObject, stringifiedSolvedPuzzle) {
  var stringifiedCurrentGameBoard = '';

  currentGameBoard = gameBoardObject.values.each(function(index,value) {
    if ($(value).val() === '') {
      stringifiedCurrentGameBoard += '*';
    }
    else if ($(value).attr('disabled')) {
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

    $(this).prop('disabled', false);//reset disabled squares for load game
    $(this).css('color', 'blue');//reset for load game
    if (puzzleString[count] === '*') {
      $(this).attr('value', '');
      this.value = '';
      count++;
    }
    else if (puzzleString[count] === '-') {
      $(this).attr('value', puzzleString[count]);
      $(this).prop('disabled', true);
      $(this).css('color', 'black');
      this.value = puzzleString[count + 1];
      count += 2;
    }
    else {
      $(this).attr('value', puzzleString[count]);
      this.value = puzzleString[count];
      count++;
    }
  });
}

//gives the inner grid number based on index of cell
function gridClassNumber(outerIndex, innerIndex) {
  return (Math.floor(outerIndex / boxHeight) * boxHeight + Math.floor(innerIndex / boxWidth));
}
