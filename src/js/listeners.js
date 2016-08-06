$(document).on('ready', function() {
  console.log('listeners.css!');

  //=========Listeners=========
  //game cells start square
  var $gameCells = $('#game-board .game-cell');
  var height1 = $gameCells.width();
  $gameCells.css({height: height1 + 'px'});

  //prevents all characters other than hexadecimal characters from being placed in boxes and changes all inputs to upper case.  Fear the dreaded regex!  *Refactor with only charcodes?
  $gameCells.on('keypress', function(event) {
    var keyPressEvent = String.fromCharCode(event.which);
    if (null !== keyPressEvent.match(/[g-z]/g) || null !== keyPressEvent.match(/[G-Z]/g)) {
      event.preventDefault();
    }
    else if (null !== keyPressEvent.match(/[a-f]/g)) {
      event.preventDefault();
      $(this).val($(this).val() + keyPressEvent.toUpperCase());
    }
  });

  //On button press puts text value of button on selected game board
  $('#button-board .game-inputs').on('mousedown', function(event) {
    event.preventDefault();
    $(document.activeElement).val($(this)[0].textContent);
    console.log(document.activeElement);
  });

  $(window).resize(function() {//make game-cells square on resize
    var height2 = $gameCells.width();
    $gameCells.css({height: height2 +  'px'});
  });

  //On arrow press the user can traverse the game board, skipping over disabled squares
  $(document).keydown(function(event) {
    var $gameCellWithFocus = $('#game-board .game-cell:focus');

    if (event.keyCode === 37) {
      $gameCellWithFocus.prevUntil($(this), '.game-cell:not(:disabled):first').focus();
    }
    if (event.keyCode === 39) {
      $gameCellWithFocus.nextUntil($(this), '.game-cell:not(:disabled):first').focus();
    }
    if (event.keyCode === 38) {
      var columnClassUp = $gameCellWithFocus.attr('class').split(' ').pop();
      $gameCellWithFocus.prevUntil($(this), '.' + columnClassUp + ':not(:disabled):first').focus();
    }
    if (event.keyCode === 40) {
      var columnClassDown = $gameCellWithFocus.attr('class').split(' ').pop();
      $gameCellWithFocus.nextUntil($(this), '.' + columnClassDown + ':not(:disabled):first').focus();
    }
  });
});
