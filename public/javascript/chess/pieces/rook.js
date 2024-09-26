var Rook = function (config) {
    this.type = 'rook';
    this.constructor(config);
};

Rook.prototype = new Piece({});

Rook.prototype.isValidPosition = function (targetPosition) {
    let currentCol = this.position.charAt(0); // column as a letter (e.g., 'a')
    let currentRow = parseInt(this.position.charAt(1)); // row as a number (e.g., 1-8)

    let targetCol = targetPosition.col; // column as a letter (e.g., 'b')
    let targetRow = parseInt(targetPosition.row); // row as a number (e.g., 1-8)

    console.log(`Rook is trying to move from ${this.position} to ${targetPosition.col}${targetPosition.row}`);

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

    // If none of the conditions match, it's not a valid move for the Rook
    console.warn("Invalid move for Rook");
    return false;
};

Rook.prototype.isPathClear = function (currentCol, currentRow, targetCol, targetRow, direction) {
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

    console.log("Path is clear");
    return true; // Path is clear
};

Rook.prototype.kill = function(targetPosition) {
    let targetPiece = this.board.getPieceAt(targetPosition);
    if (targetPiece && targetPiece.color !== this.color) {
        console.log(`Killing opponent's ${targetPiece.type} at ${targetPosition.col}${targetPosition.row}`);
        this.board.removePiece(targetPosition);
        return true;
    }
    console.log("No opponent piece to kill or target piece is of the same color");
    return false;
};

Rook.prototype.moveTo = function(targetPosition) {    
    if (this.board.turn === 'white' && this.color === 'white' || this.board.turn === 'black' && this.color === 'black') {
        if (this.isValidPosition(targetPosition)) {
            // Check if there's a piece to kill
            this.kill(targetPosition);
            
            // Move the rook to the target position
            this.position = targetPosition.col + targetPosition.row;
            this.render();
        } else {
            console.warn("Invalid move attempted for Rook");
        }
        
        // Switch turns after a move
        this.board.turn = this.board.turn === 'white' ? 'black' : 'white';
    } else {
        console.warn("It's not your turn!");
    }
};