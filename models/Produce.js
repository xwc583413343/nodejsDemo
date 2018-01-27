
var mongodb=require('./mongodb.js');
var Schema=mongodb.mongoose.Schema;
var ProduceSchema=new Schema({
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
	{pID:Schema.Types.ObjectId,time:{type:Date},_id:false}
	]
});

var Produce=mongodb.mongoose.model("Produce",ProduceSchema);
var ProduceDAO=function(){};

ProduceDAO.prototype.save=function(objJson,callback){
	var instance=new Produce(objJson);
	instance.save(function(err){
			console.log("save success");
			callback(instance);
	});
};

ProduceDAO.prototype.findAll=function(queryJson,callback){
	Produce.find(queryJson,function(err,obj){
		callback(err,obj);
	});	
}

ProduceDAO.prototype.remove=function(queryJson){
	Produce.remove(queryJson,function(err){
		if(err) console.log(err);
	});
}	

ProduceDAO.prototype.update=function(queryJson,updateJson,callback){
	Produce.findOneAndUpdate(queryJson,updateJson,function(err,obj){
		callback(err,obj);
	});
}

module.exports=new ProduceDAO();

