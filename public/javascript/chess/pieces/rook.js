var Rook = function(config){
    this.type = 'rook';
    this.constructor(config);
};



Rook.prototype = new Piece({});
Rook.prototype.moveTo = function(targetPosition){    
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