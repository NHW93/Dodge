function Timer()
{
	this.Time = 0;
	this.Stop = false;
	
	return this;
}

Timer.prototype.Update = function()
{
	if(this.Stop == false)
	{
		this.Time += 1000 / 60;
	}
};

Timer.prototype.Reset = function()
{
	this.Time = 0;
};

var timer = new Timer();