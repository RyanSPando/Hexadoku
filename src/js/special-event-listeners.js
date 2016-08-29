$(document).on('ready', function() {

  //finds the next easiest square
  $('.easiest-input').on('click', function(event) {
    event.preventDefault();
    var nextEasiestSquare = 0;
    var highestInfoSquare = 0;

    for (var i = 0; i < cellObjects.length; i++) {
      var individualCellArray = cellObjects[i].values;
      var infoSquares = 0;

      for (var j = 0; j < individualCellArray.length; j++) {
        if (individualCellArray[j].value !== '') {
          infoSquares++;
        }
      }
      if (infoSquares > highestInfoSquare && !$(individualCellArray[j]).prop('disabled') && $('#' + i).val() === '') {
        highestInfoSquare = infoSquares;
        nextEasiestSquare = i;
      }
    }
    $('#' + nextEasiestSquare).focus();
  });

  //save game to Firebase database
  $('.save-input').on('click', function(event) {
    event.preventDefault();
    var savePuzzle = generateStringifiedGameBoard(gameBoardObject, stringifiedSolvedPuzzle);
    writeGameData(savePuzzle, stringifiedSolvedPuzzle);
  });

  //load game to firebase database
  $('.load-input').on('click', function(event) {
    event.preventDefault();
    retrieveGameData();
  });

  //login using Google ID for save and load game
  $('#googleLogin a').on('click', function(event) {
    event.preventDefault();
    var auth = firebase.auth();
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function(result) {
      // User signed in!
    }).catch(function(error) {
      throw error;
    });
  });

  //on change of board look for a complete 8 digit row column or row and change the background color to it
//   $('.input').change(function(event) {
//     console.log('hello');
//   });
});
