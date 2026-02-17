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
        var cells = document.querySelectorAll(".cell");
        var r = 0, c = 0;
        cells.forEach(function (cell) {
            cell.textContent = gameboard.get(r, c);
            if (c === 2) {
                r++;
                c = 0;
            }
            else {
                c++;
            }
        });
    };
    return displayController;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.gameboard = new GameBoard();
    }
    Game.prototype.colorWinner = function (points) {
        var cells = document.querySelectorAll(".cell");
        cells.forEach(function (cell) {
            for (var i = 0; i < 3; i++) {
                if (cell.dataset.row === undefined || cell.dataset.col === undefined)
                    return;
                if (parseInt(cell.dataset.row) === points[i][0] && parseInt(cell.dataset.col) === points[i][1]) {
                    cell.classList.toggle("win-cell");
                }
            }
        });
    };
    Game.prototype.getAndDisplayWinner = function () {
        for (var i = 0; i < 3; i++) {
            if (this.gameboard.get(i, 0) !== "" && this.gameboard.get(i, 0) === this.gameboard.get(i, 1) && this.gameboard.get(i, 0) === this.gameboard.get(i, 2)) {
                this.colorWinner([[i, 0], [i, 1], [i, 2]]);
                return this.gameboard.get(i, 0);
            }
            else if (this.gameboard.get(0, i) !== "" && this.gameboard.get(0, i) === this.gameboard.get(1, i) && this.gameboard.get(1, i) === this.gameboard.get(2, i)) {
                this.colorWinner([[0, i], [1, i], [2, i]]);
                return this.gameboard.get(0, i);
            }
        }
        if (this.gameboard.get(0, 0) !== "" && this.gameboard.get(0, 0) === this.gameboard.get(1, 1) && this.gameboard.get(0, 0) === this.gameboard.get(2, 2)) {
            this.colorWinner([[0, 0], [1, 1], [2, 2]]);
            return this.gameboard.get(0, 0);
        }
        if (this.gameboard.get(0, 2) !== "" && this.gameboard.get(0, 2) === this.gameboard.get(1, 1) && this.gameboard.get(0, 2) === this.gameboard.get(2, 0)) {
            this.colorWinner([[0, 2], [1, 1], [2, 0]]);
            return this.gameboard.get(0, 2);
        }
        return "";
    };
    Game.prototype.hasEmptyCell = function () {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.gameboard.get(i, j) === "")
                    return true;
            }
        }
        return false;
    };
    Game.prototype.makeMove = function (row, col) {
        if (this.gameboard.get(row, col) !== "")
            return;
        this.gameboard.edit(row, col, this.gameboard.getTurn() % 2 === 0 ? "X" : "O");
        this.gameboard.incTurn();
        displayController.display(this.gameboard);
        if (this.getAndDisplayWinner() !== "") {
            // this.gameboard = new GameBoard();
            // displayController.display(this.gameboard);
        }
        else if (!this.hasEmptyCell()) {
            this.gameboard = new GameBoard();
            displayController.display(this.gameboard);
        }
    };
    return Game;
}());
var game = new Game();
document.querySelectorAll(".cell").forEach(function (cell) {
    cell.addEventListener("click", function (e) {
        if (cell.dataset.row === undefined || cell.dataset.col === undefined)
            return;
        game.makeMove(parseInt(cell.dataset.row), parseInt(cell.dataset.col));
    });
});
