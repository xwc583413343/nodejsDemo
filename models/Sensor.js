
var mongodb=require('./mongodb.js');
var Schema=mongodb.mongoose.Schema;
var SensorSchema=new Schema({
	sensorID:String,
	sensorType:String,
	areaGid:String,
	time:{type:Date,default:Date.now},
	timeString:String,
	data:[
		{temperature:Number,humidity:Number,_id:false}
	],
	meanValue:Number
});

var Sensor=mongodb.mongoose.model("Sensor",SensorSchema);
var SensorDAO=function(){};

SensorDAO.prototype.save=function(obj){
	var instance=new Sensor(obj);
	instance.save(function(err){
		if(err){
			console.log(err);
		}else{
			console.log(instance);
		}
	});
};

SensorDAO.prototype.findAll=function(queryJson,callback){
	Sensor.find(queryJson,function(err,obj){
		callback(err,obj);
	});	
}

SensorDAO.prototype.remove=function(queryJson){
	Sensor.remove(queryJson,function(err){
		if(err) console.log(err);
	});
}	

SensorDAO.prototype.update=function(queryJson,updateJson){
	Sensor.findOneAndUpdate(queryJson,updateJson,function(err){
		if(err){
			console.log(err);
		}else{
			console.log("update success");
		}
	});
}

module.exports=new SensorDAO();

