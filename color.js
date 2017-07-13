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


Color.prototype.randomize = function(){
	this.r = Math.floor(random(0,255));
	this.g = Math.floor(random(0,255));
	this.b = Math.floor(random(0,255));
}