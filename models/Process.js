
var mongodb=require('./mongodb.js');
var Schema=mongodb.mongoose.Schema;
var ProcessSchema=new Schema({
	process:String,
	operator:String,
	productBatch:String,
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

var Process=mongodb.mongoose.model("Process",ProcessSchema);
var ProcessDAO=function(){};

ProcessDAO.prototype.save=function(obj,callback){
	var instance=new Process(obj);
	instance.save(function(err){
		if(err){
			console.log(err);
		}else{
			callback();	
		}
	});
};

ProcessDAO.prototype.findAll=function(queryJson,callback){
	Process.find(queryJson,function(err,obj){
		callback(err,obj);
	});	
}

ProcessDAO.prototype.remove=function(queryJson){
	Process.remove(queryJson,function(err){
		if(err) console.log(err);
	});
}	

ProcessDAO.prototype.update=function(queryJson,updateJson){
	Process.findOneAndUpdate(queryJson,updateJson,function(err){
		if(err){
			console.log(err);
		}else{
			console.log("update success");
		}
	});
}

module.exports=new ProcessDAO();

