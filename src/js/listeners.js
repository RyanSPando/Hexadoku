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

    //allow delete and backspace key to work on game board
    if (event.keyCode === 8 || event.keyCode === 46) {
      $gameCellWithFocus.attr('value', '');
    }
    //capture left arrow and move focus to the previous game cell that is not disabled
    else if (event.keyCode === 37) {
      event.preventDefault();
      $gameCellWithFocus.prevUntil($(this), '.game-cell:not(:disabled):first').focus();
    }
      //capture right arrow and move focus to the previous game cell that is not disabled
    else if (event.keyCode === 39) {
      event.preventDefault();
      $gameCellWithFocus.nextUntil($(this), '.game-cell:not(:disabled):first').focus();
    }
    //capture up arrow and move focus to the previous column* cell that is not disabled
    else if (event.keyCode === 38) {
      event.preventDefault();
      var columnClassUp = $gameCellWithFocus.attr('class').split(' ').pop();//grab classes on game cell and put in array.  Column class is the last one so it can be popped.
      $gameCellWithFocus.prevUntil($(this), '.' + columnClassUp + ':not(:disabled):first').focus();
    }
    //capture down arrow and move focus to the previous column* cell that is not disabled
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
  colorChange();
}

function colorChange() {
  //get numbers index of object arrays for column and row of selected cell
  var $gameCellWithFocus = $('#game-board .game-cell:focus');
  var colNum = $gameCellWithFocus.attr('class').split(' ')[3].replace(/[^0-9]/g, '');
  var rowNum = $gameCellWithFocus.attr('class').split(' ')[2].replace(/[^0-9]/g, '');
  var checkArrayCol = [];
  var checkArrayRow = [];
  var columnObjectValuesArray = columnObjects[colNum].values;
  var rowObjectValuesArray = rowObjects[rowNum].values;
  var stopCol, startCol, startRow, stopRow;
  // grab front or rear section of column object depending where cell lies
  if (rowNum < 8) {
    startCol = 0;
    stopCol = 8;
  }
  else {
    startCol = 8;
    stopCol = 16;
  }
  if (colNum < 8) {
    startRow = 0;
    stopRow = 8;
  }
  else {
    startRow = 8;
    stopRow = 16;
  }

  for (var i = startCol; i < stopCol; i++) {
    checkArrayCol.push($(columnObjectValuesArray[i]).val());
  }

  for (var j = startRow; j < stopRow; j++) {
    checkArrayRow.push($(rowObjectValuesArray[j]).val());
  }

  if (!checkArrayCol.some(function(value, index, arr){
    return value === '';
  })) {
    var color = '#' + checkArrayCol.toString().replace(/,/g, '').slice(0,6);
    $('#colorTarget').css('background-color', color);
  }

}
