var ArrEnemy = new Array();
var MaxEnemy = 1000;
var ReadySpawn = true;
var SpawnSpeed = 100;
var Speed = 1;

function SpawnEnemy()
{
	var AX = RandomValue(760);
	var Fall = RandomValue(300) / 100;
	
	ArrEnemy.push( {X: AX, Y: 5, GoY: Fall} );
	
	ReadySpawn = false;
	
	setTimeout( SpawnReady, SpawnSpeed );
	
	SpawnSpeed -= 1000 / 50;
	if(SpawnSpeed < 0)
	{
		SpawnSpeed = 0;
	}
}

function SpawnReady()
{
	ReadySpawn = true;
}

function MoveEnemy()
{
	var CV = document.getElementById("GC");
	var C = CV.getContext("2d");
	
	C.font = '25px Arial';
	
	for( var i = 0; i < MaxEnemy; i++ )
	{		
		C.fillText( "♡" , ArrEnemy[i].X, ArrEnemy[i].Y );
		
		ArrEnemy[i].Y += ArrEnemy[i].GoY;
		ArrEnemy[i].GoY += Speed / 60 * 2;
		
		if( CollisonMissile(ArrEnemy[i].X,ArrEnemy[i].Y) )
		{
			State = End;
			time.Stop = true;
		}
		
		if( ArrEnemy[i].Y > 600 )
		{
			ArrEnemy.splice( i, 1 );
		}
	}
}

function CollisonMissile( X, Y )
{	
	if( MouseX + 25 > X + 5 &&  
		MouseX + 15 < X + 20 &&
		575 < Y + 20 &&
		585 > Y + 5 )
	{
		return true;
	}
	
	return false;
}
