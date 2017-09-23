
//-------------------
//Line class
//-------------------

/*
A line has multiple segment limits.
It has a initial station and a final station
*/

function Line(){
	this.segments = []; //The segments that conforms this line

	this.color = new Color(255, 0, 0);	//The color of the line


	this.start = undefined;	//The initial station of the line
	this.end = undefined;		//The final station of the line (it may be the same if the line is circular)
}



// Display every segments
Line.prototype.display = function(){

	this.color.setStroke();

	for(var i = 0; i < this.segments.length; i++){
		var s = this.segments[i];
		s.display();
	}
}


//Add a segment line to the array and put this line as its parent
Line.prototype.addSegment = function(s){
	this.segments.push(s);
	s.parent = this;

	//After adding, update the start and end of the line
	this.updateStartAndEnd();
}


//The new start of the line will be at the 0 position of the array
//The new end will be the last element of the array
Line.prototype.updateStartAndEnd = function(s){
	this.start = this.segments[0].source;
	this.end = this.segments[this.segments.length -1].target;
}


//Add a train in this line, by default at the initial segment
Line.prototype.addTrain = function(t){
	t.currentSegment = this.segments[0];
	t.nextStation = this.segments[0].target;
}


//Set a train to look for the next segment
//A train can go from the start line to the end one or in reverse order.
Line.prototype.attachToNextSegment = function(t){	//THE ERROR COULD BE HERE


	//Is the train at the end of the line?
	if(t.fromStoT == true && t.nextStation == this.segments[this.segments.length - 1].target){


		if(this.start == this.end){ //the end and start stations are the same
			

			var nextSegment = this.segments[0];
			t.nextStation = nextSegment.target;
			t.currentSegment = nextSegment;

		}else{
			//It is the end
			t.fromStoT = false;

			//Same segment but the source
			t.nextStation = t.currentSegment.source;
		}


		
		
	}else if(t.fromStoT == false && t.nextStation == this.segments[0].source){

		if(this.start == this.end){ //the end and start stations are the same
			var nextSegment = this.segments[this.segments.length -1];
			t.nextStation = nextSegment.source;
			t.currentSegment = nextSegment;
		}else{
			//It is the beginning
			t.fromStoT = true;

			//Same segment but the target
			t.nextStation = t.currentSegment.target;
		}


		
		
	}else{ //I reached an station that is nor the start not the end

		//Get the line for the current segment
		var index = this.getIndexForSegment(t.currentSegment);

		if(t.fromStoT == true){ //Moving towards the end
			var nextSegment = this.segments[index + 1];
			t.nextStation = nextSegment.target;
			t.currentSegment = nextSegment;

		}else{
			var nextSegment = this.segments[index -1];
			t.nextStation = nextSegment.source
			t.currentSegment = nextSegment;
		}
	}

}


//Returns the index on the array for the segment s, or -1 if it doesn't exists
Line.prototype.getIndexForSegment = function(s){
	for(var i = 0; i< this.segments.length; i++){
		if(this.segments[i] == s){
			return i;
		}
	}
	return -1;
}
