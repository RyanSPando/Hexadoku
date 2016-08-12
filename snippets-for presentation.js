// Arrow navigation

  //   //right arrow
  //  if (event.keyCode === 39) {
  //   event.preventDefault();
  //   $gameCellWithFocus.nextUntil($(this), '.game-cell:not(:disabled):first').focus();
  // }
  // //up arrow
  // else if (event.keyCode === 38) {
  //   event.preventDefault();
  //   var columnClassUp = $gameCellWithFocus.attr('class').split(' ').pop();//grab classes on game cell and put in array.  Column class is the last one so it can be popped.
  //   $gameCellWithFocus.prevUntil($(this), '.' + columnClassUp + ':not(:disabled):first').focus();
  // }

//jQuery address Objects

  // function RowObject(rowNumber) {
  //   this.values = $('.row' + rowNumber);
  // }
  //
  // function ColumnObject(columnNumber) {
  //   this.values =  $('.column' + columnNumber);
  // }
  //
  // function InnerGridObject(gridNumber) {
  //   this.values = $('.grid' + gridNumber);
  // }
  //
  // function CellObject(row, column, innerGrid) {
  //   var totalInfoSpace = $.merge([], row.values);
  //   totalInfoSpace = $.merge(totalInfoSpace, column.values);
  //   totalInfoSpace = $.merge(totalInfoSpace, innerGrid.values);
  //   totalInfoSpace = $.merge([], totalInfoSpace);
  //   totalInfoSpace = totalInfoSpace.filter(onlyUnique);
  //   this.values = totalInfoSpace;
  // }

  //Stringified Game Board

  //makes a copy of the gameboard and puts it into a string for storage on save
    // function generateStringifiedGameBoard(gameBoardObject, stringifiedSolvedPuzzle) {
    //   var stringifiedCurrentGameBoard = '';
    //
    //   currentGameBoard = gameBoardObject.values.each(function(index,value) {
    //     if ($(value).val() === '') {
    //       stringifiedCurrentGameBoard += '*';
    //     }
    //     else if ($(value).attr('disabled')) {
    //       stringifiedCurrentGameBoard += ('-' + stringifiedSolvedPuzzle[index]);
    //     }
    //     else {
    //       stringifiedCurrentGameBoard += $(value).val();
    //     }
    //   });
    //   return stringifiedCurrentGameBoard;
    // }
