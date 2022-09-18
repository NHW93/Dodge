window.addEventListener("load", AutoRun, false);
window.addEventListener("keydown", FKeyDown, false);
window.addEventListener("mousemove", FMouseMove, false);

var MouseX = 0;
var MouseY = 0;

var State = 0;
var Set = 0;
var Ing = 1;
var End = 2;

function RandomValue( max )
{
	return 1 + Math.floor ( Math.random() * max );
}

function AutoRun()
{
	setInterval(DrawScreen, 1000 / 60);
}

function DrawScreen()
{
	var CV = document.getElementById("GC");
	var C = CV.getContext("2d");
	
	C.fillStyle = "#ffffff";
	C.fillRect( 0, 0, 800, 600 );
	
	C.fillStyle = "#000000";
	C.textBaseline = "top";
	
	if(State == Set)
	{
		timer.Reset();
		timer.Stop = false;
		
		C.font = '50px Arial';
		C.fillText( "Ready", 350, 200 );
		C.font = '20px Arial';
		C.fillText( "Enter to Start", 360, 250 );
	}
	
	else if(State == Ing)
	{
		timer.Update();
		
		C.font = '15px Arial';
		C.fillText( MouseX + " , " + MouseY, 5, 5 );
		C.fillText( "Time: " + Math.floor(timer.Time / 1000 * 10) / 10, 350, 5 );
		C.fillText( ArrEnemy.length + " , " + SpawnSpeed, 5, 20 );
		
		C.font = '50px Arial';
		C.fillText( "A" , MouseX, 560 );
		
		if(ArrEnemy.length < MaxEnemy && ReadySpawn)
		{
			SpawnEnemy();
		}
		
		MoveEnemy();
	}
	
	else if(State == End)
	{
		C.font = '50px Arial';
		C.fillText( "Over", 350, 200 );
		C.font = '20px Arial';
		C.fillText( "Enter to Ready", 340, 250 );
		
		C.font = '15px Arial';
		C.fillText( "Your Score : " + Math.floor(timer.Time / 1000 * 10) / 10 + " sec", 340, 270 );
	}
}

function FMouseMove(e)
{
	var CV = document.getElementById("GC");
	
	MouseX = e.clientX - CV.offsetLeft;
	MouseY = e.clientY - CV.offsetTop;
	
	if (MouseX < 0)
	{
		MouseX = 0;
	}
	
	if (MouseX > 750)
	{
		MouseX = 750;
	}
}

function FKeyDown(e)
{
	if(State == Set)
	{
		if(e.keyCode == 13)
		{
			State = Ing;
		}
	}
	
	else if(State == End)
	{
		if(e.keyCode == 13)
		{
			while(ArrEnemy.length != 0)
			{
				ArrEnemy.pop();
			}
			
			Time = 0;
			ReadySpawn = true;
			SpawnSpeed = 100;
			Speed = 1;
			
			State = Set;
		}
	}
}
