//make puzzle
var solvedPuzzle = randomizeHexadoku(puzzleSeed, 4, 4);
//save a copy of solved puzzle stringified
var stringifiedSolvedPuzzle = solvedPuzzle.toString().replace(/,/g, '');
//mask puzzle
var maskedPuzzle = maskPuzzle(solvedPuzzle, 200);

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
  var columnObjects = [];
  var rowObjects = [];
  var gridObjects = [];
  var cellObjects = [];

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

  //=========Fill Game Board=========
  //Place puzzle on board and set cells to disabled
  var stringifiedMaskedPuzzle = maskedPuzzle.toString().replace(/,/g, '');
  $('#game-board .game-cell').each(function(index, value) {
    if (stringifiedMaskedPuzzle[index] !== '*') {
      this.value = stringifiedMaskedPuzzle[index];
      $(this).attr('disabled', true);
      $(this).css('color', 'black');
    }
  });
});

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
  // console.log(row.values.concat(column.values).concat(innerGrid.values));
  var totalInfoSpace = $.merge([], row.values);
  totalInfoSpace = $.merge(totalInfoSpace, column.values);
  totalInfoSpace = $.merge(totalInfoSpace, innerGrid.values);
  totalInfoSpace = totalInfoSpace.filter(onlyUnique);
  this.values = totalInfoSpace;
  this.info = totalInfoSpace.filter(valueIsFilled);
  console.log(totalInfoSpace.length);
}

function onlyUnique(value, index, self) {
    return self.lastIndexOf(value) === index;
}

function valueIsFilled(value, index) {
  // console.log(value);
  return false
}
