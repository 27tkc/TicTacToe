var ticTacToe = angular.module("ticTacToe", []);

ticTacToe.controller("mainController", function ($scope) {
$scope.playgame = function()
{
  $('#myModalW').modal('hide');
}

  let duplicate = [];
  $scope.board = [];
  $scope.won = "";
  $scope.letter = "";
  var marker = "O";
  var moveCount = {};

  moveCount["X"] = 0;
  moveCount["O"] = 0;

  for (var x = 0; x < 3; x++) {
    $scope.board[x] = [];
    duplicate[x] = [];
  }

  $scope.nextPlay = function (x, y) {
    if ($scope.won === "") {
      if (!duplicate[x][y]) {
        if (marker === "X") {
          marker = "O";
        } else {
          marker = "X";
        }
        $scope.board[x][y] = marker;
        duplicate[x][y] = marker;
        moveCount[marker] += 1;
      }

      if (moveCount[marker] >= 3) {
        if (checkForWin(x, y)) {
          $scope.won = marker;
          $("#myModal").modal("show");
        } else if (moveCount["X"] + moveCount["O"] === 9) {
          $scope.won = "Game is a tie.";
          $("#myModalT").modal("show");
        }
      }
    }
  };

  function checkForWin(x, y) {
    if (checkRowColumn(x, y, "column")) {
      return true;
    } else if (checkRowColumn(x, y, "row")) {
      return true;
    } else if (checkDiagnols()) {
      return true;
    } else {
      return false;
    }
  }

  function checkRowColumn(x, y, check) {
    var flag = "";
    var row = x;
    var column = y;
    for (var i = 0; i < 3; i++) {
      if (check === "row") {
        column = i;
      } else {
        row = i;
      }
      if ($scope.board[row][column] !== marker) {
        flag = false;
      }
    }
    if (flag === "") {
      flag = true;
    }
    return flag;
  }

  function checkDiagnols() {
    if (
      ($scope.board[0][0] === marker &&
        $scope.board[1][1] === marker &&
        $scope.board[2][2] === marker) ||
      ($scope.board[0][2] === marker &&
        $scope.board[1][1] === marker &&
        $scope.board[2][0] === marker)
    ) {
      // console.log($scope.board[0][0], $scope.board[2][2],$scope.board[0][2], $scope.board[2][0]);
      return true;
    }
    return false;
  }
  //Reset the game
  $scope.reset = function () {
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        $scope.board[x][y] = "";
        duplicate[x][y] = "";
      }
    }
    marker = "O";
    $scope.won = "";
    moveCount["X"] = 0;
    moveCount["O"] = 0;
  };
});