function LineSegment(s, t){
	this.source = s;
	this.target = t;

	this.parent = undefined;
}


LineSegment.prototype.display = function(){
	this.parent.color.setStroke();
	line(this.source.pos.x, this.source.pos.y, this.target.pos.x, this.target.pos.y);
}