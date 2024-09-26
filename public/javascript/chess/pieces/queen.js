var Queen = function (config) {
    this.type = 'queen';
    this.constructor(config);
};

Queen.prototype = new Piece({});

Queen.prototype.isValidPosition = function (targetPosition) {
    let currentCol = this.position.charAt(0); // column as a letter (e.g., 'a')
    let currentRow = parseInt(this.position.charAt(1)); // row as a number (e.g., 1-8)

    let targetCol = targetPosition.col; // column as a letter (e.g., 'b')
    let targetRow = parseInt(targetPosition.row); // row as a number (e.g., 1-8)

    console.log(`Queen is trying to move from ${this.position} to ${targetPosition.col}${targetPosition.row}`);

    // Horizontal move (same row, different column)
    if (currentRow === targetRow && currentCol !== targetCol) {
        console.log("Attempting horizontal move");
        return this.isPathClear(currentCol, currentRow, targetCol, targetRow, 'horizontal');
    }

    // Vertical move (same column, different row)
    if (currentCol === targetCol && currentRow !== targetRow) {
        console.log("Attempting vertical move");
        return this.isPathClear(currentCol, currentRow, targetCol, targetRow, 'vertical');
    }

    // Diagonal move (absolute difference between rows and columns must be the same)
    if (Math.abs(currentCol.charCodeAt(0) - targetCol.charCodeAt(0)) === Math.abs(currentRow - targetRow)) {
        console.log("Attempting diagonal move");
        return this.isPathClear(currentCol, currentRow, targetCol, targetRow, 'diagonal');
    }

    // If none of the conditions match, it's not a valid move for the Queen
    console.warn("Invalid move for Queen");
    return false;
};

Queen.prototype.isPathClear = function (currentCol, currentRow, targetCol, targetRow, direction) {
    let startCol = currentCol.charCodeAt(0);
    let endCol = targetCol.charCodeAt(0);

    // Horizontal move
    if (direction === 'horizontal') {
        let colStep = startCol < endCol ? 1 : -1;
        for (let col = startCol + colStep; col !== endCol; col += colStep) {
            let cell = { col: String.fromCharCode(col), row: currentRow };
            console.log(`Checking horizontal path at ${cell.col}${cell.row}`);
            if (this.board.getPieceAt(cell)) {
                console.warn(`Path blocked at ${cell.col}${cell.row}`);
                return false; // Path is blocked
            }
        }
    }

    // Vertical move
    if (direction === 'vertical') {
        let rowStep = currentRow < targetRow ? 1 : -1;
        for (let row = currentRow + rowStep; row !== targetRow; row += rowStep) {
            let cell = { col: currentCol, row: row };
            console.log(`Checking vertical path at ${cell.col}${cell.row}`);
            if (this.board.getPieceAt(cell)) {
                console.warn(`Path blocked at ${cell.col}${cell.row}`);
                return false; // Path is blocked
            }
        }
    }

    // Diagonal move
    if (direction === 'diagonal') {
        let rowStep = currentRow < targetRow ? 1 : -1;
        let colStep = startCol < endCol ? 1 : -1;
        let row = currentRow + rowStep;
        let col = startCol + colStep;

        while (row !== targetRow && col !== endCol) {
            let cell = { col: String.fromCharCode(col), row: row };
            console.log(`Checking diagonal path at ${cell.col}${cell.row}`);
            if (this.board.getPieceAt(cell)) {
                console.warn(`Path blocked at ${cell.col}${cell.row}`);
                return false; // Path is blocked
            }
            row += rowStep;
            col += colStep;
        }
    }

    console.log("Path is clear");
    return true; // Path is clear
};

Queen.prototype.moveTo = function(targetPosition){    
    if (this.board.turn === 'white' && this.color === 'white' || this.board.turn === 'black' && this.color === 'black') {
        if(this.isValidPosition(targetPosition)){
            this.position = targetPosition.col + targetPosition.row;
            this.render();
        }else{
            //NOOP
        }
    }

    this.board.turn = this.board.turn === 'white' ? 'black' : 'white';
    
}