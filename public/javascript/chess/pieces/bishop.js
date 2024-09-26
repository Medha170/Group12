var Bishop = function(config){
    this.type = 'bishop';
    this.constructor(config);
};

Bishop.prototype = new Piece({});

Bishop.prototype.moveTo = function(targetPosition) {    
    // Check if the turn matches the bishop's color
    if ((this.board.turn === 'white' && this.color === 'white') || 
        (this.board.turn === 'black' && this.color === 'black')) {
        
        // Validate the new position
        if (this.isValidPosition(targetPosition)) {
            this.position = targetPosition.col + targetPosition.row; // Update the position
            this.render(); // Render the new position
        } else {
            throw new Error("Invalid Bishop move");
        }
        
        // Change turn
        this.board.turn = this.board.turn === 'white' ? 'black' : 'white';
    } else {
        throw new Error("It's not your turn!");
    }
}

Bishop.prototype.isValidPosition = function(targetPosition) {
    // Convert current position to integer column and row values
    let currentCol = this.position.charCodeAt(0) - 64; // Assuming 'A' = 1
    let currentRow = parseInt(this.position.charAt(1));

    // Convert target position to integer column and row values
    let targetCol = targetPosition.col.charCodeAt(0) - 64; 
    let targetRow = parseInt(targetPosition.row);

    // Check if the move is diagonal (valid for bishop)
    if (Math.abs(targetCol - currentCol) === Math.abs(targetRow - currentRow)) {
        // Determine the direction of movement for both row and column
        let colStep = currentCol > targetCol ? -1 : 1;
        let rowStep = currentRow > targetRow ? -1 : 1;

        // Move step-by-step towards the target, checking each position
        currentCol += colStep;
        currentRow += rowStep;

        while (currentCol !== targetCol && currentRow !== targetRow) {
            // Create position object for the current step in the path
            let position = {
                row: currentRow.toString(),
                col: String.fromCharCode(currentCol + 64)
            };

            // Check if there's any piece in the current position
            let piece = this.board.getPieceAt(position);

            // If a piece is found, the move is blocked and thus invalid
            if (piece) {
                throw new Error("Invalid move: Path is blocked");
            }

            // Continue moving in the same direction
            currentCol += colStep;
            currentRow += rowStep;
        }
        // If no pieces block the path, the move is valid
        return true;
    }

    // If the move is not diagonal, it's invalid for a bishop
    return false;
};

// // Method for capturing another piece
// Bishop.prototype.capture = function(targetPosition) {
//     // Validate the target position
//     if (this.isValidPosition(targetPosition)) {
//         // Get the piece at the target position
//         let targetPiece = this.board.getPieceAt(targetPosition);

//         // Check if there is a piece to capture
//         if (targetPiece && targetPiece.color !== this.color) {
//             // Capture the piece by removing it from the board
//             this.board.removePiece(targetPosition);
//             // Move to the new position
//             this.moveTo(targetPosition);
//         } else {
//             throw new Error("Invalid capture: No opponent's piece to capture");
//         }
//     } else {
//         throw new Error("Invalid move for capture");
//     }
// };