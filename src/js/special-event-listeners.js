(function() {
  'use strict';
  console.log('special-event-listeners');
  //delete value in cell on delete button push
  $('#button-board .erase-input').on('mousedown', function(event) {
    event.preventDefault();
    var $gameCellWithFocus = $('#game-board .game-cell:focus');
    $gameCellWithFocus.val('');
  });


  $('.verify-input').on('click', function() {

  });
}());
