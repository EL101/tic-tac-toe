"use strict";
var _a;
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
        this.won = false;
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
    Game.prototype.colorTie = function () {
        var cells = document.querySelectorAll(".cell");
        cells.forEach(function (cell) {
            cell.classList.toggle("tie-cell");
        });
    };
    Game.prototype.resetCells = function () {
        var cells = document.querySelectorAll(".cell");
        cells.forEach(function (cell) {
            if (cell.classList.contains("win-cell")) {
                cell.classList.toggle("win-cell");
            }
            else if (cell.classList.contains("tie-cell")) {
                cell.classList.toggle("tie-cell");
            }
        });
    };
    Game.prototype.getWinner = function () {
        for (var i = 0; i < 3; i++) {
            if (this.gameboard.get(i, 0) !== "" && this.gameboard.get(i, 0) === this.gameboard.get(i, 1) && this.gameboard.get(i, 0) === this.gameboard.get(i, 2)) {
                return { player: this.gameboard.get(i, 0), coords: [[i, 0], [i, 1], [i, 2]] };
            }
            else if (this.gameboard.get(0, i) !== "" && this.gameboard.get(0, i) === this.gameboard.get(1, i) && this.gameboard.get(1, i) === this.gameboard.get(2, i)) {
                return { player: this.gameboard.get(0, i), coords: [[0, i], [1, i], [2, i]] };
            }
        }
        if (this.gameboard.get(0, 0) !== "" && this.gameboard.get(0, 0) === this.gameboard.get(1, 1) && this.gameboard.get(0, 0) === this.gameboard.get(2, 2)) {
            return { player: this.gameboard.get(0, 0), coords: [[0, 0], [1, 1], [2, 2]] };
        }
        if (this.gameboard.get(0, 2) !== "" && this.gameboard.get(0, 2) === this.gameboard.get(1, 1) && this.gameboard.get(0, 2) === this.gameboard.get(2, 0)) {
            return { player: this.gameboard.get(0, 2), coords: [[0, 2], [1, 1], [2, 0]] };
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
    Game.prototype.updateScoreBoard = function (section) {
        console.log(section);
        var scoreChange, numStart;
        switch (section) {
            case "X":
                scoreChange = document.querySelector(".x-score");
                numStart = 3;
                break;
            case "O":
                scoreChange = document.querySelector(".o-score");
                numStart = 3;
                break;
            case "Tie":
                scoreChange = document.querySelector(".tie-score");
                numStart = 5;
                break;
        }
        if (scoreChange !== null && scoreChange !== undefined) {
            var score = parseInt(scoreChange.textContent.slice(numStart));
            scoreChange.textContent = scoreChange.textContent.slice(0, numStart) + (score + 1);
        }
    };
    Game.prototype.reset = function () {
        this.gameboard = new GameBoard();
        this.won = false;
        this.resetCells();
        displayController.display(this.gameboard);
    };
    Game.prototype.makeMove = function (row, col) {
        if (this.gameboard.get(row, col) !== "" || this.won)
            return;
        this.gameboard.edit(row, col, this.gameboard.getTurn() % 2 === 0 ? "X" : "O");
        this.gameboard.incTurn();
        displayController.display(this.gameboard);
        var turnDisplay = document.querySelector(".turn-display");
        if (turnDisplay !== null) {
            turnDisplay.textContent = (this.gameboard.getTurn() % 2 === 0 ? "X" : "O") + "'s Turn";
        }
        var winner = this.getWinner();
        if (winner !== "") {
            this.colorWinner(winner.coords);
            this.won = true;
            if (turnDisplay !== null)
                turnDisplay.textContent = winner.player + " Won!";
            this.updateScoreBoard(winner.player);
        }
        else if (!this.hasEmptyCell()) {
            this.colorTie();
            this.updateScoreBoard("Tie");
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
(_a = document.querySelector(".restart")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
    game.reset();
});
