var  Produce= require('./models/Produce.js');
var TraceSource=require('./models/TraceSource.js');
var sd=require('silly-datetime');
var ObjectID=require('mongodb').ObjectID;

var tempProductBatch=sd.format(new Date(),'YYYY-MM-DD HH');//产品的批次号

//产品批次信息
var objJsontemp={
	process:"produce",
	operator:"xwc",
	productBatch:tempProductBatch,
	areaGid:"s01",
	sensorData:{
		temprature:12,
		humidity:23
	}
}

Produce.save(objJsontemp,function(obj){
	console.log(obj);
	//生产
	setInterval(function(){	
		var tempProductID=new ObjectID();//产品的id
		var tempTime=new Date;
		Produce.update({productBatch:obj.productBatch},{$push:{productionID:{pID:tempProductID,time:tempTime}}},function(err,updateObj){

			//信息加入溯源库
			var tempTraceJson={
				productionID:tempProductID,
				meta:{
					productBatch:objJsontemp.productBatch
				},
				produce:{
					time:tempTime,
					operator:objJsontemp.operator,
					areaGid:objJsontemp.areaGid
				}
			};
			TraceSource.save(tempTraceJson,function(err){});
			console.log("update success");
		});
	},5000);
});





