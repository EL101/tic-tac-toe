class GameBoard {
    private board : string[][];
    private turn : number;
    public constructor() {
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
        this.turn = 0;
    }
    public incTurn() {
        this.turn++;
    }
    public getTurn() {
        return this.turn;
    }
    public get(row : number, col : number) {
        return this.board[row][col];
    }
    public edit(row: number, col: number, move: "X" | "O") {
        this.board[row][col] = move;
    }

}

class displayController {
    public static display(gameboard : GameBoard) {
        let cells = document.querySelectorAll<HTMLDivElement>(".cell");
        let r = 0, c = 0;
        cells.forEach(cell => {
            cell.textContent = gameboard.get(r, c);
            if (c === 2) {
                r++; c = 0;
            } else {
                c++;
            }
        });
    }
}

class Game {
    private gameboard: GameBoard;
    private won: boolean;
    public constructor() {
        this.gameboard = new GameBoard();
        this.won = false;
    }
    private colorWinner(points: number[][]) {
        let cells = document.querySelectorAll<HTMLDivElement>(".cell");
        cells.forEach(cell => {
            for (let i = 0; i < 3; i++) {
                if (cell.dataset.row === undefined || cell.dataset.col === undefined) return;
                if (parseInt(cell.dataset.row) === points[i][0] && parseInt(cell.dataset.col) === points[i][1]) {
                    cell.classList.toggle("win-cell");
                }
            }
        });
    }
    private colorTie() {
        let cells = document.querySelectorAll<HTMLDivElement>(".cell");
        cells.forEach(cell => {
            cell.classList.toggle("tie-cell");
        });
    }
    private resetCells() {
        let cells = document.querySelectorAll<HTMLDivElement>(".cell");
        cells.forEach(cell => {
            if (cell.classList.contains("win-cell")) {
                cell.classList.toggle("win-cell");
            } else if (cell.classList.contains("tie-cell")) {
                cell.classList.toggle("tie-cell");
            }
        });
    }
    private getWinner() : {player: string, coords: number[][]} | "" {
        for (let i = 0; i < 3; i++) {
            if (this.gameboard.get(i, 0) !== "" && this.gameboard.get(i, 0) === this.gameboard.get(i, 1) && this.gameboard.get(i, 0) === this.gameboard.get(i, 2)) {
                return {player: this.gameboard.get(i, 0), coords: [[i, 0], [i, 1], [i, 2]]};
            } else if (this.gameboard.get(0, i) !== "" && this.gameboard.get(0, i) === this.gameboard.get(1, i) && this.gameboard.get(1, i) === this.gameboard.get(2, i)) {
                return {player: this.gameboard.get(0, i), coords: [[0, i], [1, i], [2, i]]};
            }
        }
        if (this.gameboard.get(0, 0) !== "" && this.gameboard.get(0, 0) === this.gameboard.get(1, 1) && this.gameboard.get(0, 0) === this.gameboard.get(2, 2)) {
            return {player: this.gameboard.get(0, 0), coords: [[0, 0], [1, 1], [2, 2]]};
        }
        if (this.gameboard.get(0, 2) !== "" && this.gameboard.get(0, 2) === this.gameboard.get(1, 1) && this.gameboard.get(0, 2) === this.gameboard.get(2, 0)) {
            return {player: this.gameboard.get(0, 2), coords: [[0, 2], [1, 1], [2, 0]]};
        }
        return "";
    }
    private hasEmptyCell() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.gameboard.get(i, j) === "") return true;
            }
        }
        return false;
    }
    private updateScoreBoard(section: string) {
        console.log(section);
        let scoreChange, numStart;
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
            let score = parseInt(scoreChange.textContent.slice(numStart));
            scoreChange.textContent = scoreChange.textContent.slice(0, numStart) + (score + 1);
        }
    }
    public reset() {
        this.gameboard = new GameBoard();
        this.won = false;
        this.resetCells();
        displayController.display(this.gameboard);
    }
    public makeMove(row : number, col : number) {
        if (this.gameboard.get(row, col) !== "" || this.won) return;
        this.gameboard.edit(row, col, this.gameboard.getTurn() % 2 === 0 ? "X" : "O");
        this.gameboard.incTurn();
        displayController.display(this.gameboard);
        let turnDisplay = document.querySelector(".turn-display");
        if (turnDisplay !== null) {
            turnDisplay.textContent = (this.gameboard.getTurn() % 2 === 0 ? "X" : "O") + "'s Turn";
        }
        let winner = this.getWinner();
        if (winner !== "") {
            this.colorWinner(winner.coords);
            this.won = true;
            if (turnDisplay !== null) turnDisplay.textContent = winner.player + " Won!";
            this.updateScoreBoard(winner.player);
        } else if (!this.hasEmptyCell()) {
            this.colorTie();
            this.updateScoreBoard("Tie");
        }
    }
}

let game = new Game();
document.querySelectorAll<HTMLDivElement>(".cell").forEach(cell => {
    cell.addEventListener("click", e => {
        if (cell.dataset.row === undefined || cell.dataset.col === undefined) return;
        game.makeMove(parseInt(cell.dataset.row), parseInt(cell.dataset.col));
    });
});

document.querySelector<HTMLDivElement>(".restart")?.addEventListener("click", e => {
    game.reset();
});