//constants for Hexadoku, change if a different size game is needed
var rowHeight = 16;
var columnHeight = 16;
var boxHeight = 4;
var boxWidth = 4;

//make puzzle
var solvedPuzzle = randomizeHexadoku(puzzleSeed, boxHeight, boxWidth);
var stringifiedSolvedPuzzle = solvedPuzzle.toString().replace(/,/g, '');
var maskedPuzzle = maskPuzzle(stringifiedSolvedPuzzle, 200);

//declare arrays for Board Objects
var columnObjects = [];
var rowObjects = [];
var gridObjects = [];
var cellObjects = [];

$(document).on('ready', function() {

  //=========Create Game Board=========
  for (var i = 0; i < rowHeight; i++) {
    for (var j = 0; j < columnHeight; j++) {
      var gridClassNumber1 = gridClassNumber(i,j);
      $('#game-board').append('<input type="text" id="' + (i * rowHeight + j) + '" value="" class="game-cell grid' + gridClassNumber1 + ' row' + i + ' column' + j + '" maxlength="1">');
    }
  }
  //=========Fill Board=============
  fillGameBoard(maskedPuzzle);

  //=========Create Objects=========
  gameBoardObject = new GameBoard();
  for (var x = 0; x < 16; x++) {
    columnObjects[x] = new ColumnObject(x);
    rowObjects[x] = new RowObject(x);
    gridObjects[x] = new InnerGridObject(x);
  }

  for (var y = 0; y < rowHeight; y++) {
    for (var z = 0; z < columnHeight; z++) {
      var gridClassNumber2 = gridClassNumber(y,z);
      cellObjects[(y * rowHeight + z)] = new CellObject(rowObjects[y], columnObjects[z], gridObjects[gridClassNumber2]);
    }
  }
  //=========Make inner 8 x 8 grids for puzzle=========;
  $('#game-board .game-cell').each(function(index, value) {
    index += 1;

    if (index % boxWidth === 0 && index % rowHeight !== 0) { //Right borders.
      $(value).css('border-right', 'blue solid 3px');
    }
    //Ugly but works.  *Refactor if you have time.  Bottom borders.
    if ((index >= 49 && index <= 64) || (index >= 113 && index <= 128) || (index >= 177 && index <= 192)) {
      $(value).css('border-bottom', 'blue solid 3px');
    }
  });

  //=========make button element=========
  var charArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

  charArray.forEach(function(value, index) {
    $('#button-board').append('<button type="button" class="btn btn-default game-inputs">' + value + '</button>');
  });

  $('#button-board').append('<button type="button" class="btn btn-default erase-input btn-succsess">Erase</button>');

  $('#button-board').children().wrapAll('<div class="btn-group" role="group"></div>');
});
