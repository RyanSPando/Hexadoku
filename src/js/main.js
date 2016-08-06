$(document).on('ready', function() {
  console.log('main.css!');

  //=========Create Game Board=========
  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      $('#game-board').append('<input type="text" name="' + (i * 16 + j) + '" value="" class="game-cell row' + i + ' column' + j + '" maxlength="1">');
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

  $('#button-board .game-inputs').wrapAll('<div class="btn-group" role="group"></div>');

  //=========Fill Game Board=========
  var solvedPuzzle = randomizeHexadoku(puzzleSeed, 4, 4);
  var maskedPuzzle = maskPuzzle(solvedPuzzle, 200);
  var stringifiedMaskedPuzzle = maskedPuzzle.toString().replace(/,/g, '');
  $('#game-board .game-cell').each(function(index, value) {
    if (stringifiedMaskedPuzzle[index] !== '*') {
      this.value = stringifiedMaskedPuzzle[index];
      $(this).attr('disabled', true);
      $(this).css('color', 'black');
    }
  });
});
