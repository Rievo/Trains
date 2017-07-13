var stations = [];
var lines = [];
var trains = [];

var panelH = 20;
var panelW = 20;

var mouse;


function setup(){
	createCanvas(500,500);
	textSize(20);
	createTest();
	
	mouse = createVector(0,0);
	/*var s = new Station(100,200);
	stations.push(s);
	
	var t = new Station(400,200);
	stations.push(t);
	
	var u = new Station(250, 400);
	stations.push(u);
	
	
	var l = new LineSegment(s,t);
	lines.push(l);
	
	var su = new LineSegment(s,u);
	lines.push(su);
	
	
	var train = new Train(l);
	trains.push(train);
	
	var sut = new Train(su);
	trains.push(sut);*/
}

function mouseClicked(){
	for(var i = 0; i< trains.length; i++){
		var t = trains[i];
		if(t.mouseIn()){
			t.selected = !t.selected;
		}else{
			t.selected = false;
		}
	}
}

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
}

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
}