(function() {
  'use strict';

}());
var puzzleSeed =
  [
    ['B',	5, 'E', 'F', 8,	4, 'C', 9, 1,	0, 3, 6, 'A',	7, 2, 'D'],
    [4,	7, 2, 6, 'A',	1, 5, 'D', 'B',	8, 9, 'C', 3,	'E', 0, 'F'],
    ['A',	8, 1, 3, 'E',	0, 6, 2, 5,	'D', 7, 'F', 'B',	4, 9, 'C'],
    ['D',	'C', 0, 9, 'B',	3, 'F', 7, 'E',	'A', 4, 2, 1,	8, 6, 5],
    ['C',	'B', 'A', 'D', 5,	2, 4, 6, 7,	9, 8, 3, 'F',	0, 'E', 1],
    ['F',	1, 8, 'E', 3,	7, 9, 'C', 0,	'B', 'A', 'D', 2,	5, 4, 6],
    [5,	4, 3, 2, 'F',	8, 0, 'A', 6,	'C', 1, 'E', 7,	'B', 'D', 9],
    [6,	0, 9, 7, 1,	'B', 'D', 'E', 2,	'F', 5, 4, 8,	'C', 3, 'A'],
    [2,	3, 'D', 1, 0,	'E', 'B', 'F', 8,	6, 'C', 7, 9,	'A', 5, 4],
    ['E',	6, 'B', 5, 'D',	9, 2, 8, 'A',	4, 0, 1, 'C',	3, 'F', 7],
    [8,	'A', 'F', 0, 7,	'C', 3, 4, 9,	'E', 'D', 5, 6,	1, 'B', 2],
    [7,	9, 'C', 4, 6,	'A', 1, 5, 3,	2, 'F', 'B', 'E',	'D', 8, 0],
    [3,	'F', 6, 'A', 2,	5, 'E', 1, 4,	7, 'B', 0, 'D',	9, 'C', 8],
    [9,	'D', 5, 8, 'C',	6, 7, 0, 'F',	3, 'E', 'A', 4,	2, 1, 'B'],
    [1,	2, 4, 'B', 9,	'D', 'A', 3, 'C',	5, 6, 8, 0,	'F', 7, 'E'],
    [0,	'E', 7, 'C', 4,	'F', 8, 'B', 'D',	1, 2, 9, 5,	6, 'A', 3]
  ];

var rowHeight = 16;
var columnHeight = 16;

function removeCells(puzzleToMask, removeCellNumber) {
  //make a basket to pick values out of
  var pickArray = [];
  for (var i = 0; i < rowHeight * columnHeight; i++) {
    pickArray.push(i);
  }

  for (var j = 0; j < removeCellNumber; j++) {
    //generate a random number that hasn't been picked already
    var toRemoveIndex = Math.floor(Math.random() * pickArray.length);
    var cellNumber = pickArray.splice(toRemoveIndex, 1);
    var puzzleIndexRow = Math.floor(cellNumber / 16);
    var puzzleIndexColumn = cellNumber % 16;
    puzzleToMask[puzzleIndexRow][puzzleIndexColumn] = '';
  }
  return puzzleToMask;
}

console.log(removeCells(puzzleSeed, 200));
