
//-------------------
//Line class
//-------------------

/*
A line has multiple segment limits.
It has a initial station and a final station
*/

function Line(){
	this.segments = [];

	this.color = new Color(255, 0, 0);


	this.start = undefined;
	this.end = undefined;
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

	this.updateStartAndEnd();
}


Line.prototype.updateStartAndEnd = function(s){
	this.start = this.segments[0].source;
	this.end = this.segments[this.segments.length -1].target;
}


Line.prototype.addTrain = function(t){
	t.currentSegment = this.segments[0];
}


Line.prototype.attachToNextSegment = function(t){


	if(t.fromStoT == true && t.currentSegment == this.segments[this.segments.length -1]){ //End of the line
		t.fromStoT = false;
	} else if(t.fromStoT == false && t.currentSegment == this.segments[0]){
		t.fromStoT = true;
	}else{

		//Get the index for this segment
		var nextIndex;

		if(t.fromStoT == true){
			nextIndex  = this.getIndexForSegment(t.currentSegment) + 1;
		}else{
			nextIndex  = this.getIndexForSegment(t.currentSegment) - 1;
		}

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