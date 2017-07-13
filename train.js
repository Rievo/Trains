
//-------------------
//Train class
//-------------------

function Train(line){
	this.pos = createVector(line.source.pos.x, line.source.pos.y);
	
	this.line = line;
	
	this.speed = random();
	
	this.fromStoT = true;
	
	this.selected = false;
	
	this.size = 10;
	this.bigSize = 15;
	
	this.id = "";
}

Train.prototype.setId = function(identifier){
	this.id = identifier;
}

Train.prototype.update = function(deltaTime){
	
	var vector;
	
	if(this.fromStoT == true){
		vector = p5.Vector.sub(this.line.target.pos, this.line.source.pos);
		
	}else{
		vector = p5.Vector.sub(this.line.source.pos, this.line.target.pos);
	}
	
	//this.pos.x = this.pos.x +1;
	vector.normalize();
	vector.mult(this.speed);
	
	this.pos.add(vector);
	
	
	//Check if end of Line
	if(this.fromStoT == true){ //Check if my position is at the line target
		var dist = p5.Vector.dist(this.pos, this.line.target.pos);
		if(dist <= 5){
			this.fromStoT = false;
		}
	}else{	//Check if my position is at the line source
		var dist = p5.Vector.dist(this.pos, this.line.source.pos);
		if(dist <= 5){
			this.fromStoT = true;
		}
	}
}

Train.prototype.display = function(){

	if(this.selected == false){
		fill(150,212,150);
		ellipse(this.pos.x, this.pos.y, this.size,this.size);
	}else{
		fill(150,187,212);
		ellipse(this.pos.x, this.pos.y, this.bigSize, this.bigSize);
	}
	
	if(this.selected == true){ //Show the info for this train
		fill(230);
		rect(this.pos.x - panelW/2, 
			this.pos.y - this.bigSize/2 - panelH , 
			panelW, 
			panelH);
			stroke(10);
			fill(10);
			text(this.id, this.pos.x - panelW/4, this.pos.y - this.bigSize/2 );
	}
}

Train.prototype.mouseIn = function(){

	mouse.x = mouseX;
	mouse.y = mouseY;

	var dist = p5.Vector.dist(this.pos, mouse);
	
	if(dist <= this.bigSize){
		return true;
	}else{
		return false;
	}
	/*
	if(mouseX > this.pos.x && 
		mouseX < this.pos.x + this.bigSize &&
		mouseY > this.pos.y &&
		mouseY < this.pos.y + this.bigSize){
			return true;
	}else{
			return false
	}*/

}


