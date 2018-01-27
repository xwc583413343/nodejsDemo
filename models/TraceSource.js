
var mongodb=require('./mongodb.js');
var Schema=mongodb.mongoose.Schema;
var TraceSourceSchema=new Schema({
	productionID:Schema.Types.ObjectId,
	meta:{
		productBatch:String,
		productName:String,
		productLevel:String,
		weight:Number,
		produceTime:{type:Date},
		saveTime:String
	},
	produce:{
		time:{type:Date},
		operator:String,
		areaGid:String
	},
	store:{
		time:{type:Date},
		operator:String,
		areaGid:String
	},
	transer:{
		time:{type:Date},
		driver:String,
		carID:String
	},
	sale:{
		time:{type:Date},
		saleLocation:String
	}
});

var TraceSource=mongodb.mongoose.model("TraceSource",TraceSourceSchema);
var TraceSourceDAO=function(){};

TraceSourceDAO.prototype.save=function(obj){
	var instance=new TraceSource(obj);
	instance.save(function(err){
		if(err){
			console.log(err);
		}else{
			console.log(instance);
		}
	});
};

TraceSourceDAO.prototype.findAll=function(queryJson,callback){
	TraceSource.find(queryJson,function(err,obj){
		callback(err,obj);
	});	
}

TraceSourceDAO.prototype.remove=function(queryJson){
	TraceSource.remove(queryJson,function(err){
		if(err) console.log(err);
	});
}	

TraceSourceDAO.prototype.update=function(queryJson,updateJson,callback){
	TraceSource.findOneAndUpdate(queryJson,updateJson,function(err,obj){
		callback(err,obj);
	});
}

module.exports=new TraceSourceDAO();

