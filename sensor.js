var  Sensor= require('./models/Sensor.js');
var sd=require('silly-datetime');

var timeSensor=sd.format(new Date(),'YYYY-MM-DD HH:mm');

var objJsontemp={
	sensorID:"s01",
	sensorType:"TH",
	areaGid:"a01",
	timeString:timeSensor,
	data:[
		{temperature:12.0,humidity:26.5},
	]
}
Sensor.save(objJsontemp);

//每分钟一个文档
setInterval(function(){
	var newTimeSensor=sd.format(new Date(),'YYYY-MM-DD HH:mm');

	var objJson={
		sensorID:"s01",
		sensorType:"TH",
		areaGid:"a01",
		timeString:newTimeSensor,
		data:[
		{temperature:12.0,humidity:26.5},
		]
	}
	if(timeSensor==newTimeSensor){
		console.log(newTimeSensor);
		Sensor.update({timeString:timeSensor},{$push:{data:{temperature:11,humidity:12}}});
	}else{
		console.log("save");
		timeSensor=newTimeSensor;
		Sensor.save(objJson,function(err){});
	}
},5000);
//Sensor.save(objJson,function(err){});
//Sensor.remove({sensorID:"s01"});
//Sensor.update({sensorID:"s01"},{$push:{data:{temperature:24,humidity:13}}});
/*
   Sensor.findAll({sensorID:"s01"},function(err, obj){
   if(err){	
   console.log(err);
   }
   else{
   console.log(obj);
   }
   });
   */





