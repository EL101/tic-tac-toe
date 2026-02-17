"use strict";
var GameBoard = /** @class */ (function () {
    function GameBoard() {
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        this.turn = 0;
    }
    GameBoard.prototype.incTurn = function () {
        this.turn++;
    };
    GameBoard.prototype.getTurn = function () {
        return this.turn;
    };
    GameBoard.prototype.get = function (row, col) {
        return this.board[row][col];
    };
    GameBoard.prototype.edit = function (row, col, move) {
        this.board[row][col] = move;
    };
    return GameBoard;
}());
var displayController = /** @class */ (function () {
    function displayController() {
    }
    displayController.display = function (gameboard) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                console.log(gameboard.get(i, j));
            }
            console.log("\n");
        }
        console.log("\n");
    };
    return displayController;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.gameboard = new GameBoard();
    }
    Game.prototype.getWinner = function () {
        for (var i = 0; i < 3; i++) {
            if (this.gameboard.get(i, 0) !== "" && this.gameboard.get(i, 0) === this.gameboard.get(i, 1) && this.gameboard.get(i, 0) === this.gameboard.get(i, 2)) {
                return this.gameboard.get(i, 0);
            }
            else if (this.gameboard.get(0, i) !== "" && this.gameboard.get(0, i) === this.gameboard.get(1, i) && this.gameboard.get(1, i) === this.gameboard.get(2, i)) {
                return this.gameboard.get(0, i);
            }
        }
        if (this.gameboard.get(0, 0) !== "" && this.gameboard.get(0, 0) === this.gameboard.get(1, 1) && this.gameboard.get(0, 0) === this.gameboard.get(2, 2)) {
            return this.gameboard.get(0, 0);
        }
        if (this.gameboard.get(0, 2) !== "" && this.gameboard.get(0, 2) === this.gameboard.get(1, 1) && this.gameboard.get(0, 2) === this.gameboard.get(2, 0)) {
            return this.gameboard.get(0, 2);
        }
        return "";
    };
    Game.prototype.makeMove = function (row, col) {
        this.gameboard.edit(row, col, this.gameboard.getTurn() % 2 === 0 ? "X" : "O");
        this.gameboard.incTurn();
    };
    return Game;
}());
var game = new Game();
