var Knight = function(config) {
    this.type = 'knight';
    this.constructor(config);
};

Knight.prototype = new Piece({});

Knight.prototype.isValidMove = function(newPosition) {
    let currCol = this.position.charAt(0); 
    let currRow = parseInt(this.position.charAt(1)); 
    let newCol = newPosition.col; 
    let newRow = parseInt(newPosition.row); 

    let colDiff = Math.abs(currCol.charCodeAt(0) - newCol.charCodeAt(0));
    let rowDiff = Math.abs(currRow - newRow);

    // Knight moves in "L" shape: 2 in one direction and 1 in another
    if ((colDiff === 2 && rowDiff === 1) || (colDiff === 1 && rowDiff === 2)) {
        return true;
    }
    
    return false;
};

Knight.prototype.isPathClear = function(newPosition) {
    // Knights can jump over pieces, so the path is always clear
    return true;
};

Knight.prototype.moveTo = function(newPosition) {
    if (this.isValidMove(newPosition)) {
        this.position = newPosition.col + newPosition.row;
        this.render();
    } else {
        console.warn("Invalid move for knight");
    }
};