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
  }
  $scope.boxOne='';
  $scope.boxTwo='';
  $scope.boxThree='';
  $scope.boxFour='';
  $scope.boxFive='';
  $scope.boxSix='';
  $scope.boxSeven='';
  $scope.boxEight='';
  $scope.boxNine='';
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
        if (x == 0 && y == 0) $scope.boxOne = marker;
        else if (x == 0 && y == 1) $scope.boxTwo = marker;
        else if (x == 0 && y == 2) $scope.boxThree = marker;
        else if (x == 1 && y == 0) $scope.boxFour = marker;
        else if (x == 1 && y == 1) $scope.boxFive = marker;
        else if (x == 1 && y == 2) $scope.boxSix = marker;
        else if (x == 2 && y == 0) $scope.boxSeven = marker;
        else if (x == 2 && y == 1) $scope.boxEight = marker;
        else if (x == 2 && y == 2) $scope.boxNine = marker;
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
    // console.log($scope.boxOne);
    // console.log($scope.boxTwo);
    // console.log($scope.boxThree);
  };

  function checkForWin(x, y) {
    if (checkRowColumn(x, y)) {
      return true;
    }
     else if (checkDiagnols()) {
      return true;
    } else {
      return false;
    }
  }

  function checkRowColumn(x, y) {
    if (
      $scope.board[0][0] === marker &&
      $scope.board[0][1] === marker &&
      $scope.board[0][2] === marker
    ){
      $("#box1").css("background-color", "#b3ffb3");
      $("#box2").css("background-color", "#b3ffb3");
      $("#box3").css("background-color", "#b3ffb3");
    return true;
    }
    if (
      $scope.board[1][0] === marker &&
      $scope.board[1][1] === marker &&
      $scope.board[1][2] === marker
    )
    {
      $("#box4").css("background-color", "#b3ffb3");
      $("#box5").css("background-color", "#b3ffb3");
      $("#box6").css("background-color", "#b3ffb3");
    return true;
    }
    if (
      $scope.board[2][0] === marker &&
      $scope.board[2][1] === marker &&
      $scope.board[2][2] === marker
    )
    {
      $("#box7").css("background-color", "#b3ffb3");
      $("#box8").css("background-color", "#b3ffb3");
      $("#box9").css("background-color", "#b3ffb3");
    return true;
    }
    if (
      $scope.board[0][0] === marker &&
      $scope.board[1][0] === marker &&
      $scope.board[2][0] === marker
    )
    {
      $("#box1").css("background-color", "#b3ffb3");
      $("#box4").css("background-color", "#b3ffb3");
      $("#box7").css("background-color", "#b3ffb3");
    return true;
    }
    if (
      $scope.board[0][1] === marker &&
      $scope.board[1][1] === marker &&
      $scope.board[2][1] === marker
    )
    {
      $("#box2").css("background-color", "#b3ffb3");
      $("#box5").css("background-color", "#b3ffb3");
      $("#box8").css("background-color", "#b3ffb3");
    return true;
    }
    if (
      $scope.board[0][2] === marker &&
      $scope.board[1][2] === marker &&
      $scope.board[2][2] === marker
    )
    {
      $("#box3").css("background-color", "#b3ffb3");
      $("#box6").css("background-color", "#b3ffb3");
      $("#box9").css("background-color", "#b3ffb3");
    return true;
    }

    return false;
  }

  function checkDiagnols() {
    if (
      $scope.board[0][0] === marker &&
      $scope.board[1][1] === marker &&
      $scope.board[2][2] === marker
    ) {
      $("#box1").css("background-color", "#b3ffb3");
      $("#box5").css("background-color", "#b3ffb3");
      $("#box9").css("background-color", "#b3ffb3");
      return true;
    }
    if (
      $scope.board[0][2] === marker &&
      $scope.board[1][1] === marker &&
      $scope.board[2][0] === marker
    ) {
      $("#box3").css("background-color", "#b3ffb3");
      $("#box5").css("background-color", "#b3ffb3");
      $("#box7").css("background-color", "#b3ffb3");
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

    $scope.boxOne='';
    $scope.boxTwo='';
    $scope.boxThree='';
    $scope.boxFour='';
    $scope.boxFive='';
    $scope.boxSix='';
    $scope.boxSeven='';
    $scope.boxEight='';
    $scope.boxNine='';
    $("#box1").css("background-color", "transparent");
      $("#box2").css("background-color", "transparent");
      $("#box3").css("background-color", "transparent");
      $("#box4").css("background-color", "transparent");
      $("#box5").css("background-color", "transparent");
      $("#box6").css("background-color", "transparent");
      $("#box7").css("background-color", "transparent");
      $("#box8").css("background-color", "transparent");
      $("#box9").css("background-color", "transparent");
  };
});
