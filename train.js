
//-------------------
//Train class
//-------------------

function Train(line){
	this.pos = createVector(line.start.pos.x, line.start.pos.y);

	this.line = line;

	//this.speed = random();

	this.speed = 1;

	this.fromStoT = true;

	this.selected = false;

	this.size = 10;
	this.bigSize = 15;

	this.id = "";

	//Maybe remove all the currentSegment stuff
	//I may need instead a desiredPoint (the end or the start of a line)
	this.currentSegment = undefined;

	this.nextStation = undefined; //This will be a station

	line.addTrain(this);


	this.moveState = 0; //0-> Default,  1-> accelerating,  2-> Decelerating

}

Train.prototype.setId = function(identifier){
	this.id = identifier;
}




Train.prototype.move = function(){
	var vel = p5.Vector.sub(this.nextStation.pos, this.pos);
	vel.normalize();
	vel.mult(this.speed);


	//Acceleration

	if(this.moveState == 0){ //No acceleration

	}else if(this.moveState == 1){	//Accelerating

	}else if(this.moveState == 2){	//Decelerating

	}

	this.pos.add(vel);
}
//The basic update algorithm for a train
Train.prototype.update = function(deltaTime){

	//If I'm nowhere, I should not do anything
	if(this.nextStation == undefined){
		console.log("I don't know the next station");
		return;
	}


	//Move towards this.nextStation
	this.move();



	//After moving, we need to check if we reached the destiny point

	var dist =  p5.Vector.dist(this.pos, this.nextStation.pos);

	if(dist <= 2){
		console.log("Station reached");
		//Change state to in station

		
		//Am I at the end of the line?
		this.doInStation();
	}

}


Train.prototype.doInStation = function(){
	this.line.attachToNextSegment(this);
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
