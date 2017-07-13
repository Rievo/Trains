
//-------------------
// Station class
//-------------------

function Station(x,y){
	this.pos = createVector(x,y);
}


Station.prototype.display = function(){
	fill(200);
	stroke(0);
	ellipse(this.pos.x, this.pos.y, 15,15);
}