$(document).on('ready', function() {

  //=========Listeners=========
  //game cells start square
  var $gameCells = $('#game-board .game-cell');
  var height1 = $gameCells.width();
  $gameCells.css({height: height1 + 'px'});

  //make game-cells square on resize
  $(window).resize(function() {
    var height2 = $gameCells.width();
    $gameCells.css({height: height2 +  'px'});
  });

  //On button press puts text value of button on selected game board
  $('#button-board .game-inputs').on('mousedown', function(event) {
    event.preventDefault();
    var $gameCellWithFocus = $('#game-board .game-cell:focus');
    $(document.activeElement).val($(this)[0].textContent);
    $gameCellWithFocus.attr('value', $(this)[0].textContent);
  });

  //On arrow press the user can traverse the game board, skipping over disabled squares
  $gameCells.keydown(function(event) {

    var $gameCellWithFocus = $('#game-board .game-cell:focus');

    if (event.keyCode === 8 || event.keyCode === 46) {
      $gameCellWithFocus.attr('value', '');
    }
    else if (event.keyCode === 37) {
      event.preventDefault();
      $gameCellWithFocus.prevUntil($(this), '.game-cell:not(:disabled):first').focus();
    }
    else if (event.keyCode === 39) {
      event.preventDefault();
      $gameCellWithFocus.nextUntil($(this), '.game-cell:not(:disabled):first').focus();
    }
    else if (event.keyCode === 38) {
      event.preventDefault();
      var columnClassUp = $gameCellWithFocus.attr('class').split(' ').pop();//grab classes on game cell and put in array.  Column class is the last one so it can be popped.
      $gameCellWithFocus.prevUntil($(this), '.' + columnClassUp + ':not(:disabled):first').focus();
    }
    else if (event.keyCode === 40) {
      event.preventDefault();
      var columnClassDown = $gameCellWithFocus.attr('class').split(' ').pop();
      $gameCellWithFocus.nextUntil($(this), '.' + columnClassDown + ':not(:disabled):first').focus();
    }
    else {
      listenerGameBoard();
    }
  });

  //delete value in cell on delete button push
  $('#button-board .erase-input').on('mousedown', function(event) {
    event.preventDefault();
    var $gameCellWithFocus = $('#game-board .game-cell:focus');
    $gameCellWithFocus.val('');
    $gameCellWithFocus.attr('value', '""');
  });

  //cell background turns red if incorrect value is present.
  $('.verify-input').on('click', function(event) {
    for (var i = 0; i < stringifiedSolvedPuzzle.length; i++) {
      event.preventDefault();
      var $gameCell = $('#game-board #' + i);
      if (stringifiedSolvedPuzzle[i] !==  $gameCell.val() && $gameCell.val() !== '') {
        $gameCell.css('background', 'red');
      }
      else {
        $gameCell.css('background', 'white');
      }
    }
  });
});

//prevents all characters other than hexadecimal characters from being placed in boxes and changes all inputs to upper case.  Fear the dreaded regex!
function listenerGameBoard() {

  var $gameCellWithFocus = $('#game-board .game-cell:focus');
  var keyPressEvent = String.fromCharCode(event.which);

  if (null !== keyPressEvent.match(/[g-z]/g) || null !== keyPressEvent.match(/[G-Z]/g) || null !== keyPressEvent.match(/\W/)) {
    event.preventDefault();
  }
  else if (null !== keyPressEvent.match(/[A-F]/g)) {
    event.preventDefault();
    $gameCellWithFocus.val(keyPressEvent.toUpperCase());
    $gameCellWithFocus.attr('value', keyPressEvent.toUpperCase());
  }
  else if (null !== keyPressEvent.match(/[0-9]/g)) {
    event.preventDefault();
    $gameCellWithFocus.val(keyPressEvent);
    $gameCellWithFocus.attr('value', keyPressEvent);
  }
}

// function colorChange() {
//   //get numbers index of object arrays for column and row of selected cell
//   var columnNum = $gameCellWithFocus.attr('class').split(' ')[3].slice(-1);
//   var rowNum = $gameCellWithFocus.attr('class').split(' ')[2].slice(-1);
//   var checkArray = [];
//   var columnObjectValuesArray = columnObjects[columnNum].values;
//   var stop, start;
//   //grab front or rear section of column object depending where cell lies
//   if (rowNum < 8) {
//     start = 0;
//     stop = 8;
//   }
//   else {
//     start = 8;
//     stop = 16;
//   }
//   console.log(start, stop);
//   for (var i = start; i < stop; i++) {
//
//     checkArray.push($(columnObjectValuesArray[i]).val());
//   }
// 
//   console.log(checkArray);
// }
