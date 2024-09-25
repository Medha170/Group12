var Knight = function(config){
    this.type = 'knight';
    this.constructor(config);
};



Knight.prototype = new Piece({});
Knight.prototype.moveTo = function(targetPosition){    
    if (this.turn === 'white' && this.color === 'white' || this.turn === 'black' && this.color === 'black') {
        if(this.isValidPosition(targetPosition)){
            this.position = targetPosition.col + targetPosition.row;
            this.render();
        }else{
            //NOOP
        }
    }

    this.turn = this.turn === 'white' ? 'black' : 'white';
    
}