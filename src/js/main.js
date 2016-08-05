// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  for(let j = 0; j < 16; j++){
    $('#game-board').append('<div class="hex-square"><div>')
  }

  for (let i = 0; i < 16; i++) {
    $('#game-board .hex-square' ).append('<input type="text" name="' + i + '" value=""  class="game-cell">');
  }
});
