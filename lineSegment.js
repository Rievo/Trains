function LineSegment(s, t){
	this.source = s;
	this.target = t;
}


LineSegment.prototype.display = function(){
	stroke(200, 100, 200);
	line(this.source.pos.x, this.source.pos.y, this.target.pos.x, this.target.pos.y);
}