//Objects for finder
function RowObject(rowNumber) {
  this.values = $('.row' + rowNumber);
}

function ColumnObject(columnNumber) {
  this.values =  $('.column' + columnNumber);
}

function InnerGridObject(gridNumber) {
  this.values = $('.grid' + gridNumber);
}

function CellObject(row, column, innerGrid) {
  var totalInfoSpace = $.merge([], row.values);
  totalInfoSpace = $.merge(totalInfoSpace, column.values);
  totalInfoSpace = $.merge(totalInfoSpace, innerGrid.values);
  totalInfoSpace = $.merge([], totalInfoSpace);
  totalInfoSpace = totalInfoSpace.filter(onlyUnique);
  this.values = totalInfoSpace;
}

function GameBoard(){
  this.values = $('.game-cell');
}
