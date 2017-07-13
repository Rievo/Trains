
//-------------------
//Line class
//-------------------

/*
A line has multiple segment limits.
It has a initial station and a final station
*/

function Line(initialStation, finalStation){
	this.segments = [];

	this.color = new Color(255, 0, 0);


	this.start = initialStation;
	this.end = finalStation;
}


Line.prototype.display = function(){

	this.color.setStroke();

	for(var i = 0; i < this.segments.length; i++){
		var s = this.segments[i];
		s.display();
	}
}


Line.prototype.addSegment = function(s){
	this.segments.push(s);
	s.parent = this;
}


Line.prototype.addTrain = function(t){
	t.currentSegment = this.segments[0];
}


Line.prototype.attachToNextSegment = function(t){

	console.log("attach to next segment");

	if(t.fromStoT == true && t.currentSegment == this.segments[this.segments.length -1]){ //End of the line
		console.log("END OF LINE");
		t.fromStoT = false;
	} else if(t.fromStoT == false && t.currentSegment == this.segments[0]){
		t.fromStoT = true;
		console.log("Start OF LINE");
	}else{

		//Get the index for this segment
		var nextIndex;

		if(t.fromStoT == true){
			nextIndex  = this.getIndexForSegment(t.currentSegment) + 1;
		}else{
			nextIndex  = this.getIndexForSegment(t.currentSegment) - 1;
		}

		
		console.log("nextIndex", nextIndex)
		t.currentSegment = this.segments[nextIndex];
	}

	/*if(t.currentSegment == this.segments[this.segments.length -1]){ //End of the line
		t.fromStoT = !t.fromStoT;
	}else{

	}*/
}

Line.prototype.getIndexForSegment = function(s){
	for(var i = 0; i< this.segments.length; i++){
		if(this.segments[i] == s){
			return i;
		}
	}
	return -1;
}