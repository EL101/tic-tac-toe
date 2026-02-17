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
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                console.log(gameboard.get(i, j));
            }
            console.log("\n")
        }
        console.log("\n")
    }
}

class Game {
    private gameboard : GameBoard;
    public constructor() {
        this.gameboard = new GameBoard();
    }
    public getWinner() {
        for (let i = 0; i < 3; i++) {
            if (this.gameboard.get(i, 0) !== "" && this.gameboard.get(i, 0) === this.gameboard.get(i, 1) && this.gameboard.get(i, 0) === this.gameboard.get(i, 2)) {
                return this.gameboard.get(i, 0);
            } else if (this.gameboard.get(0, i) !== "" && this.gameboard.get(0, i) === this.gameboard.get(1, i) && this.gameboard.get(1, i) === this.gameboard.get(2, i)) {
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
    }
    public makeMove(row : number, col : number) {
        this.gameboard.edit(row, col, this.gameboard.getTurn() % 2 === 0 ? "X" : "O");
        this.gameboard.incTurn();
    }
}

let game = new Game();
