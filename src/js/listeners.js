$(document).on('ready', function() {
  console.log('listeners.css!');

  //=========Listeners=========

  var height1 = $('#game-board .game-cell').width();
  $('#game-board .game-cell').css({height: height1 + 'px'});

  $('#game-board .game-cell').on('keypress', function(event) {//prevents all characters other than hexadecimal characters from being placed in boxes and changes all inputs to upper case.  Fear the dreaded regex!  *Refactor with only charcodes?

    if (null !== String.fromCharCode(event.which).match(/[g-z]/g) || null !== String.fromCharCode(event.which).match(/[G-Z]/g)) {
      event.preventDefault();
    }
    else if (null !== String.fromCharCode(event.which).match(/[a-f]/g)) {
      event.preventDefault();
      $(this).val($(this).val() + String.fromCharCode(event.which).toUpperCase());
    }
  });

  //On button press puts text value of button on selected game board
  $('#button-board .game-inputs').on('mousedown', function(event) {
    event.preventDefault();
    $(document.activeElement).val($(this)[0].textContent);
  });

  $(window).resize(function() {//make game-cells square
    var height2 = $('#game-board  .game-cell').width();
    $('#game-board  .game-cell').css({height: height2 +  'px'});
  });
});
