var Sensor= require('./models/Sensor.js');
var sd=require('silly-datetime');

var timeSensor=sd.format(new Date(),'YYYY-MM-DD HH:mm');

var objJsontemp={
	sensorID:"s01",
	sensorType:"TH",
	areaGid:"a01",
	timeString:timeSensor
}
Sensor.findAll({timeString:timeSensor},function(err,obj){
	if(obj!=0){
		Sensor.update({timeString:timeSensor},{$push:{data:{temperature:11,humidity:12}}});	
	}else{
		Sensor.save(objJsontemp);
	}	
});





