$(document).on('ready', function() {
  console.log('main.css!');

  //=========Create Game Board=========
  for (let i = 0; i < 256; i++) {
    $('#game-board' ).append('<input type="text" name="' + i + '" value=""  class="game-cell" maxlength="1">');
  }

  //=========Make inner 8 x 8 grids for puzzle=========;
  $('#game-board .game-cell').each(function(index, value) {
    index += 1;

    if (index % 4 === 0) { //Right borders.
      $(value).css('border-right', 'blue solid 3px');
    }
    //Ugly but works.  *Refactor if you have time.  Bottom borders.
    if (index > 240 || (index >= 49 && index <= 64) || (index >= 113 && index <= 128) || (index >= 177 && index <= 192)) {
      $(value).css('border-bottom', 'blue solid 3px');
    }
    if(index < 17){//Top borders
      $(value).css('border-top', 'blue solid 3px');
    }
    if((index - 1) % 16 === 0){//Left borders.
      $(value).css('border-left', 'blue solid 3px');
    }
  });

  //=========make button element=========
  const charArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E'];

  for (let i = 0; i < charArray.length; i++) {
    $('#button-board').append('<button type="button" class="btn btn-default game-inputs">' + charArray[i] + '</button>')
  }

  $('#button-board .game-inputs').wrapAll('<div class="btn-group" role="group"></div>')

});
