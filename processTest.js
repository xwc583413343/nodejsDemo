var  Process= require('./models/Process.js');
var SecondProcess=require('./models/SecondProcess.js');
var TraceSource=require('./models/TraceSource.js');

var sd=require('silly-datetime');
var ObjectID=require('mongodb').ObjectID;

var timeProcess=sd.format(new Date(),'YYYY-MM-DD HH');
var tempProductId=new ObjectID();

var objJsontemp={
	process:"firstProcess",
	operator:"xwc",
	productBatch:timeProcess,
	areaGid:"s01",
	time:new Date,
	sensorData:{
		temprature:12,
		humidity:23
	},
	productionID:[
		{pID:tempProductId}
	]
}
var tempSecProcJson={
	process:"secondProcess",
	operator:"yqt",
	productBatch:timeProcess,
	areaGid:"s02",
	time:new Date,
	sensorData:{
		temprature:20,
		humidity:30
	},
	productionID:[
		{pID:tempProductId}
	]
}

var tempStraceJson={
	proctionID:tempProductId,
	meta:{
		productBatch:objJsontemp.productBatch
	},
	firstProcess:{
		time:objJsontemp.time,
		operator:objJsontemp.operator,
		areaGid:objJsontemp.areaGid
	}
};

var secStraceJson={
	secondProcess:{
		time:tempSecProcJson.time,
		operator:tempSecProcJson.operator,
		areaGid:tempSecProcJson.areaGid
	}
}

Process.save(objJsontemp,function(){
	TraceSource.save(tempStraceJson,function(err){});
	SecondProcess.save(tempSecProcJson,function(){
	TraceSource.update({proctionID:tempProductId},secStraceJson);
});
});
//Process.update({processBatch:timeProcess},{$push:{productionID:{pID:tempProductId}}});



/*
setInterval(function(){
	var newTimeProcess=sd.format(new Date(),'YYYY-MM-DD HH:mm');

	var objJson={
		ProcessID:"s01",
		ProcessType:"TH",
		areaGid:"a01",
		timeString:newTimeProcess,
		data:[
		{temperature:12.0,humidity:26.5},
		{temperature:12.3,humidity:25.2}
		]
	}
	if(timeProcess==newTimeSensor){
		console.log(newTimeProcess);
		Process.update({timeString:timeSensor},{$push:{data:{temperature:11,humidity:12}}});
	}else{
		console.log("save");
		timeProcess=newTimeSensor;
		Process.save(objJson,function(err){});
	}
},5000);
//Process.save(objJson,function(err){});
//Process.remove({sensorID:"s01"});
   */





