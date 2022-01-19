export interface TileModel {
    x: number,
    y: number,
    revealed: boolean,
    flag: boolean,
    bomb: boolean,
    number?: number
}

export class MineSweeper {
    rows: number = 0;
    columns: number = 0;
    bombs: number = 0;
    gameStarted: Date | null = null;
    gameEnded: Date | null = null;
    tiles: TileModel[][] = [];
    won: boolean = false;
    onGameWon: () => void;
    onGameLost: () => void;

    constructor(rows: number, columns: number, bombs: number, onGameWon: () => void, onGameLost: () => void) {
        if (bombs >= rows * columns) throw new Error("Impossible to create a playable game");
        this.rows = rows;
        this.columns = columns;
        this.bombs = bombs;
        this.initTiles(rows, columns);
        this.onGameWon = onGameWon;
        this.onGameLost = onGameLost
    }

    public getTile(x: number, y: number): TileModel {
        return this.tiles[y][x];
    }

    public reveal(x: number, y: number) {
        if (!this.gameStarted) this.start(x, y);
        if (this.gameEnded) return;

        const tile = this.getTile(x, y);
        if (tile.bomb) {
            this.endGame();
        }

        if (!tile.number) {
            tile.revealed = true;
            tile.flag = false;
            this.revealSurrounding(x, y)
        }

        this.updateTile({ ...tile, revealed: true })
        this.checkWinState();
    }

    public addFlag(x: number, y: number) {
        if (!this.gameStarted) return;
        const tile = this.getTile(x, y);
        this.updateTile({ ...tile, flag: true })
    }

    public removeFlag(x: number, y: number) {
        if (!this.gameStarted) return;
        const tile = this.getTile(x, y);
        this.updateTile({ ...tile, flag: false })
    }

    private initTiles(rows: number, columns: number) {
        const matrix: TileModel[][] = [];
        for (let y = 0; y < rows; y++) {
            const matrixX: TileModel[] = [];
            for (let x = 0; x < columns; x++) {
                matrixX.push({
                    x: x,
                    y: y,
                    flag: false,
                    bomb: false,
                    revealed: false
                });
            }
            matrix.push(matrixX);
        }
        this.tiles = matrix;
    }

    private start(firstClickX: number, firstClickY: number) {
        this.gameStarted = new Date();
        this.generateBombs(firstClickX, firstClickY);
        this.numberFields();
        if (this.bombs === 0) {
            this.revealAll();
            this.checkWinState();
        }
    }

    private generateBombs(firstClickX: number, firstClickY: number) {
        for (let i = 0; i < this.bombs; i++) {
            let bombSpawned = false;
            while (!bombSpawned) {
                const randomX = Math.round(Math.random() * (this.columns - 1));
                const randomY = Math.round(Math.random() * (this.rows - 1));
                const tile = this.getTile(randomX, randomY);
                if (((randomX >= firstClickX - 1) && (randomX <= firstClickX + 1)) && ((randomY >= firstClickY - 1) && (randomY <= firstClickY + 1))) continue;
                if (!tile.bomb) {
                    tile.bomb = true;
                    bombSpawned = true;
                }
            }
        }
        this.tiles = this.getTilesDeepCopy();
    }

    private numberFields() {
        for (let py = 0; py < this.rows; py++) {
            for (let px = 0; px < this.columns; px++) {
                const tile = this.getTile(px, py);
                const surroundingPoints = this.getSurrounding(tile.x, tile.y);
                let bombsSurrounding = 0;
                surroundingPoints.forEach((point) => point.bomb ? bombsSurrounding += 1 : null);
                this.updateTile({
                    ...tile,
                    number: bombsSurrounding > 0 ? bombsSurrounding : undefined
                });
            }
        }
        this.tiles = this.getTilesDeepCopy();
    }

    private revealSurrounding(x: number, y: number) {
        const surroundingPoints = this.getSurrounding(x, y);
        surroundingPoints.forEach((point) => {
            if (!point.revealed) this.reveal(point.x, point.y);
        });
    }

    private getSurrounding(x: number, y: number): TileModel[] {
        const surroundingPoints: TileModel[] = [];
        for (let py = y - 1; py <= y + 1; ++py) {
            for (let px = x - 1; px <= x + 1; ++px) {
                if (py === y && px === x) continue;
                if (px >= 0 && py >= 0 && px < this.columns && py < this.rows) {
                    // console.log(py, px);
                    surroundingPoints.push(this.getTile(px, py));
                }
            }
        }
        return surroundingPoints;
    }

    private revealBombs() {
        for (let py = 0; py < this.rows; py++) {
            for (let px = 0; px < this.columns; px++) {
                const tile = this.getTile(px, py);
                if (tile.bomb) {
                    this.updateTile({
                        ...tile,
                        revealed: true,
                        flag: false
                    });
                }
            }
        }
    }

    private revealAll() {
        for (let py = 0; py < this.rows; py++) {
            for (let px = 0; px < this.columns; px++) {
                const tile = this.getTile(px, py);
                this.updateTile({
                    ...tile,
                    revealed: true
                });
            }
        }
    }

    private updateTile(tile: TileModel) {
        const updatedTiles = this.getTilesDeepCopy();
        updatedTiles[tile.y][tile.x] = tile;
        this.tiles = updatedTiles;
    }

    private getTilesDeepCopy() {
        const matrix: TileModel[][] = [];
        for (let y = 0; y < this.rows; y++) {
            const matrixX: TileModel[] = [];
            for (let x = 0; x < this.columns; x++) {
                matrixX.push(this.tiles[y][x]);
            }
            matrix.push(matrixX);
        }
        return matrix;
    }

    private checkWinState() {
        let totalRevealed = 0
        for (let py = 0; py < this.rows; py++) {
            for (let px = 0; px < this.columns; px++) {
                const tile = this.getTile(px, py);
                if (tile.revealed) totalRevealed += 1;
            }
        }
        if (this.columns * this.rows - totalRevealed === this.bombs) {
            this.won = true;
            this.endGame();
        }
    }

    private endGame() {
        this.gameEnded = new Date();
        if (this.won) {
            this.onGameWon();
        }
        else {
            this.revealBombs();
            this.onGameLost();
        }
    }
}