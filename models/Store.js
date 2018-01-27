
var mongodb=require('./mongodb.js');
var Schema=mongodb.mongoose.Schema;
var StoreSchema=new Schema({
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
		{pID:Schema.Types.ObjectId,_id:false,time:{type:Date}}
	]
});

var Store=mongodb.mongoose.model("Store",StoreSchema);
var StoreDAO=function(){};

StoreDAO.prototype.save=function(obj,callback){
	var instance=new Store(obj);
	instance.save(function(err){
		if(err){
			console.log(err);
		}else{
			callback(instance);
		}
	});
};

StoreDAO.prototype.findAll=function(queryJson,callback){
	Store.find(queryJson,function(err,obj){
		callback(err,obj);
	});	
}

StoreDAO.prototype.remove=function(queryJson){
	Store.remove(queryJson,function(err){
		if(err) console.log(err);
	});
}	

StoreDAO.prototype.update=function(queryJson,updateJson,callback){
	Store.findOneAndUpdate(queryJson,updateJson,function(err,obj){
		callback(err,obj);
	});
}

module.exports=new StoreDAO();

