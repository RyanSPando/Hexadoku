$(document).on('ready', function() {

});
//formats solved puzzle to be read by fill game board function
function maskPuzzle(puzzleToMask, puzzleBlanks) {
  //make a basket to pick values out of
  var pickArray = [];
  for (var i = 0; i < rowHeight * columnHeight; i++) {
    pickArray.push(i);
  }
  puzzleToMask = puzzleToMask.split('');

  for (var j = 0; j < puzzleBlanks; j++) {
    //generate a random number that hasn't been picked already
    var toRemoveIndex = Math.floor(Math.random() * pickArray.length);
    var toRemoveIndexNumber = pickArray.splice(toRemoveIndex, 1);
    puzzleToMask[toRemoveIndexNumber] = '*';
  }
  pickArray.forEach(function(knownValue, index) {
    //assign - in front of cell value to be displayed on load
    puzzleToMask[knownValue] = ('-' + puzzleToMask[knownValue]);

  });
  return puzzleToMask.toString().replace(/,/g, '');
}
