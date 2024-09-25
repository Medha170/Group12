var King = function(config){
    this.type = 'king';
    this.constructor(config);
};



King.prototype = new Piece({});
King.prototype.move = function(newPosition){

}

King.prototype.isValidPosition = function(targetPosition){
    // Convert current position to row and column
    let currentCol = this.position.charAt(0); // E.g., 'e'
    let currentRow = parseInt(this.position.charAt(1)); // E.g., 4

    // Calculate the ASCII value of the current column (to handle letter operations)
    let currentColCode = currentCol.charCodeAt(0); // Convert letter to ASCII

    // Kings can move only one square in any direction (including diagonally)
    let rowDifference = Math.abs(targetPosition.row - currentRow);
    let colDifference = Math.abs(targetPosition.col.charCodeAt(0) - currentColCode);

    // A valid king move is within one square in any direction
    if (rowDifference <= 1 && colDifference <= 1) {
        return true;
    }

    // If none of the above conditions are met, the move is invalid
    console.warn("Invalid move for king");
    return false;
}


King.prototype.moveTo = function(targetPosition){    
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