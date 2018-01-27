var  Store= require('./models/Store.js');
var Produce=require('./models/Produce.js');
var TraceSource=require('./models/TraceSource.js');
var sd=require('silly-datetime');
var ObjectID=require('mongodb').ObjectID;

var tempProductBatch=sd.format(new Date(),'YYYY-MM-DD HH');//产品的批次号

//产品批次信息
var objJsontemp={
	process:"Store",
	operator:"yqt",
	productBatch:tempProductBatch,
	areaGid:"s01",
	sensorData:{
		temprature:12,
		humidity:23
	}
}
//Store.save(objJsontemp,function(objtemp){});
Produce.findAll({productBatch:"2017-07-31 10"},function(err,obj){
	console.log(obj);
});
/*
Produce.findAll({},function(err,obj){
	var tempIDArray=obj[0].productionID;
	var tempTime=new Date;
	var index=1;
	Store.update({productBatch:objJsontemp.productBatch},{$push:{productionID:{pID:tempIDArray[index].pID,time:tempTime}}},function(err,updateObj){
		var tempTraceJson={	
			store:{
				time:tempTime,
				operator:objJsontemp.operator,
				areaGid:objJsontemp.areaGid
			}
		};
		TraceSource.update({productionID:tempIDArray[index].pID},tempTraceJson,function(err,updateObj){
			if(updateObj){
				console.log(updateObj);
			}else{
				console.log("update null");
			}
		
		});
	});

});

/*
   var tempProductID=new ObjectID();
   var tempTime=new Date;
   Store.update({productBatch:objJsontemp.productBatch},{$push:{productionID:{pID:tempProductID,time:tempTime}}},function(err,updateObj){
   console.log(updateObj);
   });
   */
/*
   Store.save(objJsontemp,function(objtemp){});
   TraceSource.findAll({},function(err,obj){
   for(var index in obj){
   console.log(obj[index].productionID);

   var tempProductID=new Object(obj[index].productionID);//产品的id
   var tempTime=new Date;
   Store.update({productBatch:objJsontemp.productBatch},{$push:{productionID:{pID:tempProductID,time:tempTime}}},function(err,updateObj){
   console.log(updateObj);
   var tempTraceJson={	
   Store:{
   time:tempTime,
   operator:objJsontemp.operator,
   areaGid:objJsontemp.areaGid
   }
   };
   TraceSource.update({productionID:tempProductID},tempTraceJson);
   });
   }
   });	
   */



