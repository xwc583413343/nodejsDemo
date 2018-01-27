
var mongodb=require('./mongodb.js');
var Schema=mongodb.mongoose.Schema;
var SecondProcessSchema=new Schema({
	SecondProcess:String,
	operator:String,
	SecondProcessBatch:String,
	areaGid:String,
	time:{type:Date,default:Date.now},
	sensorData:
	{
		temprature:Number,
		humidity:Number
	},
	productionID:[
		{pID:Schema.Types.ObjectId,_id:false}
	]
});

var SecondProcess=mongodb.mongoose.model("SecondProcess",SecondProcessSchema);
var SecondProcessDAO=function(){};

SecondProcessDAO.prototype.save=function(obj,callback){
	var instance=new SecondProcess(obj);
	instance.save(function(err){
		if(err){
			console.log(err);
		}else{
			callback();
		}
	});
};

SecondProcessDAO.prototype.findAll=function(queryJson,callback){
	SecondProcess.find(queryJson,function(err,obj){
		callback(err,obj);
	});	
}

SecondProcessDAO.prototype.remove=function(queryJson){
	SecondProcess.remove(queryJson,function(err){
		if(err) console.log(err);
	});
}	

SecondProcessDAO.prototype.update=function(queryJson,updateJson){
	SecondProcess.findOneAndUpdate(queryJson,updateJson,function(err){
		if(err){
			console.log(err);
		}else{
			console.log("update success");
		}
	});
}

module.exports=new SecondProcessDAO();

