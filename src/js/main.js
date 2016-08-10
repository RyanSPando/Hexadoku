//make puzzle
var solvedPuzzle = randomizeHexadoku(puzzleSeed, 4, 4);
var maskedPuzzle = maskPuzzle(solvedPuzzle, 200);

//declare arrays for Board Objects
var columnObjects = [];
var rowObjects = [];
var gridObjects = [];
var cellObjects = [];

$(document).on('ready', function() {
  console.log('main.css!');

  //=========Create Game Board=========

  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      var gridClassNumber1 = Math.floor( i / 4 ) * 4 + Math.floor( j / 4)
      $('#game-board').append('<input type="text" id="' + (i * 16 + j) + '" value="" class="game-cell grid' + gridClassNumber1 + ' row' + i + ' column' + j + '" maxlength="1">');
    }
  }
  //=========Create Objects=========

    gameBoardObject = new GameBoard();
    for (var i = 0; i < 16; i++) {
      columnObjects[i] = new ColumnObject(i);
      rowObjects[i] = new RowObject(i);
      gridObjects[i] = new InnerGridObject(i);
    }

    for (var i = 0; i < 16; i++) {
      for (var j = 0; j < 16; j++) {
        var gridClassNumber2 = Math.floor( i / 4 ) * 4 + Math.floor( j / 4)
        cellObjects[(i * 16 + j)] = new CellObject(rowObjects[i], columnObjects[j], gridObjects[gridClassNumber2]);
      }
    }

    console.log(cellObjects[0]);

  //=========Make inner 8 x 8 grids for puzzle=========;

  $('#game-board .game-cell').each(function(index, value) {
    index += 1;

    if (index % 4 === 0 && index % 16 !== 0) { //Right borders.
      $(value).css('border-right', 'blue solid 3px');
    }
    //Ugly but works.  *Refactor if you have time.  Bottom borders.
    if ((index >= 49 && index <= 64) || (index >= 113 && index <= 128) || (index >= 177 && index <= 192)) {
      $(value).css('border-bottom', 'blue solid 3px');
    }
  });

  //=========make button element=========
  var charArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E'];

  charArray.forEach(function(value, index) {
    $('#button-board').append('<button type="button" class="btn btn-default game-inputs">' + value + '</button>');
  });

  $('#button-board').append('<button type="button" class="btn btn-default erase-input btn-succsess">Erase</button>')

  $('#button-board').children().wrapAll('<div class="btn-group" role="group"></div>');

//fill game button-board

//event handlers in separate file?

//finds the next easiest square
  $('.easiest-input').on('click', function(event) {
    event.preventDefault();
    var nextEasiestSquare = 0;
    var highestInfoSquare = 0;

    //refactored into .Each for these?

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

//put these in separate file?
//Objects for finder
function RowObject(rowNumber) {
  this.values = $('.row' + rowNumber);
}

function ColumnObject(columnNumber) {
  this.values =  $('.column' + columnNumber);;
}

function InnerGridObject(gridNumber) {
  this.values = $('.grid' + gridNumber)
}

function CellObject(row, column, innerGrid) {
  var totalInfoSpace = $.merge([], row.values);
  totalInfoSpace = $.merge(totalInfoSpace, column.values);
  totalInfoSpace = $.merge(totalInfoSpace, innerGrid.values);
  totalInfoSpace = $.merge([], totalInfoSpace);
  totalInfoSpace = totalInfoSpace.filter(onlyUnique);
  this.values = totalInfoSpace;
}

function GameBoard(){
  this.values = $('.game-cell');
}
