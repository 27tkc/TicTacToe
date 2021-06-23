var ticTacToe = angular.module("ticTacToe", []);

ticTacToe.controller("mainController", function ($scope) {
  $scope.playgame = function () {
    $("#myModalW").modal("hide");
  };

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
    $scope["col" + x] = false;
      $scope["row" + x] = false;
      $scope["diag" + x] = false;
  }
 
  $scope.box = ["", "", "", "", "", "", "", "", ""];
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
        if (x == 0 && y == 0) $scope.box[0] = marker;
        else if (x == 0 && y == 1) $scope.box[1] = marker;
        else if (x == 0 && y == 2) $scope.box[2] = marker;
        else if (x == 1 && y == 0) $scope.box[3] = marker;
        else if (x == 1 && y == 1) $scope.box[4] = marker;
        else if (x == 1 && y == 2) $scope.box[5] = marker;
        else if (x == 2 && y == 0) $scope.box[6] = marker;
        else if (x == 2 && y == 1) $scope.box[7] = marker;
        else if (x == 2 && y == 2) $scope.box[8] = marker;
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
    if (checkRowColumn(x, y, "row")) {
      $scope["row" + x] = true;
      return true;
    }
    if (checkRowColumn(x, y, "column")) {
      $scope["col" + y] = true;
      return true;
    } 
    else if (checkDiagnols()) {
      return true;
    } 
    else {
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
      var temp=false;
      var diag="";
    if (
      $scope.board[0][0] === marker &&
      $scope.board[1][1] === marker &&
      $scope.board[2][2] === marker
    ) {
      $scope.diag1=true;
      diag="left";
      temp=true; 
    }
    else if (
      $scope.board[0][2] === marker &&
      $scope.board[1][1] === marker &&
      $scope.board[2][0] === marker
    ) {
  
      $scope.diag2=true;
          diag="right";
          temp=true;
    }
    else{
      temp=false;
    }
   
    return temp;
  }
  //Reset the game
  $scope.reset = function () {
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        $scope.board[x][y] = "";
        duplicate[x][y] = "";
        $scope["col" + x] = false;
        $scope["row" + x] = false;
        $scope["diag" + x] = false;
      }
    }
    marker = "O";
    $scope.won = "";
    moveCount["X"] = 0;
    moveCount["O"] = 0;

    for (var i = 0; i < 9; i++) {
      $scope.box[i] = "";
    }
    

   
    // $("td").css("background-color", "transparent");
  };
});
