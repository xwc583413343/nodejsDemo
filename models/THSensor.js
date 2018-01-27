
var mongodb=require('./mongodb.js');
var Schema=mongodb.mongoose.Schema;
var SensorSchema=new Schema({
	sensorID:String,
	sensorType:String,
	areaGid:String,
	time:{type:Date,default:Date.now},
	timeString:String,
	temperature:Number,
	humidity:Number
});

var THSensor=mongodb.mongoose.model("THSensor",SensorSchema);
var SensorDAO=function(){};

SensorDAO.prototype.save=function(obj){
	var instance=new THSensor(obj);
	instance.save(function(err){
		if(err){
			console.log(err);
		}else{
			console.log(instance);
		}
	});
};

SensorDAO.prototype.findAll=function(queryJson,callback){
	THSensor.find(queryJson,function(err,obj){
		callback(err,obj);
	});	
}

SensorDAO.prototype.remove=function(queryJson){
	THSensor.remove(queryJson,function(err){
		if(err) console.log(err);
	});
}	

SensorDAO.prototype.update=function(queryJson,updateJson){
	THSensor.findOneAndUpdate(queryJson,updateJson,function(err){
		if(err){
			console.log(err);
		}else{
			console.log("update success");
		}
	});
}

module.exports=new SensorDAO();

