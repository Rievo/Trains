var stations = [];
var lines = [];
var trains = [];

var panelH = 20;
var panelW = 20;

var mouse;

var controls = {};


// Creating a new segment variables
var segmentstart;
var segmentend;
var creatingSegment = false;


function setup(){
	createCanvas(500,500);
	textSize(20);
	createTest();
	
	mouse = createVector(0,0);


	createControls();
	
}


function createTest(){

	var s = new Station(100, 200);
	stations.push(s);

	var t = new Station(200, 200);
	stations.push(t);

	var v = new Station(300, 200);
	stations.push(v);



	//Create a line
	var line = new Line();

	//Create the segments
	var s1 = new LineSegment(s,t);
	var s2 = new LineSegment(t,v);

	line.addSegment(s1);
	line.addSegment(s2);

	lines.push(line);

	var train = new Train(line);
	trains.push(train);
}




function createControls(){
	var addStationButton = createButton('Add station');
  	addStationButton.position(10, 500);
  	addStationButton.mousePressed(setCreatingStation);



  	var createLineButton = createButton('Create line');
  	createLineButton.position(100, 500);
  	createLineButton.mousePressed(setCreatingLine);

}


function setCreatingStation(){
	controls.addingStation = true;
}


function cancelCreatingStation(){
	controls.addingStation = false;
}

function setCreatingLine(){
	var l = new Line();
	l.color.randomize();

	lines.push(l);
}


function cancelCreatingLine(){
	
}




function mousePressed(){

	if(mouseX < 500 && mouseY < 500){ //It is inside the canvas?



		if(controls.addingStation == true){

			var s = new Station(mouseX, mouseY);
			stations.push(s);

			cancelCreatingStation();
		}else{



			//Did the user click a station?
			var clickedStation = clickingStation();

			console.log("clickedStation", clickedStation);

			if(clickedStation != undefined){

				//Creating a new segment
				creatingSegment = true;
				segmentstart = clickedStation;
			}

		}
	}

}

function mouseReleased(){

	if(creatingSegment == true){

		var endstation = clickingStation();

		if(endstation != undefined && endstation != segmentstart){
			//CReate a segment between segmentstart y segmentend
			//Read the line froms segmentstart


			//FIX THIS
			var line = lines[0];
			//var line = segmentstart.parent;
			//console.log(segmentstart, line);

			var newSegment = new LineSegment(segmentstart, endstation);
			line.addSegment(newSegment);
		}

		creatingSegment = false;
		segmentstart = undefined;
		segmentend = undefined;
	}
}

function clickingStation(){
	for(var i = 0; i < stations.length; i++){
		var s = stations[i];

		if(s.mouseIn()){
			return s;
		}
	}
	return undefined;
}
/*
function createTest(){
	var scount = 20;
	
	for(var i = 0; i< scount; i++){
			var s = new Station(random(0,500), random(0,500));
			stations.push(s);
	}
	
	console.log("I have " + stations.length + " stations");
	
	
	var trainCount = 0;
	
	for(var i = 0; i< stations.length; i++){
		var station = stations[i];
		console.log("I prepare the station " +i);
		
		var linesFromHere =Math.floor(random(0,5));
		
		console.log("Lines", linesFromHere);
		for(var l = 0; l< linesFromHere; l++){
			//Get a randon index
			var index = Math.floor(random(stations.length));
			var toStation = stations[index];
			if(toStation != station){
				var line = new LineSegment(station,toStation);
				lines.push(line);
				
				
				//Add the train to this line
				var train = new Train(line);
				trains.push(train);
				
				train.setId(""+ trainCount);
				trainCount++;
			}
		}
		
	}
}*/

function draw(){
	background(51);
	
	for(var i = 0; i< lines.length; i++){
		var l = lines[i];
		l.display();
	}
	
	
	
	for(var i = 0; i< stations.length; i++){
		var s = stations[i];
		s.display();
	}
	

	for(var i = 0; i< trains.length; i++){
		var t = trains[i];
		t.update();
		t.display();
	}


	this.drawLinesInfo();
}





function drawLinesInfo(){

	var infoW = 100;
	var infoH = 100;

	var hdiv = infoH / lines.length;

	var rectStart = 500 - infoH;


	fill(200);
	rect(0, rectStart, infoW, infoH);




	for(var i = 0; i< lines.length; i++){
		var l = lines[i];
		
		l.color.setFill();
		stroke(0);
		rect(0, rectStart + (i * hdiv), infoW, infoH);
	}

}






