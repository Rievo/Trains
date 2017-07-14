
//-------------------
// Station class
//-------------------

function Station(x,y){
	this.pos = createVector(x,y);
	this.size = 15;
}


Station.prototype.display = function(){
	fill(200);
	stroke(0);
	ellipse(this.pos.x, this.pos.y, this.size, this.size);
}


Station.prototype.mouseIn = function(){

	mouse.x = mouseX;
	mouse.y = mouseY;

	var dist = p5.Vector.dist(this.pos, mouse);
	
	if(dist <= this.size){
		return true;
	}else{
		return false;
	}


}
