$(document).on('ready', function() {

  //finds the next easiest square
  $('.easiest-input').on('click', function(event) {
    event.preventDefault();
    var nextEasiestSquare = 0;
    var highestInfoSquare = 0;

    //refactored into .each for these?  jQuery objects do not like each.

    for (var i = 0; i < cellObjects.length; i++) {
      var individualCellArray = cellObjects[i].values
      var infoSquares = 0;

      for (var j = 0; j < individualCellArray.length; j++) {
        if(individualCellArray[j].value !== ''){
          infoSquares++;
        }
      }
      if (infoSquares > highestInfoSquare && !$(individualCellArray[j]).prop('disabled') && $('#' + i).val() === '') {
        highestInfoSquare = infoSquares;
        nextEasiestSquare = i;
      }
    }
    console.log(nextEasiestSquare, highestInfoSquare);
    $('#' + nextEasiestSquare).focus();
  });

  $('.save-input').on('click', function(event) {
    event.preventDefault();
    var savePuzzle = generateStringifiedGameBoard(gameBoardObject, stringifiedSolvedPuzzle)
    // writeGameData(stringifiedCurrentGameBoard, uid);
    console.log(savePuzzle);
  });

  $('.load-input').on('click', function(event) {
    event.preventDefault();
    // writeGameData(stringifiedCurrentGameBoard, uid);
  });

  $('#googleLogin a').on('click', function(event) {
    event.preventDefault();
    var auth = firebase.auth();
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function(result) {
      // User signed in!
    }).catch(function(error) {
      console.log('Error');
    });
  });
});
