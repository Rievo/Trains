function Color(r,g,b){
	this.r = r;
	this.g = g;
	this.b = b;
}


Color.prototype.setFill = function(){
	fill(this.r, this.g, this.b);
}


Color.prototype.setStroke = function(){
	stroke(this.r, this.g, this.b);
}